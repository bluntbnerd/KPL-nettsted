/*
 * Læringsstien for Fysiske prinsipper (mappe 04-masse-og-energibalanser), delt i emner.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", vurdering: "Hva emnet avsluttes med", sider: [ … ] }
 * Side:  { fil: "filnavn.html", tittel: "Tittel", meny: "Kort menytittel", status: "utkast" | "ferdig" }
 * Planlagt side (ikke skrevet ennå): { tittel: "Tittel", status: "planlagt" }
 *
 * Fem emner fra 20.11.2026 (prosesslæreren). Hvert emne har sin egen emneøkt.
 */
KPL.sti("04-masse-og-energibalanser", [
  {
    emne: "Fysiske grunnbegreper",
    sider: [
      { fil: "storrelser-og-enheter.html", tittel: "Størrelser og enheter", meny: "Enheter", type: "fagstoff", status: "ferdig" },
      { fil: "masse-volum-tetthet.html", tittel: "Masse, volum og tetthet", meny: "Tetthet", type: "fagstoff", status: "ferdig" },
      { fil: "kraft-og-trykk.html", tittel: "Kraft og trykk", type: "fagstoff", status: "ferdig" },
      { fil: "energi-arbeid-effekt.html", tittel: "Energi, arbeid og effekt", meny: "Energi og effekt", type: "fagstoff", status: "ferdig" },
      { fil: "temperatur-og-varme.html", tittel: "Temperatur og varme", type: "fagstoff", status: "ferdig" },
      { fil: "grunnbegreper-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Fluidmekanikk",
    sider: [
      { fil: "trykk-i-vaesker.html", tittel: "Trykk i væsker", type: "fagstoff", status: "utkast" },
      { fil: "stromning.html", tittel: "Strømning i rør", meny: "Strømning", type: "fagstoff", status: "utkast" },
      { fil: "ror-ventiler-pumper.html", tittel: "Rør, ventiler og pumper", meny: "Rør og pumper", type: "fagstoff", status: "utkast" },
      { fil: "trykktap.html", tittel: "Trykktap", type: "fagstoff", status: "utkast" }
    ]
  },
  {
    emne: "Termodynamikk",
    sider: [
      { fil: "varme-og-energi.html", tittel: "Varme og energi i prosesser", meny: "Varme i prosesser", type: "fagstoff", status: "ferdig" },
      { fil: "gasser.html", tittel: "Gasser: trykk, volum og temperatur", meny: "Gasser", type: "fagstoff", status: "ferdig" },
      { fil: "varmepumpe.html", tittel: "Varmepumpe og COP", meny: "Varmepumpe", type: "fagstoff", status: "ferdig" }
    ]
  },
  {
    emne: "Energi i prosessindustrien",
    sider: [
      { fil: "varmeveksler.html", tittel: "Energibalanse i en varmeveksler", meny: "Varmeveksler", type: "fagstoff", status: "utkast" },
      { fil: "varmetap.html", tittel: "Varmetap og virkningsgrad", meny: "Varmetap", type: "fagstoff", status: "utkast" },
      { fil: "energigjenvinning.html", tittel: "Energigjenvinning", type: "fagstoff", status: "utkast" }
    ]
  },
  {
    emne: "Massebalanser i prosessanlegg",
    sider: [
      { fil: "massebalanse-i-anlegg.html", tittel: "Massebalanse i et anlegg", meny: "Massebalanse", type: "fagstoff", status: "ferdig" },
      { fil: "separasjon.html", tittel: "Separasjon", type: "fagstoff", status: "ferdig" },
      { fil: "resirkulering-og-utbytte.html", tittel: "Resirkulering og utbytte", meny: "Resirkulering", type: "fagstoff", status: "ferdig" }
    ]
  }
]);
