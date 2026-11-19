/*
 * Læringsstien for Laboratorium og analyse, delt i emner.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", vurdering: "Hva emnet avsluttes med", sider: [ … ] }
 * Side:  { fil: "filnavn.html", tittel: "Tittel", status: "utkast" | "ferdig" }
 * Kort tittel i venstremenyen (valgfritt): meny: "Kort"
 * Planlagt side (ikke skrevet ennå): { tittel: "Tittel", status: "planlagt" }
 * Lab-sider: type: "lab"
 */
KPL.sti("07-laboratorium-og-analyse", [
  {
    emne: "7A Arbeid på laben",
    sider: [
      { tittel: "Volumetrisk utstyr: pipette, byrette og målekolbe", meny: "Volumetrisk utstyr", status: "planlagt" },
      { tittel: "Prosedyrer på laben", meny: "Prosedyrer", status: "planlagt" },
      { tittel: "Planlegge et laboratorieforsøk", meny: "Planlegge forsøk", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  },
  {
    emne: "7B Titrering",
    sider: [
      { tittel: "Titrering", status: "planlagt" },
      { tittel: "Titrerkurver og andre titreringer", meny: "Titrerkurver", status: "planlagt" },
      { tittel: "Lab: volumetrisk titrering", meny: "Volumetrisk titrering", type: "lab", status: "planlagt" },
      { tittel: "Lab: gravimetrisk titrering", meny: "Gravimetrisk titrering", type: "lab", status: "planlagt" },
      { tittel: "Lab: fellingstitrering, klorid i saltvann", meny: "Fellingstitrering", type: "lab", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  },
  {
    emne: "7C Rapportering og kvalitet",
    sider: [
      { tittel: "Presentere resultater i tabell og graf", meny: "Tabell og graf", status: "planlagt" },
      { tittel: "Middelverdi og spredning", meny: "Middelverdi", status: "planlagt" },
      { tittel: "Usikkerhet, feilkilder og avvik", meny: "Usikkerhet", status: "planlagt" },
      { tittel: "Skrive labrapport", meny: "Labrapport", status: "planlagt" },
      { tittel: "Kvalitetssikring av analyser", meny: "Kvalitetssikring", status: "planlagt" },
      { tittel: "Kvalitetssystem og avvik", meny: "Kvalitetssystem", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" },
      { tittel: "Kontrollkort", status: "planlagt", fordypning: true }
    ]
  },
  {
    emne: "7D Analyse med lys",
    sider: [
      { tittel: "Analyse med lys: flammeprøve og spektrofotometri", meny: "Analyse med lys", status: "planlagt" },
      { tittel: "Lab: flammeprøve", meny: "Flammeprøve", type: "lab", status: "planlagt" },
      { tittel: "Lab: spektrofotometri og standardkurve", meny: "Spektrofotometri", type: "lab", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  },
  {
    emne: "7E Prøvetaking, miljø og mikrobiologi",
    sider: [
      { tittel: "Prøvetaking", status: "planlagt" },
      { tittel: "Miljøtester i nærmiljøet", meny: "Miljøtester", status: "planlagt" },
      { tittel: "Lab: vannprøver fra fjord og elv", meny: "Vannprøver", type: "lab", status: "planlagt" },
      { tittel: "Mikrobiologi og mikroskopering", meny: "Mikroskopering", status: "planlagt" },
      { tittel: "Lab: mikroskop og tøffeldyr", meny: "Tøffeldyr", type: "lab", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  }
]);
