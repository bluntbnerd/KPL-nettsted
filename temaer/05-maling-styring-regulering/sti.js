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
      { tittel: "Hvorfor vi måler", status: "planlagt" },
      { tittel: "Trykkmåling", status: "planlagt" },
      { tittel: "Temperaturmåling", status: "planlagt" },
      { tittel: "Nivåmåling", status: "planlagt" },
      { tittel: "Mengdemåling", status: "planlagt" },
      { tittel: "Hva kan du nå?", status: "planlagt" }
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
      { tittel: "PLS", status: "planlagt" },
      { tittel: "SCADA og DCS", status: "planlagt" },
      { tittel: "Operatørbilder og alarmer", status: "planlagt" },
      { tittel: "Hva kan du nå?", status: "planlagt" }
    ]
  }
]);
