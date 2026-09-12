/* =========================================================
   A330 INSPECTION RECORDER
   LOCAL ONLY
   IndexedDB
   MULTI PHOTO
   PHOTO ANNOTATION
   QUICK FINDING TEMPLATES
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
   QUICK FINDING TEMPLATES
========================================================= */

const findingTemplates = [

    /* =====================================================
       GENERAL
    ===================================================== */

    {
        category: "GENERAL",
        location: "General",
        text: "One screw is missing."
    },

    {
        category: "GENERAL",
        location: "General",
        text: "One screw is loose."
    },

    {
        category: "GENERAL",
        location: "General",
        text: "Loose hardware was found."
    },

    {
        category: "GENERAL",
        location: "General",
        text: "Damaged component was found."
    },

    {
        category: "GENERAL",
        location: "General",
        text: "Crack was found."
    },

    {
        category: "GENERAL",
        location: "General",
        text: "Seal is missing."
    },

    {
        category: "GENERAL",
        location: "General",
        text: "Seal is damaged."
    },

    {
        category: "GENERAL",
        location: "General",
        text: "Component is damaged."
    },


    /* =====================================================
       DOORS / PANELS
    ===================================================== */

    {
        category: "DOORS / PANELS",
        location: "Door",
        text: "One screw is missing."
    },

    {
        category: "DOORS / PANELS",
        location: "Door",
        text: "One screw is loose."
    },

    {
        category: "DOORS / PANELS",
        location: "Door",
        text: "Seal is damaged."
    },

    {
        category: "DOORS / PANELS",
        location: "Door",
        text: "Seal is missing."
    },

    {
        category: "DOORS / PANELS",
        location: "Door",
        text: "Panel is damaged."
    },

    {
        category: "DOORS / PANELS",
        location: "Panel",
        text: "One screw is missing."
    },

    {
        category: "DOORS / PANELS",
        location: "Panel",
        text: "One screw is loose."
    },

    {
        category: "DOORS / PANELS",
        location: "Panel",
        text: "Panel is damaged."
    },

    {
        category: "DOORS / PANELS",
        location: "Access Panel",
        text: "One fastener is missing."
    },

    {
        category: "DOORS / PANELS",
        location: "Access Panel",
        text: "One fastener is loose."
    },


    /* =====================================================
       CARGO
    ===================================================== */

    {
        category: "CARGO",
        location: "Cargo Door",
        text: "Seal is damaged."
    },

    {
        category: "CARGO",
        location: "Cargo Door",
        text: "Seal is missing."
    },

    {
        category: "CARGO",
        location: "Cargo Door",
        text: "Panel is damaged."
    },

    {
        category: "CARGO",
        location: "Cargo Compartment",
        text: "Liner is damaged."
    },

    {
        category: "CARGO",
        location: "Cargo Compartment",
        text: "Floor panel is damaged."
    },

    {
        category: "CARGO",
        location: "Cargo Compartment",
        text: "Fastener is missing."
    },

    {
        category: "CARGO",
        location: "Cargo Compartment",
        text: "Fastener is loose."
    },

    {
        category: "CARGO",
        location: "Cargo Compartment",
        text: "Water staining was found."
    },


    /* =====================================================
       LANDING GEAR
    ===================================================== */

    {
        category: "LANDING GEAR",
        location: "Landing Gear",
        text: "Component is damaged."
    },

    {
        category: "LANDING GEAR",
        location: "Landing Gear",
        text: "Crack was found."
    },

    {
        category: "LANDING GEAR",
        location: "Landing Gear",
        text: "Leak was found."
    },

    {
        category: "LANDING GEAR",
        location: "Landing Gear",
        text: "Hydraulic leak was found."
    },

    {
        category: "LANDING GEAR",
        location: "Landing Gear",
        text: "Grease leakage was found."
    },

    {
        category: "LANDING GEAR",
        location: "Landing Gear",
        text: "Hardware is loose."
    },

    {
        category: "LANDING GEAR",
        location: "Landing Gear",
        text: "Hardware is missing."
    },

    {
        category: "LANDING GEAR",
        location: "Landing Gear",
        text: "Corrosion was found."
    },


    /* =====================================================
       FLIGHT CONTROLS
    ===================================================== */

    {
        category: "FLIGHT CONTROLS",
        location: "Elevator",
        text: "Surface is damaged."
    },

    {
        category: "FLIGHT CONTROLS",
        location: "Elevator",
        text: "Crack was found."
    },

    {
        category: "FLIGHT CONTROLS",
        location: "Elevator",
        text: "Seal is damaged."
    },

    {
        category: "FLIGHT CONTROLS",
        location: "Aileron",
        text: "Surface is damaged."
    },

    {
        category: "FLIGHT CONTROLS",
        location: "Aileron",
        text: "Crack was found."
    },

    {
        category: "FLIGHT CONTROLS",
        location: "Rudder",
        text: "Surface is damaged."
    },

    {
        category: "FLIGHT CONTROLS",
        location: "Rudder",
        text: "Crack was found."
    },

    {
        category: "FLIGHT CONTROLS",
        location: "THS",
        text: "Component is damaged."
    },

    {
        category: "FLIGHT CONTROLS",
        location: "THS",
        text: "Crack was found."
    },


    /* =====================================================
       ENGINE / NACELLE
    ===================================================== */

    {
        category: "ENGINE / NACELLE",
        location: "Engine",
        text: "Oil leak was found."
    },

    {
        category: "ENGINE / NACELLE",
        location: "Engine",
        text: "Fuel leak was found."
    },

    {
        category: "ENGINE / NACELLE",
        location: "Engine",
        text: "Hydraulic leak was found."
    },

    {
        category: "ENGINE / NACELLE",
        location: "Nacelle",
        text: "Panel is damaged."
    },

    {
        category: "ENGINE / NACELLE",
        location: "Nacelle",
        text: "One fastener is missing."
    },

    {
        category: "ENGINE / NACELLE",
        location: "Nacelle",
        text: "One fastener is loose."
    },

    {
        category: "ENGINE / NACELLE",
        location: "Fan Cowl",
        text: "Panel is damaged."
    },

    {
        category: "ENGINE / NACELLE",
        location: "Fan Cowl",
        text: "Fastener is missing."
    },


    /* =====================================================
       LIGHTING
    ===================================================== */

    {
        category: "LIGHTING",
        location: "Navigation Light",
        text: "Lens is damaged."
    },

    {
        category: "LIGHTING",
        location: "Navigation Light",
        text: "Light is not functioning."
    },

    {
        category: "LIGHTING",
        location: "Strobe Light",
        text: "Lens is damaged."
    },

    {
        category: "LIGHTING",
        location: "Strobe Light",
        text: "Light is not functioning."
    },

    {
        category: "LIGHTING",
        location: "Landing Light",
        text: "Lens is damaged."
    },

    {
        category: "LIGHTING",
        location: "Landing Light",
        text: "Light is not functioning."
    },


    /* =====================================================
       ELECTRICAL
    ===================================================== */

    {
        category: "ELECTRICAL",
        location: "Electrical Panel",
        text: "Circuit breaker is tripped."
    },

    {
        category: "ELECTRICAL",
        location: "Electrical Panel",
        text: "Circuit breaker cap is missing."
    },

    {
        category: "ELECTRICAL",
        location: "Electrical Panel",
        text: "Component is damaged."
    },

    {
        category: "ELECTRICAL",
        location: "Wiring",
        text: "Wire is damaged."
    },

    {
        category: "ELECTRICAL",
        location: "Wiring",
        text: "Bonding jumper is broken."
    },

    {
        category: "ELECTRICAL",
        location: "Wiring",
        text: "Bonding jumper is damaged."
    },


    /* =====================================================
       CABIN
    ===================================================== */

    {
        category: "CABIN",
        location: "Cabin",
        text: "Panel is damaged."
    },

    {
        category: "CABIN",
        location: "Cabin",
        text: "Trim is damaged."
    },

    {
        category: "CABIN",
        location: "Cabin",
        text: "Seat is damaged."
    },

    {
        category: "CABIN",
        location: "Overhead Bin",
        text: "Panel is damaged."
    },

    {
        category: "CABIN",
        location: "Overhead Bin",
        text: "Latch is damaged."
    },

    {
        category: "CABIN",
        location: "Lavatory",
        text: "Seal is damaged."
    },

    {
        category: "CABIN",
        location: "Lavatory",
        text: "Panel is damaged."
    },


    /* =====================================================
       EXTERIOR
    ===================================================== */

    {
        category: "EXTERIOR",
        location: "Fuselage",
        text: "Surface damage was found."
    },

    {
        category: "EXTERIOR",
        location: "Fuselage",
        text: "Dent was found."
    },

    {
        category: "EXTERIOR",
        location: "Fuselage",
        text: "Scratch was found."
    },

    {
        category: "EXTERIOR",
        location: "Fuselage",
        text: "Crack was found."
    },

    {
        category: "EXTERIOR",
        location: "Wing",
        text: "Surface damage was found."
    },

    {
        category: "EXTERIOR",
        location: "Wing",
        text: "Scratch was found."
    },

    {
        category: "EXTERIOR",
        location: "Wing",
        text: "Dent was found."
    },

    {
        category: "EXTERIOR",
        location: "Fairing",
        text: "Fairing is damaged."
    },

    {
        category: "EXTERIOR",
        location: "Fairing",
        text: "Fastener is missing."
    },


    /* =====================================================
       LEAK / DAMAGE
    ===================================================== */

    {
        category: "LEAK / DAMAGE",
        location: "Component",
        text: "Oil leak was found."
    },

    {
        category: "LEAK / DAMAGE",
        location: "Component",
        text: "Fuel leak was found."
    },

    {
        category: "LEAK / DAMAGE",
        location: "Component",
        text: "Hydraulic leak was found."
    },

    {
        category: "LEAK / DAMAGE",
        location: "Component",
        text: "Water leak was found."
    },

    {
        category: "LEAK / DAMAGE",
        location: "Component",
        text: "Crack was found."
    },

    {
        category: "LEAK / DAMAGE",
        location: "Component",
        text: "Corrosion was found."
    },

    {
        category: "LEAK / DAMAGE",
        location: "Component",
        text: "Dent was found."
    },

    {
        category: "LEAK / DAMAGE",
        location: "Component",
        text: "Scratch was found."
    },


    /* =====================================================
       HARDWARE
    ===================================================== */

    {
        category: "HARDWARE",
        location: "Component",
        text: "One screw is missing."
    },

    {
        category: "HARDWARE",
        location: "Component",
        text: "One screw is loose."
    },

    {
        category: "HARDWARE",
        location: "Component",
        text: "One bolt is missing."
    },

    {
        category: "HARDWARE",
        location: "Component",
        text: "One bolt is loose."
    },

    {
        category: "HARDWARE",
        location: "Component",
        text: "One nut is missing."
    },

    {
        category: "HARDWARE",
        location: "Component",
        text: "One nut is loose."
    },

    {
        category: "HARDWARE",
        location: "Component",
        text: "Fastener is missing."
    },

    {
        category: "HARDWARE",
        location: "Component",
        text: "Fastener is loose."
    },

    {
        category: "HARDWARE",
        location: "Component",
        text: "Washer is missing."
    }

];


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

            if (!database.objectStoreNames.contains(INSPECTIONS_STORE)) {

                database.createObjectStore(
                    INSPECTIONS_STORE,
                    {
                        keyPath: "id"
                    }
                );

            }


            if (!database.objectStoreNames.contains(FINDINGS_STORE)) {

                database.createObjectStore(
                    FINDINGS_STORE,
                    {
                        keyPath: "id"
                    }
                );

            }


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


                    <div class="finding-expand">

                        <div class="finding-divider"></div>


                        <div class="photo-gallery">

                            ${photoHtml}

                        </div>


                        <div style="margin-top:10px">

                            <button
                                class="add-photos-btn add-photos"
                                data-id="${escapeHtml(finding.id)}"
                                type="button">

                                ＋ ADD PHOTOS

                            </button>

                        </div>


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


    $("detailBack").onclick =
        showInspectionList;


    $("addFindingBtn").onclick =
        openFindingModal;


    $("deleteInspection").onclick =
        () => deleteInspection(id);


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
   QUICK TEMPLATE MODAL
========================================================= */

function openTemplateModal() {

    const modal =
        $("templateModal");

    const search =
        $("templateSearch");


    if (!modal) return;


    renderTemplateList(
        ""
    );


    modal.classList.add(
        "show"
    );


    setTimeout(() => {

        if (search) {

            search.value = "";

            search.focus();

        }

    }, 100);

}


function closeTemplateModal() {

    const modal =
        $("templateModal");


    if (!modal) return;


    modal.classList.remove(
        "show"
    );

}


function renderTemplateList(searchTerm = "") {

    const container =
        $("templateList");


    if (!container) return;


    const term =
        searchTerm
            .trim()
            .toLowerCase();


    const categories = [];


    findingTemplates.forEach(template => {

        if (
            term &&
            !(
                template.category.toLowerCase().includes(term) ||
                template.location.toLowerCase().includes(term) ||
                template.text.toLowerCase().includes(term)
            )
        ) {

            return;

        }


        if (
            !categories.includes(
                template.category
            )
        ) {

            categories.push(
                template.category
            );

        }

    });


    if (!categories.length) {

        container.innerHTML = `

            <div class="template-empty">

                No templates found.

            </div>

        `;

        return;

    }


    container.innerHTML =
        categories.map(category => {

            const items =
                findingTemplates.filter(
                    template => {

                        if (
                            template.category !==
                            category
                        ) {

                            return false;

                        }


                        if (!term)
                            return true;


                        return (

                            template.category
                                .toLowerCase()
                                .includes(term)

                            ||

                            template.location
                                .toLowerCase()
                                .includes(term)

                            ||

                            template.text
                                .toLowerCase()
                                .includes(term)

                        );

                    }
                );


            return `

                <div class="template-category">

                    <div class="template-category-title">

                        ${escapeHtml(category)}

                    </div>


                    <div class="template-list">

                        ${
                            items.map(
                                (template, index) => {

                                    const originalIndex =
                                        findingTemplates.indexOf(
                                            template
                                        );


                                    return `

                                        <button
                                            class="template-item"
                                            data-template-index="${originalIndex}"
                                            type="button">

                                            <strong>
                                                ${escapeHtml(
                                                    template.location
                                                )}
                                            </strong>

                                            <br>

                                            ${escapeHtml(
                                                template.text
                                            )}

                                        </button>

                                    `;

                                }
                            ).join("")
                        }

                    </div>

                </div>

            `;

        }).join("");


    document
        .querySelectorAll(".template-item")
        .forEach(button => {

            button.onclick = () => {

                const index =
                    Number(
                        button.dataset.templateIndex
                    );


                const template =
                    findingTemplates[index];


                if (!template)
                    return;


                findingLocation.value =
                    template.location;


                findingText.value =
                    template.text;


                closeTemplateModal();


                findingText.focus();

            };

        });

}


/* =========================================================
   TEMPLATE EVENTS
========================================================= */

const quickTemplateBtn =
    $("quickTemplateBtn");


if (quickTemplateBtn) {

    quickTemplateBtn.onclick =
        openTemplateModal;

}


const templateClose =
    $("templateClose");


if (templateClose) {

    templateClose.onclick =
        closeTemplateModal;

}


const templateSearch =
    $("templateSearch");


if (templateSearch) {

    templateSearch.addEventListener(
        "input",
        () => {

            renderTemplateList(
                templateSearch.value
            );

        }
    );

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


    if (!info || !gallery)
        return;


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


    currentPhotoList[
        currentPhotoIndex
    ].marked = blob;


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


    closeAnnotation();


    renderPhotoViewer();


    photoModal.classList.add(
        "show"
    );


    await showInspectionDetail(
        currentInspectionId
    );


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

    $("cameraInput").value = "";

    $("cameraInput").click();

};


/* =========================================================
   GALLERY
========================================================= */

$("choosePhotosBtn").onclick = () => {

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


    event.target.value = "";

};


/* =========================================================
   GALLERY RESULT
========================================================= */

$("galleryInput").onchange = event => {

    addPendingFiles(
        event.target.files
    );


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


            if (tool === "undo") {

                restoreHistory();

                return;

            }


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


            if (tool === "save") {

                saveAnnotation();

                return;

            }


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
            $("templateModal") &&
            $("templateModal").classList.contains("show")
        ) {

            closeTemplateModal();

            return;

        }


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
