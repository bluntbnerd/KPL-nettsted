/*
 * Læringsstien for Enhetsoperasjoner, delt i emner.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", sider: [ … ] }  (valgfritt: vurdering: "Hva emnet avsluttes med")
 * Side:  { fil: "filnavn.html", tittel: "Tittel", meny: "Kort menytittel", status: "utkast" | "ferdig" }
 * Planlagt side (ikke skrevet ennå): { tittel: "Tittel", status: "planlagt" }
 *
 * Sju emner fra 20.11.2026 (prosesslæreren). Hvert emne har sin egen emneøkt.
 * Endringer i denne filen avstemmes med temaøkten, som gjør endringen.
 * Her: utstyret og hvordan det virker (KT1, KT2). Beregninger ligger i Fysiske prinsipper,
 * flytskjemaer i Tekniske flytskjemaer og instrumenter i Automasjon.
 */
KPL.sti("03-enhetsoperasjoner", [
  {
    emne: "Prosessanlegget",
    sider: [
      { fil: "hva-er-en-enhetsoperasjon.html", tittel: "Hva er en enhetsoperasjon?", meny: "Enhetsoperasjoner", status: "ferdig" },
      { fil: "mekaniske-termiske-kjemiske-operasjoner.html", tittel: "Mekaniske, termiske og kjemiske operasjoner", meny: "Tre typer", status: "ferdig" },
      { fil: "batch-og-kontinuerlig-drift.html", tittel: "Batch og kontinuerlig drift", meny: "Batch og kontinuerlig", status: "ferdig" },
      { fil: "prosessanlegget-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Transport av væsker og gasser",
    sider: [
      { fil: "tanker-og-beholdere.html", tittel: "Tanker og beholdere", meny: "Tanker", status: "ferdig" },
      { fil: "pumpetyper.html", tittel: "Pumpetyper", status: "ferdig" },
      { fil: "ventiltyper.html", tittel: "Ventiltyper", status: "ferdig" },
      { fil: "kompressorer-og-vifter.html", tittel: "Kompressorer og vifter", meny: "Kompressorer", status: "ferdig" },
      { fil: "transport-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Varmeoverføring",
    sider: [
      { fil: "typer-varmevekslere.html", tittel: "Typer varmevekslere", meny: "Varmevekslere", status: "ferdig" },
      { fil: "kjoling-og-kondensering.html", tittel: "Kjøling og kondensering", meny: "Kjøling", status: "ferdig" },
      { fil: "fordampning-og-inndamping.html", tittel: "Fordamping og inndamping", meny: "Inndamping", status: "ferdig" },
      { fil: "varmeoverforing-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Mekaniske operasjoner",
    sider: [
      { fil: "knusing-og-maling.html", tittel: "Knusing og maling", status: "utkast" },
      { fil: "sikting.html", tittel: "Sikting", status: "utkast" },
      { fil: "sedimentering-og-sentrifugering.html", tittel: "Sedimentering og sentrifugering", meny: "Sedimentering", status: "utkast" },
      { fil: "filtrering.html", tittel: "Filtrering", status: "utkast" },
      { fil: "syklon-og-stovfilter.html", tittel: "Syklon og støvfilter", meny: "Syklon og filter", status: "utkast" },
      { fil: "mekaniske-operasjoner-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "utkast" }
    ]
  },
  {
    emne: "Termisk separasjon",
    sider: [
      { fil: "destillasjon.html", tittel: "Destillasjon", status: "ferdig" },
      { fil: "destillasjonskolonnen.html", tittel: "Destillasjonskolonnen", meny: "Kolonnen", status: "ferdig" },
      { fil: "ekstraksjon-og-absorpsjon.html", tittel: "Ekstraksjon og absorpsjon", meny: "Ekstraksjon", status: "ferdig" },
      { fil: "torking-og-krystallisering.html", tittel: "Tørking og krystallisering", meny: "Tørking", status: "ferdig" },
      { fil: "termisk-separasjon-hva-kan-du-na.html", tittel: "Hva kan du nå?", type: "sjekk", status: "ferdig" }
    ]
  },
  {
    emne: "Reaktorer og blanding",
    sider: [
      { tittel: "Blanding og omrøring", meny: "Blanding", status: "planlagt" },
      { tittel: "Reaktortyper", status: "planlagt" },
      { tittel: "Oppvarming og kjøling av reaktorer", meny: "Temperatur i reaktoren", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  },
  {
    emne: "Et helt anlegg",
    sider: [
      { tittel: "Hvorfor operasjonene kommer i denne rekkefølgen", meny: "Rekkefølgen", status: "planlagt" },
      { tittel: "Eksempel: fra råstoff til produkt", meny: "Eksempelanlegg", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  }
]);
