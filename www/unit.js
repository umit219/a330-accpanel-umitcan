const UNITS = {

    /* =========================
       PRESSURE
    ========================= */

    "Basınç": {

        "Pa": 1,
        "kPa": 1000,
        "MPa": 1000000,

        "bar": 100000,
        "mbar": 100,

        "psi": 6894.757293168,
        "psf": 47.88025898,

        "mmHg": 133.322387415,
        "inHg": 3386.389,

        "mmH₂O": 9.80665,
        "inH₂O": 249.08891,

        "atm": 101325

    },


    /* =========================
       TORQUE
    ========================= */

    "Tork": {

        "N·m": 1,
        "N·cm": 0.01,
        "N·mm": 0.001,

        "lbf·ft": 1.355817948,
        "lbf·in": 0.112984829,

        "kgf·m": 9.80665,
        "kgf·cm": 0.0980665,
        "kgf·mm": 0.00980665

    },


    /* =========================
       LENGTH
    ========================= */

    "Uzunluk": {

        "mm": 0.001,
        "cm": 0.01,
        "m": 1,
        "km": 1000,

        "in": 0.0254,
        "ft": 0.3048,
        "yd": 0.9144,

        "mile": 1609.344,
        "NM": 1852

    },


    /* =========================
       AREA
    ========================= */

    "Alan": {

        "mm²": 0.000001,
        "cm²": 0.0001,
        "m²": 1,
        "km²": 1000000,

        "in²": 0.00064516,
        "ft²": 0.09290304

    },


    /* =========================
       VOLUME
    ========================= */

    "Hacim": {

        "mL": 0.000001,
        "L": 0.001,

        "cm³": 0.000001,
        "m³": 1,

        "in³": 0.000016387064,
        "ft³": 0.028316846592,

        "US gal": 0.003785411784,
        "Imp gal": 0.00454609

    },


    /* =========================
       MASS
    ========================= */

    "Kütle / Ağırlık": {

        "mg": 0.000001,
        "g": 0.001,
        "kg": 1,

        "tonne": 1000,

        "oz": 0.028349523125,
        "lb": 0.45359237

    },


    /* =========================
       TEMPERATURE
    ========================= */

    "Sıcaklık": {

        "°C": "temperature",
        "°F": "temperature",
        "K": "temperature",
        "°R": "temperature"

    },


    /* =========================
       FORCE
    ========================= */

    "Kuvvet": {

        "N": 1,
        "kN": 1000,
        "MN": 1000000,

        "lbf": 4.4482216152605,
        "kgf": 9.80665

    },


    /* =========================
       POWER
    ========================= */

    "Güç": {

        "W": 1,
        "kW": 1000,
        "MW": 1000000,

        "hp": 745.6998715822702,
        "PS": 735.49875

    },


    /* =========================
       VOLTAGE
    ========================= */

    "Gerilim": {

        "µV": 0.000001,
        "mV": 0.001,
        "V": 1,
        "kV": 1000,
        "MV": 1000000

    },


    /* =========================
       CURRENT
    ========================= */

    "Akım": {

        "µA": 0.000001,
        "mA": 0.001,
        "A": 1,
        "kA": 1000

    },


    /* =========================
       RESISTANCE
    ========================= */

    "Direnç": {

        "mΩ": 0.001,
        "Ω": 1,
        "kΩ": 1000,
        "MΩ": 1000000

    },


    /* =========================
       CAPACITANCE
    ========================= */

    "Kapasitans": {

        "pF": 0.000000000001,
        "nF": 0.000000001,
        "µF": 0.000001,
        "mF": 0.001,
        "F": 1

    },


    /* =========================
       INDUCTANCE
    ========================= */

    "Endüktans": {

        "nH": 0.000000001,
        "µH": 0.000001,
        "mH": 0.001,
        "H": 1

    },


    /* =========================
       FREQUENCY / RPM
    ========================= */

    "Frekans / Devir": {

        "Hz": 1,
        "kHz": 1000,
        "MHz": 1000000,
        "GHz": 1000000000,

        "RPM": 1 / 60,
        "RPS": 1

    },


    /* =========================
       DENSITY
    ========================= */

    "Yoğunluk": {

        "kg/m³": 1,
        "kg/L": 1000,

        "g/cm³": 1000,
        "g/mL": 1000,

        "lb/ft³": 16.01846337,
        "lb/US gal": 119.8264273

    },


    /* =========================
       VISCOSITY
    ========================= */

    "Viskozite": {

        "Pa·s": 1,
        "mPa·s": 0.001,
        "cP": 0.001,

        "St": 0.0001,
        "cSt": 0.000001

    },


    /* =========================
       ACCELERATION
    ========================= */

    "İvme": {

        "m/s²": 1,
        "ft/s²": 0.3048,
        "g": 9.80665

    },


    /* =========================
       AVIATION DISTANCE
    ========================= */

    "Havacılık Mesafesi": {

        "ft": 0.3048,
        "m": 1,
        "km": 1000,

        "NM": 1852,
        "mile": 1609.344

    }

};



/* =========================
   ELEMENTS
========================= */

const categorySelect =
    document.getElementById("categorySelect");

const fromUnit =
    document.getElementById("fromUnit");

const toUnit =
    document.getElementById("toUnit");

const fromValue =
    document.getElementById("fromValue");

const result =
    document.getElementById("result");

const swapBtn =
    document.getElementById("swapBtn");

const clearBtn =
    document.getElementById("clearBtn");



/* =========================
   LOAD CATEGORIES
========================= */

function loadCategories() {

    categorySelect.innerHTML = "";

    Object.keys(UNITS).forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent = category;

        categorySelect.appendChild(option);

    });

}



/* =========================
   LOAD UNITS
========================= */

function loadUnits() {

    const category =
        categorySelect.value;

    const units =
        Object.keys(UNITS[category]);


    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";


    units.forEach(unit => {

        const fromOption =
            document.createElement("option");

        fromOption.value = unit;
        fromOption.textContent = unit;


        const toOption =
            document.createElement("option");

        toOption.value = unit;
        toOption.textContent = unit;


        fromUnit.appendChild(fromOption);
        toUnit.appendChild(toOption);

    });


    if (units.length > 1) {

        fromUnit.selectedIndex = 0;
        toUnit.selectedIndex = 1;

    }


    calculate();

}



/* =========================
   TEMPERATURE
========================= */

function convertTemperature(value, from, to) {

    let celsius;


    /* FROM → CELSIUS */

    if (from === "°C") {

        celsius = value;

    }

    else if (from === "°F") {

        celsius =
            (value - 32) * 5 / 9;

    }

    else if (from === "K") {

        celsius =
            value - 273.15;

    }

    else if (from === "°R") {

        celsius =
            (value - 491.67) * 5 / 9;

    }



    /* CELSIUS → TO */

    if (to === "°C") {

        return celsius;

    }

    if (to === "°F") {

        return celsius * 9 / 5 + 32;

    }

    if (to === "K") {

        return celsius + 273.15;

    }

    if (to === "°R") {

        return (celsius + 273.15) * 9 / 5;

    }

}



/* =========================
   FORMAT RESULT
========================= */

function formatResult(value) {

    if (!Number.isFinite(value)) {

        return "0";

    }


    if (
        Math.abs(value) < 0.000001 &&
        value !== 0
    ) {

        return value.toExponential(6);

    }


    if (
        Math.abs(value) >= 1000000000
    ) {

        return value.toExponential(6);

    }


    return Number(
        value.toFixed(6)
    ).toString();

}



/* =========================
   CALCULATE
========================= */

function calculate() {

    const value =
        parseFloat(fromValue.value);


    if (!Number.isFinite(value)) {

        result.textContent = "0";

        return;

    }


    const category =
        categorySelect.value;

    const from =
        fromUnit.value;

    const to =
        toUnit.value;


    let converted;



    /* TEMPERATURE */

    if (
        UNITS[category][from] ===
        "temperature"
    ) {

        converted =
            convertTemperature(
                value,
                from,
                to
            );

    }



    /* NORMAL UNITS */

    else {

        const baseValue =
            value *
            UNITS[category][from];


        converted =
            baseValue /
            UNITS[category][to];

    }


    result.textContent =
        formatResult(converted);

}



/* =========================
   SWAP
========================= */

swapBtn.addEventListener(
    "click",
    function() {

        const oldFrom =
            fromUnit.value;

        const oldTo =
            toUnit.value;

        const oldResult =
            result.textContent;


        fromUnit.value =
            oldTo;

        toUnit.value =
            oldFrom;


        if (oldResult !== "0") {

            fromValue.value =
                oldResult;

        }


        calculate();

    }
);



/* =========================
   CLEAR
========================= */

clearBtn.addEventListener(
    "click",
    function() {

        fromValue.value = "";

        result.textContent = "0";

        fromValue.focus();

    }
);



/* =========================
   EVENTS
========================= */

categorySelect.addEventListener(
    "change",
    loadUnits
);


fromUnit.addEventListener(
    "change",
    calculate
);


toUnit.addEventListener(
    "change",
    calculate
);


fromValue.addEventListener(
    "input",
    calculate
);



/* =========================
   INIT
========================= */

loadCategories();

loadUnits();
