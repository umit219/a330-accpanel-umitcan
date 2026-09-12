/* =========================================================
   A330 DOCUMENT SCANNER
   LOCAL ONLY
   INDEXEDDB
   CAMERA
   GALLERY
   MULTI PAGE
   CROP
   ROTATE
   GRAYSCALE
   PDF PRINT
========================================================= */

const SCANNER_DB_NAME = "A330DocumentScannerDB";
const SCANNER_DB_VERSION = 1;
const DOCUMENT_STORE = "documents";

let scannerDB = null;

let currentImage = null;
let currentOriginalImage = null;

let currentRotation = 0;
let currentGrayscale = false;

let currentDocumentId = null;

let currentEditorMode = null;

let cropStartX = 0;
let cropStartY = 0;
let cropActive = false;


/* =========================================================
   DOM
========================================================= */

const cameraBtn =
    document.getElementById("cameraBtn");

const galleryBtn =
    document.getElementById("galleryBtn");

const cameraInput =
    document.getElementById("cameraInput");

const galleryInput =
    document.getElementById("galleryInput");

const documentsList =
    document.getElementById("documentsList");

const editorModal =
    document.getElementById("editorModal");

const editorImage =
    document.getElementById("editorImage");

const editorImageWrap =
    document.getElementById("editorImageWrap");

const cropBox =
    document.getElementById("cropBox");

const cropTool =
    document.getElementById("cropTool");

const rotateTool =
    document.getElementById("rotateTool");

const grayTool =
    document.getElementById("grayTool");

const resetTool =
    document.getElementById("resetTool");

const savePage =
    document.getElementById("savePage");

const closeEditor =
    document.getElementById("closeEditor");

const viewerModal =
    document.getElementById("viewerModal");

const viewerPages =
    document.getElementById("viewerPages");

const viewerTitle =
    document.getElementById("viewerTitle");

const closeViewer =
    document.getElementById("closeViewer");

const addPageBtn =
    document.getElementById("addPageBtn");

const printPdfBtn =
    document.getElementById("printPdfBtn");

const deleteDocumentBtn =
    document.getElementById("deleteDocumentBtn");

const nameModal =
    document.getElementById("nameModal");

const documentName =
    document.getElementById("documentName");

const cancelName =
    document.getElementById("cancelName");

const saveDocumentName =
    document.getElementById("saveDocumentName");


/* =========================================================
   DATABASE
========================================================= */

function openScannerDB() {

    return new Promise((resolve, reject) => {

        const request =
            indexedDB.open(
                SCANNER_DB_NAME,
                SCANNER_DB_VERSION
            );


        request.onupgradeneeded = function(event) {

            const db =
                event.target.result;


            if (!db.objectStoreNames.contains(DOCUMENT_STORE)) {

                db.createObjectStore(
                    DOCUMENT_STORE,
                    {
                        keyPath: "id"
                    }
                );

            }

        };


        request.onsuccess = function(event) {

            scannerDB =
                event.target.result;

            scannerDB.onversionchange =
                function() {
                    scannerDB.close();
                };

            resolve(scannerDB);

        };


        request.onerror = function() {

            reject(
                request.error
            );

        };

    });

}


/* =========================================================
   DB HELPERS
========================================================= */

function dbPutDocument(document) {

    return new Promise((resolve, reject) => {

        const tx =
            scannerDB.transaction(
                DOCUMENT_STORE,
                "readwrite"
            );

        const store =
            tx.objectStore(
                DOCUMENT_STORE
            );

        const request =
            store.put(document);


        request.onsuccess =
            () => resolve(document);


        request.onerror =
            () => reject(request.error);

    });

}


function dbGetAllDocuments() {

    return new Promise((resolve, reject) => {

        const tx =
            scannerDB.transaction(
                DOCUMENT_STORE,
                "readonly"
            );

        const store =
            tx.objectStore(
                DOCUMENT_STORE
            );

        const request =
            store.getAll();


        request.onsuccess =
            () => resolve(request.result || []);


        request.onerror =
            () => reject(request.error);

    });

}


function dbGetDocument(id) {

    return new Promise((resolve, reject) => {

        const tx =
            scannerDB.transaction(
                DOCUMENT_STORE,
                "readonly"
            );

        const request =
            tx.objectStore(
                DOCUMENT_STORE
            ).get(id);


        request.onsuccess =
            () => resolve(request.result);


        request.onerror =
            () => reject(request.error);

    });

}


function dbDeleteDocument(id) {

    return new Promise((resolve, reject) => {

        const tx =
            scannerDB.transaction(
                DOCUMENT_STORE,
                "readwrite"
            );

        const request =
            tx.objectStore(
                DOCUMENT_STORE
            ).delete(id);


        request.onsuccess =
            () => resolve();


        request.onerror =
            () => reject(request.error);

    });

}


/* =========================================================
   UTILS
========================================================= */

function uid(prefix = "doc") {

    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .slice(2, 9)
    );

}


function formatDate(timestamp) {

    return new Date(timestamp)
        .toLocaleString(
            "tr-TR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


/* =========================================================
   IMAGE FILE → DATA URL
========================================================= */

function fileToDataURL(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();


        reader.onload =
            () => resolve(reader.result);


        reader.onerror =
            () => reject(reader.error);


        reader.readAsDataURL(file);

    });

}


/* =========================================================
   OPEN IMAGE EDITOR
========================================================= */

function openEditor(dataUrl) {

    currentOriginalImage =
        dataUrl;

    currentImage =
        dataUrl;

    currentRotation = 0;

    currentGrayscale = false;

    cropBox.style.display =
        "none";

    currentEditorMode =
        null;

    editorImage.src =
        dataUrl;

    editorModal.classList.add("show");

}


/* =========================================================
   CLOSE EDITOR
========================================================= */

function closeEditorModal() {

    editorModal.classList.remove(
        "show"
    );

    currentEditorMode = null;

    cropBox.style.display =
        "none";

}


/* =========================================================
   LOAD IMAGE TO CANVAS
========================================================= */

function imageToCanvas(
    dataUrl,
    rotation = 0,
    grayscale = false
) {

    return new Promise((resolve, reject) => {

        const img =
            new Image();


        img.onload =
            function() {

                let width =
                    img.naturalWidth;

                let height =
                    img.naturalHeight;


                const rotated =
                    Math.abs(rotation) % 180 !== 0;


                if (rotated) {

                    [width, height] =
                        [height, width];

                }


                const canvas =
                    document.createElement(
                        "canvas"
                    );


                canvas.width =
                    width;

                canvas.height =
                    height;


                const ctx =
                    canvas.getContext(
                        "2d"
                    );


                ctx.save();


                ctx.translate(
                    width / 2,
                    height / 2
                );


                ctx.rotate(
                    rotation *
                    Math.PI /
                    180
                );


                ctx.drawImage(
                    img,
                    -img.naturalWidth / 2,
                    -img.naturalHeight / 2
                );


                ctx.restore();


                if (grayscale) {

                    const imageData =
                        ctx.getImageData(
                            0,
                            0,
                            width,
                            height
                        );


                    const data =
                        imageData.data;


                    for (
                        let i = 0;
                        i < data.length;
                        i += 4
                    ) {

                        const gray =
                            (
                                data[i] * 0.299 +
                                data[i + 1] * 0.587 +
                                data[i + 2] * 0.114
                            );

                        data[i] =
                            gray;

                        data[i + 1] =
                            gray;

                        data[i + 2] =
                            gray;

                    }


                    ctx.putImageData(
                        imageData,
                        0,
                        0
                    );

                }


                resolve(canvas);

            };


        img.onerror =
            reject;


        img.src =
            dataUrl;

    });

}


/* =========================================================
   APPLY CURRENT EDITS
========================================================= */

async function renderCurrentImage() {

    const canvas =
        await imageToCanvas(
            currentOriginalImage,
            currentRotation,
            currentGrayscale
        );


    currentImage =
        canvas.toDataURL(
            "image/jpeg",
            0.90
        );


    editorImage.src =
        currentImage;

}


/* =========================================================
   ROTATE
========================================================= */

rotateTool.addEventListener(
    "click",
    async function() {

        currentRotation += 90;

        if (
            currentRotation >= 360
        ) {
            currentRotation = 0;
        }

        await renderCurrentImage();

    }
);


/* =========================================================
   GRAYSCALE
========================================================= */

grayTool.addEventListener(
    "click",
    async function() {

        currentGrayscale =
            !currentGrayscale;

        grayTool.classList.toggle(
            "active",
            currentGrayscale
        );

        await renderCurrentImage();

    }
);


/* =========================================================
   RESET
========================================================= */

resetTool.addEventListener(
    "click",
    function() {

        currentImage =
            currentOriginalImage;

        currentRotation = 0;

        currentGrayscale = false;

        grayTool.classList.remove(
            "active"
        );

        cropBox.style.display =
            "none";

        editorImage.src =
            currentOriginalImage;

    }
);


/* =========================================================
   CROP
========================================================= */

cropTool.addEventListener(
    "click",
    function() {

        currentEditorMode =
            "crop";

        cropTool.classList.toggle(
            "active"
        );


        if (
            cropTool.classList.contains(
                "active"
            )
        ) {

            const rect =
                editorImage.getBoundingClientRect();


            const parentRect =
                editorImageWrap.getBoundingClientRect();


            cropBox.style.display =
                "block";


            cropBox.style.left =
                (
                    rect.left -
                    parentRect.left +
                    rect.width * 0.08
                ) + "px";


            cropBox.style.top =
                (
                    rect.top -
                    parentRect.top +
                    rect.height * 0.08
                ) + "px";


            cropBox.style.width =
                (
                    rect.width * 0.84
                ) + "px";


            cropBox.style.height =
                (
                    rect.height * 0.84
                ) + "px";

        }
        else {

            cropBox.style.display =
                "none";

            currentEditorMode =
                null;

        }

    }
);


/* =========================================================
   CROP DRAG
========================================================= */

cropBox.addEventListener(
    "pointerdown",
    function(event) {

        if (
            currentEditorMode !==
            "crop"
        ) {
            return;
        }


        event.preventDefault();


        cropActive = true;


        const boxRect =
            cropBox.getBoundingClientRect();


        cropStartX =
            event.clientX -
            boxRect.left;


        cropStartY =
            event.clientY -
            boxRect.top;


        cropBox.setPointerCapture(
            event.pointerId
        );

    }
);


cropBox.addEventListener(
    "pointermove",
    function(event) {

        if (!cropActive) {
            return;
        }


        const parentRect =
            editorImageWrap.getBoundingClientRect();


        const imageRect =
            editorImage.getBoundingClientRect();


        let left =
            event.clientX -
            parentRect.left -
            cropStartX;


        let top =
            event.clientY -
            parentRect.top -
            cropStartY;


        const maxLeft =
            imageRect.right -
            parentRect.left -
            cropBox.offsetWidth;


        const maxTop =
            imageRect.bottom -
            parentRect.top -
            cropBox.offsetHeight;


        left =
            Math.max(
                imageRect.left -
                parentRect.left,
                Math.min(
                    left,
                    maxLeft
                )
            );


        top =
            Math.max(
                imageRect.top -
                parentRect.top,
                Math.min(
                    top,
                    maxTop
                )
            );


        cropBox.style.left =
            left + "px";

        cropBox.style.top =
            top + "px";

    }
);


cropBox.addEventListener(
    "pointerup",
    function() {

        cropActive = false;

    }
);


/* =========================================================
   APPLY CROP
========================================================= */

async function applyCrop() {

    if (
        cropBox.style.display ===
        "none"
    ) {
        return;
    }


    const img =
        new Image();


    await new Promise(
        (resolve, reject) => {

            img.onload =
                resolve;

            img.onerror =
                reject;

            img.src =
                currentImage;

        }
    );


    const imageRect =
        editorImage.getBoundingClientRect();


    const cropRect =
        cropBox.getBoundingClientRect();


    const scaleX =
        img.naturalWidth /
        imageRect.width;


    const scaleY =
        img.naturalHeight /
        imageRect.height;


    let sx =
        (
            cropRect.left -
            imageRect.left
        ) * scaleX;


    let sy =
        (
            cropRect.top -
            imageRect.top
        ) * scaleY;


    let sw =
        cropRect.width *
        scaleX;


    let sh =
        cropRect.height *
        scaleY;


    sx =
        Math.max(
            0,
            sx
        );

    sy =
        Math.max(
            0,
            sy
        );


    sw =
        Math.min(
            sw,
            img.naturalWidth - sx
        );


    sh =
        Math.min(
            sh,
            img.naturalHeight - sy
        );


    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        Math.max(
            1,
            Math.round(sw)
        );


    canvas.height =
        Math.max(
            1,
            Math.round(sh)
        );


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.drawImage(
        img,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        canvas.width,
        canvas.height
    );


    currentImage =
        canvas.toDataURL(
            "image/jpeg",
            0.90
        );


    currentOriginalImage =
        currentImage;


    currentRotation = 0;


    editorImage.src =
        currentImage;


    cropBox.style.display =
        "none";


    cropTool.classList.remove(
        "active"
    );


    currentEditorMode =
        null;

}


/* =========================================================
   SAVE PAGE
========================================================= */

savePage.addEventListener(
    "click",
    async function() {

        try {

            if (
                currentEditorMode ===
                "crop"
            ) {

                await applyCrop();

            }


            const page =
                currentImage;


            closeEditorModal();


            await addPageToCurrentDocument(
                page
            );

        }
        catch (error) {

            console.error(
                error
            );

            alert(
                "Sayfa kaydedilemedi."
            );

        }

    }
);


/* =========================================================
   CLOSE EDITOR
========================================================= */

closeEditor.addEventListener(
    "click",
    closeEditorModal
);


/* =========================================================
   CAMERA
========================================================= */

cameraBtn.addEventListener(
    "click",
    function() {

        cameraInput.value =
            "";

        cameraInput.click();

    }
);


/* =========================================================
   GALLERY
========================================================= */

galleryBtn.addEventListener(
    "click",
    function() {

        galleryInput.value =
            "";

        galleryInput.click();

    }
);


/* =========================================================
   CAMERA RESULT
========================================================= */

cameraInput.addEventListener(
    "change",
    async function() {

        if (
            !this.files ||
            !this.files.length
        ) {
            return;
        }


        const file =
            this.files[0];


        try {

            const dataUrl =
                await fileToDataURL(
                    file
                );


            openEditor(
                dataUrl
            );

        }
        catch (error) {

            console.error(
                error
            );

            alert(
                "Fotoğraf açılamadı."
            );

        }

    }
);


/* =========================================================
   GALLERY RESULT
========================================================= */

galleryInput.addEventListener(
    "change",
    async function() {

        if (
            !this.files ||
            !this.files.length
        ) {
            return;
        }


        const files =
            Array.from(
                this.files
            );


        for (
            const file of files
        ) {

            try {

                const dataUrl =
                    await fileToDataURL(
                        file
                    );


                await createDocumentWithPage(
                    dataUrl
                );

            }
            catch (error) {

                console.error(
                    error
                );

            }

        }


        await renderDocuments();

    }
);


/* =========================================================
   CREATE DOCUMENT
========================================================= */

async function createDocumentWithPage(
    page
) {

    const id =
        uid("document");


    const document = {

        id: id,

        name:
            "New Document",

        createdAt:
            Date.now(),

        updatedAt:
            Date.now(),

        pages: [
            page
        ]

    };


    await dbPutDocument(
        document
    );


    currentDocumentId =
        id;


    return document;

}


/* =========================================================
   ADD PAGE
========================================================= */

async function addPageToCurrentDocument(
    page
) {

    if (
        currentDocumentId
    ) {

        const document =
            await dbGetDocument(
                currentDocumentId
            );


        if (!document) {
            return;
        }


        document.pages.push(
            page
        );


        document.updatedAt =
            Date.now();


        await dbPutDocument(
            document
        );


        await renderViewer(
            document
        );


        return;

    }


    await createDocumentWithPage(
        page
    );


    await renderDocuments();

}


/* =========================================================
   OPEN NEW PAGE
========================================================= */

addPageBtn.addEventListener(
    "click",
    function() {

        currentDocumentId =
            currentDocumentId;

        cameraInput.value =
            "";

        cameraInput.click();

    }
);


/* =========================================================
   RENDER DOCUMENT LIST
========================================================= */

async function renderDocuments() {

    const documents =
        await dbGetAllDocuments();


    documents.sort(
        (a, b) =>
            b.updatedAt -
            a.updatedAt
    );


    documentsList.innerHTML =
        "";


    if (
        !documents.length
    ) {

        documentsList.innerHTML = `
            <div class="empty-state">
                Henüz kayıtlı belge yok.
            </div>
        `;

        return;

    }


    documents.forEach(
        document => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "document-card";


            const img =
                document.createElement(
                    "img"
                );


            img.className =
                "document-thumb";


            img.src =
                document.pages[0];


            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "document-info";


            info.innerHTML = `

                <div class="document-name">
                    ${escapeHtml(
                        document.name
                    )}
                </div>

                <div class="document-meta">
                    ${document.pages.length}
                    page${document.pages.length > 1 ? "s" : ""}
                    ·
                    ${formatDate(
                        document.updatedAt
                    )}
                </div>

            `;


            const buttons =
                document.createElement(
                    "div"
                );


            buttons.className =
                "document-buttons";


            const open =
                document.createElement(
                    "button"
                );


            open.className =
                "small-btn";

            open.textContent =
                "↗";


            open.title =
                "Open";


            open.onclick =
                () =>
                    openDocument(
                        document.id
                    );


            const del =
                document.createElement(
                    "button"
                );


            del.className =
                "small-btn delete";

            del.textContent =
                "🗑";

            del.title =
                "Delete";


            del.onclick =
                () =>
                    deleteDocument(
                        document.id
                    );


            buttons.appendChild(
                open
            );

            buttons.appendChild(
                del
            );


            card.appendChild(
                img
            );

            card.appendChild(
                info
            );

            card.appendChild(
                buttons
            );


            documentsList.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   OPEN DOCUMENT
========================================================= */

async function openDocument(
    id
) {

    const document =
        await dbGetDocument(
            id
        );


    if (!document) {
        return;
    }


    currentDocumentId =
        id;


    await renderViewer(
        document
    );


    viewerModal.classList.add(
        "show"
    );

}


/* =========================================================
   RENDER VIEWER
========================================================= */

async function renderViewer(
    document
) {

    viewerTitle.textContent =
        document.name;


    viewerPages.innerHTML =
        "";


    document.pages.forEach(
        (page, index) => {

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "viewer-page";


            const img =
                document.createElement(
                    "img"
                );


            img.src =
                page;


            img.alt =
                "Page " +
                (index + 1);


            wrapper.appendChild(
                img
            );


            viewerPages.appendChild(
                wrapper
            );

        }
    );

}


/* =========================================================
   CLOSE VIEWER
========================================================= */

closeViewer.addEventListener(
    "click",
    function() {

        viewerModal.classList.remove(
            "show"
        );

        currentDocumentId =
            null;

    }
);


/* =========================================================
   DELETE DOCUMENT
========================================================= */

async function deleteDocument(
    id
) {

    const document =
        await dbGetDocument(
            id
        );


    if (!document) {
        return;
    }


    const yes =
        confirm(
            `"${document.name}" silinsin mi?`
        );


    if (!yes) {
        return;
    }


    await dbDeleteDocument(
        id
    );


    if (
        currentDocumentId === id
    ) {

        currentDocumentId =
            null;

        viewerModal.classList.remove(
            "show"
        );

    }


    await renderDocuments();

}


deleteDocumentBtn.addEventListener(
    "click",
    async function() {

        if (!currentDocumentId) {
            return;
        }


        await deleteDocument(
            currentDocumentId
        );

    }
);


/* =========================================================
   PDF / PRINT
========================================================= */

printPdfBtn.addEventListener(
    "click",
    async function() {

        if (!currentDocumentId) {
            return;
        }


        const document =
            await dbGetDocument(
                currentDocumentId
            );


        if (!document) {
            return;
        }


        const printArea =
            document.getElementById ?
            document.getElementById(
                "printArea"
            ) :
            null;


        const area =
            document.querySelector ?
            document.querySelector(
                "#printArea"
            ) :
            null;

    }
);


/*
 * Separate implementation because
 * variable name "document" above
 * shadows the browser document.
 */

printPdfBtn.onclick =
    async function() {

        if (!currentDocumentId) {
            return;
        }


        const record =
            await dbGetDocument(
                currentDocumentId
            );


        if (!record) {
            return;
        }


        const area =
            window.document.getElementById(
                "printArea"
            );


        area.innerHTML =
            "";


        record.pages.forEach(
            page => {

                const img =
                    window.document.createElement(
                        "img"
                    );

                img.src =
                    page;

                area.appendChild(
                    img
                );

            }
        );


        /*
         * Give browser enough time
         * to load images.
         */

        setTimeout(
            function() {

                window.print();

            },
            500
        );

    };


/* =========================================================
   NAME MODAL
========================================================= */

function askDocumentName(
    callback
) {

    documentName.value =
        "Document " +
        new Date()
            .toLocaleDateString(
                "tr-TR"
            );


    nameModal.classList.add(
        "show"
    );


    documentName.focus();


    saveDocumentName.onclick =
        async function() {

            const name =
                documentName.value.trim();


            if (!name) {

                documentName.focus();

                return;

            }


            nameModal.classList.remove(
                "show"
            );


            await callback(
                name
            );

        };

}


cancelName.addEventListener(
    "click",
    function() {

        nameModal.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   RENAME AFTER FIRST PAGE
========================================================= */

async function renameNewDocument(
    id
) {

    askDocumentName(
        async function(name) {

            const document =
                await dbGetDocument(
                    id
                );


            if (!document) {
                return;
            }


            document.name =
                name;


            document.updatedAt =
                Date.now();


            await dbPutDocument(
                document
            );


            await renderDocuments();

        }
    );

}


/* =========================================================
   INIT
========================================================= */

async function initScanner() {

    try {

        await openScannerDB();

        await renderDocuments();

    }
    catch (error) {

        console.error(
            "Scanner DB error:",
            error
        );

        alert(
            "Document Scanner veritabanı açılamadı."
        );

    }

}


initScanner();


/* =========================================================
   CAMERA PAGE FLOW
========================================================= */

cameraInput.addEventListener(
    "change",
    async function() {

        /*
         * This listener is intentionally
         * separate from the editor listener.
         */

        if (
            !this.files ||
            !this.files.length
        ) {
            return;
        }


        const file =
            this.files[0];


        try {

            const dataUrl =
                await fileToDataURL(
                    file
                );


            /*
             * If we don't have a document
             * yet, create one.
             */

            if (
                !currentDocumentId
            ) {

                const record =
                    await createDocumentWithPage(
                        dataUrl
                    );


                currentDocumentId =
                    record.id;


                openEditor(
                    dataUrl
                );


                /*
                 * The first page is already
                 * stored only temporarily here.
                 */

                await dbDeleteDocument(
                    record.id
                );

                currentDocumentId =
                    null;

                openEditor(
                    dataUrl
                );

                return;

            }


            openEditor(
                dataUrl
            );

        }
        catch (error) {

            console.error(
                error
            );

            alert(
                "Fotoğraf açılamadı."
            );

        }

    }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            if (
                editorModal.classList.contains(
                    "show"
                )
            ) {

                closeEditorModal();

            }


            if (
                viewerModal.classList.contains(
                    "show"
                )
            ) {

                viewerModal.classList.remove(
                    "show"
                );

            }


            if (
                nameModal.classList.contains(
                    "show"
                )
            ) {

                nameModal.classList.remove(
                    "show"
                );

            }

        }

    }
);