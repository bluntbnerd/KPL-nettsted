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
      { tittel: "Givere og transmittere", status: "planlagt" },
      { tittel: "Signalet 4–20 mA", status: "planlagt" },
      { tittel: "Instrumentsymboler og P&ID", status: "planlagt" },
      { tittel: "Hva kan du nå?", status: "planlagt" }
    ]
  },
  {
    emne: "Styring",
    sider: [
      { tittel: "Styring og regulering – forskjellen", status: "planlagt" },
      { tittel: "Av/på-styring", status: "planlagt" },
      { tittel: "Forriglinger", status: "planlagt" },
      { tittel: "Sekvenser", status: "planlagt" },
      { tittel: "Hva kan du nå?", status: "planlagt" }
    ]
  },
  {
    emne: "Regulering",
    sider: [
      { tittel: "Reguleringssløyfen", status: "planlagt" },
      { tittel: "Settpunkt, måleverdi og avvik", status: "planlagt" },
      { tittel: "P-regulering", status: "planlagt" },
      { tittel: "PI- og PID-regulering", status: "planlagt" },
      { tittel: "Hva kan du nå?", status: "planlagt" }
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
