/*
 * Læringsstien for dette temaet, delt i fire emner.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", sider: [ … ] }
 * Side:  { fil: "filnavn.html", tittel: "Kort tittel", status: "utkast" | "ferdig" }
 * Planlagt side (ikke skrevet ennå): { tittel: "Kort tittel", status: "planlagt" }
 * Når læreren godkjenner en side: endre status til "ferdig".
 *
 * Hvert emne har sin egen emneøkt. Emneøktene avstemmer endringer i denne fila med temaøkten.
 */
KPL.sti("10-yrket-og-arbeidslivet", [
  {
    emne: "Bransjen og bedriftene",
    sider: [
      { fil: "hva-er-prosessindustrien.html", tittel: "Hva er prosessindustrien?", meny: "Prosessindustrien", type: "fagstoff", status: "ferdig" },
      { fil: "bransjene.html", tittel: "Bransjene i prosessindustrien", meny: "Bransjene", type: "fagstoff", status: "ferdig" },
      { fil: "verdikjeden.html", tittel: "Fra råstoff til produkt", meny: "Verdikjeden", type: "fagstoff", status: "ferdig" },
      { fil: "sauda-og-omegn.html", tittel: "Prosessindustri i Sauda og omegn", meny: "Sauda og omegn", type: "fagstoff", status: "ferdig" },
      { fil: "organisering.html", tittel: "Hvordan en bedrift er organisert", meny: "Organisering", type: "fagstoff", status: "ferdig" }
    ]
  },
  {
    emne: "Miljøvennlig produksjon og bærekraft",
    sider: []
  },
  {
    emne: "Yrket og arbeidslivet",
    sider: []
  },
  {
    emne: "Fagspråk og dokumentasjon på jobben",
    sider: [
      { fil: "fagsprak-hvorfor.html", tittel: "Hvorfor fagspråk?", type: "fagstoff", status: "ferdig" },
      { fil: "fagsprak-muntlig.html", tittel: "Skiftoverlevering og muntlige beskjeder", meny: "Muntlige beskjeder", type: "fagstoff", status: "ferdig" },
      { fil: "fagsprak-skriftlig.html", tittel: "Logg, avvik og rapporter", meny: "Logg og avvik", type: "fagstoff", status: "ferdig" },
      { fil: "fagsprak-engelsk.html", tittel: "Engelsk på jobben", type: "fagstoff", status: "ferdig" },
      { fil: "fagsprak-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  }
]);
