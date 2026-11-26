/*
 * Læringsstien for Drift og vedlikehold, delt i emner.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", vurdering: "Hva emnet avsluttes med" (valgfritt), sider: [ … ] }
 * Side:  { fil: "filnavn.html", tittel: "Kort tittel", status: "utkast" | "ferdig" }
 * Kort tittel i venstremenyen (valgfritt): meny: "Kort"
 * Planlagt side (ikke skrevet ennå): { tittel: "Kort tittel", status: "planlagt" }
 *
 * Emneøktene skriver bare sine egne sider. Endringer i denne fila gjøres av temaøkten.
 */
KPL.sti("06-drift-og-vedlikehold", [
  {
    emne: "Drift av prosessanlegget",
    sider: [
      { fil: "hva-er-drift.html", tittel: "Hva er drift?", type: "fagstoff", status: "ferdig" },
      { fil: "kontroll-av-prosessen.html", tittel: "Kontroll av prosessen", type: "fagstoff", status: "ferdig" },
      { fil: "avvik-og-feilsoking.html", tittel: "Avvik og feilsøking", type: "fagstoff", status: "ferdig" },
      { fil: "optimalisering.html", tittel: "Optimalisering", type: "fagstoff", status: "ferdig" },
      { fil: "forbedring-og-vaktoverlevering.html", tittel: "Kontinuerlig forbedring og vaktoverlevering", meny: "Forbedring og overlevering", type: "fagstoff", status: "ferdig" },
      { fil: "hva-kan-du-na-drift.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Vedlikehold",
    sider: [
      { fil: "hvorfor-vedlikehold.html", tittel: "Hvorfor vedlikehold?", status: "ferdig" },
      { fil: "typer-vedlikehold.html", tittel: "Typer vedlikehold", status: "ferdig" },
      { fil: "systematisk-vedlikehold.html", tittel: "Systematisk vedlikehold", status: "ferdig" },
      { fil: "vedlikehold-av-utstyr.html", tittel: "Vedlikehold av vanlig utstyr", meny: "Vanlig utstyr", status: "ferdig" },
      { fil: "sikker-jobbing-vedlikehold.html", tittel: "Sikker jobbing ved vedlikehold", meny: "Sikker jobbing", status: "ferdig" },
      { fil: "hva-kan-du-na-vedlikehold.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Korrosjon",
    sider: [
      { fil: "hva-er-korrosjon.html", tittel: "Hva er korrosjon?", status: "ferdig" },
      { fil: "typer-korrosjon.html", tittel: "Typer korrosjon i prosessanlegg", meny: "Typer korrosjon", status: "ferdig" },
      { fil: "korrosjonsbeskyttelse.html", tittel: "Korrosjonsbeskyttelse og inspeksjon", meny: "Beskyttelse og inspeksjon", status: "ferdig" },
      { fil: "hva-kan-du-na-korrosjon.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Kalibrering",
    sider: [
      { fil: "hvorfor-kalibrere.html", tittel: "Hvorfor kalibrere?", status: "utkast" },
      { fil: "kalibrering-laboratorieutstyr.html", tittel: "Kalibrering av laboratorieutstyr", meny: "Laboratorieutstyr", status: "utkast" },
      { fil: "kalibrering-instrumenter-anlegg.html", tittel: "Kalibrering av instrumenter i anlegget", meny: "Instrumenter i anlegget", status: "utkast" },
      { fil: "kalibreringsprotokoll.html", tittel: "Kalibreringsprotokoll og dokumentasjon", meny: "Protokoll", status: "utkast" },
      { fil: "lab-kalibrering.html", tittel: "Lab: kalibrering", type: "lab", status: "utkast" },
      { fil: "hva-kan-du-na-kalibrering.html", tittel: "Hva kan du nå?", type: "sjekk", status: "utkast" }
    ]
  }
]);
