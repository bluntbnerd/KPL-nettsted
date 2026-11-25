/*
 * Læringsstien for dette temaet, delt i fire emner.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", sider: [ … ] }
 * Side:  { fil: "filnavn.html", tittel: "Kort tittel", status: "utkast" | "ferdig" }
 * Planlagt side (ikke skrevet ennå): { tittel: "Kort tittel", status: "planlagt" }
 * Når læreren godkjenner en side: endre status til "ferdig".
 */
KPL.sti("11-tekniske-flytskjemaer", [
  {
    emne: "Blokkskjema",
    sider: [
      { fil: "hva-er-et-blokkskjema.html", tittel: "Hva er et blokkskjema?", meny: "Hva er et blokkskjema?", type: "fagstoff", status: "ferdig" },
      { fil: "tegn-et-blokkskjema.html", tittel: "Tegn et blokkskjema", type: "fagstoff", status: "ferdig" },
      { fil: "hva-kan-du-na-blokkskjema.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Prosessflytskjema",
    sider: [
      { fil: "hva-viser-et-prosessflytskjema.html", tittel: "Hva viser et prosessflytskjema?", meny: "Hva viser det?", type: "fagstoff", status: "ferdig" },
      { fil: "symboler-for-utstyr.html", tittel: "Symboler for utstyr", meny: "Symboler", type: "fagstoff", status: "ferdig" },
      { fil: "hva-kan-du-na-prosessflytskjema.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Teknisk flytskjema (P&ID)",
    sider: [
      { fil: "fra-prosessflytskjema-til-pid.html", tittel: "Fra prosessflytskjema til P&ID", meny: "Fra PFD til P&ID", type: "fagstoff", status: "ferdig" },
      { fil: "ror-og-ventiler.html", tittel: "Rør og ventiler", type: "fagstoff", status: "ferdig" },
      { fil: "instrumenter-og-tagnummer.html", tittel: "Instrumenter og tagnummer", meny: "Instrumenter", type: "fagstoff", status: "ferdig" },
      { fil: "ov-les-en-pid.html", tittel: "Øv: les en P&ID", meny: "Les en P&ID", type: "sjekk", status: "ferdig" },
      { fil: "hva-kan-du-na-pid.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Forriglingsmatrise",
    sider: [
      { fil: "hva-er-en-forrigling.html", tittel: "Hva er en forrigling?", type: "fagstoff", status: "ferdig" },
      { fil: "les-en-forriglingsmatrise.html", tittel: "Les en forriglingsmatrise", meny: "Les matrisen", type: "fagstoff", status: "ferdig" },
      { fil: "hva-kan-du-na-forriglingsmatrise.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  }
]);
