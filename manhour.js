(() => {

    "use strict";


    /*
     * =========================================================
     * A330 MAN-HOUR / SHIFT PLANNER
     *
     * Data is stored only in this browser/device.
     * No server or cloud storage is used.
     * =========================================================
     */


    const STORAGE_KEY =
        "a330_manhour_data_v1";


    /*
     * SHIFT DEFINITIONS
     *
     * Minutes from midnight.
     */

    const SHIFTS = {

        "07-15": {
            start: 7 * 60,
            end: 15 * 60
        },

        "15-23": {
            start: 15 * 60,
            end: 23 * 60
        },

        "23-07": {
            start: 23 * 60,
            end: 7 * 60
        }

    };


    /*
     * ELEMENTS
     */

    const workDate =
        document.getElementById("workDate");

    const shiftSelect =
        document.getElementById("shiftSelect");

    const gmtInfo =
        document.getElementById("gmtInfo");

    const gmtShift =
        document.getElementById("gmtShift");

    const tableCard =
        document.getElementById("tableCard");

    const timeline =
        document.getElementById("timeline");

    const actions =
        document.getElementById("actions");

    const saveBtn =
        document.getElementById("saveBtn");

    const clearBtn =
        document.getElementById("clearBtn");

    const saveStatus =
        document.getElementById("saveStatus");

    const totalTime =
        document.getElementById("totalTime");


    /*
     * DATABASE
     */

    let database =
        loadDatabase();


    /*
     * TODAY
     */

    function getToday() {

        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                now.getDate()
            ).padStart(2, "0");

        return (
            year +
            "-" +
            month +
            "-" +
            day
        );

    }


    workDate.value =
        getToday();


    /*
     * LOAD
     */

    function loadDatabase() {

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!saved) {
                return {};
            }

            const parsed =
                JSON.parse(saved);

            if (
                parsed &&
                typeof parsed === "object"
            ) {

                return parsed;

            }

        } catch (error) {

            console.error(
                "Man-Hour load error:",
                error
            );

        }

        return {};

    }


    /*
     * SAVE DATABASE
     */

    function saveDatabase(
        showMessage = true
    ) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(database)
            );

            if (showMessage) {

                showStatus(
                    "Saved"
                );

            }

        } catch (error) {

            console.error(
                "Man-Hour save error:",
                error
            );

            showStatus(
                "Unable to save"
            );

        }

    }


    /*
     * RECORD KEY
     *
     * Every date + shift has its own record.
     */

    function getKey() {

        if (
            !workDate.value ||
            !shiftSelect.value
        ) {

            return null;

        }

        return (
            workDate.value +
            "_" +
            shiftSelect.value
        );

    }


    /*
     * GET CURRENT RECORD
     */

    function getRecord(
        create = false
    ) {

        const key =
            getKey();

        if (!key) {
            return null;
        }


        if (
            !database[key] &&
            create
        ) {

            database[key] = {
                date: workDate.value,
                shift: shiftSelect.value,
                slots: {}
            };

        }


        return database[key] || null;

    }


    /*
     * NORMALIZE TIME
     */

    function normalizeMinutes(
        minutes
    ) {

        minutes =
            minutes % 1440;

        if (minutes < 0) {
            minutes += 1440;
        }

        return minutes;

    }


    /*
     * FORMAT HH:MM
     */

    function formatTime(
        minutes
    ) {

        minutes =
            normalizeMinutes(
                minutes
            );


        const hours =
            Math.floor(
                minutes / 60
            );

        const mins =
            minutes % 60;


        return (
            String(hours)
                .padStart(2, "0") +
            ":" +
            String(mins)
                .padStart(2, "0")
        );

    }


    /*
     * TIMEZONE OFFSET
     *
     * Converts device local time to GMT.
     */

    function getOffset(
        dateString
    ) {

        const date =
            new Date(
                dateString +
                "T12:00:00"
            );

        return date.getTimezoneOffset();

    }


    /*
     * LOCAL → GMT
     */

    function localToGMT(
        minutes
    ) {

        return normalizeMinutes(
            minutes +
            getOffset(
                workDate.value
            )
        );

    }


    /*
     * UPDATE GMT INFORMATION
     */

    function updateGMT() {

        const shift =
            SHIFTS[
                shiftSelect.value
            ];


        if (!shift) {

            gmtInfo.classList.remove(
                "visible"
            );

            return;

        }


        let end =
            shift.end;


        if (
            end <= shift.start
        ) {

            end += 1440;

        }


        const startGMT =
            localToGMT(
                shift.start
            );

        const endGMT =
            localToGMT(
                end
            );


        gmtShift.textContent =
            formatTime(startGMT) +
            " – " +
            formatTime(endGMT);


        gmtInfo.classList.add(
            "visible"
        );

    }


    /*
     * RENDER
     */

    function render() {

        /*
         * No shift selected.
         *
         * Hide everything below.
         */

        if (
            !workDate.value ||
            !shiftSelect.value
        ) {

            tableCard.classList.remove(
                "visible"
            );

            actions.classList.remove(
                "visible"
            );

            totalTime.classList.remove(
                "visible"
            );

            timeline.innerHTML = "";

            updateGMT();

            return;

        }


        updateGMT();


        const shift =
            SHIFTS[
                shiftSelect.value
            ];


        if (!shift) {
            return;
        }


        let end =
            shift.end;


        /*
         * Night shift:
         * 23:00 → 07:00
         */

        if (
            end <= shift.start
        ) {

            end += 1440;

        }


        const record =
            getRecord(false);


        timeline.innerHTML =
            "";


        /*
         * 10 MINUTE ROWS
         */

        let slotIndex = 0;


        for (
            let localStart = shift.start;
            localStart < end;
            localStart += 10
        ) {


            const localEnd =
                localStart + 10;


            const gmtStart =
                localToGMT(
                    localStart
                );

            const gmtEnd =
                localToGMT(
                    localEnd
                );


            const tr =
                document.createElement(
                    "tr"
                );


            /*
             * TIME
             */

            const timeCell =
                document.createElement(
                    "td"
                );


            const time =
                document.createElement(
                    "span"
                );


            time.className =
                "mh-time";


            time.textContent =
                formatTime(gmtStart) +
                "–" +
                formatTime(gmtEnd);


            timeCell.appendChild(
                time
            );


            /*
             * WORK ORDER
             */

            const woCell =
                document.createElement(
                    "td"
                );


            const woInput =
                document.createElement(
                    "input"
                );


            woInput.type =
                "text";

            woInput.className =
                "mh-cell-input";

            woInput.placeholder =
                "WO";


            /*
             * TASK CARD
             */

            const tcCell =
                document.createElement(
                    "td"
                );


            const tcInput =
                document.createElement(
                    "input"
                );


            tcInput.type =
                "text";

            tcInput.className =
                "mh-cell-input";

            tcInput.placeholder =
                "TC";


            /*
             * LOAD EXISTING DATA
             */

            if (
                record &&
                record.slots &&
                record.slots[slotIndex]
            ) {

                const saved =
                    record.slots[
                        slotIndex
                    ];


                woInput.value =
                    saved.wo || "";


                tcInput.value =
                    saved.tc || "";

            }


            /*
             * SAVE ON EVERY CHANGE
             *
             * This means the user does not
             * lose data if Safari is closed.
             */

            woInput.addEventListener(
                "input",
                () => {

                    updateSlot(
                        slotIndex,
                        woInput.value,
                        tcInput.value
                    );

                }
            );


            tcInput.addEventListener(
                "input",
                () => {

                    updateSlot(
                        slotIndex,
                        woInput.value,
                        tcInput.value
                    );

                }
            );


            woCell.appendChild(
                woInput
            );

            tcCell.appendChild(
                tcInput
            );


            tr.appendChild(
                timeCell
            );

            tr.appendChild(
                woCell
            );

            tr.appendChild(
                tcCell
            );


            timeline.appendChild(
                tr
            );


            slotIndex++;

        }


        /*
         * SHOW TABLE
         */

        tableCard.classList.add(
            "visible"
        );

        actions.classList.add(
            "visible"
        );

        totalTime.classList.add(
            "visible"
        );


        updateTotal();

    }


    /*
     * UPDATE SLOT
     */

    function updateSlot(
        index,
        wo,
        tc
    ) {

        const record =
            getRecord(true);


        if (!record) {
            return;
        }


        wo =
            String(wo || "")
                .trim();

        tc =
            String(tc || "")
                .trim();


        /*
         * If row is empty,
         * remove it from storage.
         */

        if (!wo && !tc) {

            delete record.slots[
                index
            ];

        } else {

            record.slots[index] = {

                wo: wo,

                tc: tc

            };

        }


        /*
         * Save immediately.
         */

        saveDatabase(false);


        updateTotal();

    }


    /*
     * TOTAL WORK TIME
     *
     * Each filled row = 10 minutes.
     */

    function updateTotal() {

        const record =
            getRecord(false);


        if (
            !record ||
            !record.slots
        ) {

            totalTime.innerHTML =
                "Work time: <strong>0h 00m</strong>";

            return;

        }


        let count = 0;


        Object.values(
            record.slots
        ).forEach(
            slot => {

                if (
                    slot &&
                    (
                        slot.wo ||
                        slot.tc
                    )
                ) {

                    count++;

                }

            }
        );


        const minutes =
            count * 10;


        const hours =
            Math.floor(
                minutes / 60
            );

        const mins =
            minutes % 60;


        totalTime.innerHTML =
            "Work time: <strong>" +
            hours +
            "h " +
            String(mins)
                .padStart(2, "0") +
            "m</strong>";

    }


    /*
     * MANUAL SAVE
     */

    saveBtn.addEventListener(
        "click",
        () => {

            if (
                !getKey()
            ) {

                return;

            }


            getRecord(true);

            saveDatabase(true);

        }
    );


    /*
     * CLEAR
     */

    clearBtn.addEventListener(
        "click",
        () => {

            const key =
                getKey();


            if (!key) {
                return;
            }


            const record =
                database[key];


            if (!record) {

                showStatus(
                    "Nothing to clear"
                );

                return;

            }


            const confirmed =
                window.confirm(
                    "Clear this shift?"
                );


            if (!confirmed) {
                return;
            }


            delete database[key];


            saveDatabase(
                false
            );


            render();


            showStatus(
                "Cleared"
            );

        }
    );


    /*
     * DATE CHANGE
     */

    workDate.addEventListener(
        "change",
        () => {

            render();

        }
    );


    /*
     * SHIFT CHANGE
     */

    shiftSelect.addEventListener(
        "change",
        () => {

            render();

        }
    );


    /*
     * STATUS MESSAGE
     */

    let statusTimer = null;


    function showStatus(
        message
    ) {

        saveStatus.textContent =
            message;


        clearTimeout(
            statusTimer
        );


        statusTimer =
            setTimeout(
                () => {

                    saveStatus.textContent =
                        "";

                },
                2000
            );

    }


    /*
     * START
     */

    render();

})();
