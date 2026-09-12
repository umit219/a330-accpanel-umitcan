/* =====================================================
   A330 INSPECTION RECORDER
   LOCAL ONLY
   IndexedDB
   MULTI PHOTO + PHOTO MARKING
===================================================== */


const DB_NAME = "A330InspectionDB";

const DB_VERSION = 2;

const INSPECTIONS_STORE = "inspections";

const FINDINGS_STORE = "findings";


let db = null;

let currentInspectionId = null;


/* =====================================================
   PHOTO VIEWER STATE
===================================================== */

let currentPhotoList = [];

let currentPhotoIndex = 0;

let currentFindingId = null;



/* =====================================================
   ANNOTATION STATE
===================================================== */

let annotationCanvas =
    document.getElementById(
        "annotationCanvas"
    );

let annotationCtx =
    annotationCanvas.getContext(
        "2d"
    );


let annotationTool = "pen";

let annotationDrawing = false;

let annotationStartX = 0;

let annotationStartY = 0;

let annotationImage = null;

let annotationHistory = [];

let annotationOriginalBlob = null;



/* =====================================================
   ELEMENTS
===================================================== */

const app =
    document.getElementById(
        "app"
    );


const inspectionModal =
    document.getElementById(
        "inspectionModal"
    );


const findingModal =
    document.getElementById(
        "findingModal"
    );


const aircraftInput =
    document.getElementById(
        "aircraftInput"
    );


const inspectionType =
    document.getElementById(
        "inspectionType"
    );


const findingLocation =
    document.getElementById(
        "findingLocation"
    );


const findingText =
    document.getElementById(
        "findingText"
    );


const findingPhoto =
    document.getElementById(
        "findingPhoto"
    );


const photoModal =
    document.getElementById(
        "photoModal"
    );


const photoPreview =
    document.getElementById(
        "photoPreview"
    );


const photoCounter =
    document.getElementById(
        "photoCounter"
    );


const annotationModal =
    document.getElementById(
        "annotationModal"
    );



/* =====================================================
   DATABASE
===================================================== */

function openDatabase() {

    return new Promise(
        (resolve, reject) => {

            const request =
                indexedDB.open(
                    DB_NAME,
                    DB_VERSION
                );


            request.onupgradeneeded =
                function(event) {

                    const database =
                        event.target.result;


                    /*
                     * Existing inspections store
                     */

                    if (
                        !database
                            .objectStoreNames
                            .contains(
                                INSPECTIONS_STORE
                            )
                    ) {

                        const inspections =
                            database.createObjectStore(
                                INSPECTIONS_STORE,
                                {
                                    keyPath: "id"
                                }
                            );


                        inspections.createIndex(
                            "createdAt",
                            "createdAt"
                        );

                    }


                    /*
                     * Existing findings store
                     */

                    if (
                        !database
                            .objectStoreNames
                            .contains(
                                FINDINGS_STORE
                            )
                    ) {

                        const findings =
                            database.createObjectStore(
                                FINDINGS_STORE,
                                {
                                    keyPath: "id"
                                }
                            );


                        findings.createIndex(
                            "inspectionId",
                            "inspectionId"
                        );


                        findings.createIndex(
                            "createdAt",
                            "createdAt"
                        );

                    }


                    /*
                     * IMPORTANT:
                     *
                     * DB v1'de:
                     *
                     * photo: Blob
                     *
                     * vardı.
                     *
                     * Yeni sistem:
                     *
                     * photos: [
                     *   {
                     *      id,
                     *      original,
                     *      marked
                     *   }
                     * ]
                     *
                     * kullanıyor.
                     */


                    if (
                        event.oldVersion < 2
                    ) {

                        const transaction =
                            event.target.transaction;


                        const store =
                            transaction.objectStore(
                                FINDINGS_STORE
                            );


                        store.getAll().onsuccess =
                            function(e) {

                                const findings =
                                    e.target.result;


                                findings.forEach(
                                    finding => {

                                        /*
                                         * Eski tek
                                         * fotoğrafı
                                         * yeni yapıya
                                         * taşı.
                                         */

                                        if (
                                            finding.photo &&
                                            !finding.photos
                                        ) {

                                            finding.photos = [

                                                {

                                                    id:
                                                        createId(),

                                                    original:
                                                        finding.photo,

                                                    marked:
                                                        null

                                                }

                                            ];


                                            delete finding.photo;


                                            store.put(
                                                finding
                                            );

                                        }


                                        /*
                                         * Fotoğrafı olmayan
                                         * eski finding.
                                         */

                                        if (
                                            !finding.photos
                                        ) {

                                            finding.photos = [];

                                            store.put(
                                                finding
                                            );

                                        }

                                    }
                                );

                            };

                    }

                };


            request.onsuccess =
                function(event) {

                    db =
                        event.target.result;


                    resolve(db);

                };


            request.onerror =
                function() {

                    reject(
                        request.error
                    );

                };

        }
    );

}



/* =====================================================
   DB HELPERS
===================================================== */

function dbPut(
    storeName,
    data
) {

    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    storeName,
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    storeName
                );


            const request =
                store.put(data);


            request.onsuccess =
                () => resolve(data);


            request.onerror =
                () => reject(
                    request.error
                );

        }
    );

}



function dbGetAll(
    storeName
) {

    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    storeName,
                    "readonly"
                );


            const store =
                transaction.objectStore(
                    storeName
                );


            const request =
                store.getAll();


            request.onsuccess =
                () => resolve(
                    request.result
                );


            request.onerror =
                () => reject(
                    request.error
                );

        }
    );

}



function dbDelete(
    storeName,
    id
) {

    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    storeName,
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    storeName
                );


            const request =
                store.delete(id);


            request.onsuccess =
                () => resolve();


            request.onerror =
                () => reject(
                    request.error
                );

        }
    );

}



/* =====================================================
   ID
===================================================== */

function createId() {

    if (
        typeof crypto !== "undefined" &&
        crypto.randomUUID
    ) {

        return crypto.randomUUID();

    }


    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2)
    );

}



/* =====================================================
   DATE
===================================================== */

function formatDate(
    timestamp
) {

    return new Intl.DateTimeFormat(
        "tr-TR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    ).format(
        new Date(timestamp)
    );

}



/* =====================================================
   ESCAPE
===================================================== */

function escapeHtml(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}



/* =====================================================
   OPEN INSPECTION MODAL
===================================================== */

function openInspectionModal() {

    aircraftInput.value = "";

    inspectionType.value =
        "Landing Gear Inspection";


    inspectionModal.classList.add(
        "show"
    );


    setTimeout(
        () =>
            aircraftInput.focus(),
        100
    );

}



function closeInspectionModal() {

    inspectionModal.classList.remove(
        "show"
    );

}



/* =====================================================
   OPEN FINDING MODAL
===================================================== */

function openFindingModal() {

    findingLocation.value = "";

    findingText.value = "";

    findingPhoto.value = "";


    findingModal.classList.add(
        "show"
    );


    setTimeout(
        () =>
            findingLocation.focus(),
        100
    );

}



function closeFindingModal() {

    findingModal.classList.remove(
        "show"
    );

}



/* =====================================================
   CREATE INSPECTION
===================================================== */

async function createInspection() {

    const aircraft =
        aircraftInput.value.trim();


    if (!aircraft) {

        alert(
            "Lütfen uçak registration bilgisini girin."
        );

        aircraftInput.focus();

        return;

    }


    const inspection = {

        id:
            createId(),

        aircraft:
            aircraft,

        type:
            inspectionType.value,

        createdAt:
            Date.now()

    };


    try {

        await dbPut(
            INSPECTIONS_STORE,
            inspection
        );


        closeInspectionModal();


        await showInspectionList();

    }

    catch(error) {

        console.error(error);

        alert(
            "Inspection kaydedilemedi."
        );

    }

}



/* =====================================================
   INSPECTION LIST
===================================================== */

async function showInspectionList() {

    currentInspectionId = null;


    const inspections =
        await dbGetAll(
            INSPECTIONS_STORE
        );


    const findings =
        await dbGetAll(
            FINDINGS_STORE
        );


    inspections.sort(
        (a, b) =>
            b.createdAt -
            a.createdAt
    );


    const findingCounts = {};


    findings.forEach(
        finding => {

            findingCounts[
                finding.inspectionId
            ] =
                (
                    findingCounts[
                        finding.inspectionId
                    ] || 0
                ) + 1;

        }
    );


    let html = `

        <button
            id="newInspectionBtn"
            class="primary-btn"
            type="button"
        >
            + NEW INSPECTION
        </button>

        <div style="height:14px;"></div>

    `;


    if (!inspections.length) {

        html += `

            <div class="card">

                <div class="empty-state">

                    Henüz inspection kaydı yok.

                    <br><br>

                    İlk inspection'ı oluşturup
                    bulgularını fotoğraflarıyla
                    birlikte kaydedebilirsin.

                </div>

            </div>

        `;

    }


    inspections.forEach(
        inspection => {

            const count =
                findingCounts[
                    inspection.id
                ] || 0;


            html += `

                <div
                    class="card inspection-card"
                    data-id="${inspection.id}"
                >

                    <div
                        class="inspection-card-title"
                    >
                        ${escapeHtml(
                            inspection.type
                        )}
                    </div>


                    <div
                        class="inspection-card-sub"
                    >

                        ✈️
                        ${escapeHtml(
                            inspection.aircraft
                        )}

                        <br>

                        ${formatDate(
                            inspection.createdAt
                        )}

                    </div>


                    <div
                        class="inspection-card-footer"
                    >

                        <span>

                            ${count}

                            ${
                                count === 1
                                    ? "Finding"
                                    : "Findings"
                            }

                        </span>


                        <span
                            class="finding-count"
                        >
                            OPEN →
                        </span>

                    </div>

                </div>

            `;

        }
    );


    app.innerHTML = html;


    document
        .getElementById(
            "newInspectionBtn"
        )
        .addEventListener(
            "click",
            openInspectionModal
        );


    document
        .querySelectorAll(
            ".inspection-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () =>
                    showInspectionDetail(
                        card.dataset.id
                    )
            );

        });

}



/* =====================================================
   GET FINDING PHOTOS
===================================================== */

function getFindingPhotos(
    finding
) {

    /*
     * Yeni sistem.
     */

    if (
        Array.isArray(
            finding.photos
        )
    ) {

        return finding.photos;

    }


    /*
     * Güvenlik için eski
     * sistem desteği.
     */

    if (finding.photo) {

        return [

            {

                id:
                    "legacy-" +
                    finding.id,

                original:
                    finding.photo,

                marked:
                    null

            }

        ];

    }


    return [];

}



/* =====================================================
   INSPECTION DETAIL
===================================================== */

async function showInspectionDetail(
    inspectionId
) {

    currentInspectionId =
        inspectionId;


    const inspections =
        await dbGetAll(
            INSPECTIONS_STORE
        );


    const inspection =
        inspections.find(
            item =>
                item.id ===
                inspectionId
        );


    if (!inspection) {

        await showInspectionList();

        return;

    }


    const findings =
        await dbGetAll(
            FINDINGS_STORE
        );


    const inspectionFindings =
        findings

            .filter(
                finding =>
                    finding.inspectionId ===
                    inspectionId
            )

            .sort(
                (a, b) =>
                    a.createdAt -
                    b.createdAt
            );


    let html = `

        <button
            id="detailBack"
            class="detail-back"
            type="button"
        >
            ← Inspection Listesi
        </button>


        <div class="card">

            <div class="detail-header">

                <div>

                    <div class="detail-title">

                        ${escapeHtml(
                            inspection.type
                        )}

                    </div>


                    <div class="detail-meta">

                        ✈️
                        ${escapeHtml(
                            inspection.aircraft
                        )}

                        <br>

                        ${formatDate(
                            inspection.createdAt
                        )}

                    </div>

                </div>


                <button
                    id="deleteInspection"
                    class="danger-btn"
                    type="button"
                >
                    DELETE
                </button>

            </div>


            <button
                id="addFindingBtn"
                class="primary-btn add-finding"
                type="button"
            >
                + ADD FINDING
            </button>

        </div>

    `;


    if (!inspectionFindings.length) {

        html += `

            <div class="card">

                <div class="empty-state">

                    Bu inspection için henüz
                    bulgu eklenmedi.

                    <br><br>

                    <strong>
                        + ADD FINDING
                    </strong>

                    ile ilk bulguyu ekleyebilirsin.

                </div>

            </div>

        `;

    }


    inspectionFindings.forEach(
        (finding, index) => {

            const photos =
                getFindingPhotos(
                    finding
                );


            html += `

                <div
                    class="finding-card"
                    data-finding-card="${finding.id}"
                >


                    <div
                        class="finding-main"
                    >

                        <div
                            class="finding-number"
                        >
                            FINDING #${index + 1}
                        </div>


                        <div
                            class="finding-location"
                        >
                            ${escapeHtml(
                                finding.location
                            )}
                        </div>


                        <div
                            class="finding-text"
                        >
                            ${escapeHtml(
                                finding.text
                            )}
                        </div>


                        <div
                            class="finding-arrow"
                        >
                            ▼
                        </div>

                    </div>


                    <div
                        class="finding-expand"
                    >

                        <div
                            class="finding-divider"
                        ></div>

            `;


            if (photos.length) {

                html += `

                    <div class="photo-gallery">

                `;


                photos.forEach(
                    (photo, photoIndex) => {

                        const blob =
                            photo.marked ||
                            photo.original;


                        const url =
                            URL.createObjectURL(
                                blob
                            );


                        html += `

                            <div
                                class="gallery-photo-wrap"
                            >

                                <img
                                    class="gallery-photo"
                                    src="${url}"
                                    data-photo-url="${url}"
                                    data-finding-id="${finding.id}"
                                    data-photo-index="${photoIndex}"
                                    alt="Finding photo"
                                >


                                <span
                                    class="photo-number"
                                >
                                    ${photoIndex + 1}
                                </span>


                                ${
                                    photo.marked
                                        ? `
                                            <span
                                                class="marked-badge"
                                            >
                                                MARKED
                                            </span>
                                          `
                                        : ""
                                }

                            </div>

                        `;

                    }
                );


                html += `

                    </div>

                `;

            }

            else {

                html += `

                    <div class="no-photo">

                        📷 Fotoğraf eklenmemiş

                    </div>

                `;

            }


            html += `

                        <div
                            class="finding-footer"
                        >

                            <span
                                class="finding-date"
                            >
                                ${formatDate(
                                    finding.createdAt
                                )}
                            </span>


                            <button
                                class="delete-finding"
                                type="button"
                                data-finding-id="${finding.id}"
                            >
                                DELETE
                            </button>

                        </div>

                    </div>

                </div>

            `;

        }
    );


    app.innerHTML = html;



    /* =================================================
       BACK
    ================================================= */

    document
        .getElementById(
            "detailBack"
        )
        .addEventListener(
            "click",
            showInspectionList
        );



    /* =================================================
       ADD FINDING
    ================================================= */

    document
        .getElementById(
            "addFindingBtn"
        )
        .addEventListener(
            "click",
            event => {

                event.stopPropagation();

                openFindingModal();

            }
        );



    /* =================================================
       DELETE INSPECTION
    ================================================= */

    document
        .getElementById(
            "deleteInspection"
        )
        .addEventListener(
            "click",
            event => {

                event.stopPropagation();

                deleteInspection(
                    inspection.id
                );

            }
        );



    /* =================================================
       FINDING OPEN / CLOSE
    ================================================= */

    document
        .querySelectorAll(
            ".finding-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".delete-finding"
                        ) ||
                        event.target.closest(
                            ".gallery-photo"
                        )
                    ) {

                        return;

                    }


                    card.classList.toggle(
                        "expanded"
                    );

                }
            );

        });



    /* =================================================
       DELETE FINDING
    ================================================= */

    document
        .querySelectorAll(
            ".delete-finding"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async event => {

                    event.stopPropagation();


                    await deleteFinding(
                        button.dataset
                            .findingId
                    );

                }
            );

        });



    /* =================================================
       PHOTO CLICK
    ================================================= */

    document
        .querySelectorAll(
            ".gallery-photo"
        )
        .forEach(image => {

            image.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    openPhotoViewer(
                        image.dataset.findingId,
                        Number(
                            image.dataset.photoIndex
                        )
                    );

                }
            );

        });

}



/* =====================================================
   CREATE FINDING
===================================================== */

async function createFinding() {

    if (!currentInspectionId) {

        return;

    }


    const location =
        findingLocation.value.trim();


    const text =
        findingText.value.trim();


    if (!location) {

        alert(
            "Lütfen bulgunun bulunduğu yeri girin."
        );

        findingLocation.focus();

        return;

    }


    if (!text) {

        alert(
            "Lütfen bulguyu yazın."
        );

        findingText.focus();

        return;

    }


    const photos = [];


    if (
        findingPhoto.files &&
        findingPhoto.files.length
    ) {

        for (
            const file
            of findingPhoto.files
        ) {

            photos.push({

                id:
                    createId(),

                original:
                    file,

                marked:
                    null

            });

        }

    }


    const finding = {

        id:
            createId(),

        inspectionId:
            currentInspectionId,

        location:
            location,

        text:
            text,

        photos:
            photos,

        createdAt:
            Date.now()

    };


    try {

        await dbPut(
            FINDINGS_STORE,
            finding
        );


        closeFindingModal();


        await showInspectionDetail(
            currentInspectionId
        );

    }

    catch(error) {

        console.error(error);

        alert(
            "Bulgu kaydedilemedi."
        );

    }

}



/* =====================================================
   DELETE FINDING
===================================================== */

async function deleteFinding(
    findingId
) {

    const confirmed =
        confirm(
            "Bu bulgu ve tüm fotoğrafları silinsin mi?"
        );


    if (!confirmed) {

        return;

    }


    try {

        await dbDelete(
            FINDINGS_STORE,
            findingId
        );


        await showInspectionDetail(
            currentInspectionId
        );

    }

    catch(error) {

        console.error(error);

        alert(
            "Bulgu silinemedi."
        );

    }

}



/* =====================================================
   DELETE INSPECTION
===================================================== */

async function deleteInspection(
    inspectionId
) {

    const confirmed =
        confirm(
            "Bu inspection ve içindeki TÜM bulgular/fotoğraflar silinsin mi?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const findings =
            await dbGetAll(
                FINDINGS_STORE
            );


        const relatedFindings =
            findings.filter(
                finding =>
                    finding.inspectionId ===
                    inspectionId
            );


        for (
            const finding
            of relatedFindings
        ) {

            await dbDelete(
                FINDINGS_STORE,
                finding.id
            );

        }


        await dbDelete(
            INSPECTIONS_STORE,
            inspectionId
        );


        await showInspectionList();

    }

    catch(error) {

        console.error(error);

        alert(
            "Inspection silinemedi."
        );

    }

}



/* =====================================================
   PHOTO VIEWER
===================================================== */

async function openPhotoViewer(
    findingId,
    photoIndex
) {

    const findings =
        await dbGetAll(
            FINDINGS_STORE
        );


    const finding =
        findings.find(
            item =>
                item.id ===
                findingId
        );


    if (!finding) {

        return;

    }


    const photos =
        getFindingPhotos(
            finding
        );


    if (!photos.length) {

        return;

    }


    currentFindingId =
        findingId;


    currentPhotoList =
        photos;


    currentPhotoIndex =
        Math.max(
            0,
            Math.min(
                photoIndex,
                photos.length - 1
            )
        );


    renderCurrentPhoto();


    photoModal.classList.add(
        "show"
    );

}



function renderCurrentPhoto() {

    if (
        !currentPhotoList.length
    ) {

        return;

    }


    const photo =
        currentPhotoList[
            currentPhotoIndex
        ];


    const blob =
        photo.marked ||
        photo.original;


    if (!blob) {

        return;

    }


    /*
     * Önceki URL'yi temizle.
     */

    if (
        photoPreview.dataset.objectUrl
    ) {

        URL.revokeObjectURL(
            photoPreview.dataset.objectUrl
        );

    }


    const url =
        URL.createObjectURL(
            blob
        );


    photoPreview.dataset.objectUrl =
        url;


    photoPreview.src =
        url;


    photoCounter.textContent =
        `${currentPhotoIndex + 1} / ${currentPhotoList.length}`;

}



function closePhoto() {

    photoModal.classList.remove(
        "show"
    );


    if (
        photoPreview.dataset.objectUrl
    ) {

        URL.revokeObjectURL(
            photoPreview.dataset.objectUrl
        );

    }


    photoPreview.dataset.objectUrl =
        "";


    photoPreview.src =
        "";


    currentPhotoList =
        [];

    currentPhotoIndex =
        0;

}



function previousPhoto() {

    if (
        currentPhotoList.length <= 1
    ) {

        return;

    }


    currentPhotoIndex--;

    if (
        currentPhotoIndex < 0
    ) {

        currentPhotoIndex =
            currentPhotoList.length - 1;

    }


    renderCurrentPhoto();

}



function nextPhoto() {

    if (
        currentPhotoList.length <= 1
    ) {

        return;

    }


    currentPhotoIndex++;


    if (
        currentPhotoIndex >=
        currentPhotoList.length
    ) {

        currentPhotoIndex = 0;

    }


    renderCurrentPhoto();

}



/* =====================================================
   ANNOTATION
===================================================== */

async function openAnnotation() {

    if (
        !currentPhotoList.length
    ) {

        return;

    }


    const photo =
        currentPhotoList[
            currentPhotoIndex
        ];


    /*
     * Marking her zaman
     * orijinal fotoğraf
     * üzerinden başlar.
     *
     * Böylece orijinal
     * bozulmaz.
     */

    annotationOriginalBlob =
        photo.original;


    const url =
        URL.createObjectURL(
            annotationOriginalBlob
        );


    const image =
        new Image();


    image.onload =
        function() {

            annotationImage =
                image;


            setupAnnotationCanvas(
                image
            );


            URL.revokeObjectURL(
                url
            );


            annotationModal.classList.add(
                "show"
            );

        };


    image.src =
        url;

}



function setupAnnotationCanvas(
    image
) {

    const maxWidth =
        window.innerWidth;


    const maxHeight =
        window.innerHeight - 130;


    const scale =
        Math.min(
            maxWidth / image.naturalWidth,
            maxHeight / image.naturalHeight,
            1
        );


    annotationCanvas.width =
        Math.round(
            image.naturalWidth * scale
        );


    annotationCanvas.height =
        Math.round(
            image.naturalHeight * scale
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


    annotationHistory = [];


    saveAnnotationSnapshot();

}



function saveAnnotationSnapshot() {

    try {

        annotationHistory.push(
            annotationCtx.getImageData(
                0,
                0,
                annotationCanvas.width,
                annotationCanvas.height
            )
        );


        /*
         * Son 20 adımı tut.
         */

        if (
            annotationHistory.length >
            20
        ) {

            annotationHistory.shift();

        }

    }

    catch(error) {

        console.error(error);

    }

}



/* =====================================================
   CANVAS COORDINATES
===================================================== */

function getCanvasPoint(
    event
) {

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
            (event.clientX -
                rect.left) *
            scaleX,

        y:
            (event.clientY -
                rect.top) *
            scaleY

    };

}



/* =====================================================
   ANNOTATION DRAWING
===================================================== */

annotationCanvas.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();


        const point =
            getCanvasPoint(
                event
            );


        annotationStartX =
            point.x;


        annotationStartY =
            point.y;


        /*
         * TEXT
         */

        if (
            annotationTool ===
            "text"
        ) {

            const text =
                prompt(
                    "Fotoğraf üzerine yazılacak metin:"
                );


            if (
                text &&
                text.trim()
            ) {

                drawText(
                    text.trim(),
                    point.x,
                    point.y
                );


                saveAnnotationSnapshot();

            }


            return;

        }


        annotationDrawing =
            true;


        annotationCanvas.setPointerCapture(
            event.pointerId
        );


        /*
         * PEN başlangıcı
         */

        if (
            annotationTool ===
            "pen"
        ) {

            annotationCtx.beginPath();

            annotationCtx.moveTo(
                point.x,
                point.y
            );

        }

    }
);



annotationCanvas.addEventListener(
    "pointermove",
    event => {

        if (
            !annotationDrawing
        ) {

            return;

        }


        event.preventDefault();


        const point =
            getCanvasPoint(
                event
            );


        /*
         * PEN
         */

        if (
            annotationTool ===
            "pen"
        ) {

            annotationCtx.lineTo(
                point.x,
                point.y
            );


            annotationCtx.stroke();

        }

    }
);



annotationCanvas.addEventListener(
    "pointerup",
    finishAnnotation
);


annotationCanvas.addEventListener(
    "pointercancel",
    finishAnnotation
);


function finishAnnotation(
    event
) {

    if (
        !annotationDrawing
    ) {

        return;

    }


    annotationDrawing =
        false;


    const point =
        getCanvasPoint(
            event
        );


    /*
     * PEN
     */

    if (
        annotationTool ===
        "pen"
    ) {

        annotationCtx.closePath();

        saveAnnotationSnapshot();

        return;

    }


    /*
     * CIRCLE
     */

    if (
        annotationTool ===
        "circle"
    ) {

        drawCircle(
            annotationStartX,
            annotationStartY,
            point.x,
            point.y
        );


        saveAnnotationSnapshot();

        return;

    }


    /*
     * ARROW
     */

    if (
        annotationTool ===
        "arrow"
    ) {

        drawArrow(
            annotationStartX,
            annotationStartY,
            point.x,
            point.y
        );


        saveAnnotationSnapshot();

    }

}



/* =====================================================
   DRAW STYLE
===================================================== */

function prepareDrawingStyle() {

    annotationCtx.strokeStyle =
        "#ff3030";


    annotationCtx.fillStyle =
        "#ff3030";


    annotationCtx.lineWidth =
        Math.max(
            3,
            annotationCanvas.width /
            300
        );


    annotationCtx.lineCap =
        "round";


    annotationCtx.lineJoin =
        "round";

}



/* =====================================================
   PEN STYLE
===================================================== */

prepareDrawingStyle();



/* =====================================================
   CIRCLE
===================================================== */

function drawCircle(
    startX,
    startY,
    endX,
    endY
) {

    prepareDrawingStyle();


    const centerX =
        (startX + endX) / 2;


    const centerY =
        (startY + endY) / 2;


    const radiusX =
        Math.abs(
            endX - startX
        ) / 2;


    const radiusY =
        Math.abs(
            endY - startY
        ) / 2;


    annotationCtx.beginPath();


    annotationCtx.ellipse(
        centerX,
        centerY,
        Math.max(
            radiusX,
            5
        ),
        Math.max(
            radiusY,
            5
        ),
        0,
        0,
        Math.PI * 2
    );


    annotationCtx.stroke();

}



/* =====================================================
   ARROW
===================================================== */

function drawArrow(
    startX,
    startY,
    endX,
    endY
) {

    prepareDrawingStyle();


    const headLength =
        Math.max(
            12,
            annotationCanvas.width /
            35
        );


    const angle =
        Math.atan2(
            endY - startY,
            endX - startX
        );


    annotationCtx.beginPath();


    annotationCtx.moveTo(
        startX,
        startY
    );


    annotationCtx.lineTo(
        endX,
        endY
    );


    annotationCtx.stroke();


    annotationCtx.beginPath();


    annotationCtx.moveTo(
        endX,
        endY
    );


    annotationCtx.lineTo(
        endX -
        headLength *
        Math.cos(
            angle - Math.PI / 6
        ),
        endY -
        headLength *
        Math.sin(
            angle - Math.PI / 6
        )
    );


    annotationCtx.lineTo(
        endX -
        headLength *
        Math.cos(
            angle + Math.PI / 6
        ),
        endY -
        headLength *
        Math.sin(
            angle + Math.PI / 6
        )
    );


    annotationCtx.closePath();


    annotationCtx.fill();

}



/* =====================================================
   TEXT
===================================================== */

function drawText(
    text,
    x,
    y
) {

    prepareDrawingStyle();


    const fontSize =
        Math.max(
            18,
            annotationCanvas.width /
            28
        );


    annotationCtx.font =
        `700 ${fontSize}px Inter, Arial, sans-serif`;


    /*
     * Siyah outline.
     * Kırmızı yazı.
     */

    annotationCtx.lineWidth =
        Math.max(
            3,
            fontSize / 7
        );


    annotationCtx.strokeStyle =
        "#000";


    annotationCtx.strokeText(
        text,
        x,
        y
    );


    annotationCtx.fillStyle =
        "#ff3030";


    annotationCtx.fillText(
        text,
        x,
        y
    );


    prepareDrawingStyle();

}



/* =====================================================
   TOOL SELECT
===================================================== */

document
    .querySelectorAll(
        ".tool-btn[data-tool]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    annotationTool =
                        button.dataset.tool;


                    document
                        .querySelectorAll(
                            ".tool-btn[data-tool]"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );



/* =====================================================
   UNDO
===================================================== */

document
    .getElementById(
        "undoAnnotation"
    )
    .addEventListener(
        "click",
        () => {

            if (
                annotationHistory.length <=
                1
            ) {

                return;

            }


            /*
             * Son snapshot'u çıkar.
             */

            annotationHistory.pop();


            const previous =
                annotationHistory[
                    annotationHistory.length - 1
                ];


            annotationCtx.putImageData(
                previous,
                0,
                0
            );

        }
    );



/* =====================================================
   CLEAR
===================================================== */

document
    .getElementById(
        "clearAnnotation"
    )
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Tüm işaretlemeler temizlensin mi?"
                );


            if (!confirmed) {

                return;

            }


            setupAnnotationCanvas(
                annotationImage
            );

        }
    );



/* =====================================================
   SAVE ANNOTATION
===================================================== */

document
    .getElementById(
        "saveAnnotation"
    )
    .addEventListener(
        "click",
        async () => {

            try {

                const blob =
                    await canvasToBlob();


                await saveMarkedPhoto(
                    blob
                );


                closeAnnotation();


                await refreshCurrentFinding();


                alert(
                    "İşaretlenmiş fotoğraf kaydedildi."
                );

            }

            catch(error) {

                console.error(error);

                alert(
                    "Fotoğraf kaydedilemedi."
                );

            }

        }
    );



/* =====================================================
   CANVAS TO BLOB
===================================================== */

function canvasToBlob() {

    return new Promise(
        (resolve, reject) => {

            annotationCanvas.toBlob(
                blob => {

                    if (blob) {

                        resolve(blob);

                    }

                    else {

                        reject(
                            new Error(
                                "Canvas blob oluşturulamadı."
                            )
                        );

                    }

                },
                "image/jpeg",
                0.92
            );

        }
    );

}



/* =====================================================
   SAVE MARKED PHOTO
===================================================== */

async function saveMarkedPhoto(
    markedBlob
) {

    const findings =
        await dbGetAll(
            FINDINGS_STORE
        );


    const finding =
        findings.find(
            item =>
                item.id ===
                currentFindingId
        );


    if (!finding) {

        throw new Error(
            "Finding bulunamadı."
        );

    }


    const photos =
        getFindingPhotos(
            finding
        );


    if (
        !photos[currentPhotoIndex]
    ) {

        throw new Error(
            "Fotoğraf bulunamadı."
        );

    }


    /*
     * Orijinal fotoğraf
     * kesinlikle korunuyor.
     */

    photos[
        currentPhotoIndex
    ].marked =
        markedBlob;


    finding.photos =
        photos;


    /*
     * Eski alanı temizle.
     */

    delete finding.photo;


    await dbPut(
        FINDINGS_STORE,
        finding
    );


    currentPhotoList =
        photos;

}



/* =====================================================
   REFRESH CURRENT FINDING
===================================================== */

async function refreshCurrentFinding() {

    const findings =
        await dbGetAll(
            FINDINGS_STORE
        );


    const finding =
        findings.find(
            item =>
                item.id ===
                currentFindingId
        );


    if (!finding) {

        return;

    }


    currentPhotoList =
        getFindingPhotos(
            finding
        );


    renderCurrentPhoto();


    /*
     * Detail ekranını da
     * yenile ama photo modalı
     * kapatma.
     */

    await showInspectionDetail(
        currentInspectionId
    );


    /*
     * showInspectionDetail
     * app'i yeniden oluşturduğu
     * için photo modalını tekrar
     * açıyoruz.
     */

    photoModal.classList.add(
        "show"
    );


    renderCurrentPhoto();

}



/* =====================================================
   CLOSE ANNOTATION
===================================================== */

function closeAnnotation() {

    annotationModal.classList.remove(
        "show"
    );


    annotationDrawing =
        false;

}



/* =====================================================
   PHOTO CONTROLS
===================================================== */

document
    .getElementById(
        "photoClose"
    )
    .addEventListener(
        "click",
        closePhoto
    );


document
    .getElementById(
        "photoPrev"
    )
    .addEventListener(
        "click",
        previousPhoto
    );


document
    .getElementById(
        "photoNext"
    )
    .addEventListener(
        "click",
        nextPhoto
    );


document
    .getElementById(
        "annotatePhoto"
    )
    .addEventListener(
        "click",
        openAnnotation
    );


document
    .getElementById(
        "annotationClose"
    )
    .addEventListener(
        "click",
        closeAnnotation
    );



/* =====================================================
   PHOTO MODAL BACKGROUND
===================================================== */

photoModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            photoModal
        ) {

            closePhoto();

        }

    }
);



/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            photoModal.classList.contains(
                "show"
            ) &&
            !annotationModal.classList.contains(
                "show"
            )
        ) {

            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousPhoto();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextPhoto();

            }


            if (
                event.key ===
                "Escape"
            ) {

                closePhoto();

            }

        }


        if (
            annotationModal.classList.contains(
                "show"
            )
        ) {

            if (
                event.key ===
                "Escape"
            ) {

                closeAnnotation();

            }

        }

    }
);



/* =====================================================
   FORM BUTTONS
===================================================== */

document
    .getElementById(
        "saveInspection"
    )
    .addEventListener(
        "click",
        createInspection
    );


document
    .getElementById(
        "cancelInspection"
    )
    .addEventListener(
        "click",
        closeInspectionModal
    );


document
    .getElementById(
        "saveFinding"
    )
    .addEventListener(
        "click",
        createFinding
    );


document
    .getElementById(
        "cancelFinding"
    )
    .addEventListener(
        "click",
        closeFindingModal
    );



/* =====================================================
   MODAL BACKGROUND
===================================================== */

inspectionModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            inspectionModal
        ) {

            closeInspectionModal();

        }

    }
);


findingModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            findingModal
        ) {

            closeFindingModal();

        }

    }
);



/* =====================================================
   PHOTO SWIPE
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


photoModal.addEventListener(
    "touchstart",
    event => {

        if (
            annotationModal.classList.contains(
                "show"
            )
        ) {

            return;

        }


        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


photoModal.addEventListener(
    "touchend",
    event => {

        if (
            annotationModal.classList.contains(
                "show"
            )
        ) {

            return;

        }


        touchEndX =
            event.changedTouches[0].screenX;


        const difference =
            touchEndX -
            touchStartX;


        if (
            Math.abs(difference) <
            50
        ) {

            return;

        }


        if (
            difference > 0
        ) {

            previousPhoto();

        }

        else {

            nextPhoto();

        }

    },
    {
        passive: true
    }
);



/* =====================================================
   INIT
===================================================== */

async function init() {

    try {

        await openDatabase();

        await showInspectionList();

    }

    catch(error) {

        console.error(error);


        app.innerHTML = `

            <div class="card">

                <div class="empty-state">

                    Inspection storage
                    başlatılamadı.

                    <br><br>

                    Tarayıcının IndexedDB
                    desteğini kontrol edin.

                </div>

            </div>

        `;

    }

}


init();
