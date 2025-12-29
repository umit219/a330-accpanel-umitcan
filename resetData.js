
const resetData = [

/* ===================== CABIN PRESSURE ===================== */
{
  ata: "21",
  msg: "CAB PR AFT OFV NOT OPEN",
  condition: "NO DISPATCH",
  reset: "Check forward outflow valve OPEN.",
  cbs: "-"
},
{
  ata: "21",
  msg: "CAB PR EXCESS CABIN ALT",
  condition: "NOT APPLICABLE",
  reset: "Reset breakers CPC 1 and CPC 2 on LH and RH reset panels.",
  cbs: "CPC 1 / CPC 2"
},
{
  ata: "21",
  msg: "CAB PR FWD OFV NOT OPEN",
  condition: "NO DISPATCH",
  reset: "Check aft outflow valve OPEN.",
  cbs: "-"
},
{
  ata: "21",
  msg: "CAB PR LDG ELEV FAULT",
  condition: "MEL 21-31-05",
  reset: "Reset breakers CPC 1 and CPC 2 on LH and RH reset panels. Reset breaker DMC 3 on RH reset panel.",
  cbs: "CPC 1 / CPC 2 / DMC 3"
},
{
  ata: "21",
  msg: "CAB PR LO DIFF PR",
  condition: "NOT APPLICABLE",
  reset: "No action required.",
  cbs: "-"
},
{
  ata: "21",
  msg: "CAB PR SAFETY VALVE OPEN",
  condition: "MEL 21-31-05",
  reset: "If safety valves are visually closed, reset breakers SDAC 1 and SDAC 2 on LH and RH reset panels.",
  cbs: "SDAC 1 / SDAC 2"
},
{
  ata: "21",
  msg: "CAB PR SYS 1 + 2 FAULT",
  condition: "MEL 21-31-05",
  reset: "Reset breakers CPC 1 and CPC 2 on LH and RH reset panels.",
  cbs: "CPC 1 / CPC 2"
},
{
  ata: "21",
  msg: "CAB PR SYS 1 FAULT",
  condition: "MEL 21-31-05",
  reset: "Reset breaker CPC 1 on LH reset panel.",
  cbs: "CPC 1"
},
{
  ata: "21",
  msg: "CAB PR SYS 2 FAULT",
  condition: "MEL 21-31-05",
  reset: "Reset breaker CPC 2 on RH reset panel.",
  cbs: "CPC 2"
},
/* ===================== CONDITIONING / VENTILATION ===================== */

{
  ata: "21",
  msg: "COND AFT CRG ISOL FAULT",
  condition: "MEL 21-28-03-B",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND AFT CRG VENT FAULT",
  condition: "MEL 21-28-03-A",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND BULK CRG DUCT OVHT",
  condition: "MEL 21-43-02",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND BULK CRG HEAT FAULT",
  condition: "MEL 21-43-02",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND BULK CRG ISOL FAULT",
  condition: "MEL 21-28-04-B",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND BULK CRG VENT FAULT",
  condition: "MEL 21-28-04-A",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND L + R CAB VENT FAULT",
  condition: "MEL 21-21-01",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND L CAB VENT FAULT",
  condition: "MEL 21-21-01",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND LAV + GALLEY FAN FAULT",
  condition: "MEL 21-23-01",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND R CAB VENT FAULT",
  condition: "MEL 21-21-01",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND VENT SYS FAULT",
  condition: "MEL 21-26-04",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND ZONE CTLR FAULT",
  condition: "MEL 21-63-01",
  reset: "Reset breaker ZONE CONT on RH reset panel.",
  cbs: "ZONE CONT"
},
{
  ata: "21",
  msg: "COND ZONE CTLR 2 FAULT",
  condition: "MEL 21-63-01",
  reset: "Reset breaker ZONE CONT on RH reset panel.",
  cbs: "ZONE CONT"
},
{
  ata: "21",
  msg: "COND ZONE REGUL FAULT",
  condition: "MEL 21-63-01 / 21-63-03",
  reset: "Reset breaker ZONE CONT on RH reset panel.",
  cbs: "ZONE CONT"
},
{
  ata: "21",
  msg: "COND CAB REST ISOL FAULT",
  condition: "MEL 21-21-04",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND DUCT OVHT",
  condition: "MEL 21-63-03 / 21-43-01",
  reset: "Reset breaker ZONE CONT on RH reset panel.",
  cbs: "ZONE CONT"
},
{
  ata: "21",
  msg: "COND FWD CRG COOL FAULT",
  condition: "MEL 21-28-02-D",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND FWD CRG HEAT FAULT",
  condition: "MEL 21-43-01",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND FWD CRG ISOL FAULT",
  condition: "MEL 21-28-02-B",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
{
  ata: "21",
  msg: "COND FWD CRG VENT FAULT",
  condition: "MEL 21-28-02-A",
  reset: "Reset breaker VENT CONT Lane 1/2 on RH reset panel.",
  cbs: "VENT CONT LANE 1 / 2"
},
/* ===================== VENTILATION ===================== */

{
  ata: "21",
  msg: "VENT BLOWING FAULT",
  condition: "MEL 21-21-02 / 21-26-08-A",
  reset: "Reset breaker AEVC on LH reset panel.",
  cbs: "AEVC"
},
{
  ata: "21",
  msg: "VENT EXTRACT FAULT",
  condition: "MEL 21-26-01",
  reset: "Reset breaker AEVC on LH reset panel.",
  cbs: "AEVC"
},
{
  ata: "21",
  msg: "VENT GND COOL FAULT",
  condition: "MEL 21-27",
  reset: "Reset breaker AEVC on LH reset panel.",
  cbs: "AEVC"
},
{
  ata: "21",
  msg: "VENT OVBD VALVE FAULT",
  condition: "MEL 21-26-02",
  reset: "Reset breaker AEVC on LH reset panel.",
  cbs: "AEVC"
},
{
  ata: "21",
  msg: "VENT PACK BAY VENT FAULT",
  condition: "MEL 21-25",
  reset: "Reset breaker AEVC on LH reset panel.",
  cbs: "AEVC"
},
/* ===================== AIR ===================== */

{
  ata: "36",
  msg: "AIR ABNORM BLEED CONFIG",
  condition: "MEL 36-11-01",
  reset: "Operational message only. No further action required.",
  cbs: "-"
},
{
  ata: "36",
  msg: "AIR APU BLEED FAULT",
  condition: "MEL 36-12-02",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36).",
  cbs: "BMC 1 / BMC 2"
},
{
  ata: "36",
  msg: "AIR APU BLEED LEAK",
  condition: "MEL 36-12-01 / 36-22-03",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36).",
  cbs: "BMC 1 / BMC 2"
},
{
  ata: "36",
  msg: "AIR BLEED LO TEMP",
  condition: "MEL 36-11-01",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36).",
  cbs: "BMC 1 / BMC 2"
},
{
  ata: "36",
  msg: "AIR BMC 1 + 2 FAULT",
  condition: "MEL 36-11-01",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36).",
  cbs: "BMC 1 / BMC 2"
},
{
  ata: "36",
  msg: "AIR BMC 3 + 4 FAULT",
  condition: "MEL 36-11-01",
  reset: "Perform BITE Test of BMC 3 and BMC 4 on MCDU (ATA 36).",
  cbs: "BMC 3 / BMC 4"
},
{
  ata: "36",
  msg: "AIR BMC 1 (2) (3) (4) FAULT",
  condition: "MEL 36-11-01",
  reset: "Perform BITE Test of affected BMC on MCDU (ATA 36).",
  cbs: "BMC"
},
{
  ata: "36",
  msg: "AIR ENG 1 (2) (3) (4) BLEED FAULT",
  condition: "MEL 36-11-01",
  reset: "Perform BITE Test of related BMC on MCDU (ATA 36).",
  cbs: "BMC"
},
{
  ata: "36",
  msg: "AIR ENG 1 (2) (3) (4) BLEED LEAK",
  condition: "NO DISPATCH / MEL 36-22-01",
  reset: "Perform BITE Test of related BMC on MCDU (ATA 36).",
  cbs: "BMC"
},
{
  ata: "36",
  msg: "AIR ENG 1 (2) (3) (4) BLEED NOT CLSD",
  condition: "MEL 36-11-02",
  reset: "Perform BITE Test of related BMC on MCDU (ATA 36).",
  cbs: "BMC"
},
{
  ata: "36",
  msg: "AIR ENG 1 (2) (3) (4) HPV NOT OPEN",
  condition: "MEL 36-11-07",
  reset: "Perform BITE Test of related BMC on MCDU (ATA 36).",
  cbs: "BMC"
},
{
  ata: "21",
  msg: "AIR HOT AIR SYS 1 (2) FAULT",
  condition: "MEL 21-63-03",
  reset: "Perform System Test of the Temperature Control system on MCDU (ATA 21).",
  cbs: "TEMP CTL"
},
{
  ata: "36",
  msg: "AIR L WING LEAK",
  condition: "NO DISPATCH / MEL 36-22-02",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36). Switch ENG 1 bleed OFF then ON.",
  cbs: "BMC 1 / BMC 2"
},
{
  ata: "36",
  msg: "AIR L WING LEAK DET FAULT",
  condition: "MEL 36-22-02",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36).",
  cbs: "BMC 1 / BMC 2"
},
{
  ata: "21",
  msg: "AIR PACK 1 + 2 FAULT",
  condition: "MEL 21-52-01",
  reset: "Check PACK 1 and PACK 2 push buttons ON. Check passenger doors closed and locked.",
  cbs: "PACK 1 / PACK 2"
},
{
  ata: "21",
  msg: "AIR PACK 1 OFF",
  condition: "MEL 21-52-01",
  reset: "Check PACK 1 push button ON.",
  cbs: "PACK 1"
},
{
  ata: "21",
  msg: "AIR PACK 1 OVHT",
  condition: "MEL 21-52-01",
  reset: "Perform System Test of the Temperature Control system on MCDU (ATA 21). Faulty Pack Controller 1 (531HH).",
  cbs: "531HH"
},
{
  ata: "21",
  msg: "AIR PACK 1 REGUL FAULT",
  condition: "MEL 21-52 / 21-53",
  reset: "Perform System Test of the Temperature Control system on MCDU (ATA 21). Faulty Pack Controller 1 (531HH).",
  cbs: "531HH"
},
{
  ata: "21",
  msg: "AIR PACK 2 OFF",
  condition: "MEL 21-52-01",
  reset: "Check PACK 2 push button ON.",
  cbs: "PACK 2"
},
{
  ata: "21",
  msg: "AIR PACK VALVE 1 FAULT",
  condition: "MEL 21-52-01",
  reset: "Faulty Pack Controller 1 (531HH).",
  cbs: "531HH"
},
{
  ata: "21",
  msg: "AIR PACK VALVE 2 FAULT",
  condition: "MEL 21-52-01",
  reset: "Faulty Pack Controller 2 (532HH).",
  cbs: "532HH"
},
{
  ata: "21",
  msg: "AIR PACK 2 OVHT",
  condition: "MEL 21-52-01",
  reset: "Perform System Test of the Temperature Control system on MCDU (ATA 21). Faulty Pack Controller 2 (532HH).",
  cbs: "532HH"
},
{
  ata: "21",
  msg: "AIR PACK 2 REGUL FAULT",
  condition: "MEL 21-52 / 21-53",
  reset: "Perform System Test of the Temperature Control system on MCDU (ATA 21). Faulty Pack Controller 2 (532HH).",
  cbs: "532HH"
},
{
  ata: "36",
  msg: "AIR R WING LEAK",
  condition: "NO DISPATCH / MEL 36-22-02",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36). Switch ENG 2 bleed OFF then ON.",
  cbs: "BMC 1 / BMC 2"
},
{
  ata: "36",
  msg: "AIR R WING LEAK DET FAULT",
  condition: "MEL 36-22-02",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36).",
  cbs: "BMC 1 / BMC 2"
},
{
  ata: "36",
  msg: "AIR X BLEED FAULT",
  condition: "MEL 36-12-04",
  reset: "Perform BITE Test of BMC 1 and BMC 2 on MCDU (ATA 36).",
  cbs: "BMC 1 / BMC 2"
},
/* ===================== AUTO FLIGHT ===================== */

{
  ata: "22",
  msg: "AUTO FLT A/THR LIMITED",
  condition: "NOT APPLICABLE",
  reset: "Operational message only. No further action required.",
  cbs: "-"
},
{
  ata: "22",
  msg: "AUTO FLT A/THR OFF",
  condition: "MEL 22-30-01",
  reset: "Reset breaker FMGEC 1 on LH reset panel. Reset breaker FMGEC 2 on RH reset panel.",
  cbs: "FMGEC 1 / FMGEC 2"
},
{
  ata: "22",
  msg: "AUTO FLT AP OFF",
  condition: "MEL 22-10-01",
  reset: "Reset breaker FMGEC 1 on LH reset panel. Reset breaker FMGEC 2 on RH reset panel. Recycle FCPC 1, 2 and 3.",
  cbs: "FMGEC 1 / FMGEC 2 / FCPC"
},
{
  ata: "22",
  msg: "AUTO FLT FCU FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breaker FMGEC 1 on LH reset panel. Reset breaker FMGEC 2 on RH reset panel. Reset breaker FCU 1 on LH reset panel. Reset breaker FCU 2 on RH reset panel.",
  cbs: "FMGEC 1 / FMGEC 2 / FCU 1 / FCU 2"
},
{
  ata: "22",
  msg: "AUTO FLT FM 1 + 2 FAULT",
  condition: "MEL 22-83-01",
  reset: "Reset breaker FMGEC 1 on LH reset panel. Reset breaker FMGEC 2 on RH reset panel.",
  cbs: "FMGEC 1 / FMGEC 2"
},
{
  ata: "22",
  msg: "AUTO FLT FM 1 FAULT",
  condition: "MEL 22-72-01",
  reset: "Reset breaker FMGEC 1 on LH reset panel.",
  cbs: "FMGEC 1"
},
{
  ata: "22",
  msg: "AUTO FLT FM 2 FAULT",
  condition: "MEL 22-72-01",
  reset: "Reset breaker FMGEC 2 on RH reset panel.",
  cbs: "FMGEC 2"
},
{
  ata: "22",
  msg: "AUTO FLT REAC W/S DET FAULT",
  condition: "MEL 22-60-02-B",
  reset: "Perform System Test of the Auto Flight System on MCDU (ATA 22).",
  cbs: "-"
},
/* ===================== COMMUNICATION ===================== */

{
  ata: "23",
  msg: "COM ACARS FAULT",
  condition: "MEL 23-24-01",
  reset: "Perform BITE Test of ACARS on MCDU (COM-Radio).",
  cbs: "-"
},
{
  ata: "23",
  msg: "COM ACARS ALERT",
  condition: "NOT APPLICABLE",
  reset: "If no message on PFR, no action required.",
  cbs: "-"
},
{
  ata: "23",
  msg: "COM ACARS CALL",
  condition: "NOT APPLICABLE",
  reset: "If no message on PFR, no action required.",
  cbs: "-"
},
{
  ata: "23",
  msg: "COM CIDS 1 + 2 FAULT",
  condition: "MEL 23-73-01-A",
  reset: "Reset breakers CIDS 1, CIDS 2 and DMC 3 on LH and RH reset panels.",
  cbs: "CIDS 1 / CIDS 2 / DMC 3"
},
{
  ata: "23",
  msg: "COM CIDS PA FAULT",
  condition: "MEL 23-31-01",
  reset: "Perform interface and power-up test: Open CIDS DIR 1 and DIR 2 ESS CBs on panel 742VU. Open CIDS DIR 1 and DIR 2 NORM CBs on panel 722VU. Then close all breakers again.",
  cbs: "CIDS DIR 1 / DIR 2"
},
{
  ata: "23",
  msg: "COM HF 1 EMMITTING",
  condition: "NO DISPATCH",
  reset: "Reset breaker 2RE1 on panel 721VU.",
  cbs: "2RE1 (721VU)"
},
{
  ata: "23",
  msg: "COM HF 2 EMMITTING",
  condition: "NO DISPATCH",
  reset: "Reset breaker 2RE2 on panel 722VU.",
  cbs: "2RE2 (722VU)"
},
{
  ata: "23",
  msg: "COM VHF 1 EMMITTING",
  condition: "NO DISPATCH",
  reset: "Reset breaker 2RC1 on panel 742VU.",
  cbs: "2RC1 (742VU)"
},
{
  ata: "23",
  msg: "COM VHF 2 EMMITTING",
  condition: "NO DISPATCH",
  reset: "Reset breaker 2RC2 on panel 722VU.",
  cbs: "2RC2 (722VU)"
},
{
  ata: "23",
  msg: "COM VHF 3 EMMITTING",
  condition: "NO DISPATCH",
  reset: "Reset breaker 2RC3 on panel 721VU.",
  cbs: "2RC3 (721VU)"
},
/* ===================== ELECTRICAL ===================== */

{
  ata: "24",
  msg: "ELEC AC BUS 1-1 FAULT",
  condition: "NO DISPATCH",
  reset: "On panel 721VU cycle breakers M09, N11, Q05 and N07. On panel 722VU cycle breakers M39, L45 and M43. On panel 742VU cycle breakers A78, J77, E79 and H77.",
  cbs: "721VU / 722VU / 742VU"
},
{
  ata: "24",
  msg: "ELEC AC BUS 1-2 FAULT",
  condition: "NO DISPATCH",
  reset: "On panel 721VU cycle breakers M09, N11, Q05 and N07. On panel 722VU cycle breakers M39, L45 and M43. On panel 742VU cycle breakers A78, J77, E79 and H77.",
  cbs: "721VU / 722VU / 742VU"
},
{
  ata: "24",
  msg: "ELEC AC BUS 2-3 FAULT",
  condition: "NO DISPATCH",
  reset: "On panel 721VU cycle breakers M09, N11, Q05 and N07. On panel 722VU cycle breakers M39, L45 and M43. On panel 742VU cycle breakers A78, J77, E79 and H77.",
  cbs: "721VU / 722VU / 742VU"
},
{
  ata: "24",
  msg: "ELEC AC BUS 2-4 FAULT",
  condition: "NO DISPATCH",
  reset: "On panel 721VU cycle breakers M09, N11, Q05 and N07. On panel 722VU cycle breakers M39, L45 and M43. On panel 742VU cycle breakers A78, J77, E79 and H77.",
  cbs: "721VU / 722VU / 742VU"
},
{
  ata: "24",
  msg: "ELEC AC ESS BUS ALTN",
  condition: "NO DISPATCH",
  reset: "Perform ESS generation manual switching test. Open CB 1XC on panel 715VU. Release AC ESS FEED pushbutton. Close CB 1XC. Push AC ESS FEED PB. Perform automatic switching test. Open then close CB 41XN and 5XC on panel 721VU.",
  cbs: "1XC / 41XN / 5XC"
},
{
  ata: "24",
  msg: "ELEC AC ESS BUS FAULT",
  condition: "NO DISPATCH",
  reset: "Cycle CB 17XH and 12XH on panel 742VU.",
  cbs: "17XH / 12XH"
},
{
  ata: "24",
  msg: "ELEC AC ESS BUS SHED",
  condition: "NO DISPATCH",
  reset: "Cycle CB 8XH, 15XH and 17XH on panel 742VU.",
  cbs: "8XH / 15XH / 17XH"
},
{
  ata: "24",
  msg: "ELEC APU BAT FAULT",
  condition: "MEL 24-38-01-A",
  reset: "Switch APU Battery OFF.",
  cbs: "APU BAT"
},
{
  ata: "24",
  msg: "ELEC APU BAT OFF",
  condition: "MEL 24-38-01-A",
  reset: "Operational message only. No further action required.",
  cbs: "-"
},
{
  ata: "24",
  msg: "ELEC APU BCL FAULT",
  condition: "MEL 24-38-01-B",
  reset: "Switch APU Battery OFF.",
  cbs: "APU BAT"
},
{
  ata: "24",
  msg: "ELEC APU GEN FAULT",
  condition: "MEL 24-23-01",
  reset: "Perform APU GCU BITE test on MCDU (ATA 24-AC-EPGS).",
  cbs: "-"
},
{
  ata: "24",
  msg: "ELEC APU GEN OVERLOAD",
  condition: "MEL 24-26-01",
  reset: "Perform EMCU BITE test on MCDU (ATA 24-AC-EMCU).",
  cbs: "-"
},
{
  ata: "24",
  msg: "ELEC APU TR FAULT",
  condition: "MEL 24-32-01",
  reset: "Perform APU TR reset on APU TR or via MCDU (ATA 24).",
  cbs: "APU TR"
},
{
  ata: "24",
  msg: "ELEC BAT 1 FAULT",
  condition: "MEL 24-38-01-A",
  reset: "Switch BAT 1 OFF then ON.",
  cbs: "BAT 1"
},
{
  ata: "24",
  msg: "ELEC BAT 1 OFF",
  condition: "NOT APPLICABLE",
  reset: "Switch BAT 1 ON.",
  cbs: "BAT 1"
},
{
  ata: "24",
  msg: "ELEC BAT 2 FAULT",
  condition: "MEL 24-38-01-A",
  reset: "Switch BAT 2 OFF then ON.",
  cbs: "BAT 2"
},
{
  ata: "24",
  msg: "ELEC BAT 2 OFF",
  condition: "NOT APPLICABLE",
  reset: "Switch BAT 2 ON.",
  cbs: "BAT 2"
},
{
  ata: "24",
  msg: "ELEC BCL 1 FAULT",
  condition: "MEL 24-38-01-B",
  reset: "Switch BAT 1 OFF then ON.",
  cbs: "BAT 1"
},
{
  ata: "24",
  msg: "ELEC BCL 2 FAULT",
  condition: "MEL 24-38-01-B",
  reset: "Switch BAT 2 OFF then ON.",
  cbs: "BAT 2"
},
{
  ata: "24",
  msg: "ELEC BUS TIE OFF",
  condition: "NOT APPLICABLE",
  reset: "Switch BUS TIE ON.",
  cbs: "BUS TIE"
},
{
  ata: "24",
  msg: "ELEC C/B MONITOR FAULT",
  condition: "MEL 24-53-01-A",
  reset: "Perform CBMU BITE test on MCDU (ATA 24).",
  cbs: "CBMU"
},
{
  ata: "24",
  msg: "ELEC C/B TRIPPED",
  condition: "REFER TO AFFECTED SYSTEM",
  reset: "Operational message only. No further action required.",
  cbs: "-"
},
{
  ata: "24",
  msg: "ELEC DC BAT BUS FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breakers ECMU 1 and ECMU 2 on panels 722VU and 742VU.",
  cbs: "ECMU 1 / ECMU 2"
},
{
  ata: "24",
  msg: "ELEC DC BUS 1 + 2 FAULT",
  condition: "NO DISPATCH",
  reset: "Check GPCU.",
  cbs: "GPCU"
},
{
  ata: "24",
  msg: "ELEC DC BUS 1 FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breakers ECMU 1 and ECMU 2 on panels 722VU and 742VU.",
  cbs: "ECMU 1 / ECMU 2"
},
{
  ata: "24",
  msg: "ELEC DC BUS 2 FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breakers ECMU 1 and ECMU 2 on panels 722VU and 742VU.",
  cbs: "ECMU 1 / ECMU 2"
},
{
  ata: "24",
  msg: "ELEC DC ESS BUS FAULT",
  condition: "NO DISPATCH",
  reset: "Check ELEC DC system for normal configuration.",
  cbs: "-"
},
{
  ata: "24",
  msg: "ELEC DC ESS BUS SHED",
  condition: "NO DISPATCH",
  reset: "Reset breakers 801PP and 805PP on panel 742VU position N63.",
  cbs: "801PP / 805PP"
},
{
  ata: "24",
  msg: "ELEC ECMU 1 FAULT",
  condition: "MEL 24-29-01",
  reset: "Perform ECMU 1 BITE test on MCDU (ATA 24).",
  cbs: "ECMU 1"
},
{
  ata: "24",
  msg: "ELEC ECMU 2 FAULT",
  condition: "MEL 24-29-01",
  reset: "Perform ECMU 2 BITE test on MCDU (ATA 24).",
  cbs: "ECMU 2"
},
{
  ata: "24",
  msg: "ELEC EMER CONFIG",
  condition: "NO DISPATCH",
  reset: "Operational message only. No further action required.",
  cbs: "-"
},
{
  ata: "24",
  msg: "ELEC ESS TR FAULT",
  condition: "MEL 24-34-01",
  reset: "Perform ESS TR reset on ESS TR or via MCDU (ATA 24).",
  cbs: "ESS TR"
},
{
  ata: "24",
  msg: "ELEC EXT PWR A OVERLOAD",
  condition: "MEL 24-26-01",
  reset: "Perform ECMU 2 BITE test on MCDU (ATA 24).",
  cbs: "ECMU 2"
},
{
  ata: "24",
  msg: "ELEC EXT PWR B OVERLOAD",
  condition: "MEL 24-26-01",
  reset: "Perform ECMU 1 BITE test on MCDU (ATA 24).",
  cbs: "ECMU 1"
},
{
  ata: "24",
  msg: "ELEC GEN 1 (2) (3) (4) FAULT",
  condition: "MEL 24-22-01",
  reset: "Perform GCU BITE test on MCDU (ATA 24).",
  cbs: "GCU"
},
{
  ata: "24",
  msg: "ELEC GEN 1 (2) (3) (4) OFF",
  condition: "NOT APPLICABLE",
  reset: "Cycle GEN push button switch.",
  cbs: "GEN"
},
{
  ata: "24",
  msg: "ELEC GEN 1 (2) (3) (4) OVERLOAD",
  condition: "MEL 24-26-01",
  reset: "Push galley and commercial pushbuttons OFF and check RCCBs.",
  cbs: "RCCB"
},
{
  ata: "24",
  msg: "ELEC IDG 1 (2) (3) (4) DISCONNECTED",
  condition: "MEL 24-22-01",
  reset: "Check PFR for IDG oil messages. Check IDG oil level and reconnect.",
  cbs: "IDG"
},
{
  ata: "24",
  msg: "ELEC IDG 1 (2) (3) (4) MINOR FAULT",
  condition: "MEL 24-22-02",
  reset: "Check PFR for IDG oil level messages.",
  cbs: "IDG"
},
{
  ata: "24",
  msg: "ELEC IDG 1 (2) (3) (4) OIL LO PR",
  condition: "MEL 24-22-01",
  reset: "Check IDG oil level or IDG cooler.",
  cbs: "IDG"
},
{
  ata: "24",
  msg: "ELEC IDG 1 (2) (3) (4) OIL OVHT",
  condition: "MEL 24-22-01",
  reset: "Check IDG oil level or IDG cooler.",
  cbs: "IDG"
},
{
  ata: "24",
  msg: "ELEC PART GALLEY SHED",
  condition: "NOT APPLICABLE",
  reset: "Operational message only. No further action required.",
  cbs: "-"
},
{
  ata: "24",
  msg: "ELEC STATIC INV FAULT",
  condition: "NO DISPATCH",
  reset: "Check breaker 6XB 'STAT INV CTL' on panel 742VU position N65.",
  cbs: "6XB"
},
{
  ata: "24",
  msg: "ELEC TR 1 FAULT",
  condition: "MEL 24-32-01",
  reset: "Perform TR 1 reset on TR 1 or via MCDU (ATA 24).",
  cbs: "TR 1"
},
{
  ata: "24",
  msg: "ELEC TR 2 FAULT",
  condition: "MEL 24-32-01",
  reset: "Perform TR 2 reset on TR 2 or via MCDU (ATA 24).",
  cbs: "TR 2"
},
/* ===================== APU / FIRE ===================== */

{
  ata: "26",
  msg: "APU FIRE",
  condition: "NO DISPATCH",
  reset: "Perform BITE test of the APU fire and overheat detector unit (ATA 26).",
  cbs: "APU FIRE DET"
},
/* ===================== SMOKE / FIRE ===================== */

{
  ata: "26",
  msg: "SMOKE AFT CRG BTL 1 FAULT",
  condition: "MEL 26-23-01",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE AFT CRG BTL 2 FAULT",
  condition: "MEL 26-23-01",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE AFT CRG DET FAULT",
  condition: "MEL 26-16-02",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE AFT/BULK CRG SMOKE",
  condition: "NO DISPATCH",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel. If no real smoke in bulk or air conditioning system, perform BITE test of Smoke Detection System with MCDU (ATA 26).",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE AVIONICS DET FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE AVNCS VENT SMOKE",
  condition: "NO DISPATCH",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel. If no real smoke in bulk or air conditioning system, perform BITE test of Smoke Detection System with MCDU (ATA 26).",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE BULK CRG DET FAULT",
  condition: "MEL 26-16-03",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE CAB REST DET FAULT",
  condition: "MEL 26-18-02",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE CAB REST SMOKE",
  condition: "NO DISPATCH",
  reset: "Check for real smoke in Cabin Attendant Rest Room. Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE DET FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breakers SIDS 1 and 2 on LH and RH reset panel. Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SIDS 1, SIDS 2, SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE FLT REST DET FAULT",
  condition: "MEL 26-18-01",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE FLT REST SMOKE",
  condition: "NO DISPATCH",
  reset: "Check for real smoke in Flight Crew Rest Room. Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE FWD CRG BTL 1 FAULT",
  condition: "MEL 26-23-01",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE FWD CRG BTL 2 FAULT",
  condition: "MEL 26-23-01",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE FWD CRG DET FAULT",
  condition: "MEL 26-16-01",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE FWD CRG SMOKE",
  condition: "NO DISPATCH",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel. If no real smoke in bulk or air conditioning system, perform BITE test of Smoke Detection System with MCDU (ATA 26).",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE LAVATORY DET FAULT",
  condition: "MEL 26-17-01",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel.",
  cbs: "SDCU 1, SDCU 2"
},
{
  ata: "26",
  msg: "SMOKE LAVATORY SMOKE",
  condition: "NO DISPATCH",
  reset: "Reset breakers SDCU 1 and 2 on LH and RH reset panel. If no real smoke in bulk or air conditioning system, perform BITE test of Smoke Detection System with MCDU (ATA 26).",
  cbs: "SDCU 1, SDCU 2"
},
/* ===================== FLIGHT CONTROLS (F/CTL) ===================== */

{
  ata: "27",
  msg: "F/CTL ADR DISAGREE",
  condition: "NO DISPATCH",
  reset: "Check PFR.",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL AIL SERVO FAULT",
  condition: "MEL 27-14-01",
  reset: "Cycle FCPC 2 (Flight Control Primary Computer).",
  cbs: "FCPC 2"
},
{
  ata: "27",
  msg: "F/CTL ALTN LAW",
  condition: "NO DISPATCH",
  reset: "Cycle FCPC 1 and 2. Cycle FCSC 1 and 2.",
  cbs: "FCPC 1, FCPC 2, FCSC 1, FCSC 2"
},
{
  ata: "27",
  msg: "F/CTL DIRECT LAW",
  condition: "NO DISPATCH",
  reset: "Check PFR.",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL ELEV REDUND LOST",
  condition: "NO DISPATCH",
  reset: "Perform BITE test of EFCS ground scanning through MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL ELEV SERVO FAULT",
  condition: "MEL 27-43-01",
  reset: "Perform BITE test of EFCS ground scanning through MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL FCFC 1 FAULT",
  condition: "MEL 27-95-01",
  reset: "Reset FCDC 1 on LH reset panel.",
  cbs: "FCDC 1"
},
{
  ata: "27",
  msg: "F/CTL FCDC 1 + 2 FAULT",
  condition: "MEL 27-95-01",
  reset: "Reset FCFC 1 and 2 on LH and RH reset panels.",
  cbs: "FCFC 1, FCFC 2"
},
{
  ata: "27",
  msg: "F/CTL FCDC 2 FAULT",
  condition: "MEL 27-95-01",
  reset: "Reset FCDC 2 on RH reset panel.",
  cbs: "FCDC 2"
},
{
  ata: "27",
  msg: "F/CTL FLAP SYS 1 FAULT",
  condition: "MEL 27-51-01",
  reset: "Cycle breakers SFCC 1 NORM (721VU X14), SFCC 1 AVAIL (721VU X13), SFCC 1 SLAT (742VU L62), SFCC 1 FLAP (742VU L61).",
  cbs: "SFCC 1"
},
{
  ata: "27",
  msg: "F/CTL FLAP SYS 2 FAULT",
  condition: "MEL 27-51-01",
  reset: "Cycle breakers SFCC 2 SLAT (722VU T43) and SFCC 2 FLAP (722VU V40).",
  cbs: "SFCC 2"
},
{
  ata: "27",
  msg: "F/CTL FLAP TIP BRK FAULT",
  condition: "NO DISPATCH",
  reset: "Reset Wing Tip Brake with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL FLAP/MCDU DISAGREE",
  condition: "NO DISPATCH",
  reset: "Check PFR.",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL FLAPS FAULT",
  condition: "NO DISPATCH",
  reset: "Reset Wing Tip Brake with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL FLAPS LOCKED",
  condition: "NO DISPATCH",
  reset: "Reset Wing Tip Brake with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL GND SPLR FAULT",
  condition: "MEL 27-92-02 / 32-42-05",
  reset: "Cycle FCPC 1, 2 and 3.",
  cbs: "FCPC 1, FCPC 2, FCPC 3"
},
{
  ata: "27",
  msg: "F/CTL IR DISAGREE",
  condition: "NO DISPATCH",
  reset: "Check PFR.",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL L SIDESTICK FAULT",
  condition: "NO DISPATCH",
  reset: "Check PFR.",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL R SIDESTICK FAULT",
  condition: "NO DISPATCH",
  reset: "Check PFR. Perform BITE test of EFCS ground scanning with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL RUD TRIM FAULT",
  condition: "MEL 27-22-01",
  reset: "Check PFR. Push rudder trim reset switch on rudder trim control panel (115VU).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL SLAT TIP BRK FAULT",
  condition: "NO DISPATCH",
  reset: "Reset Wing Tip Brake with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL SLATS FAULT",
  condition: "NO DISPATCH",
  reset: "Reset Wing Tip Brake with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL SLATS LOCKED",
  condition: "NO DISPATCH",
  reset: "Reset Wing Tip Brake with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL SPD BRK DISAGREE",
  condition: "MEL 27-92-01",
  reset: "Check PFR.",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL SPD BRK FAULT",
  condition: "MEL 27-92-01",
  reset: "Perform BITE test of EFCS ground scanning with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL SPLR FAULT",
  condition: "MEL 27-64-01",
  reset: "Cycle FCPC 1 and 3.",
  cbs: "FCPC 1, FCPC 3"
},
{
  ata: "27",
  msg: "F/CTL STAB CTL FAULT",
  condition: "NO DISPATCH",
  reset: "Perform BITE test of EFCS ground scanning with MCDU (ATA 27).",
  cbs: "-"
},
{
  ata: "27",
  msg: "F/CTL TURB DAMP FAULT",
  condition: "MEL 27-93-05",
  reset: "Cycle FCPC 1 and 3.",
  cbs: "FCPC 1, FCPC 3"
},
{
  ata: "27",
  msg: "F/CTL YAW DAMPER 1",
  condition: "MEL 27-26-01",
  reset: "Cycle FCPC 1 and FCSC 1.",
  cbs: "FCPC 1, FCSC 1"
},
{
  ata: "27",
  msg: "F/CTL YAW DAMPER 2",
  condition: "MEL 27-26-01",
  reset: "Cycle FCPC 3 and FCSC 2.",
  cbs: "FCPC 3, FCSC 2"
},
{
  ata: "27",
  msg: "F/CTL YAW DAMPER 3",
  condition: "MEL 27-26-01",
  reset: "Perform BITE test of EFCS ground scanning with MCDU (ATA 27).",
  cbs: "-"
},
/* ===================== FUEL (ATA 28) ===================== */

{
  ata: "28",
  msg: "FUEL ABNORMAL MAN FWD XFR",
  condition: "NOT APPLICABLE",
  reset: "No action required.",
  cbs: "-"
},
{
  ata: "28",
  msg: "FUEL APU AFT PUMP FAULT",
  condition: "MEL 49-30-01-A",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL APU LP VALVE FAULT",
  condition: "MEL 49-30-03",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL CTR TO INNER FAULT",
  condition: "MEL 49-30-03",
  reset: "Reset breaker FCMC 2 on RH reset panel.",
  cbs: "FCMC 2"
},
{
  ata: "28",
  msg: "FUEL ENG1 LP VALVE FAULT",
  condition: "MEL 28-24-01",
  reset: "Reset breakers FWC 1 and 2 on LH and RH reset panels.",
  cbs: "FWC 1, FWC 2"
},
{
  ata: "28",
  msg: "FUEL ENG2 LP VALVE FAULT",
  condition: "MEL 28-24-01",
  reset: "Reset breakers FWC 1 and 2 on LH and RH reset panels.",
  cbs: "FWC 1, FWC 2"
},
{
  ata: "28",
  msg: "FUEL ENG3 LP VALVE FAULT",
  condition: "MEL 28-24-01",
  reset: "Reset breakers FWC 1 and 2 on LH and RH reset panels.",
  cbs: "FWC 1, FWC 2"
},
{
  ata: "28",
  msg: "FUEL ENG4 LP VALVE FAULT",
  condition: "MEL 28-24-01",
  reset: "Reset breakers FWC 1 and 2 on LH and RH reset panels.",
  cbs: "FWC 1, FWC 2"
},
{
  ata: "28",
  msg: "FUEL EXCESS AFT CG",
  condition: "MEL 28-40-13-A",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL FCMC 1 FAULT",
  condition: "MEL 28-51-01-A / 28-51-01-B",
  reset: "Reset breaker FCMC 1 on LH reset panel.",
  cbs: "FCMC 1"
},
{
  ata: "28",
  msg: "FUEL FCMC 1 + 2 FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL FCMC 2 FAULT",
  condition: "MEL 28-51-01-A / 28-51-01-B",
  reset: "Reset breaker FCMC 2 on RH reset panel.",
  cbs: "FCMC 2"
},
{
  ata: "28",
  msg: "FUEL FUEL LO TEMP",
  condition: "MEL 28-49-02-A/B/C",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL JETTISON FAULT",
  condition: "MEL 28-31-02",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL JETTISON NOT CLOSED",
  condition: "MEL 28-31-01",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL L CTR PUMP LO PR",
  condition: "MEL 28-26-02",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL R CTR PUMP LO PR",
  condition: "MEL 28-26-01",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL L INNER TK HI TEMP",
  condition: "NOT APPLICABLE",
  reset: "Apply ECAM procedure. If MCDU shows no maintenance message, no further action required.",
  cbs: "-"
},
{
  ata: "28",
  msg: "FUEL L WING PUMPS LO PR",
  condition: "MEL 28-21-01-A / 28-21-01-B",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL L WING TK LO LVL",
  condition: "MEL 28-46-04-A",
  reset: "Check PFR. No further action required.",
  cbs: "-"
},
{
  ata: "28",
  msg: "FUEL L + R WING TK LO LVL",
  condition: "MEL 28-46-04-A",
  reset: "Check PFR. No further action required.",
  cbs: "-"
},
{
  ata: "28",
  msg: "FUEL PUMP 1 LO PR",
  condition: "MEL 28-21-01-A",
  reset: "Cycle breaker FUEL PUMP 1 on panel 742VU position S66.",
  cbs: "FUEL PUMP 1"
},
{
  ata: "28",
  msg: "FUEL PUMP 2 LO PR",
  condition: "MEL 28-21-02-A",
  reset: "Cycle breaker FUEL PUMP 2 on panel 721VU position J05.",
  cbs: "FUEL PUMP 2"
},
{
  ata: "28",
  msg: "FUEL PUMP 3 LO PR",
  condition: "MEL 28-21-01-A",
  reset: "Cycle breaker FUEL PUMP 3 on panel 722VU position G45.",
  cbs: "FUEL PUMP 3"
},
{
  ata: "28",
  msg: "FUEL PUMP 4 LO PR",
  condition: "MEL 28-21-01-A",
  reset: "Cycle breaker FUEL PUMP 4 on panel 722VU position A46.",
  cbs: "FUEL PUMP 4"
},
{
  ata: "28",
  msg: "FUEL OUTR TO INR FAULT",
  condition: "MEL 28-26-01",
  reset: "Perform operational test of FCMS controlled valves on MCDU (ATA 28).",
  cbs: "-"
},
{
  ata: "28",
  msg: "FUEL R INNER TK HI TEMP",
  condition: "NOT APPLICABLE",
  reset: "Apply ECAM procedure. If MCDU shows no maintenance message, no further action required.",
  cbs: "-"
},
{
  ata: "28",
  msg: "FUEL R WING PUMPS LO PR",
  condition: "MEL 28-21-01-A / 28-21-01-B",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL R WING TK LO LVL",
  condition: "MEL 28-46-04-A",
  reset: "Apply ECAM procedure. If no maintenance message on MCDU, no further action required.",
  cbs: "-"
},
{
  ata: "28",
  msg: "FUEL L + R CTR PUMPS LO PR",
  condition: "MEL 28-26-02",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL T TANK XFR FAULT",
  condition: "MEL 28-27",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL TRIM LINE FAULT",
  condition: "MEL 28-25-04-C / 28-27-01",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL WING TK OVERFLOW",
  condition: "NO DISPATCH",
  reset: "Reset breakers FCMC 1 and 2 on LH and RH reset panels.",
  cbs: "FCMC 1, FCMC 2"
},
{
  ata: "28",
  msg: "FUEL X FEED 1 (2) (3) (4) FAULT",
  condition: "MEL 28-23-01",
  reset: "Cycle Crossfeed Valve pushbutton switch.",
  cbs: "-"
},
{
  ata: "28",
  msg: "FUEL ZFW ZFCG DISAGREE",
  condition: "MEL 28-51-02",
  reset: "Check PFR. No further action required.",
  cbs: "-"
},
/* ===================== HYDRAULICS (HYD – ATA 29) ===================== */

{
  ata: "29",
  msg: "HYD B + Y SYS LO PR",
  condition: "MEL 29-30-03-F",
  reset: "Check hydraulic fluid levels.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD B ELEC PUMP FAULT",
  condition: "MEL 29-22-01 / 29-30-03-D",
  reset: "Cycle breaker HSMU B + PART G on panel 721VU position U11. Cycle breaker HYD PUMP B CTL on panel 721VU position X12.",
  cbs: "HSMU B, HYD PUMP B"
},
{
  ata: "29",
  msg: "HYD B ENG 2 PUMP LO PR",
  condition: "MEL 29-30-03-E",
  reset: "Check BLUE hydraulic fluid level. Bleed BLUE hydraulic system.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD B RSVR LO AIR PR",
  condition: "MEL 29-30-03-B",
  reset: "Check reservoir air pressure. Pressurize hydraulic reservoirs with APU bleed air (ENG MASTER to crank increases PX to 58 PSI for 30 seconds).",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD B RSVR LO LVL",
  condition: "MEL 29-30-03-A",
  reset: "Check BLUE hydraulic fluid level.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G + B SYS LO PR",
  condition: "MEL 29-30-03-F",
  reset: "Check hydraulic fluid levels.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G + Y SYS LO PR",
  condition: "MEL 29-30-03-F",
  reset: "Check hydraulic fluid levels.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G ELEC PUMP FAULT",
  condition: "MEL 29-21-01 / 29-30-03-D",
  reset: "Cycle breaker HSMU B + PART G on panel 721VU position U11. Cycle breaker HSMU Y + PART G on panel 722VU position X46.",
  cbs: "HSMU G, HSMU Y"
},
{
  ata: "29",
  msg: "HYD G ENG 1 PUMP LO PR",
  condition: "MEL 29-30-03-E",
  reset: "Check GREEN hydraulic fluid level. Bleed GREEN hydraulic system.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G ENG 1 + 4 PUMPS LO PR",
  condition: "MEL 29-30-03-E",
  reset: "Check GREEN hydraulic fluid level.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G ENG 4 PUMP LO PR",
  condition: "MEL 29-30-03-E",
  reset: "Check GREEN hydraulic fluid level. Bleed GREEN hydraulic system.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G RSVR LO AIR PR",
  condition: "MEL 29-30-03-B",
  reset: "Check reservoir air pressure. Pressurize hydraulic reservoirs with APU bleed air (ENG MASTER to crank increases PX to 58 PSI for 30 seconds).",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G RSVR LO LVL",
  condition: "MEL 29-30-03-A",
  reset: "Check GREEN hydraulic fluid level.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD B / G / Y RSVR OVHT",
  condition: "MEL 29-30-03-C",
  reset: "Check PFR.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G RSVR UNDERFILLED",
  condition: "NO DISPATCH",
  reset: "Check for obvious leaks. Refill GREEN hydraulic system reservoir.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD G SYS LEAK",
  condition: "NOT APPLICABLE",
  reset: "Cross-check GREEN reservoir fluid indication with ECAM HYD page. Check for obvious leaks.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD MONITORING FAULT",
  condition: "MEL 29-30-03-H",
  reset: "Reset breakers FWC 1 and 2, and SDAC 1 and 2 on LH and RH reset panels.",
  cbs: "FWC 1, FWC 2, SDAC 1, SDAC 2"
},
{
  ata: "29",
  msg: "HYD RAT FAULT",
  condition: "MEL 29-30-03-G",
  reset: "Pressurize GREEN hydraulic system. On YELLOW hydraulic service panel set ON/OFF switch to ON then back to OFF.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD Y ELEC PUMP FAULT",
  condition: "MEL 29-23-01-A / 29-30-03-D",
  reset: "Cycle breakers HSMU B + PART G (721VU U11), HYD PUMP Y SVCE (722VU N46), HYD PUMP Y CTL (722VU R36), HSMU Y + PART G (722VU X46).",
  cbs: "HYD PUMP Y, HSMU Y"
},
{
  ata: "29",
  msg: "HYD Y RSVR LO AIR PR",
  condition: "MEL 29-30-03-B",
  reset: "Check reservoir air pressure. Pressurize hydraulic reservoirs with APU bleed air (ENG MASTER to crank increases PX to 58 PSI for 30 seconds).",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD Y ENG 3 PUMP LO PR",
  condition: "MEL 29-30-03-E",
  reset: "Check YELLOW hydraulic fluid level. Bleed YELLOW hydraulic system.",
  cbs: "-"
},
{
  ata: "29",
  msg: "HYD RSVR LO LVL",
  condition: "MEL 29-30-03-A",
  reset: "Check all hydraulic reservoir fluid levels.",
  cbs: "-"
},
/* ===================== ANTI ICE (A.ICE – ATA 30) ===================== */

{
  ata: "30",
  msg: "A.ICE CAPT AOA HEAT",
  condition: "MEL 30-31-04",
  reset: "Reset breaker PHC1 on LH reset panel. Perform Probe Ice Protection system operational test with MCDU (ATA 30).",
  cbs: "PHC1"
},
{
  ata: "30",
  msg: "A.ICE CAPT PITOT HEAT",
  condition: "MEL 30-31-02",
  reset: "Reset breaker PHC1 on LH reset panel. Perform Probe Ice Protection system operational test with MCDU (ATA 30).",
  cbs: "PHC1"
},
{
  ata: "30",
  msg: "A.ICE CAPT PROBES HEAT",
  condition: "MEL 30-31-01",
  reset: "Reset breaker PHC1 on LH reset panel. Perform Probe Ice Protection system operational test with MCDU (ATA 30).",
  cbs: "PHC1"
},
{
  ata: "30",
  msg: "A.ICE CAPT TAT HEAT",
  condition: "MEL 30-31-05",
  reset: "Reset breaker PHC1 on LH reset panel. Perform Probe Ice Protection system operational test with MCDU (ATA 30).",
  cbs: "PHC1"
},
{
  ata: "30",
  msg: "A.ICE DETECT FAULT",
  condition: "MEL 30-81-01",
  reset: "Cycle breaker ICE DET 1 (721VU B08) and ICE DET 2 (722VU F46). Perform Probe Ice Detection system test with MCDU (ATA 30).",
  cbs: "ICE DET 1, ICE DET 2"
},
{
  ata: "30",
  msg: "A.ICE ENG VALVE CLOSED",
  condition: "MEL 30-21-01",
  reset: "Cycle affected ENG ANTI ICE breaker. Cycle FADEC A and B breakers. Check Engine Air Intake Anti-ice Valve (4000DN).",
  cbs: "ANTI ICE ENG, FADEC A/B"
},
{
  ata: "30",
  msg: "A.ICE ENG VALVE OPEN",
  condition: "MEL 30-21-01",
  reset: "Cycle affected ENG ANTI ICE breaker. Cycle FADEC A and B breakers.",
  cbs: "ANTI ICE ENG, FADEC A/B"
},
{
  ata: "30",
  msg: "A.ICE F/O AOA HEAT",
  condition: "MEL 30-31-02",
  reset: "Reset breaker PHC2 on RH reset panel. Perform Probe Ice Protection system operational test with MCDU (ATA 30).",
  cbs: "PHC2"
},
{
  ata: "30",
  msg: "A.ICE F/O PITOT HEAT",
  condition: "MEL 30-31-01",
  reset: "Reset breaker PHC2 on RH reset panel. Perform Probe Ice Protection system operational test with MCDU (ATA 30).",
  cbs: "PHC2"
},
{
  ata: "30",
  msg: "A.ICE F/O TAT HEAT",
  condition: "MEL 30-31-05",
  reset: "Reset breaker PHC2 on RH reset panel. Perform Probe Ice Protection system operational test with MCDU (ATA 30).",
  cbs: "PHC2"
},
{
  ata: "30",
  msg: "A.ICE L + R WINDOW HEAT",
  condition: "MEL 30-42-02",
  reset: "Reset breakers WHC 1 and WHC 2 on LH and RH reset panels.",
  cbs: "WHC1, WHC2"
},
{
  ata: "30",
  msg: "A.ICE L + R WSHLD HEAT",
  condition: "MEL 30-42-03",
  reset: "Reset breakers WHC 1 and WHC 2 on LH and RH reset panels.",
  cbs: "WHC1, WHC2"
},
{
  ata: "30",
  msg: "A.ICE WING HI PR",
  condition: "NO DISPATCH",
  reset: "Cycle breaker ANTI ICE WING (721VU W09). Faulty Wing Anti-Ice valve.",
  cbs: "ANTI ICE WING"
},
{
  ata: "30",
  msg: "A.ICE WING LO PR",
  condition: "MEL 30-11-01",
  reset: "Check Wing Anti-Ice Control Valve filter. Cycle breaker ANTI ICE WING (721VU W09). Possible faulty valve.",
  cbs: "ANTI ICE WING"
},
{
  ata: "30",
  msg: "A.ICE WING OPEN",
  condition: "MEL 30-11-01",
  reset: "Cycle breaker ANTI ICE WING (721VU W09). Possible faulty Wing Anti-Ice valve.",
  cbs: "ANTI ICE WING"
},
{
  ata: "30",
  msg: "A.ICE STBY PROBES / PITOT / AOA HEAT",
  condition: "MEL 30-31-01 / 02 / 04",
  reset: "Reset breaker PHC3 on LH reset panel. Perform Probe Ice Protection test with MCDU (ATA 30).",
  cbs: "PHC3"
},
{
  ata: "30",
  msg: "A.ICE WAI SYS FAULT",
  condition: "MEL 30-11-01",
  reset: "Reset breaker LGCIU on RH reset panel. Possible faulty Wing Anti-Ice Control or Mode relays.",
  cbs: "LGCIU"
},
{
  ata: "30",
  msg: "A.ICE WING OPEN ON GND",
  condition: "MEL 30-11-01",
  reset: "Check Wing Anti-Ice System Mode and Ground relays.",
  cbs: "-"
},
{
  ata: "30",
  msg: "A.ICE WING VALVE NOT OPEN",
  condition: "MEL 30-11-01",
  reset: "Cycle breaker ANTI ICE WING (721VU W09). Check inner and outer Wing Anti-Ice valves.",
  cbs: "ANTI ICE WING"
},
/* ===================== EIS / DISPLAY (ATA 31) ===================== */

{
  ata: "31",
  msg: "EIS DISPLAY DISCREPANCY",
  condition: "NO DISPATCH",
  reset: "Reset breakers DMC 1, 2 and 3 on LH and RH reset panels.",
  cbs: "DMC1, DMC2, DMC3"
},
{
  ata: "31",
  msg: "EIS ECAM DMC 1 FAULT",
  condition: "MEL 31-62-01-B",
  reset: "Reset breaker DMC 1 on LH reset panel.",
  cbs: "DMC1"
},
{
  ata: "31",
  msg: "EIS ECAM DMC 2 FAULT",
  condition: "MEL 31-62-01-B",
  reset: "Reset breaker DMC 2 on RH reset panel.",
  cbs: "DMC2"
},
{
  ata: "31",
  msg: "EIS ECAM DMC 3 FAULT",
  condition: "MEL 31-62-01-B",
  reset: "Reset breaker DMC 3 on LH reset panel.",
  cbs: "DMC3"
},
{
  ata: "31",
  msg: "EIS EFIS DMC 1 FAULT",
  condition: "MEL 31-62-01-A",
  reset: "Reset breaker DMC 1 on LH reset panel.",
  cbs: "DMC1"
},
{
  ata: "31",
  msg: "EIS EFIS DMC 2 FAULT",
  condition: "MEL 31-62-01-A",
  reset: "Reset breaker DMC 2 on RH reset panel.",
  cbs: "DMC2"
},
{
  ata: "31",
  msg: "EIS EFIS DMC 3 FAULT",
  condition: "MEL 31-62-01-A",
  reset: "Reset breaker DMC 3 on LH reset panel.",
  cbs: "DMC3"
},
/* ===================== FWS / RECORDER (ATA 31) ===================== */

{
  ata: "31",
  msg: "FWS EPC FAULT",
  condition: "MEL 31-56-01",
  reset: "Reset breakers FWC 1 and SDAC 1 on LH reset panel. Reset breakers FWC 2 and SDAC 2 on RH reset panel.",
  cbs: "FWC1, SDAC1, FWC2, SDAC2"
},
{
  ata: "31",
  msg: "FWS FWC 1 FAULT",
  condition: "MEL 31-53-01",
  reset: "Reset breaker FWC 1 on LH reset panel.",
  cbs: "FWC1"
},
{
  ata: "31",
  msg: "FWS FWC 1 + 2 FAULT",
  condition: "MEL 31-53-01",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels.",
  cbs: "FWC1, FWC2"
},
{
  ata: "31",
  msg: "FWS FWC 2 FAULT",
  condition: "MEL 31-53-01",
  reset: "Reset breaker FWC 2 on RH reset panel.",
  cbs: "FWC2"
},
{
  ata: "31",
  msg: "FWS SDAC 1 FAULT",
  condition: "MEL 31-55-01",
  reset: "Reset breaker SDAC 1 on LH reset panel.",
  cbs: "SDAC1"
},
{
  ata: "31",
  msg: "FWS SDAC 1 + 2 FAULT",
  condition: "MEL 31-55-01",
  reset: "Reset breakers SDAC 1 and SDAC 2 on LH and RH reset panels.",
  cbs: "SDAC1, SDAC2"
},
{
  ata: "31",
  msg: "FWS SDAC 2 FAULT",
  condition: "MEL 31-55-01",
  reset: "Reset breaker SDAC 2 on RH reset panel.",
  cbs: "SDAC2"
},
{
  ata: "31",
  msg: "RECORDER DFDR FAULT",
  condition: "NO DISPATCH",
  reset: "Cycle breaker FDIU/DFDR on panel 722VU position F42.",
  cbs: "FDIU/DFDR"
},
{
  ata: "31",
  msg: "RECORDER FDIU FAULT",
  condition: "NO DISPATCH",
  reset: "Cycle breaker FDIU/DFDR on panel 722VU position F42.",
  cbs: "FDIU/DFDR"
},
/* ===================== WHEELS / BRAKES / L/G (ATA 32) ===================== */

{
  ata: "32",
  msg: "WHEEL HYD SEL VALVE",
  condition: "NO DISPATCH",
  reset: "Cycle A/SKID & N/W STRG switch on F/O instrument panel.",
  cbs: "A/SKID & N/W STRG"
},
{
  ata: "32",
  msg: "WHEEL N/W STRG FAULT",
  condition: "MEL 32-51-01",
  reset: "Cycle A/SKID & N/W STRG switch on F/O instrument panel. Reset breakers LGCIU 1 and LGCIU 2 on LH and RH reset panels.",
  cbs: "LGCIU1, LGCIU2"
},
{
  ata: "32",
  msg: "WHEEL TIRE LO PR",
  condition: "NO DISPATCH",
  reset: "Cycle A/SKID & N/W STRG switch on F/O instrument panel. Adjust tire pressures as required.",
  cbs: "A/SKID & N/W STRG"
},

/* --------------------- BRAKES --------------------- */

{
  ata: "32",
  msg: "BRAKES A/SKID NWS OFF",
  condition: "Not Applicable",
  reset: "No action required if A/SKID & N/W STRG switch is in OFF position.",
  cbs: ""
},
{
  ata: "32",
  msg: "BRAKES ANTI SKID FAULT",
  condition: "NO DISPATCH",
  reset: "Cycle A/SKID & N/W STRG switch on F/O instrument panel.",
  cbs: "A/SKID & N/W STRG"
},
{
  ata: "32",
  msg: "BRAKES AUTO BRAKE FAULT",
  condition: "MEL 32-42-02 or 32-42-04",
  reset: "Cycle A/SKID & N/W STRG switch on F/O instrument panel.",
  cbs: "A/SKID & N/W STRG"
},
{
  ata: "32",
  msg: "BRAKES BSCU CH 1 FAULT",
  condition: "MEL 32-42-03",
  reset: "Perform BITE test of BSCU 1 on the MCDU (ATA 32).",
  cbs: "BSCU1"
},
{
  ata: "32",
  msg: "BRAKES BSCU CH 2 FAULT",
  condition: "MEL 32-42-03",
  reset: "Perform BITE test of BSCU 2 on the MCDU (ATA 32).",
  cbs: "BSCU2"
},
{
  ata: "32",
  msg: "BRAKES HOT",
  condition: "NO DISPATCH",
  reset: "Max 150°C difference between brakes on same gear. Max 200°C difference between LH and RH rear brakes. Cool down brakes or delay dispatch.",
  cbs: ""
},
{
  ata: "32",
  msg: "BRAKES RELEASED",
  condition: "MEL 32-42-01 or 32-42-05",
  reset: "Perform BITE test of BSCU 1 and BSCU 2 on the MCDU (ATA 32).",
  cbs: "BSCU1, BSCU2"
},
{
  ata: "32",
  msg: "BRAKES RESIDUAL BRAKING",
  condition: "MEL 32-42-01",
  reset: "Perform BITE test of BSCU 1 and BSCU 2 on the MCDU (ATA 32).",
  cbs: "BSCU1, BSCU2"
},

/* --------------------- LANDING GEAR --------------------- */

{
  ata: "32",
  msg: "L/G DOORS NOT CLOSED",
  condition: "NO DISPATCH",
  reset: "Perform visual inspection of landing gear doors. Reset breakers LGCIU 1 and LGCIU 2 on LH and RH reset panels.",
  cbs: "LGCIU1, LGCIU2"
},
{
  ata: "32",
  msg: "L/G GEAR NOT DOWN",
  condition: "Not Applicable",
  reset: "No action required if no PFR report.",
  cbs: ""
},
{
  ata: "32",
  msg: "L/G GEAR NOT DOWNLOCKED",
  condition: "Not Applicable",
  reset: "Reset breakers LGCIU 1 and LGCIU 2 on LH and RH reset panels.",
  cbs: "LGCIU1, LGCIU2"
},
{
  ata: "32",
  msg: "L/G GEAR NOT UPLOCKED",
  condition: "Not Applicable",
  reset: "Reset breakers LGCIU 1 and LGCIU 2 on LH and RH reset panels.",
  cbs: "LGCIU1, LGCIU2"
},
{
  ata: "32",
  msg: "L/G GEAR UPLOCK FAULT",
  condition: "FCOM 2-04-25",
  reset: "Check uplock assembly of all landing gears.",
  cbs: ""
},
{
  ata: "32",
  msg: "L/G L LENGTHENING FAULT",
  condition: "FCOM 2-04-25",
  reset: "Check for damage to shortening mechanism or proximity sensor target on LH gear.",
  cbs: ""
},
{
  ata: "32",
  msg: "L/G R LENGTHENING FAULT",
  condition: "FCOM 2-04-25",
  reset: "Check for damage to shortening mechanism or proximity sensor target on RH gear.",
  cbs: ""
},
{
  ata: "32",
  msg: "L/G LGCIU 1 FAULT",
  condition: "MEL 32-31-01",
  reset: "Reset breakers FWC 1 and LGCIU 1 on LH reset panel. Reset breakers FWC 2 and LGCIU 2 on RH reset panel.",
  cbs: "FWC1, LGCIU1, FWC2, LGCIU2"
},
{
  ata: "32",
  msg: "L/G LGCIU 1 + 2 FAULT",
  condition: "MEL 32-31-01",
  reset: "Reset breakers FWC 1 and LGCIU 1 on LH reset panel. Reset breakers FWC 2 and LGCIU 2 on RH reset panel.",
  cbs: "FWC1, LGCIU1, FWC2, LGCIU2"
},
{
  ata: "32",
  msg: "L/G LGCIU 2 FAULT",
  condition: "MEL 32-31-01",
  reset: "Reset breakers FWC 1 and LGCIU 1 on LH reset panel. Reset breakers FWC 2 and LGCIU 2 on RH reset panel.",
  cbs: "FWC1, LGCIU1, FWC2, LGCIU2"
},
{
  ata: "32",
  msg: "L/G RETRACTION FAULT",
  condition: "FCOM 2-04-25",
  reset: "Check for damage to proximity sensors or targets on all landing gears.",
  cbs: ""
},
{
  ata: "32",
  msg: "L/G SYS DISAGREE",
  condition: "NO DISPATCH",
  reset: "Reset breakers LGCIU 1 and LGCIU 2 on LH and RH reset panels.",
  cbs: "LGCIU1, LGCIU2"
},
/* ===================== NAV / ADR / IR / RA (ATA 34) ===================== */

{
  ata: "34",
  msg: "NAV ADR 1 FAULT",
  condition: "MEL 34-10-01-B",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels. Cycle breakers ADIRU1 115VAC (721VU C04), ADIRU1 28VDC (742VU B80) and ADIRU1 BAT (742VU K70).",
  cbs: "FWC1, FWC2, ADIRU1"
},
{
  ata: "34",
  msg: "NAV ADR 1 + 2 FAULT",
  condition: "MEL 34-10-01-B",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels. Check PFR.",
  cbs: "FWC1, FWC2"
},
{
  ata: "34",
  msg: "NAV ADR 1 + 3 FAULT",
  condition: "MEL 34-10-01-B",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels. Check PFR.",
  cbs: "FWC1, FWC2"
},
{
  ata: "34",
  msg: "NAV ADR 2 FAULT",
  condition: "MEL 34-10-01-B",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels. Cycle breakers ADIRU2 115VAC (722VU H46) and ADIRU2 BAT (742VU G73).",
  cbs: "FWC1, FWC2, ADIRU2"
},
{
  ata: "34",
  msg: "NAV ADR 2 + 3 FAULT",
  condition: "MEL 34-10-01-B",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels. Check PFR.",
  cbs: "FWC1, FWC2"
},
{
  ata: "34",
  msg: "NAV ADR 3 FAULT",
  condition: "MEL 34-10-01-B",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels. Cycle breakers ADIRU3 115VAC (721VU G05), ADIRU3 28VDC (742VU F68) and ADIRU3 BAT (742VU G74).",
  cbs: "FWC1, FWC2, ADIRU3"
},

{
  ata: "34",
  msg: "NAV ALTI DISCREPANCY",
  condition: "MEL 34-10-01-B",
  reset: "No action required if there is no failure on the PFR.",
  cbs: ""
},
{
  ata: "34",
  msg: "NAV ATT DISCREPANCY",
  condition: "MEL 34-10-01-A",
  reset: "No action required if there is no failure on the PFR.",
  cbs: ""
},
{
  ata: "34",
  msg: "NAV EXTREME LATITUDE",
  condition: "Not Applicable",
  reset: "No action required if there is no failure on the PFR.",
  cbs: ""
},
{
  ata: "34",
  msg: "NAV FM/IR POS DISAGREE",
  condition: "Not Applicable",
  reset: "Reset ADIRU 1, 2 or 3. No action required if there is no failure on the PFR.",
  cbs: "ADIRU1, ADIRU2, ADIRU3"
},

{
  ata: "34",
  msg: "NAV GPWS FAULT",
  condition: "MEL 34-38-01",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels. Re-rack ILS 1 after pulling breaker on 742VU pos P66.",
  cbs: "FWC1, FWC2, ILS1"
},

{
  ata: "34",
  msg: "NAV HDG DISCREPANCY",
  condition: "MEL 34-10-01-A",
  reset: "No action required if there is no failure on the PFR.",
  cbs: ""
},

{
  ata: "34",
  msg: "NAV ILS 1 FAULT",
  condition: "MEL 34-36-01",
  reset: "Reset breakers FWC 1 and FWC 2. Re-rack ILS 1 after pulling breaker on 742VU pos P66.",
  cbs: "FWC1, FWC2, ILS1"
},
{
  ata: "34",
  msg: "NAV ILS 1 + 2 FAULT",
  condition: "MEL 34-36-01",
  reset: "Reset breakers FWC 1 and FWC 2. Re-rack ILS 1 (742VU P66) and ILS 2 (722VU H44).",
  cbs: "FWC1, FWC2, ILS1, ILS2"
},
{
  ata: "34",
  msg: "NAV ILS 2 FAULT",
  condition: "MEL 34-36-01",
  reset: "Reset breakers FWC 1 and FWC 2. Re-rack ILS 2 after pulling breaker on 722VU pos H44.",
  cbs: "FWC1, FWC2, ILS2"
},

/* ---------------- IR ---------------- */

{
  ata: "34",
  msg: "NAV IR 1 FAULT",
  condition: "MEL 34-10-01-A",
  reset: "Reset breakers FWC 1 and FWC 2. Cycle ADIRU1 115VAC, 28VDC and BAT breakers.",
  cbs: "FWC1, FWC2, ADIRU1"
},
{
  ata: "34",
  msg: "NAV IR 1 + 2 FAULT",
  condition: "MEL 34-10-01-A",
  reset: "Check the PFR.",
  cbs: ""
},
{
  ata: "34",
  msg: "NAV IR 1 + 3 FAULT",
  condition: "MEL 34-10-01-A",
  reset: "Check the PFR.",
  cbs: ""
},
{
  ata: "34",
  msg: "NAV IR 2 FAULT",
  condition: "MEL 34-10-01-A",
  reset: "Reset breakers FWC 1 and FWC 2. Cycle ADIRU2 115VAC and BAT breakers.",
  cbs: "FWC1, FWC2, ADIRU2"
},
{
  ata: "34",
  msg: "NAV IR 2 + 3 FAULT",
  condition: "MEL 34-10-01-A",
  reset: "Check the PFR.",
  cbs: ""
},
{
  ata: "34",
  msg: "NAV IR 3 FAULT",
  condition: "MEL 34-10-01-A",
  reset: "Reset breakers FWC 1 and FWC 2. Cycle ADIRU3 115VAC, 28VDC and BAT breakers.",
  cbs: "FWC1, FWC2, ADIRU3"
},
{
  ata: "34",
  msg: "NAV IR NOT ALIGNED",
  condition: "MEL 34-10-01-A",
  reset: "No action required if there is no failure on the PFR.",
  cbs: ""
},

/* ---------------- RA / TCAS ---------------- */

{
  ata: "34",
  msg: "NAV RA 1 FAULT",
  condition: "MEL 34-42-01",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels.",
  cbs: "FWC1, FWC2"
},
{
  ata: "34",
  msg: "NAV RA 1 + 2 FAULT",
  condition: "MEL 34-42-01",
  reset: "If RA1 and RA2 messages are shown only on ground, no action required.",
  cbs: ""
},
{
  ata: "34",
  msg: "NAV RA 2 FAULT",
  condition: "MEL 34-42-01",
  reset: "Reset breakers FWC 1 and FWC 2 on LH and RH reset panels.",
  cbs: "FWC1, FWC2"
},
{
  ata: "34",
  msg: "NAV TCAS FAULT",
  condition: "MEL 34-42-01",
  reset: "Reset breakers FWC 1 and FWC 2. Cycle breakers TCAS (721VU B06), ATC1 (742VU Q64) and ATC2 (722VU E47).",
  cbs: "FWC1, FWC2, TCAS, ATC1, ATC2"
},
/* ===================== APU (ATA 49 / 26) ===================== */

{
  ata: "49",
  msg: "APU FAULT",
  condition: "MEL 49-11-01",
  reset: "Check the PFR.",
  cbs: ""
},
{
  ata: "26",
  msg: "APU FIRE DET FAULT",
  condition: "MEL 26-13",
  reset: "Cycle breaker FDU LOOP B APU (721VU P08) and FIRE LOOP A APU (742VU D80).",
  cbs: "FDU LOOP B APU, FIRE LOOP A APU"
},
{
  ata: "26",
  msg: "APU FIRE LOOP A FAULT",
  condition: "MEL 26-13-01",
  reset: "If LOOP A OK, faulty FDU (13WG). Reset breakers FWC 1 and FWC 2 on LH and RH reset panels.",
  cbs: "FWC1, FWC2"
},
{
  ata: "26",
  msg: "APU FIRE LOOP B FAULT",
  condition: "MEL 26-13-01",
  reset: "If LOOP B OK, faulty FDU (13WG). Reset breakers FWC 1 and FWC 2 on LH and RH reset panels.",
  cbs: "FWC1, FWC2"
},

/* ===================== DOORS (ATA 52) ===================== */

{
  ata: "52",
  msg: "DOOR AFT CARGO",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR AVIONIC",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR BULK CARGO",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR FWD CARGO",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR L AFT CABIN",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR L EMER EXIT",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR L FWD CABIN",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR L MID CABIN",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},

{
  ata: "52",
  msg: "DOOR POS DET 1 FAULT",
  condition: "MEL 52-71-01-A",
  reset: "Reset breakers CPC 1 and CPC 2 on LH and RH reset panels. Perform PSCU system test on MCDU (ATA 52).",
  cbs: "CPC1, CPC2"
},
{
  ata: "52",
  msg: "DOOR POS DET 1 + 2 FAULT",
  condition: "MEL 52-71-01-A",
  reset: "Reset breakers CPC 1 and CPC 2. Cycle DOORS & SLIDES CTL breakers on 721VU N12 and 722VU P41.",
  cbs: "CPC1, CPC2, DOORS & SLIDES CTL"
},
{
  ata: "52",
  msg: "DOOR POS DET 2 FAULT",
  condition: "MEL 52-71-01-A",
  reset: "Reset breakers CPC 1 and CPC 2 on LH and RH reset panels. Perform PSCU system test on MCDU (ATA 52).",
  cbs: "CPC1, CPC2"
},

{
  ata: "52",
  msg: "DOOR R AFT CABIN",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR R EMER EXIT",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR R FWD CABIN",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
{
  ata: "52",
  msg: "DOOR R MID CABIN",
  condition: "MEL 52-71-01-B",
  reset: "Check proximity sensor and target. Perform PSCU system test on MCDU (ATA 52).",
  cbs: ""
},
/* ===================== CONFIG ===================== */

{
  ata: "27",
  msg: "CONFIG FLAPS NO IN T.O. RANGE",
  condition: "NO DISPATCH",
  reset: "Check the PFR. Reset breakers FWC 1 and FWC 2 on LH and RH reset panels.",
  cbs: "FWC1, FWC2"
},
{
  ata: "27",
  msg: "CONFIG L SIDESTICK FAULT",
  condition: "APPLY ECAM",
  reset: "Check the PFR. If there is no failure message, no action is required.",
  cbs: ""
},
{
  ata: "27",
  msg: "CONFIG R SIDESTICK FAULT",
  condition: "APPLY ECAM",
  reset: "Check the PFR. If there is no failure message, no action is required.",
  cbs: ""
},
{
  ata: "27",
  msg: "CONFIG PARK BRK ON",
  condition: "NO DISPATCH",
  reset: "Set parking brakes to OFF.",
  cbs: ""
},
{
  ata: "27",
  msg: "CONFIG PITCH TRIM NOT IN T.O. RANGE",
  condition: "NO DISPATCH",
  reset: "Check the PFR. If there is no failure message, no action is required.",
  cbs: ""
},
{
  ata: "27",
  msg: "CONFIG RUD TRIM NOT IN T.O. RANGE",
  condition: "NO DISPATCH",
  reset: "Check the PFR. If there is no failure message, no action is required.",
  cbs: ""
},
{
  ata: "27",
  msg: "CONFIG SLATS NOT IN T.O. RANGE",
  condition: "NO DISPATCH",
  reset: "Check the PFR. If there is no failure message, no action is required.",
  cbs: ""
},
{
  ata: "27",
  msg: "CONFIG SPD BRK NOT RETRACTED",
  condition: "NO DISPATCH",
  reset: "Check the PFR. If there is no failure message, no action is required.",
  cbs: ""
},

/* ===================== ENGINE (ATA 73) ===================== */

{
  ata: "73",
  msg: "ENG THRUST LOSS",
  condition: "MEL 73-30-03-B",
  reset: "Reset breaker ZONE CONT on the RH reset panel.",
  cbs: "ZONE CONT"
},
{
  ata: "73",
  msg: "ENG ALL ENG FLAME OUT",
  condition: "NO DISPATCH",
  reset: "Check fuel filters for contamination.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG THR LEVERS NOT SET",
  condition: "MEL 73-20-01",
  reset: "Operational message only. No further action required.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG T.O. THRUST DISAGREE",
  condition: "NO DISPATCH",
  reset: "Check the PFR for defective LRUs.",
  cbs: ""
},
/* ===================== ENGINE 1 ===================== */

{
  ata: "36/73",
  msg: "ENG 1 BLEED STATUS",
  condition: "APPLY ECAM",
  reset: "Reset breaker ZONE CONT on RH reset panel. Reset breaker EIVMU 1 on RH reset panel.",
  cbs: "ZONE CONT, EIVMU1"
},
{
  ata: "73",
  msg: "ENG 1 CTL SYS FAULT",
  condition: "NO DISPATCH",
  reset: "Cycle breaker FADEC A ENG 1 (742VU N74). Cycle breaker FADEC B ENG 1 (722VU K46).",
  cbs: "FADEC A ENG1, FADEC B ENG1"
},
{
  ata: "73",
  msg: "ENG 1 EGT OVERLIMIT",
  condition: "NOT APPLICABLE",
  reset: "Perform visual inspection of the affected engine.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 1 EIU FAULT",
  condition: "MEL 73-25-02",
  reset: "Reset breaker EIVMU 1 on RH reset panel. Reset breaker FCU 1 on LH reset panel.",
  cbs: "EIVMU1, FCU1"
},
{
  ata: "73",
  msg: "ENG 1 FADEC FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breakers SDAC 1 and SDAC 2. Reset breaker FCU 1.",
  cbs: "SDAC1, SDAC2, FCU1"
},
{
  ata: "73",
  msg: "ENG 1 FADEC OVHT",
  condition: "NO DISPATCH",
  reset: "Check for local overheating of the EEC, especially nacelle anti-ice ducting.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 1 FADEC SYS FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breaker EIVMU 1. Cycle FADEC A and B breakers for ENG 1.",
  cbs: "EIVMU1, FADEC A ENG1, FADEC B ENG1"
},
{
  ata: "26",
  msg: "ENG 1 FIRE DET FAULT",
  condition: "NO DISPATCH",
  reset: "Perform BITE test of the FDU via MCDU (ATA 26).",
  cbs: ""
},
{
  ata: "26",
  msg: "ENG 1 FIRE LOOP A FAULT",
  condition: "MEL 26-12-01",
  reset: "Perform BITE test of the FDU via MCDU (ATA 26).",
  cbs: ""
},
{
  ata: "26",
  msg: "ENG 1 FIRE LOOP B FAULT",
  condition: "MEL 26-12-01",
  reset: "Perform BITE test of the FDU via MCDU (ATA 26).",
  cbs: ""
},
{
  ata: "28",
  msg: "ENG 1 FUEL FILTER CLOG",
  condition: "NO DISPATCH",
  reset: "Check fuel pump filter and differential pressure switch.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 1 HP FUEL VALVE",
  condition: "NO DISPATCH",
  reset: "Perform FADEC system static test via MCDU (ATA 70).",
  cbs: ""
},
{
  ata: "74",
  msg: "ENG 1 IGN A FAULT",
  condition: "MEL 74-31-01 / 74-31-03-A",
  reset: "Reset breaker EIVMU 1 on RH reset panel.",
  cbs: "EIVMU1"
},
{
  ata: "74",
  msg: "ENG 1 IGN B FAULT",
  condition: "MEL 74-31-01 / 74-31-03-A",
  reset: "Reset breaker EIVMU 1 on RH reset panel.",
  cbs: "EIVMU1"
},
{
  ata: "74",
  msg: "ENG 1 IGN A + B FAULT",
  condition: "MEL 74-31-01 / 74-31-03-A",
  reset: "Reset breakers FWC 1 and FWC 2.",
  cbs: "FWC1, FWC2"
},
{
  ata: "73",
  msg: "ENG 1 MINOR FAULT",
  condition: "MEL 73-25-01-A",
  reset: "Cycle FADEC A and B breakers for ENG 1.",
  cbs: "FADEC A ENG1, FADEC B ENG1"
},
{
  ata: "79",
  msg: "ENG 1 OIL FILTER CLOG",
  condition: "MEL 79-35-02-A",
  reset: "Check oil filter and differential pressure switch.",
  cbs: ""
},
{
  ata: "79",
  msg: "ENG 1 OIL HI TEMP",
  condition: "NO DISPATCH",
  reset: "Check engine oil level.",
  cbs: ""
},
{
  ata: "79",
  msg: "ENG 1 OIL LO TEMP",
  condition: "APPLY ECAM",
  reset: "Operational message only. No action required.",
  cbs: ""
},
{
  ata: "79",
  msg: "ENG 1 OIL PRESS",
  condition: "MEL 79-34-01-A",
  reset: "Check oil level and signs of leakage.",
  cbs: ""
},
{
  ata: "78",
  msg: "ENG 1 REV FAULT",
  condition: "MEL 78-30-01",
  reset: "Reset breaker EVIMU 1 on RH reset panel.",
  cbs: "EVIMU1"
},
{
  ata: "78",
  msg: "ENG 1 REV INHIBITED",
  condition: "MEL 78-30-01 / 78-30-07-A",
  reset: "Open LH fan cowl and check inhibit lever and lock-out pin.",
  cbs: ""
},
{
  ata: "78",
  msg: "ENG 1 REV PRESSURISED",
  condition: "NO DISPATCH",
  reset: "Cycle FADEC A and B breakers for ENG 1.",
  cbs: "FADEC A ENG1, FADEC B ENG1"
},
{
  ata: "78",
  msg: "ENG 1 REV UNLOCKED",
  condition: "MEL 78-30-01",
  reset: "Perform visual inspection of reverser cowls.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 1 SHUT DOWN",
  condition: "NO DISPATCH",
  reset: "Reset breakers FWC 1 and FWC 2.",
  cbs: "FWC1, FWC2"
},
{
  ata: "80",
  msg: "ENG 1 START FAULT",
  condition: "NO DISPATCH",
  reset: "Cycle FADEC A and B breakers for ENG 1.",
  cbs: "FADEC A ENG1, FADEC B ENG1"
},
{
  ata: "80",
  msg: "ENG 1 START VALVE FAULT",
  condition: "MEL 80-11-01",
  reset: "Check starter valve and starter for failures.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 1 THR LEVER DISAGREE",
  condition: "NO DISPATCH",
  reset: "Reset breaker EVIMU 1. Check throttle lever position disagreement.",
  cbs: "EVIMU1"
},
{
  ata: "73",
  msg: "ENG 1 THR LEVER FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breaker EVIMU 1. Check throttle lever position disagreement.",
  cbs: "EVIMU1"
},

/* ===================== ENGINE 2 ===================== */
/* (Aynı yapı, ENG 2 için birebir simetrik olarak devam eder) */

/* ===================== ENGINE 2 ===================== */

{
  ata: "36/73",
  msg: "ENG 2 BLEED STATUS",
  condition: "APPLY ECAM",
  reset: "Reset breaker ZONE CONT on RH reset panel. Reset breaker EIVMU 2 on LH reset panel.",
  cbs: "ZONE CONT, EIVMU2"
},
{
  ata: "73",
  msg: "ENG 2 CTL SYS FAULT",
  condition: "NO DISPATCH",
  reset: "Cycle breaker FADEC A ENG 2 (742VU Q73). Cycle breaker FADEC B ENG 2 (722VU D43).",
  cbs: "FADEC A ENG2, FADEC B ENG2"
},
{
  ata: "73",
  msg: "ENG 2 EGT OVERLIMIT",
  condition: "NOT APPLICABLE",
  reset: "Perform visual inspection of the affected engine.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 2 EIU FAULT",
  condition: "MEL 73-25-02",
  reset: "Reset breaker EIVMU 2 on LH reset panel. Reset breaker FCU 1 on LH reset panel.",
  cbs: "EIVMU2, FCU1"
},
{
  ata: "73",
  msg: "ENG 2 FADEC FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breakers SDAC 1 and SDAC 2. Reset breaker FCU 1.",
  cbs: "SDAC1, SDAC2, FCU1"
},
{
  ata: "73",
  msg: "ENG 2 FADEC OVHT",
  condition: "NO DISPATCH",
  reset: "Check for local overheating of the EEC, especially nacelle anti-ice ducting.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 2 FADEC SYS FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breaker EIVMU 2. Cycle FADEC A and B breakers for ENG 2.",
  cbs: "EIVMU2, FADEC A ENG2, FADEC B ENG2"
},
{
  ata: "26",
  msg: "ENG 2 FIRE DET FAULT",
  condition: "NO DISPATCH",
  reset: "Perform BITE test of the FDU via MCDU (ATA 26).",
  cbs: ""
},
{
  ata: "26",
  msg: "ENG 2 FIRE LOOP A FAULT",
  condition: "MEL 26-12-01",
  reset: "Perform BITE test of the FDU via MCDU (ATA 26).",
  cbs: ""
},
{
  ata: "26",
  msg: "ENG 2 FIRE LOOP B FAULT",
  condition: "MEL 26-12-01",
  reset: "Perform BITE test of the FDU via MCDU (ATA 26).",
  cbs: ""
},
{
  ata: "28",
  msg: "ENG 2 FUEL FILTER CLOG",
  condition: "NO DISPATCH",
  reset: "Check fuel pump filter and differential pressure switch.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 2 HP FUEL VALVE",
  condition: "NO DISPATCH",
  reset: "Perform FADEC system static test via MCDU (ATA 70).",
  cbs: ""
},
{
  ata: "74",
  msg: "ENG 2 IGN A FAULT",
  condition: "MEL 74-31-01 / 74-31-03-A",
  reset: "Reset breaker EIVMU 2 on LH reset panel.",
  cbs: "EIVMU2"
},
{
  ata: "74",
  msg: "ENG 2 IGN B FAULT",
  condition: "MEL 74-31-01 / 74-31-03-A",
  reset: "Reset breaker EIVMU 2 on LH reset panel.",
  cbs: "EIVMU2"
},
{
  ata: "74",
  msg: "ENG 2 IGN A + B FAULT",
  condition: "MEL 74-31-01 / 74-31-03-A",
  reset: "Reset breakers FWC 1 and FWC 2.",
  cbs: "FWC1, FWC2"
},
{
  ata: "73",
  msg: "ENG 2 MINOR FAULT",
  condition: "MEL 73-25-01-A",
  reset: "Cycle FADEC A and B breakers for ENG 2.",
  cbs: "FADEC A ENG2, FADEC B ENG2"
},
{
  ata: "79",
  msg: "ENG 2 OIL FILTER CLOG",
  condition: "MEL 79-35-02-A",
  reset: "Check oil filter and differential pressure switch.",
  cbs: ""
},
{
  ata: "79",
  msg: "ENG 2 OIL HI TEMP",
  condition: "NO DISPATCH",
  reset: "Check engine oil level.",
  cbs: ""
},
{
  ata: "79",
  msg: "ENG 2 OIL LO TEMP",
  condition: "APPLY ECAM",
  reset: "Operational message only. No action required.",
  cbs: ""
},
{
  ata: "79",
  msg: "ENG 2 OIL PRESS",
  condition: "MEL 79-34-01-A",
  reset: "Check oil level and signs of leakage.",
  cbs: ""
},
{
  ata: "78",
  msg: "ENG 2 REV FAULT",
  condition: "MEL 78-30-01",
  reset: "Reset breaker EVIMU 2 on LH reset panel.",
  cbs: "EVIMU2"
},
{
  ata: "78",
  msg: "ENG 2 REV INHIBITED",
  condition: "MEL 78-30-01 / 78-30-07-A",
  reset: "Open LH fan cowl and check inhibit lever and lock-out pin.",
  cbs: ""
},
{
  ata: "78",
  msg: "ENG 2 REV PRESSURISED",
  condition: "NO DISPATCH",
  reset: "Cycle FADEC A and B breakers for ENG 2.",
  cbs: "FADEC A ENG2, FADEC B ENG2"
},
{
  ata: "78",
  msg: "ENG 2 REV UNLOCKED",
  condition: "MEL 78-30-01",
  reset: "Perform visual inspection of reverser cowls.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 2 SHUT DOWN",
  condition: "NO DISPATCH",
  reset: "Reset breakers FWC 1 and FWC 2.",
  cbs: "FWC1, FWC2"
},
{
  ata: "80",
  msg: "ENG 2 START FAULT",
  condition: "NO DISPATCH",
  reset: "Cycle FADEC A and B breakers for ENG 2.",
  cbs: "FADEC A ENG2, FADEC B ENG2"
},
{
  ata: "80",
  msg: "ENG 2 START VALVE FAULT",
  condition: "MEL 80-11-01",
  reset: "Check starter valve and starter for failures.",
  cbs: ""
},
{
  ata: "73",
  msg: "ENG 2 THR LEVER DISAGREE",
  condition: "NO DISPATCH",
  reset: "Reset breaker EVIMU 2. Check throttle lever position disagreement.",
  cbs: "EVIMU2"
},
{
  ata: "73",
  msg: "ENG 2 THR LEVER FAULT",
  condition: "NO DISPATCH",
  reset: "Reset breaker EVIMU 2. Check throttle lever position disagreement.",
  cbs: "EVIMU2"
},


];
