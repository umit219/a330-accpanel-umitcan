/* =====================================================
   A330 INSPECTION NOTES
   Local-only IndexedDB storage
===================================================== */


const DB_NAME = "A330InspectionDB";
const DB_VERSION = 1;

const INSPECTIONS_STORE = "inspections";
const FINDINGS_STORE = "findings";

let db = null;

let currentInspectionId = null;


/* =====================================================
   ELEMENTS
===================================================== */

const app =
    document.getElementById("app");

const inspectionModal =
    document.getElementById("inspectionModal");

const findingModal =
    document.getElementById("findingModal");

const aircraftInput =
    document.getElementById("aircraftInput");

const inspectionType =
    document.getElementById("inspectionType");

const findingLocation =
    document.getElementById("findingLocation");

const findingText =
    document.getElementById("findingText");

const findingPhoto =
    document.getElementById("findingPhoto");

const photoModal =
    document.getElementById("photoModal");

const photoPreview =
    document.getElementById("photoPreview");



/* =====================================================
   DATABASE
===================================================== */

function openDatabase() {

    return new Promise((resolve, reject) => {

        const request =
            indexedDB.open(
                DB_NAME,
                DB_VERSION
            );


        request.onupgradeneeded = function(event) {

            const database =
                event.target.result;


            if (
                !database.objectStoreNames.contains(
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


            if (
                !database.objectStoreNames.contains(
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

        };


        request.onsuccess = function(event) {

            db =
                event.target.result;

            resolve(db);

        };


        request.onerror = function() {

            reject(
                request.error
            );

        };

    });

}



/* =====================================================
   GENERIC DB HELPERS
===================================================== */

function dbPut(storeName, data) {

    return new Promise((resolve, reject) => {

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
            () => reject(request.error);

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
            transaction.objectStore(
                storeName
            );

        const request =
            store.getAll();


        request.onsuccess =
            () => resolve(request.result);

        request.onerror =
            () => reject(request.error);

    });

}


function dbDelete(storeName, id) {

    return new Promise((resolve, reject) => {

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
            () => reject(request.error);

    });

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
        Math.random().toString(36).slice(2)
    );

}



/* =====================================================
   DATE
===================================================== */

function formatDate(timestamp) {

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
   MODALS
===================================================== */

function openInspectionModal() {

    aircraftInput.value = "";

    inspectionType.value =
        "Landing Gear Inspection";

    inspectionModal.classList.add(
        "show"
    );

    setTimeout(
        () => aircraftInput.focus(),
        100
    );

}


function closeInspectionModal() {

    inspectionModal.classList.remove(
        "show"
    );

}


function openFindingModal() {

    findingLocation.value = "";

    findingText.value = "";

    findingPhoto.value = "";

    findingModal.classList.add(
        "show"
    );

    setTimeout(
        () => findingLocation.focus(),
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

        id: createId(),

        aircraft: aircraft,

        type: inspectionType.value,

        createdAt: Date.now()

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
   LIST INSPECTIONS
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
                () => {

                    showInspectionDetail(
                        card.dataset.id
                    );

                }
            );

        });

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

            html += `

                <div
                    class="finding-card"
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

            `;


            if (finding.photo) {

                const photoUrl =
                    URL.createObjectURL(
                        finding.photo
                    );


                html += `

                    <img
                        class="finding-photo"
                        src="${photoUrl}"
                        data-photo-url="${photoUrl}"
                        alt="Finding photo"
                    >

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

            `;

        }
    );


    app.innerHTML = html;


    /* BACK */

    document
        .getElementById(
            "detailBack"
        )
        .addEventListener(
            "click",
            showInspectionList
        );


    /* ADD FINDING */

    document
        .getElementById(
            "addFindingBtn"
        )
        .addEventListener(
            "click",
            openFindingModal
        );


    /* DELETE INSPECTION */

    document
        .getElementById(
            "deleteInspection"
        )
        .addEventListener(
            "click",
            () => deleteInspection(
                inspection.id
            )
        );


    /* DELETE FINDINGS */

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
                        button.dataset.findingId
                    );

                }
            );

        });


    /* PHOTO CLICK */

    document
        .querySelectorAll(
            ".finding-photo"
        )
        .forEach(image => {

            image.addEventListener(
                "click",
                () => {

                    photoPreview.src =
                        image.src;

                    photoModal.classList.add(
                        "show"
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


    let photo = null;


    if (
        findingPhoto.files &&
        findingPhoto.files[0]
    ) {

        photo =
            findingPhoto.files[0];

    }


    const finding = {

        id: createId(),

        inspectionId:
            currentInspectionId,

        location: location,

        text: text,

        photo: photo,

        createdAt: Date.now()

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
            "Bulgu kaydedilemedi. Tarayıcı depolama alanını kontrol edin."
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
            "Bu bulgu ve fotoğrafı silinsin mi?"
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
   ESCAPE HTML
===================================================== */

function escapeHtml(value) {

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
   PHOTO CLOSE
===================================================== */

document
    .getElementById(
        "photoClose"
    )
    .addEventListener(
        "click",
        () => {

            photoModal.classList.remove(
                "show"
            );

            photoPreview.src = "";

        }
    );


photoModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            photoModal
        ) {

            photoModal.classList.remove(
                "show"
            );

            photoPreview.src = "";

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
   MODAL BACKGROUND CLOSE
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

                    Tarayıcı IndexedDB desteğini
                    kontrol edin.

                </div>

            </div>

        `;

    }

}


init();