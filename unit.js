/*
====================================================
 A330 TECHNICIAN
 TECHNICAL UNIT CONVERTER
 OFFLINE
====================================================
*/

const UNITS = {

    /* =========================================
       BASINÇ
    ========================================= */

    "Basınç": {
        units: {
            "Pa": 1,
            "kPa": 1000,
            "MPa": 1000000,
            "bar": 100000,
            "mbar": 100,
            "psi": 6894.757293168,
            "psf": 47.88025898,
            "mmHg": 133.3223684,
            "inHg": 3386.389,
            "mmH₂O": 9.80665,
            "inH₂O": 249.08891,
            "atm": 101325
        },
        default: ["psi", "bar"]
    },


    /* =========================================
       TORK
    ========================================= */

    "Tork": {
        units: {
            "N·m": 1,
            "N·cm": 0.01,
            "N·mm": 0.001,
            "lbf·ft": 1.355817948,
            "lbf·in": 0.112984829,
            "kgf·m": 9.80665,
            "kgf·cm": 0.0980665,
            "kgf·mm": 0.00980665
        },
        default: ["N·m", "lbf·ft"]
    },


    /* =========================================
       UZUNLUK
    ========================================= */

    "Uzunluk": {
        units: {
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
        default: ["mm", "in"]
    },


    /* =========================================
       ALAN
    ========================================= */

    "Alan": {
        units: {
            "mm²": 0.000001,
            "cm²": 0.0001,
            "m²": 1,
            "km²": 1000000,
            "in²": 0.00064516,
            "ft²": 0.09290304
        },
        default: ["mm²", "in²"]
    },


    /* =========================================
       HACİM
    ========================================= */

    "Hacim": {
        units: {
            "mL": 0.001,
            "L": 1,
            "cm³": 0.001,
            "m³": 1000,
            "in³": 0.016387064,
            "ft³": 28.316846592,
            "US gal": 3.785411784,
            "Imp gal": 4.54609
        },
        default: ["L", "US gal"]
    },


    /* =========================================
       KÜTLE / AĞIRLIK
    ========================================= */

    "Kütle / Ağırlık": {
        units: {
            "mg": 0.000001,
            "g": 0.001,
            "kg": 1,
            "tonne": 1000,
            "oz": 0.028349523125,
            "lb": 0.45359237
        },
        default: ["kg", "lb"]
    },


    /* =========================================
       SICAKLIK
    ========================================= */

    "Sıcaklık": {
        type: "temperature",

        units: [
            "°C",
            "°F",
            "K",
            "°R"
        ],

        default: ["°C", "°F"]
    },


    /* =========================================
       KUVVET
    ========================================= */

    "Kuvvet": {
        units: {
            "N": 1,
            "kN": 1000,
            "MN": 1000000,
            "lbf": 4.4482216152605,
            "kgf": 9.80665
        },
        default: ["N", "lbf"]
    },


    /* =========================================
       GÜÇ
    ========================================= */

    "Güç": {
        units: {
            "W": 1,
            "kW": 1000,
            "MW": 1000000,
            "hp": 745.699871582,
            "PS": 735.49875
        },
        default: ["kW", "hp"]
    },


    /* =========================================
       GERİLİM
    ========================================= */

    "Gerilim": {
        units: {
            "µV": 0.000001,
            "mV": 0.001,
            "V": 1,
            "kV": 1000,
            "MV": 1000000
        },
        default: ["V", "mV"]
    },


    /* =========================================
       AKIM
    ========================================= */

    "Akım": {
        units: {
            "µA": 0.000001,
            "mA": 0.001,
            "A": 1,
            "kA": 1000
        },
        default: ["A", "mA"]
    },


    /* =========================================
       DİRENÇ
    ========================================= */

    "Direnç": {
        units: {
            "mΩ": 0.001,
            "Ω": 1,
            "kΩ": 1000,
            "MΩ": 1000000
        },
        default: ["Ω", "kΩ"]
    },


    /* =========================================
       KAPASİTANS
    ========================================= */

    "Kapasitans": {
        units: {
            "pF": 1e-12,
            "nF": 1e-9,
            "µF": 1e-6,
            "mF": 0.001,
            "F": 1
        },
        default: ["µF", "nF"]
    },


    /* =========================================
       ENDÜKTANS
    ========================================= */

    "Endüktans": {
        units: {
            "nH": 1e-9,
            "µH": 1e-6,
            "mH": 0.001,
            "H": 1
        },
        default: ["mH", "µH"]
    },


    /* =========================================
       FREKANS / DEVİR
    ========================================= */

    "Frekans / Devir": {
        units: {
            "Hz": 1,
            "kHz": 1000,
            "MHz": 1000000,
            "GHz": 1000000000,
            "RPM": 1 / 60,
            "RPS": 1
        },
        default: ["Hz", "RPM"]
    },


    /* =========================================
       YOĞUNLUK
    ========================================= */

    "Yoğunluk": {
        units: {
            "kg/m³": 1,
            "kg/L": 1000,
            "g/cm³": 1000,
            "g/mL": 1000,
            "lb/ft³": 16.01846337,
            "lb/US gal": 119.8264273
        },
        default: ["kg/m³", "lb/ft³"]
    },


    /* =========================================
       VİSKOZİTE
    ========================================= */

    "Viskozite": {
        units: {
            "Pa·s": 1,
            "mPa·s": 0.001,
            "cP": 0.001,
            "St": 0.0001,
            "cSt": 0.000001
        },
        default: ["cP", "cSt"]
    },


    /* =========================================
       İVME
    ========================================= */

    "İvme": {
        units: {
            "m/s²": 1,
            "ft/s²": 0.3048,
            "g": 9.80665
        },
        default: ["m/s²", "g"]
    },


    /* =========================================
       HAVACILIK MESAFESİ
    ========================================= */

    "Havacılık Mesafesi": {
        units: {
            "ft": 0.3048,
            "m": 1,
            "km": 1000,
            "NM": 1852,
            "mile": 1609.344
        },
        default: ["NM", "km"]
    }

};


/* =========================================
   ELEMENTLER
========================================= */

const category =
    document.getElementById("category");

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


/* =========================================
   KATEGORİLERİ YÜKLE
========================================= */

function loadCategories() {

    category.innerHTML = "";

    Object.keys(UNITS).forEach(name => {

        const option =
            document.createElement("option");

        option.value = name;
        option.textContent = name;

        category.appendChild(option);

    });

}


/* =========================================
   BİRİMLERİ YÜKLE
========================================= */

function loadUnits() {

    const data =
        UNITS[category.value];

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    let units;


    if (data.type === "temperature") {

        units = data.units;

    } else {

        units = Object.keys(data.units);

    }


    units.forEach(unit => {

        const fromOption =
            document.createElement("option");

        fromOption.value = unit;
        fromOption.textContent = unit;

        fromUnit.appendChild(fromOption);


        const toOption =
            document.createElement("option");

        toOption.value = unit;
        toOption.textContent = unit;

        toUnit.appendChild(toOption);

    });


    if (data.default) {

        fromUnit.value =
            data.default[0];

        toUnit.value =
            data.default[1];

    }


    calculate();

}


/* =========================================
   SICAKLIK
========================================= */

function convertTemperature(
    value,
    from,
    to
) {

    let celsius;


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


    if (to === "°C")
        return celsius;

    if (to === "°F")
        return celsius * 9 / 5 + 32;

    if (to === "K")
        return celsius + 273.15;

    if (to === "°R")
        return (celsius + 273.15) * 9 / 5;

}


/* =========================================
   HESAPLA
========================================= */

function calculate() {

    const value =
        parseFloat(fromValue.value);


    if (!Number.isFinite(value)) {

        result.textContent = "0";

        return;

    }


    const data =
        UNITS[category.value];

    let converted;


    if (data.type === "temperature") {

        converted =
            convertTemperature(
                value,
                fromUnit.value,
                toUnit.value
            );

    }

    else {

        const baseValue =
            value *
            data.units[fromUnit.value];

        converted =
            baseValue /
            data.units[toUnit.value];

    }


    result.textContent =
        formatResult(converted);

}


/* =========================================
   SONUÇ FORMATLAMA
========================================= */

function formatResult(value) {

    if (!Number.isFinite(value)) {

        return "—";

    }


    const absolute =
        Math.abs(value);


    if (
        absolute > 0 &&
        absolute < 0.000001
    ) {

        return value.toExponential(6);

    }


    if (absolute >= 1000000000) {

        return value.toExponential(6);

    }


    return Number(
        value.toFixed(6)
    ).toString();

}


/* =========================================
   SWAP
========================================= */

swapBtn.addEventListener(
    "click",
    () => {

        const old =
            fromUnit.value;

        fromUnit.value =
            toUnit.value;

        toUnit.value =
            old;

        calculate();

    }
);


/* =========================================
   CLEAR
========================================= */

clearBtn.addEventListener(
    "click",
    () => {

        fromValue.value = "";

        result.textContent = "0";

        fromValue.focus();

    }
);


/* =========================================
   EVENTS
========================================= */

category.addEventListener(
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


/* =========================================
   START
========================================= */

loadCategories();

loadUnits();