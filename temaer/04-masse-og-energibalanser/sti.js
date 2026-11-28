/*
 * Læringsstien for Fysiske prinsipper (mappe 04-masse-og-energibalanser), delt i emner.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", vurdering: "Hva emnet avsluttes med", sider: [ … ] }
 * Side:  { fil: "filnavn.html", tittel: "Tittel", meny: "Kort menytittel", status: "utkast" | "ferdig" }
 * Planlagt side (ikke skrevet ennå): { tittel: "Tittel", status: "planlagt" }
 *
 * Fem emner fra 20.11.2026 (prosesslæreren). Hvert emne har sin egen emneøkt.
 * Emnet Grunnleggende elektro er lagt til rett etter grunnbegrepene 28.11.2026 (prosesslæreren).
 * Massebalanser er flyttet til rett etter grunnbegrepene 27.11.2026, slik at systemgrense og massebalanse er lært før Fluidmekanikk og energibalansene.
 */
KPL.sti("04-masse-og-energibalanser", [
  {
    emne: "Fysiske grunnbegreper",
    sider: [
      { fil: "storrelser-og-enheter.html", tittel: "Størrelser og enheter", meny: "Enheter", type: "fagstoff", status: "ferdig" },
      { fil: "masse-volum-tetthet.html", tittel: "Masse, volum og tetthet", meny: "Tetthet", type: "fagstoff", status: "ferdig" },
      { fil: "tetthet-simulering.html", tittel: "Øv: Tetthetstårnet", meny: "Tetthetstårnet", type: "simulering", status: "ferdig" },
      { fil: "viskositet.html", tittel: "Viskositet: hvor tyktflytende er væsken?", meny: "Viskositet", type: "fagstoff", status: "ferdig" },
      { fil: "viskositet-simulering.html", tittel: "Øv: Viskositet", meny: "Simuler viskositet", type: "simulering", status: "ferdig" },
      { fil: "kraft-og-trykk.html", tittel: "Kraft og trykk", type: "fagstoff", status: "ferdig" },
      { fil: "energi-arbeid-effekt.html", tittel: "Energi, arbeid og effekt", meny: "Energi og effekt", type: "fagstoff", status: "ferdig" },
      { fil: "temperatur-og-varme.html", tittel: "Temperatur og varme", type: "fagstoff", status: "ferdig" },
      { fil: "grunnbegreper-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Grunnleggende elektro",
    sider: [
      { fil: "strom-spenning-resistans.html", tittel: "Strøm, spenning og resistans", meny: "Ohms lov", type: "fagstoff", status: "ferdig" },
      { fil: "elektrisk-effekt.html", tittel: "Elektrisk effekt og energi", meny: "Elektrisk effekt", type: "fagstoff", status: "ferdig" },
      { fil: "vekselstrom.html", tittel: "Likestrøm, vekselstrøm og trefase", meny: "Vekselstrøm", type: "fagstoff", status: "ferdig" },
      { fil: "kretser.html", tittel: "Kretser i serie og parallell", meny: "Kretser", type: "fagstoff", status: "ferdig" },
      { fil: "kretsbygger.html", tittel: "Øv: Kretsbygger", meny: "Kretsbygger", type: "simulering", status: "ferdig" },
      { fil: "elektromotorer.html", tittel: "Elektromotorer i anlegget", meny: "Elektromotorer", type: "fagstoff", status: "ferdig" },
      { fil: "elektrisk-sikkerhet.html", tittel: "Elektrisk sikkerhet", meny: "El-sikkerhet", type: "fagstoff", status: "ferdig" },
      { fil: "elektro-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Massebalanser i prosessanlegg",
    sider: [
      { fil: "massebalanse-i-anlegg.html", tittel: "Massebalanse i et anlegg", meny: "Massebalanse", type: "fagstoff", status: "ferdig" },
      { fil: "separasjon.html", tittel: "Separasjon", type: "fagstoff", status: "ferdig" },
      { fil: "resirkulering-og-utbytte.html", tittel: "Resirkulering og utbytte", meny: "Resirkulering", type: "fagstoff", status: "ferdig" }
    ]
  },
  {
    emne: "Fluidmekanikk",
    sider: [
      { fil: "trykk-i-vaesker.html", tittel: "Trykk i væsker", type: "fagstoff", status: "ferdig" },
      { fil: "stromning.html", tittel: "Strømning i rør", meny: "Strømning", type: "fagstoff", status: "ferdig" },
      { fil: "ror-ventiler-pumper.html", tittel: "Rør, ventiler og pumper", meny: "Rør og pumper", type: "fagstoff", status: "ferdig" },
      { fil: "trykktap.html", tittel: "Trykktap", type: "fagstoff", status: "ferdig" }
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
      { fil: "varmeveksler.html", tittel: "Energibalanse i en varmeveksler", meny: "Varmeveksler", type: "fagstoff", status: "ferdig" },
      { fil: "varmetap.html", tittel: "Varmetap og virkningsgrad", meny: "Varmetap", type: "fagstoff", status: "ferdig" },
      { fil: "energigjenvinning.html", tittel: "Energigjenvinning", type: "fagstoff", status: "ferdig" }
    ]
  }
]);
