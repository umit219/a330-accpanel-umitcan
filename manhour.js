(() => {

    "use strict";


    /*
     * ============================================================
     * A330 MAN-HOUR / SHIFT PLANNER
     * ============================================================
     *
     * All data is stored in localStorage.
     *
     * Nothing is uploaded to GitHub or any server.
     *
     * Data therefore belongs only to this browser/device.
     *
     * ============================================================
     */


    const STORAGE_KEY = "a330ManHourPlanner_v1";


    const SHIFTS = {

        "07-15": {
            start: 7 * 60,
            end: 15 * 60,
            label: "07:00 – 15:00"
        },

        "15-23": {
            start: 15 * 60,
            end: 23 * 60,
            label: "15:00 – 23:00"
        },

        "23-07": {
            start: 23 * 60,
            end: 7 * 60,
            label: "23:00 – 07:00"
        }

    };


    let database = loadDatabase();

    let selectedSlot = null;


    /*
     * DOM
     */

    const workDate =
        document.getElementById("workDate");

    const shiftSelect =
        document.getElementById("shiftSelect");

    const localShift =
        document.getElementById("localShift");

    const gmtShift =
        document.getElementById("gmtShift");

    const timeline =
        document.getElementById("timeline");

    const totalWO =
        document.getElementById("totalWO");

    const totalTC =
        document.getElementById("totalTC");

    const totalTime =
        document.getElementById("totalTime");

    const totalMH =
        document.getElementById("totalMH");

    const saveBtn =
        document.getElementById("saveBtn");

    const clearBtn =
        document.getElementById("clearBtn");

    const saveStatus =
        document.getElementById("saveStatus");

    const savedShifts =
        document.getElementById("savedShifts");


    /*
     * MODAL
     */

    const workModal =
        document.getElementById("workModal");

    const closeModal =
        document.getElementById("closeModal");

    const cancelWork =
        document.getElementById("cancelWork");

    const saveWork =
        document.getElementById("saveWork");

    const modalTime =
        document.getElementById("modalTime");

    const workOrder =
        document.getElementById("workOrder");

    const taskCard =
        document.getElementById("taskCard");

    const technicians =
        document.getElementById("technicians");

    const duration =
        document.getElementById("duration");


    /*
     * INITIAL DATE
     */

    function getToday() {

        const now = new Date();

        const year =
            now.getFullYear();

        const month =
            String(now.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(now.getDate())
                .padStart(2, "0");

        return `${year}-${month}-${day}`;

    }


    workDate.value = getToday();


    /*
     * STORAGE
     */

    function loadDatabase() {

        try {

            const raw =
                localStorage.getItem(STORAGE_KEY);

            if (!raw) {
                return {};
            }

            const parsed =
                JSON.parse(raw);

            if (
                parsed &&
                typeof parsed === "object"
            ) {
                return parsed;
            }

        } catch (error) {

            console.error(
                "Unable to load Man-Hour data:",
                error
            );

        }

        return {};

    }


    function saveDatabase() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(database)
            );

            showSaveStatus(
                "✓ Saved on this device"
            );

        } catch (error) {

            console.error(
                "Unable to save Man-Hour data:",
                error
            );

            showSaveStatus(
                "Unable to save data"
            );

        }

    }


    /*
     * KEY
     */

    function getRecordKey() {

        return `${workDate.value}_${shiftSelect.value}`;

    }


    function getCurrentRecord() {

        const key =
            getRecordKey();

        if (!database[key]) {

            database[key] = {
                date: workDate.value,
                shift: shiftSelect.value,
                slots: {}
            };

        }

        return database[key];

    }


    /*
     * TIME HELPERS
     */

    function normalizeMinutes(minutes) {

        minutes %= 1440;

        if (minutes < 0) {
            minutes += 1440;
        }

        return minutes;

    }


    function formatMinutes(minutes) {

        minutes =
            normalizeMinutes(minutes);

        const hours =
            Math.floor(minutes / 60);

        const mins =
            minutes % 60;

        return (
            String(hours).padStart(2, "0") +
            ":" +
            String(mins).padStart(2, "0")
        );

    }


    function getTimezoneOffsetForDate(dateString) {

        const date =
            new Date(
                `${dateString}T12:00:00`
            );

        return date.getTimezoneOffset();

    }


    function localToGMT(minutes, dateString) {

        const offset =
            getTimezoneOffsetForDate(
                dateString
            );

        return normalizeMinutes(
            minutes + offset
        );

    }


    /*
     * SHIFT INFO
     */

    function updateShiftInfo() {

        const shift =
            SHIFTS[shiftSelect.value];

        if (!shift) {
            return;
        }


        localShift.textContent =
            shift.label;


        const gmtStart =
            localToGMT(
                shift.start,
                workDate.value
            );


        let localEnd =
            shift.end;

        if (localEnd <= shift.start) {
            localEnd += 1440;
        }


        const gmtEnd =
            localToGMT(
                localEnd,
                workDate.value
            );


        gmtShift.textContent =
            `${formatMinutes(gmtStart)} – ${formatMinutes(gmtEnd)}`;

    }


    /*
     * BUILD TIMELINE
     */

    function renderTimeline() {

        timeline.innerHTML = "";


        const shift =
            SHIFTS[shiftSelect.value];

        if (!shift) {
            return;
        }


        let start =
            shift.start;

        let end =
            shift.end;


        if (end <= start) {
            end += 1440;
        }


        const record =
            getCurrentRecord();


        let slotIndex = 0;


        for (
            let localStart = start;
            localStart < end;
            localStart += 10
        ) {

            const localEnd =
                localStart + 10;


            const gmtStart =
                localToGMT(
                    localStart,
                    workDate.value
                );


            const gmtEnd =
                localToGMT(
                    localEnd,
                    workDate.value
                );


            const slot =
                record.slots[slotIndex];


            const row =
                document.createElement("button");


            row.type = "button";

            row.className =
                "timeline-row";


            if (slot) {
                row.classList.add(
                    "timeline-row-filled"
                );
            }


            /*
             * TIME
             */

            const time =
                document.createElement("div");

            time.className =
                "timeline-time";


            const timeLabel =
                document.createElement("strong");

            timeLabel.textContent =
                `${formatMinutes(gmtStart)} – ${formatMinutes(gmtEnd)}`;


            time.appendChild(
                timeLabel
            );


            /*
             * WORK INFO
             */

            const info =
                document.createElement("div");

            info.className =
                "timeline-info";


            if (slot) {

                const wo =
                    document.createElement("span");

                wo.className =
                    "timeline-wo";

                wo.textContent =
                    slot.wo || "—";


                const tc =
                    document.createElement("span");

                tc.className =
                    "timeline-tc";

                tc.textContent =
                    slot.tc || "—";


                const tech =
                    document.createElement("span");

                tech.className =
                    "timeline-tech";

                tech.textContent =
                    `${slot.people || 1} TECH`;


                info.appendChild(wo);
                info.appendChild(tc);
                info.appendChild(tech);

            } else {

                const empty =
                    document.createElement("span");

                empty.className =
                    "timeline-empty";

                empty.textContent =
                    "Tap to add work";


                info.appendChild(
                    empty
                );

            }


            /*
             * ARROW
             */

            const arrow =
                document.createElement("div");

            arrow.className =
                "timeline-arrow";

            arrow.textContent =
                "›";


            row.appendChild(time);
            row.appendChild(info);
            row.appendChild(arrow);


            row.addEventListener(
                "click",
                () => {

                    openWorkModal(
                        slotIndex,
                        gmtStart
                    );

                }
            );


            timeline.appendChild(row);


            slotIndex++;

        }

    }


    /*
     * MODAL
     */

    function openWorkModal(
        slotIndex,
        gmtStart
    ) {

        selectedSlot =
            slotIndex;


        const record =
            getCurrentRecord();

        const existing =
            record.slots[slotIndex];


        const shift =
            SHIFTS[shiftSelect.value];


        let localStart =
            shift.start +
            slotIndex * 10;


        const gmtEnd =
            localToGMT(
                localStart + 10,
                workDate.value
            );


        modalTime.textContent =
            `${formatMinutes(gmtStart)} – ${formatMinutes(gmtEnd)}`;


        workOrder.value =
            existing?.wo || "";


        taskCard.value =
            existing?.tc || "";


        technicians.value =
            existing?.people || "1";


        duration.value =
            existing?.duration || "10";


        workModal.classList.add(
            "modal-open"
        );


        setTimeout(
            () => workOrder.focus(),
            50
        );

    }


    function closeWorkModal() {

        workModal.classList.remove(
            "modal-open"
        );

        selectedSlot = null;

    }


    /*
     * SAVE WORK
     */

    saveWork.addEventListener(
        "click",
        () => {

            if (
                selectedSlot === null
            ) {
                return;
            }


            const record =
                getCurrentRecord();


            const wo =
                workOrder.value.trim();

            const tc =
                taskCard.value.trim();

            const people =
                Number(
                    technicians.value
                ) || 1;

            const workDuration =
                Number(
                    duration.value
                ) || 10;


            /*
             * If everything is empty,
             * remove the slot.
             */

            if (!wo && !tc) {

                delete record.slots[
                    selectedSlot
                ];

            } else {

                /*
                 * Number of 10-minute slots
                 */

                const slotCount =
                    Math.ceil(
                        workDuration / 10
                    );


                for (
                    let i = 0;
                    i < slotCount;
                    i++
                ) {

                    const index =
                        selectedSlot + i;


                    record.slots[index] = {

                        wo: wo,

                        tc: tc,

                        people: people,

                        duration: 10

                    };

                }

            }


            saveDatabase();

            closeWorkModal();

            renderAll();

        }
    );


    /*
     * MODAL BUTTONS
     */

    closeModal.addEventListener(
        "click",
        closeWorkModal
    );


    cancelWork.addEventListener(
        "click",
        closeWorkModal
    );


    workModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === workModal
            ) {
                closeWorkModal();
            }

        }
    );


    /*
     * SAVE CURRENT SHIFT
     */

    saveBtn.addEventListener(
        "click",
        () => {

            /*
             * Simply touching the record
             * ensures it exists.
             */

            getCurrentRecord();

            saveDatabase();

            renderSavedShifts();

        }
    );


    /*
     * CLEAR CURRENT SHIFT
     */

    clearBtn.addEventListener(
        "click",
        () => {

            const key =
                getRecordKey();


            if (!database[key]) {

                showSaveStatus(
                    "Nothing to clear"
                );

                return;

            }


            const confirmed =
                confirm(
                    "Clear all data for this shift?"
                );


            if (!confirmed) {
                return;
            }


            delete database[key];


            try {

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(database)
                );

            } catch (error) {

                console.error(error);

            }


            renderAll();


            showSaveStatus(
                "✓ Shift cleared"
            );

        }
    );


    /*
     * DATE / SHIFT CHANGE
     */

    workDate.addEventListener(
        "change",
        () => {

            updateShiftInfo();

            renderAll();

        }
    );


    shiftSelect.addEventListener(
        "change",
        () => {

            updateShiftInfo();

            renderAll();

        }
    );


    /*
     * SUMMARY
     */

    function updateSummary() {

        const record =
            database[getRecordKey()];


        if (
            !record ||
            !record.slots
        ) {

            totalWO.textContent =
                "0";

            totalTC.textContent =
                "0";

            totalTime.textContent =
                "0h 00m";

            totalMH.textContent =
                "0.00";

            return;

        }


        const slots =
            Object.values(
                record.slots
            );


        const woSet =
            new Set();

        const tcSet =
            new Set();


        let minutes = 0;

        let manHours = 0;


        slots.forEach(
            slot => {

                if (slot.wo) {
                    woSet.add(
                        slot.wo
                    );
                }

                if (slot.tc) {
                    tcSet.add(
                        slot.tc
                    );
                }


                minutes += 10;


                manHours +=
                    10 / 60 *
                    (Number(
                        slot.people
                    ) || 1);

            }
        );


        totalWO.textContent =
            woSet.size;


        totalTC.textContent =
            tcSet.size;


        const hours =
            Math.floor(
                minutes / 60
            );

        const mins =
            minutes % 60;


        totalTime.textContent =
            `${hours}h ${String(mins).padStart(2, "0")}m`;


        totalMH.textContent =
            manHours.toFixed(2);

    }


    /*
     * SAVED SHIFTS
     */

    function renderSavedShifts() {

        savedShifts.innerHTML = "";


        const entries =
            Object.entries(
                database
            )
            .sort(
                ([, a], [, b]) => {

                    return (
                        b.date.localeCompare(
                            a.date
                        )
                    );

                }
            );


        if (!entries.length) {

            const empty =
                document.createElement("div");

            empty.className =
                "saved-empty";

            empty.textContent =
                "No saved shifts";

            savedShifts.appendChild(
                empty
            );

            return;

        }


        entries.forEach(
            ([key, record]) => {

                const card =
                    document.createElement("button");


                card.type =
                    "button";

                card.className =
                    "saved-shift";


                const date =
                    document.createElement("strong");

                date.textContent =
                    formatDate(
                        record.date
                    );


                const shift =
                    document.createElement("span");

                shift.textContent =
                    SHIFTS[
                        record.shift
                    ]?.label ||
                    record.shift;


                const count =
                    Object.keys(
                        record.slots || {}
                    ).length;


                const details =
                    document.createElement("small");

                details.textContent =
                    `${count} time slots`;


                card.appendChild(
                    date
                );

                card.appendChild(
                    shift
                );

                card.appendChild(
                    details
                );


                card.addEventListener(
                    "click",
                    () => {

                        workDate.value =
                            record.date;

                        shiftSelect.value =
                            record.shift;

                        updateShiftInfo();

                        renderAll();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }
                );


                savedShifts.appendChild(
                    card
                );

            }
        );

    }


    function formatDate(
        dateString
    ) {

        const date =
            new Date(
                `${dateString}T12:00:00`
            );


        return date.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /*
     * STATUS
     */

    let statusTimer = null;


    function showSaveStatus(
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
                2500
            );

    }


    /*
     * RENDER EVERYTHING
     */

    function renderAll() {

        updateShiftInfo();

        renderTimeline();

        updateSummary();

        renderSavedShifts();

    }


    /*
     * KEYBOARD
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                workModal.classList.contains(
                    "modal-open"
                )
            ) {

                closeWorkModal();

            }

        }
    );


    /*
     * START
     */

    renderAll();

})();