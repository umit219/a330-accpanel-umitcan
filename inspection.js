/* =========================================================
   A330 INSPECTION RECORDER
   LOCAL ONLY
   IndexedDB
   MULTI PHOTO
   PHOTO ANNOTATION
========================================================= */

const DB_NAME = "A330InspectionDB";
const DB_VERSION = 2;

const INSPECTIONS_STORE = "inspections";
const FINDINGS_STORE = "findings";

let db = null;

let currentInspectionId = null;
let currentFindingId = null;

let currentPhotoList = [];
let currentPhotoIndex = 0;

/* Yeni finding oluştururken geçici fotoğraflar */
let pendingPhotos = [];

/* Annotation */
const annotationCanvas = document.getElementById("annotationCanvas");
const annotationCtx = annotationCanvas.getContext("2d");

let annotationTool = "pen";
let annotationDrawing = false;

let annotationStartX = 0;
let annotationStartY = 0;

let annotationImage = null;
let annotationHistory = [];

let annotationOriginalBlob = null;


/* =========================================================
   SHORTCUT
========================================================= */

const $ = id => document.getElementById(id);

const app = $("app");

const inspectionModal = $("inspectionModal");
const findingModal = $("findingModal");

const aircraftInput = $("aircraftInput");
const inspectionType = $("inspectionType");

const findingLocation = $("findingLocation");
const findingText = $("findingText");

const photoModal = $("photoModal");
const photoPreview = $("photoPreview");
const photoCounter = $("photoCounter");

const annotationModal = $("annotationModal");


/* =========================================================
   HELPERS
========================================================= */

function escapeHtml(value) {

    return String(value ?? "").replace(/[&<>"']/g, char => {

        const map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return map[char];

    });

}


function formatDate(timestamp) {

    return new Date(timestamp).toLocaleString("tr-TR", {
        dateStyle: "short",
        timeStyle: "short"
    });

}


function uid(prefix) {

    return (
        prefix +
        "-" +
        Date.now() +
        "-" +
        Math.random().toString(36).slice(2, 10)
    );

}


/* =========================================================
   DATABASE
========================================================= */

function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );


        request.onupgradeneeded = event => {

            const database = event.target.result;

            /* INSPECTIONS */

            if (!database.objectStoreNames.contains(INSPECTIONS_STORE)) {

                database.createObjectStore(
                    INSPECTIONS_STORE,
                    {
                        keyPath: "id"
                    }
                );

            }


            /* FINDINGS */

            if (!database.objectStoreNames.contains(FINDINGS_STORE)) {

                database.createObjectStore(
                    FINDINGS_STORE,
                    {
                        keyPath: "id"
                    }
                );

            }


            /*
                Version 1 -> Version 2

                Eski yapı:

                finding.photo

                Yeni yapı:

                finding.photos = [
                    {
                        id,
                        original,
                        marked
                    }
                ]
            */

            if (event.oldVersion < 2) {

                const transaction = event.target.transaction;

                const store =
                    transaction.objectStore(FINDINGS_STORE);

                store.openCursor().onsuccess = e => {

                    const cursor = e.target.result;

                    if (!cursor) return;

                    const finding = cursor.value;


                    if (!Array.isArray(finding.photos)) {

                        if (finding.photo) {

                            finding.photos = [
                                {
                                    id: "legacy-" + finding.id,
                                    original: finding.photo,
                                    marked: null
                                }
                            ];

                        } else {

                            finding.photos = [];

                        }

                        delete finding.photo;

                        cursor.update(finding);

                    }


                    cursor.continue();

                };

            }

        };


        request.onsuccess = () => {

            db = request.result;

            resolve(db);

        };


        request.onerror = () => {

            reject(request.error);

        };

    });

}


/* =========================================================
   DATABASE HELPERS
========================================================= */

function dbPut(storeName, value) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                storeName,
                "readwrite"
            );

        const store =
            transaction.objectStore(storeName);

        const request = store.put(value);


        request.onsuccess = () => {

            resolve(request.result);

        };


        request.onerror = () => {

            reject(request.error);

        };

    });

}


function dbGetAll(storeName) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                storeName,
                "readonly"
            );

        const store =
            transaction.objectStore(storeName);

        const request = store.getAll();


        request.onsuccess = () => {

            resolve(request.result || []);

        };


        request.onerror = () => {

            reject(request.error);

        };

    });

}


function dbDelete(storeName, key) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                storeName,
                "readwrite"
            );

        const store =
            transaction.objectStore(storeName);

        const request =
            store.delete(key);


        request.onsuccess = () => {

            resolve();

        };


        request.onerror = () => {

            reject(request.error);

        };

    });

}


/* =========================================================
   PHOTO DATA
========================================================= */

function getFindingPhotos(finding) {

    if (Array.isArray(finding.photos)) {

        return finding.photos;

    }


    /*
       Eski kayıt desteği
    */

    if (finding.photo) {

        return [
            {
                id: "legacy-" + finding.id,
                original: finding.photo,
                marked: null
            }
        ];

    }


    return [];

}


/* =========================================================
   INSPECTION LIST
========================================================= */

async function showInspectionList() {

    currentInspectionId = null;


    const [
        inspections,
        findings
    ] = await Promise.all([

        dbGetAll(INSPECTIONS_STORE),
        dbGetAll(FINDINGS_STORE)

    ]);


    inspections.sort(
        (a, b) => b.createdAt - a.createdAt
    );


    let html = `

        <button
            id="newInspectionBtn"
            class="primary-btn"
            type="button">

            + NEW INSPECTION

        </button>

    `;


    if (!inspections.length) {

        html += `

            <div class="card">

                <div class="empty-state">

                    Henüz inspection kaydı yok.<br>

                    Yeni bir inspection oluşturarak başlayın.

                </div>

            </div>

        `;

    } else {

        html += inspections.map(inspection => {

            const count =
                findings.filter(
                    finding =>
                        finding.inspectionId === inspection.id
                ).length;


            return `

                <div
                    class="card inspection-card"
                    data-id="${escapeHtml(inspection.id)}">

                    <div class="inspection-card-title">

                        ${escapeHtml(inspection.type)}

                    </div>


                    <div class="inspection-card-sub">

                        ✈️ ${escapeHtml(inspection.aircraft)}

                        <br>

                        ${formatDate(inspection.createdAt)}

                    </div>


                    <div class="inspection-card-footer">

                        <span>

                            ${count}
                            ${count === 1 ? "Finding" : "Findings"}

                        </span>


                        <span class="finding-count">

                            OPEN →

                        </span>

                    </div>

                </div>

            `;

        }).join("");

    }


    app.innerHTML = html;


    $("newInspectionBtn").onclick =
        openInspectionModal;


    document
        .querySelectorAll(".inspection-card")
        .forEach(card => {

            card.onclick = () => {

                showInspectionDetail(
                    card.dataset.id
                );

            };

        });

}


/* =========================================================
   INSPECTION DETAIL
========================================================= */

async function showInspectionDetail(id) {

    currentInspectionId = id;


    const [
        inspections,
        allFindings
    ] = await Promise.all([

        dbGetAll(INSPECTIONS_STORE),
        dbGetAll(FINDINGS_STORE)

    ]);


    const inspection =
        inspections.find(
            item => item.id === id
        );


    if (!inspection) {

        await showInspectionList();

        return;

    }


    const findings =
        allFindings
            .filter(
                finding =>
                    finding.inspectionId === id
            )
            .sort(
                (a, b) =>
                    a.createdAt - b.createdAt
            );


    let html = `

        <button
            id="detailBack"
            class="detail-back"
            type="button">

            ← Inspection Listesi

        </button>


        <div class="card">

            <div class="detail-header">

                <div>

                    <div class="detail-title">

                        ${escapeHtml(inspection.type)}

                    </div>


                    <div class="detail-meta">

                        ✈️ ${escapeHtml(inspection.aircraft)}

                        <br>

                        ${formatDate(inspection.createdAt)}

                    </div>

                </div>


                <button
                    id="deleteInspection"
                    class="danger-btn"
                    type="button">

                    DELETE

                </button>

            </div>


            <button
                id="addFindingBtn"
                class="primary-btn add-finding"
                type="button">

                + ADD FINDING

            </button>

        </div>

    `;


    if (!findings.length) {

        html += `

            <div class="card">

                <div class="empty-state">

                    Bu inspection için henüz
                    bulgu eklenmedi.

                </div>

            </div>

        `;

    } else {

        html += findings.map((finding, index) => {

            const photos =
                getFindingPhotos(finding);


            const photoHtml =
                photos.length

                ?

                photos.map((photo, photoIndex) => {

                    const blob =
                        photo.marked ||
                        photo.original;

                    const url =
                        URL.createObjectURL(blob);


                    return `

                        <div class="gallery-photo-wrap">

                            <img
                                class="gallery-photo"
                                data-finding="${escapeHtml(finding.id)}"
                                data-index="${photoIndex}"
                                src="${url}"
                                alt="Finding photo">


                            <span class="photo-number">

                                ${photoIndex + 1}

                            </span>


                            ${
                                photo.marked

                                ?

                                `<span class="marked-badge">
                                    MARKED
                                </span>`

                                :

                                ""
                            }

                        </div>

                    `;

                }).join("")

                :

                `

                    <div class="no-photo">

                        No photos

                    </div>

                `;


            return `

                <div
                    class="finding-card"
                    data-id="${escapeHtml(finding.id)}">


                    <!-- FINDING HEADER -->

                    <div class="finding-main">

                        <div class="finding-number">

                            FINDING ${index + 1}

                        </div>


                        <div class="finding-location">

                            ${escapeHtml(
                                finding.location ||
                                "No location"
                            )}

                        </div>


                        <div class="finding-text">

                            ${escapeHtml(
                                finding.text || ""
                            )}

                        </div>


                        <div class="finding-arrow">

                            ⌄

                        </div>

                    </div>


                    <!-- EXPANDED AREA -->

                    <div class="finding-expand">

                        <div class="finding-divider"></div>


                        <!-- PHOTO GALLERY -->

                        <div class="photo-gallery">

                            ${photoHtml}

                        </div>


                        <!-- ADD MORE PHOTOS -->

                        <div style="margin-top:10px">

                            <button
                                class="add-photos-btn add-photos"
                                data-id="${escapeHtml(finding.id)}"
                                type="button">

                                ＋ ADD PHOTOS

                            </button>

                        </div>


                        <!-- FOOTER -->

                        <div class="finding-footer">

                            <span class="finding-date">

                                ${formatDate(
                                    finding.createdAt
                                )}

                            </span>


                            <button
                                class="delete-finding"
                                data-id="${escapeHtml(finding.id)}"
                                type="button">

                                DELETE

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join("");

    }


    app.innerHTML = html;


    /* BACK */

    $("detailBack").onclick =
        showInspectionList;


    /* ADD FINDING */

    $("addFindingBtn").onclick =
        openFindingModal;


    /* DELETE INSPECTION */

    $("deleteInspection").onclick =
        () => deleteInspection(id);


    /* FINDING ACCORDION */

    document
        .querySelectorAll(".finding-card")
        .forEach(card => {

            const main =
                card.querySelector(".finding-main");


            main.onclick = () => {

                card.classList.toggle(
                    "expanded"
                );

            };

        });


    /* OPEN PHOTOS */

    document
        .querySelectorAll(".gallery-photo")
        .forEach(image => {

            image.onclick = event => {

                event.stopPropagation();


                openPhotoViewer(
                    image.dataset.finding,
                    Number(image.dataset.index)
                );

            };

        });


    /* DELETE FINDING */

    document
        .querySelectorAll(".delete-finding")
        .forEach(button => {

            button.onclick = event => {

                event.stopPropagation();

                deleteFinding(
                    button.dataset.id
                );

            };

        });


    /* ADD PHOTOS */

    document
        .querySelectorAll(".add-photos")
        .forEach(button => {

            button.onclick = event => {

                event.stopPropagation();


                currentFindingId =
                    button.dataset.id;


                $("addPhotosInput").value = "";


                $("addPhotosInput").click();

            };

        });

}


/* =========================================================
   DELETE INSPECTION
========================================================= */

async function deleteInspection(id) {

    const confirmed =
        confirm(
            "Bu inspection ve tüm finding kayıtları silinsin mi?"
        );


    if (!confirmed) return;


    const findings =
        await dbGetAll(FINDINGS_STORE);


    const related =
        findings.filter(
            finding =>
                finding.inspectionId === id
        );


    for (const finding of related) {

        await dbDelete(
            FINDINGS_STORE,
            finding.id
        );

    }


    await dbDelete(
        INSPECTIONS_STORE,
        id
    );


    await showInspectionList();

}


/* =========================================================
   DELETE FINDING
========================================================= */

async function deleteFinding(id) {

    const confirmed =
        confirm(
            "Bu finding silinsin mi?"
        );


    if (!confirmed) return;


    await dbDelete(
        FINDINGS_STORE,
        id
    );


    await showInspectionDetail(
        currentInspectionId
    );

}


/* =========================================================
   NEW INSPECTION
========================================================= */

function openInspectionModal() {

    inspectionModal.classList.add("show");

    aircraftInput.focus();

}


function closeInspectionModal() {

    inspectionModal.classList.remove("show");

    aircraftInput.value = "";

}


async function saveInspection() {

    const aircraft =
        aircraftInput.value.trim();


    if (!aircraft) {

        alert(
            "Aircraft bilgisini girin."
        );

        return;

    }


    const inspection = {

        id: uid("inspection"),

        aircraft: aircraft,

        type: inspectionType.value,

        createdAt: Date.now()

    };


    await dbPut(
        INSPECTIONS_STORE,
        inspection
    );


    closeInspectionModal();

    await showInspectionList();

}


/* =========================================================
   FINDING MODAL
========================================================= */

function resetPendingPhotos() {

    pendingPhotos = [];

    renderPendingPhotos();

}


function openFindingModal() {

    resetPendingPhotos();

    findingLocation.value = "";

    findingText.value = "";

    findingModal.classList.add("show");

    findingLocation.focus();

}


function closeFindingModal() {

    findingModal.classList.remove("show");

    resetPendingPhotos();

}


/* =========================================================
   ADD PHOTOS TO TEMPORARY FINDING
========================================================= */

function addPendingFiles(files) {

    const fileArray =
        Array.from(files || []);


    for (const file of fileArray) {

        if (
            file.type &&
            file.type.startsWith("image/")
        ) {

            pendingPhotos.push({

                file: file,

                id: uid("photo")

            });

        }

    }


    renderPendingPhotos();

}


/* =========================================================
   PENDING PHOTO PREVIEW
========================================================= */

function renderPendingPhotos() {

    const info =
        $("photoSelectionInfo");


    const gallery =
        $("pendingGallery");


    if (!pendingPhotos.length) {

        info.textContent =
            "Henüz fotoğraf seçilmedi.";

        gallery.innerHTML = "";

        return;

    }


    info.textContent =
        `${pendingPhotos.length} fotoğraf seçildi.`;


    gallery.innerHTML =
        pendingPhotos
            .map((photo, index) => {

                const url =
                    URL.createObjectURL(
                        photo.file
                    );


                return `

                    <div class="pending-item">

                        <img
                            src="${url}"
                            alt="Selected photo">


                        <button
                            class="pending-remove"
                            data-index="${index}"
                            type="button">

                            ×

                        </button>

                    </div>

                `;

            })
            .join("");


    document
        .querySelectorAll(".pending-remove")
        .forEach(button => {

            button.onclick = event => {

                event.stopPropagation();


                const index =
                    Number(
                        button.dataset.index
                    );


                pendingPhotos.splice(
                    index,
                    1
                );


                renderPendingPhotos();

            };

        });

}


/* =========================================================
   SAVE FINDING
========================================================= */

async function saveFinding() {

    const location =
        findingLocation.value.trim();


    const text =
        findingText.value.trim();


    if (!location || !text) {

        alert(
            "Location ve Finding alanlarını doldurun."
        );

        return;

    }


    const photos = [];


    for (const pending of pendingPhotos) {

        photos.push({

            id: pending.id,

            original: pending.file,

            marked: null

        });

    }


    const finding = {

        id: uid("finding"),

        inspectionId:
            currentInspectionId,

        location: location,

        text: text,

        photos: photos,

        createdAt: Date.now()

    };


    await dbPut(
        FINDINGS_STORE,
        finding
    );


    closeFindingModal();


    await showInspectionDetail(
        currentInspectionId
    );

}


/* =========================================================
   ADD PHOTOS TO EXISTING FINDING
========================================================= */

async function addPhotosToFinding(files) {

    if (!currentFindingId) return;


    const findings =
        await dbGetAll(
            FINDINGS_STORE
        );


    const finding =
        findings.find(
            item =>
                item.id === currentFindingId
        );


    if (!finding) return;


    if (!Array.isArray(finding.photos)) {

        finding.photos =
            getFindingPhotos(finding);

    }


    const fileArray =
        Array.from(files || []);


    for (const file of fileArray) {

        if (
            file.type &&
            file.type.startsWith("image/")
        ) {

            finding.photos.push({

                id: uid("photo"),

                original: file,

                marked: null

            });

        }

    }


    await dbPut(
        FINDINGS_STORE,
        finding
    );


    await showInspectionDetail(
        currentInspectionId
    );

}


/* =========================================================
   PHOTO VIEWER
========================================================= */

async function openPhotoViewer(
    findingId,
    index
) {

    const findings =
        await dbGetAll(
            FINDINGS_STORE
        );


    const finding =
        findings.find(
            item =>
                item.id === findingId
        );


    if (!finding) return;


    currentFindingId =
        findingId;


    currentPhotoList =
        getFindingPhotos(finding);


    currentPhotoIndex =
        index;


    renderPhotoViewer();


    photoModal.classList.add("show");

}


/* =========================================================
   RENDER PHOTO VIEWER
========================================================= */

function renderPhotoViewer() {

    if (!currentPhotoList.length) {

        closePhotoViewer();

        return;

    }


    const photo =
        currentPhotoList[
            currentPhotoIndex
        ];


    const blob =
        photo.marked ||
        photo.original;


    if (!blob) return;


    if (
        photoPreview.dataset.url
    ) {

        URL.revokeObjectURL(
            photoPreview.dataset.url
        );

    }


    const url =
        URL.createObjectURL(blob);


    photoPreview.src = url;

    photoPreview.dataset.url =
        url;


    photoCounter.textContent =
        `${currentPhotoIndex + 1} / ${currentPhotoList.length}`;

}


/* =========================================================
   CLOSE PHOTO
========================================================= */

function closePhotoViewer() {

    photoModal.classList.remove("show");


    if (
        photoPreview.dataset.url
    ) {

        URL.revokeObjectURL(
            photoPreview.dataset.url
        );


        delete photoPreview.dataset.url;

    }

}


/* =========================================================
   NEXT / PREVIOUS PHOTO
========================================================= */

function nextPhoto(direction) {

    if (!currentPhotoList.length)
        return;


    currentPhotoIndex =
        (
            currentPhotoIndex +
            direction +
            currentPhotoList.length
        ) %
        currentPhotoList.length;


    renderPhotoViewer();

}


/* =========================================================
   CANVAS COORDINATES
========================================================= */

function getCanvasPoint(event) {

    const rect =
        annotationCanvas.getBoundingClientRect();


    const scaleX =
        annotationCanvas.width /
        rect.width;


    const scaleY =
        annotationCanvas.height /
        rect.height;


    return {

        x:
            (event.clientX - rect.left) *
            scaleX,

        y:
            (event.clientY - rect.top) *
            scaleY

    };

}


/* =========================================================
   ANNOTATION HISTORY
========================================================= */

function saveCanvasHistory() {

    annotationHistory.push(

        annotationCtx.getImageData(
            0,
            0,
            annotationCanvas.width,
            annotationCanvas.height
        )

    );


    if (annotationHistory.length > 30) {

        annotationHistory.shift();

    }

}


/* =========================================================
   UNDO
========================================================= */

function restoreHistory() {

    if (
        annotationHistory.length > 1
    ) {

        annotationHistory.pop();


        annotationCtx.putImageData(

            annotationHistory[
                annotationHistory.length - 1
            ],

            0,
            0

        );

    }

}


/* =========================================================
   SETUP ANNOTATION
========================================================= */

function setupAnnotation(blob) {

    const image =
        new Image();


    image.onload = () => {

        annotationImage =
            image;


        /*
            Ekrana sığacak şekilde
            canvas boyutunu belirliyoruz.
        */

        const maxWidth =
            window.innerWidth;


        const maxHeight =
            window.innerHeight - 120;


        const scale =
            Math.min(

                maxWidth /
                    image.naturalWidth,

                maxHeight /
                    image.naturalHeight,

                1

            );


        annotationCanvas.width =
            Math.round(
                image.naturalWidth *
                scale
            );


        annotationCanvas.height =
            Math.round(
                image.naturalHeight *
                scale
            );


        annotationCtx.clearRect(
            0,
            0,
            annotationCanvas.width,
            annotationCanvas.height
        );


        annotationCtx.drawImage(

            image,

            0,
            0,

            annotationCanvas.width,
            annotationCanvas.height

        );


        annotationHistory = [

            annotationCtx.getImageData(
                0,
                0,
                annotationCanvas.width,
                annotationCanvas.height
            )

        ];


        annotationModal.classList.add(
            "show"
        );

    };


    image.src =
        URL.createObjectURL(blob);

}


/* =========================================================
   OPEN ANNOTATION
========================================================= */

function openAnnotation() {

    const photo =
        currentPhotoList[
            currentPhotoIndex
        ];


    if (!photo) return;


    annotationOriginalBlob =
        photo.original;


    setupAnnotation(

        photo.marked ||
        photo.original

    );

}


/* =========================================================
   CLOSE ANNOTATION
========================================================= */

function closeAnnotation() {

    annotationModal.classList.remove(
        "show"
    );


    annotationDrawing = false;

}


/* =========================================================
   DRAW ARROW
========================================================= */

function drawArrow(
    x1,
    y1,
    x2,
    y2
) {

    const angle =
        Math.atan2(
            y2 - y1,
            x2 - x1
        );


    const length = 16;


    annotationCtx.beginPath();


    annotationCtx.moveTo(
        x2,
        y2
    );


    annotationCtx.lineTo(

        x2 -
            length *
            Math.cos(angle - 0.45),

        y2 -
            length *
            Math.sin(angle - 0.45)

    );


    annotationCtx.moveTo(
        x2,
        y2
    );


    annotationCtx.lineTo(

        x2 -
            length *
            Math.cos(angle + 0.45),

        y2 -
            length *
            Math.sin(angle + 0.45)

    );


    annotationCtx.stroke();

}


/* =========================================================
   BEGIN DRAW
========================================================= */

function beginDraw(event) {

    /*
       TEXT
    */

    if (annotationTool === "text") {

        const point =
            getCanvasPoint(event);


        const text =
            prompt(
                "Metni girin:"
            );


        if (text) {

            annotationCtx.font =
                "bold 22px Arial";

            annotationCtx.fillStyle =
                "#ff3b30";


            annotationCtx.fillText(

                text,

                point.x,
                point.y

            );


            saveCanvasHistory();

        }


        return;

    }


    if (
        annotationTool !== "pen" &&
        annotationTool !== "circle" &&
        annotationTool !== "arrow"
    ) {

        return;

    }


    annotationDrawing = true;


    const point =
        getCanvasPoint(event);


    annotationStartX =
        point.x;


    annotationStartY =
        point.y;


    annotationCtx.beginPath();


    annotationCtx.moveTo(
        point.x,
        point.y
    );


    annotationCtx.strokeStyle =
        "#ff3b30";


    annotationCtx.fillStyle =
        "#ff3b30";


    annotationCtx.lineWidth =
        Math.max(
            4,
            annotationCanvas.width / 250
        );


    annotationCtx.lineCap =
        "round";


    /*
       iPhone / iPad için
       pointer capture
    */

    if (
        annotationCanvas.setPointerCapture
    ) {

        annotationCanvas.setPointerCapture(
            event.pointerId
        );

    }

}


/* =========================================================
   DRAW / MOVE
========================================================= */

function moveDraw(event) {

    if (!annotationDrawing)
        return;


    const point =
        getCanvasPoint(event);


    /*
       PEN
    */

    if (
        annotationTool === "pen"
    ) {

        annotationCtx.lineTo(
            point.x,
            point.y
        );


        annotationCtx.stroke();

        return;

    }


    /*
       CIRCLE / ARROW

       Önce son kaydedilen görüntüyü
       geri getiriyoruz.
    */

    annotationCtx.clearRect(

        0,
        0,

        annotationCanvas.width,
        annotationCanvas.height

    );


    const last =
        annotationHistory[
            annotationHistory.length - 1
        ];


    if (last) {

        annotationCtx.putImageData(
            last,
            0,
            0
        );

    } else {

        annotationCtx.drawImage(

            annotationImage,

            0,
            0,

            annotationCanvas.width,
            annotationCanvas.height

        );

    }


    annotationCtx.beginPath();


    annotationCtx.strokeStyle =
        "#ff3b30";


    annotationCtx.lineWidth =
        Math.max(
            4,
            annotationCanvas.width / 250
        );


    /*
       CIRCLE
    */

    if (
        annotationTool === "circle"
    ) {

        const radiusX =
            (point.x -
                annotationStartX) / 2;


        const radiusY =
            (point.y -
                annotationStartY) / 2;


        annotationCtx.ellipse(

            annotationStartX +
                radiusX,

            annotationStartY +
                radiusY,

            Math.abs(radiusX),

            Math.abs(radiusY),

            0,

            0,

            Math.PI * 2

        );


        annotationCtx.stroke();

    }


    /*
       ARROW
    */

    else if (
        annotationTool === "arrow"
    ) {

        annotationCtx.moveTo(

            annotationStartX,
            annotationStartY

        );


        annotationCtx.lineTo(

            point.x,
            point.y

        );


        annotationCtx.stroke();


        drawArrow(

            annotationStartX,
            annotationStartY,

            point.x,
            point.y

        );

    }

}


/* =========================================================
   END DRAW
========================================================= */

function endDraw() {

    if (!annotationDrawing)
        return;


    annotationDrawing = false;


    saveCanvasHistory();

}


/* =========================================================
   SAVE MARKED PHOTO
========================================================= */

async function saveAnnotation() {

    const blob =
        await new Promise(resolve => {

            annotationCanvas.toBlob(

                resolve,

                "image/jpeg",

                0.92

            );

        });


    if (!blob) {

        alert(
            "Fotoğraf kaydedilemedi."
        );

        return;

    }


    /*
       Viewer içindeki geçici liste
       de güncelleniyor.
    */

    currentPhotoList[
        currentPhotoIndex
    ].marked = blob;


    /*
       IndexedDB'deki gerçek finding
       güncelleniyor.
    */

    const findings =
        await dbGetAll(
            FINDINGS_STORE
        );


    const finding =
        findings.find(
            item =>
                item.id === currentFindingId
        );


    if (!finding) {

        alert(
            "Finding bulunamadı."
        );

        return;

    }


    finding.photos =
        getFindingPhotos(finding);


    finding.photos[
        currentPhotoIndex
    ].marked = blob;


    await dbPut(
        FINDINGS_STORE,
        finding
    );


    /*
       Annotation ekranını kapat.
    */

    closeAnnotation();


    /*
       Viewer'ı yeni marked fotoğrafla
       göster.
    */

    renderPhotoViewer();


    photoModal.classList.add(
        "show"
    );


    renderPhotoViewer();


    /*
       Arka taraftaki finding ekranını
       da güncelle.
    */

    await showInspectionDetail(
        currentInspectionId
    );


    /*
       showInspectionDetail viewer'ı
       kapatmış olacağı için tekrar açıyoruz.
    */

    photoModal.classList.add(
        "show"
    );


    renderPhotoViewer();

}


/* =========================================================
   BUTTON EVENTS
========================================================= */


/* Inspection */

$("cancelInspection").onclick =
    closeInspectionModal;


$("saveInspection").onclick =
    saveInspection;


/* Finding */

$("cancelFinding").onclick =
    closeFindingModal;


$("saveFinding").onclick =
    saveFinding;


/* =========================================================
   CAMERA
========================================================= */

$("takePhotoBtn").onclick = () => {

    /*
       Camera input:

       capture="environment"

       multiple YOK.

       Böylece iPhone kamerada
       düzgün çalışır.
    */

    $("cameraInput").value = "";

    $("cameraInput").click();

};


/* =========================================================
   GALLERY
========================================================= */

$("choosePhotosBtn").onclick = () => {

    /*
       Gallery input:

       multiple VAR.

       iPhone'da galeriden birden fazla
       fotoğraf seçilebilir.
    */

    $("galleryInput").value = "";

    $("galleryInput").click();

};


/* =========================================================
   CAMERA RESULT
========================================================= */

$("cameraInput").onchange = event => {

    addPendingFiles(
        event.target.files
    );


    /*
       Aynı fotoğrafı tekrar seçebilmek için
       input'u temizliyoruz.
    */

    event.target.value = "";

};


/* =========================================================
   GALLERY RESULT
========================================================= */

$("galleryInput").onchange = event => {

    addPendingFiles(
        event.target.files
    );


    /*
       Aynı fotoğrafları tekrar seçebilmek için
       input'u temizliyoruz.
    */

    event.target.value = "";

};


/* =========================================================
   ADD PHOTOS TO EXISTING FINDING
========================================================= */

$("addPhotosInput").onchange =
    event => {

        addPhotosToFinding(
            event.target.files
        );


        event.target.value = "";

    };


/* =========================================================
   PHOTO VIEWER
========================================================= */

$("photoClose").onclick =
    closePhotoViewer;


$("photoPrev").onclick =
    () => nextPhoto(-1);


$("photoNext").onclick =
    () => nextPhoto(1);


$("annotatePhoto").onclick =
    openAnnotation;


/* =========================================================
   ANNOTATION CLOSE
========================================================= */

$("annotationClose").onclick =
    closeAnnotation;


/* =========================================================
   ANNOTATION TOOLS
========================================================= */

document
    .querySelectorAll(".tool-btn")
    .forEach(button => {

        button.onclick = () => {

            const tool =
                button.dataset.tool;


            /* UNDO */

            if (tool === "undo") {

                restoreHistory();

                return;

            }


            /* CLEAR */

            if (tool === "clear") {

                const confirmed =
                    confirm(
                        "Tüm işaretlemeler temizlensin mi?"
                    );


                if (!confirmed)
                    return;


                annotationCtx.clearRect(

                    0,
                    0,

                    annotationCanvas.width,
                    annotationCanvas.height

                );


                annotationCtx.drawImage(

                    annotationImage,

                    0,
                    0,

                    annotationCanvas.width,
                    annotationCanvas.height

                );


                annotationHistory = [

                    annotationCtx.getImageData(

                        0,
                        0,

                        annotationCanvas.width,
                        annotationCanvas.height

                    )

                ];


                return;

            }


            /* SAVE */

            if (tool === "save") {

                saveAnnotation();

                return;

            }


            /*
               PEN / CIRCLE / ARROW / TEXT
            */

            annotationTool =
                tool;


            document
                .querySelectorAll(".tool-btn")
                .forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                });


            button.classList.add(
                "active"
            );

        };

    });


/* =========================================================
   CANVAS POINTER EVENTS
========================================================= */

annotationCanvas.addEventListener(
    "pointerdown",
    beginDraw
);


annotationCanvas.addEventListener(
    "pointermove",
    moveDraw
);


annotationCanvas.addEventListener(
    "pointerup",
    endDraw
);


annotationCanvas.addEventListener(
    "pointercancel",
    endDraw
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape")
            return;


        if (
            annotationModal.classList.contains(
                "show"
            )
        ) {

            closeAnnotation();

            return;

        }


        if (
            photoModal.classList.contains(
                "show"
            )
        ) {

            closePhotoViewer();

        }

    }
);


/* =========================================================
   INIT
========================================================= */

window.addEventListener(
    "load",
    async () => {

        try {

            await openDatabase();

            await showInspectionList();

        }

        catch (error) {

            console.error(error);


            app.innerHTML = `

                <div class="card">

                    <div class="empty-state">

                        Database açılamadı.

                        <br><br>

                        ${escapeHtml(
                            error.message
                        )}

                    </div>

                </div>

            `;

        }

    }
);
