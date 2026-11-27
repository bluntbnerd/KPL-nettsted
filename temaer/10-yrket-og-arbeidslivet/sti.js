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
    sider: [
      { fil: "barekraft-hva-er.html", tittel: "Hva er bærekraftig produksjon?", meny: "Hva er bærekraft?", type: "fagstoff", status: "ferdig" },
      { fil: "barekraft-utslipp.html", tittel: "Utslipp og ressursbruk i prosessindustrien", meny: "Utslipp og ressurser", type: "fagstoff", status: "ferdig" },
      { fil: "barekraft-tiltak.html", tittel: "Tiltak: energi, gjenvinning og renere prosesser", meny: "Miljøtiltak", type: "fagstoff", status: "ferdig" },
      { fil: "barekraft-lover.html", tittel: "Lover, kvoter og miljøstyring", meny: "Lover og kvoter", type: "fagstoff", status: "ferdig" },
      { fil: "barekraft-drofte.html", tittel: "Drøft et miljøtiltak", meny: "Drøft et tiltak", type: "fagstoff", status: "ferdig" }
    ]
  },
  {
    emne: "Yrket og arbeidslivet",
    sider: [
      { fil: "yrket-fagbrev.html", tittel: "Veien til fagbrev", meny: "Veien til fagbrev", type: "fagstoff", status: "ferdig" },
      { fil: "yrket-rettigheter.html", tittel: "Rettigheter og plikter på jobben", meny: "Rettigheter og plikter", type: "fagstoff", status: "ferdig" },
      { fil: "yrket-fagforening.html", tittel: "Verneombud, tillitsvalgt og fagforening", meny: "Verneombud og fagforening", type: "fagstoff", status: "ferdig" },
      { fil: "yrket-inkluderende.html", tittel: "Et inkluderende arbeidsfellesskap", meny: "Inkludering", type: "fagstoff", status: "ferdig" },
      { fil: "yrket-egen-utvikling.html", tittel: "Vurder din egen utvikling", meny: "Egen utvikling", type: "fagstoff", status: "ferdig" },
      { fil: "yrket-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
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
