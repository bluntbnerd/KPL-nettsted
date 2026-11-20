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
      { tittel: "Hva er en enhetsoperasjon?", meny: "Enhetsoperasjoner", status: "planlagt" },
      { tittel: "Mekaniske, termiske og kjemiske operasjoner", meny: "Tre typer", status: "planlagt" },
      { tittel: "Batch og kontinuerlig drift", meny: "Batch og kontinuerlig", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  },
  {
    emne: "Transport av væsker og gasser",
    sider: [
      { tittel: "Tanker og beholdere", status: "planlagt" },
      { tittel: "Pumpetyper", status: "planlagt" },
      { tittel: "Ventiltyper", status: "planlagt" },
      { tittel: "Kompressorer og vifter", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  },
  {
    emne: "Varmeoverføring",
    sider: [
      { tittel: "Typer varmevekslere", meny: "Varmevekslere", status: "planlagt" },
      { tittel: "Kjøling og kondensering", meny: "Kjøling", status: "planlagt" },
      { tittel: "Fordampning og inndamping", meny: "Inndamping", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  },
  {
    emne: "Mekaniske operasjoner",
    sider: [
      { tittel: "Knusing og maling", status: "planlagt" },
      { tittel: "Sikting", status: "planlagt" },
      { tittel: "Sedimentering og sentrifugering", meny: "Sedimentering", status: "planlagt" },
      { tittel: "Filtrering", status: "planlagt" },
      { tittel: "Syklon og støvfilter", meny: "Syklon og filter", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
    ]
  },
  {
    emne: "Termisk separasjon",
    sider: [
      { tittel: "Destillasjon", status: "planlagt" },
      { tittel: "Destillasjonskolonnen", meny: "Kolonnen", status: "planlagt" },
      { tittel: "Ekstraksjon og absorpsjon", meny: "Ekstraksjon", status: "planlagt" },
      { tittel: "Tørking og krystallisering", meny: "Tørking", status: "planlagt" },
      { tittel: "Hva kan du nå?", type: "sjekk", status: "planlagt" }
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
