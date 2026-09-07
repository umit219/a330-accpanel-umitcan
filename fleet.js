const fleetData = [

    {
        registration: "TC-JIO",
        aircraft: "Airbus A330-223",
        family: "A330-200",
        engine: "PW4168A",
        manufacturer: "Pratt & Whitney"
    },

    {
        registration: "TC-JIP",
        aircraft: "Airbus A330-223",
        family: "A330-200",
        engine: "PW4168A",
        manufacturer: "Pratt & Whitney"
    },

    {
        registration: "TC-JIT",
        aircraft: "Airbus A330-223",
        family: "A330-200",
        engine: "PW4168A",
        manufacturer: "Pratt & Whitney"
    },

    {
        registration: "TC-JNA",
        aircraft: "Airbus A330-203",
        family: "A330-200",
        engine: "CF6-80E1A3",
        manufacturer: "General Electric"
    },

    {
        registration: "TC-JNB",
        aircraft: "Airbus A330-203",
        family: "A330-200",
        engine: "CF6-80E1A3",
        manufacturer: "General Electric"
    },

    {
        registration: "TC-JNC",
        aircraft: "Airbus A330-203",
        family: "A330-200",
        engine: "CF6-80E1A3",
        manufacturer: "General Electric"
    },

    {
        registration: "TC-JND",
        aircraft: "Airbus A330-203",
        family: "A330-200",
        engine: "CF6-80E1A3",
        manufacturer: "General Electric"
    },

    {
        registration: "TC-JNE",
        aircraft: "Airbus A330-203",
        family: "A330-200",
        engine: "CF6-80E1A3",
        manufacturer: "General Electric"
    },

    {
        registration: "TC-LOH",
        aircraft: "Airbus A330-223",
        family: "A330-200",
        engine: "PW4168A",
        manufacturer: "Pratt & Whitney"
    },

    {
        registration: "TC-LOM",
        aircraft: "Airbus A330-243",
        family: "A330-200",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNH",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNI",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNJ",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNK",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNL",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNM",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNN",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNO",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNP",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    },

    {
        registration: "TC-JNR",
        aircraft: "Airbus A330-343",
        family: "A330-300",
        engine: "Trent 772B-60",
        manufacturer: "Rolls-Royce"
    }

];


/* A330-300 / CF6 */

[
    "TC-JNS",
    "TC-JNT",
    "TC-JNZ",
    "TC-JOA",
    "TC-JOB",
    "TC-JOD",
    "TC-JOE",
    "TC-JOF",
    "TC-JOG",
    "TC-JOH",
    "TC-JOI",
    "TC-JOJ",
    "TC-JOK",
    "TC-JOL",
    "TC-LNC",
    "TC-LND",
    "TC-LNE",
    "TC-LNF",
    "TC-LNG"

].forEach(registration => {

    fleetData.push({

        registration: registration,

        aircraft: "Airbus A330-303",

        family: "A330-300",

        engine: "CF6-80E1A3",

        manufacturer: "General Electric"

    });

});


/* A330-300 / Trent */

[
    "TC-LOA",
    "TC-LOB",
    "TC-LOC",
    "TC-LOD",
    "TC-LOE",
    "TC-LOF",
    "TC-LOG"

].forEach(registration => {

    fleetData.push({

        registration: registration,

        aircraft: "Airbus A330-343",

        family: "A330-300",

        engine: "Trent 772B-60",

        manufacturer: "Rolls-Royce"

    });

});


/* A330-302 */

fleetData.push({

    registration: "TC-LON",

    aircraft: "Airbus A330-302",

    family: "A330-300",

    engine: "CF6-80E1A4",

    manufacturer: "General Electric"

});