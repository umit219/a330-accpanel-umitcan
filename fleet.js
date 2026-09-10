const fleetData = [

  // =========================
  // A330-200
  // =========================

  {
    registration: "TC-JIO",
    aircraft: "A330-223",
    family: "A330-200",
    engine: "PW4168A",
    manufacturer: "Pratt & Whitney",
    name: "Eskişehir"
  },
  {
    registration: "TC-JIP",
    aircraft: "A330-223",
    family: "A330-200",
    engine: "PW4168A",
    manufacturer: "Pratt & Whitney",
    name: "Lale"
  },
  {
    registration: "TC-JIT",
    aircraft: "A330-223",
    family: "A330-200",
    engine: "PW4168A",
    manufacturer: "Pratt & Whitney",
    name: null
  },
  {
    registration: "TC-JNA",
    aircraft: "A330-203",
    family: "A330-200",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Gaziantep"
  },
  {
    registration: "TC-JNB",
    aircraft: "A330-203",
    family: "A330-200",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Konya"
  },
  {
    registration: "TC-JNC",
    aircraft: "A330-203",
    family: "A330-200",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Kushimoto"
  },
  {
    registration: "TC-JND",
    aircraft: "A330-203",
    family: "A330-200",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Antalya"
  },
  {
    registration: "TC-JNE",
    aircraft: "A330-203",
    family: "A330-200",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Kayseri"
  },
  {
    registration: "TC-LOH",
    aircraft: "A330-223",
    family: "A330-200",
    engine: "PW4168A",
    manufacturer: "Pratt & Whitney",
    name: null
  },
  {
    registration: "TC-LOM",
    aircraft: "A330-243",
    family: "A330-200",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: null
  },

  // =========================
  // A330-300
  // =========================

  {
    registration: "TC-JNH",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Topkapı"
  },
  {
    registration: "TC-JNI",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Konak"
  },
  {
    registration: "TC-JNJ",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Kapadokya"
  },
  {
    registration: "TC-JNK",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Şanlıurfa"
  },
  {
    registration: "TC-JNL",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Trabzon"
  },
  {
    registration: "TC-JNM",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Samsun"
  },
  {
    registration: "TC-JNN",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Selçuklu"
  },
  {
    registration: "TC-JNO",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Boğaziçi"
  },
  {
    registration: "TC-JNP",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Gökçeada"
  },
  {
    registration: "TC-JNR",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: "Haliç Golden Horn"
  },

  {
    registration: "TC-JNS",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Hattuşaş"
  },
  {
    registration: "TC-JNT",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Bursa"
  },
  {
    registration: "TC-JNZ",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Kartalkaya"
  },
  {
    registration: "TC-JOA",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Pamukkale"
  },
  {
    registration: "TC-JOB",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Bozcaada"
  },
  {
    registration: "TC-JOD",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Malazgirt"
  },
  {
    registration: "TC-JOE",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Diyarbakır"
  },
  {
    registration: "TC-JOF",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Sakarya"
  },
  {
    registration: "TC-JOG",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Truva"
  },
  {
    registration: "TC-JOH",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Sivas"
  },
  {
    registration: "TC-JOI",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Kızılcahamam"
  },
  {
    registration: "TC-JOJ",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Rize-Artvin"
  },
  {
    registration: "TC-JOK",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: null
  },
  {
    registration: "TC-JOL",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Aydın"
  },

  {
    registration: "TC-LNC",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Refahiye"
  },
  {
    registration: "TC-LND",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: null
  },
  {
    registration: "TC-LNE",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Göbeklitepe"
  },
  {
    registration: "TC-LNF",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Kocaeli"
  },
  {
    registration: "TC-LNG",
    aircraft: "A330-303",
    family: "A330-300",
    engine: "CF6-80E1A3",
    manufacturer: "General Electric",
    name: "Mersin"
  },

  // Leased A330-300
  {
    registration: "TC-LOA",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: null
  },
  {
    registration: "TC-LOB",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: null
  },
  {
    registration: "TC-LOC",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: null
  },
  {
    registration: "TC-LOD",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: null
  },
  {
    registration: "TC-LOE",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: null
  },
  {
    registration: "TC-LOF",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: null
  },
  {
    registration: "TC-LOG",
    aircraft: "A330-343",
    family: "A330-300",
    engine: "Trent 772B-60",
    manufacturer: "Rolls-Royce",
    name: null
  },
  {
    registration: "TC-LON",
    aircraft: "A330-302",
    family: "A330-300",
    engine: "CF6-80E1A4",
    manufacturer: "General Electric",
    name: null
  }

];
