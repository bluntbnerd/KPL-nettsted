/*
 * Læringsstien for Automasjon, delt i emner.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", sider: [ … ] }  (valgfritt: vurdering: "Hva emnet avsluttes med")
 * Side:  { fil: "filnavn.html", tittel: "Kort tittel", status: "utkast" | "ferdig" }
 * Kort tittel i venstremenyen (valgfritt): meny: "Kort"
 * Planlagt side (ikke skrevet ennå): { tittel: "Kort tittel", status: "planlagt" }
 *
 * Hvert emne har sin egen økt i Claude. Endringer i denne filen avstemmes med temaøkten.
 * Sidene under er et første forslag. Emneøktene kan foreslå endringer.
 */
KPL.sti("05-maling-styring-regulering", [
  {
    emne: "Måling i anlegget",
    sider: [
      { fil: "hvorfor-vi-maler.html", tittel: "Hvorfor vi måler", type: "fagstoff", status: "ferdig" },
      { fil: "trykkmaling.html", tittel: "Trykkmåling", type: "fagstoff", status: "ferdig" },
      { fil: "temperaturmaling.html", tittel: "Temperaturmåling", type: "fagstoff", status: "ferdig" },
      { fil: "nivamaling.html", tittel: "Nivåmåling", type: "fagstoff", status: "ferdig" },
      { fil: "mengdemaling.html", tittel: "Mengdemåling", type: "fagstoff", status: "ferdig" },
      { fil: "maling-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Signaler og instrumentering",
    sider: [
      { fil: "givere-og-transmittere.html", tittel: "Givere og transmittere", meny: "Givere", type: "fagstoff", status: "ferdig" },
      { fil: "signalet-4-20-ma.html", tittel: "Signalet 4–20 mA", meny: "4–20 mA", type: "fagstoff", status: "ferdig" },
      { fil: "instrumentsymboler-og-pid.html", tittel: "Instrumentsymboler og P&ID", meny: "Symboler og P&ID", type: "fagstoff", status: "ferdig" },
      { fil: "signaler-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Styring",
    sider: [
      { fil: "styring-og-regulering.html", tittel: "Styring og regulering – forskjellen", meny: "Styring og regulering", type: "fagstoff", status: "ferdig" },
      { fil: "av-pa-styring.html", tittel: "Av/på-styring", type: "fagstoff", status: "ferdig" },
      { fil: "forriglinger.html", tittel: "Forriglinger", type: "fagstoff", status: "ferdig" },
      { fil: "sekvenser.html", tittel: "Sekvenser", type: "fagstoff", status: "ferdig" },
      { fil: "styring-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Regulering",
    sider: [
      { fil: "reguleringssloyfen.html", tittel: "Reguleringssløyfen", type: "fagstoff", status: "ferdig" },
      { fil: "settpunkt-maleverdi-avvik.html", tittel: "Settpunkt, måleverdi og avvik", meny: "Settpunkt og avvik", type: "fagstoff", status: "ferdig" },
      { fil: "p-regulering.html", tittel: "P-regulering", type: "fagstoff", status: "ferdig" },
      { fil: "pi-og-pid-regulering.html", tittel: "PI- og PID-regulering", meny: "PI og PID", type: "fagstoff", status: "ferdig" },
      { fil: "regulering-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Styresystemer",
    sider: [
      { fil: "pls.html", tittel: "PLS", type: "fagstoff", status: "ferdig" },
      { fil: "scada-og-dcs.html", tittel: "SCADA og DCS", type: "fagstoff", status: "ferdig" },
      { fil: "operatorbilder-og-alarmer.html", tittel: "Operatørbilder og alarmer", meny: "Bilder og alarmer", type: "fagstoff", status: "ferdig" },
      { fil: "styresystemer-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  }
]);
