/*
 * Læringsstien for tema 2, delt i emner etter ADK-årsplanen.
 * Rekkefølgen her er rekkefølgen elevene ser. Oversikt, Oppgaver og Ressurser legges til automatisk.
 *
 * Emne:  { emne: "Navn", vurdering: "Hva emnet avsluttes med", sider: [ … ] }
 * Side:  { fil: "filnavn.html", tittel: "Kort tittel", status: "utkast" | "ferdig" }
 * Kort tittel i venstremenyen (valgfritt): meny: "Kort"
 * Planlagt side (ikke skrevet ennå): { tittel: "Kort tittel", status: "planlagt" }
 */
KPL.sti("02-kjemi-og-beregninger", [
  {
    emne: "2A Grunnleggende kjemi og bindinger",
    vurdering: "prøve (V1)",
    sider: [
      { fil: "atomet.html", tittel: "Atomet", status: "utkast" },
      { fil: "skallmodell.html", tittel: "Skallmodellen", status: "utkast" },
      { fil: "periodesystemet.html", tittel: "Periodesystemet", status: "utkast" },
      { fil: "skallmodell-bygger.html", tittel: "Øv: bygg et atom (PhET)", status: "utkast" },
      { fil: "stoffer-og-formler.html", tittel: "Grunnstoffer, forbindelser og formler", meny: "Stoffer og formler", status: "utkast" },
      { fil: "ioner-og-ionebinding.html", tittel: "Ioner og ionebinding", meny: "Ionebinding", status: "utkast" },
      { fil: "bygg-ioner.html", tittel: "Øv: bygg ioner (PhET)", status: "utkast" },
      { fil: "kovalent-binding.html", tittel: "Kovalent binding og polaritet", meny: "Kovalent binding", status: "utkast" },
      { fil: "metallbinding.html", tittel: "Metallbinding og legeringer", meny: "Metallbinding", status: "utkast" },
      { fil: "svake-bindinger.html", tittel: "Svake bindinger og egenskapene til vann", meny: "Svake bindinger", status: "utkast" },
      { fil: "hva-kan-du-na-2a.html", tittel: "Hva kan du nå?", status: "utkast" }
    ]
  },
  {
    emne: "2B Stoffmengde, konsentrasjon og fortynning",
    vurdering: "videoinnlevering (V2) og prøve (V3)",
    sider: [
      { fil: "mol-og-molmasse.html", tittel: "Mol og molmasse", status: "utkast" },
      { fil: "konsentrasjon.html", tittel: "Konsentrasjon og molare løsninger", meny: "Konsentrasjon", status: "utkast" },
      { fil: "lage-losninger.html", tittel: "Å lage en løsning med kjent konsentrasjon", meny: "Lage løsninger", status: "utkast" },
      { fil: "fortynning.html", tittel: "Fortynning", status: "utkast" },
      { fil: "fortynning-simulering.html", tittel: "Øv: fortynning (simulering og kalkulator)", meny: "Fortynning – øv", type: "simulering", status: "utkast" },
      { fil: "hva-kan-du-na-2b.html", tittel: "Hva kan du nå?", status: "utkast" }
    ]
  },
  {
    emne: "2C Reaksjoner, støkiometri og energi",
    vurdering: "fagsamtale / praktisk prøve (V4)",
    sider: [
      { fil: "reaksjoner.html", tittel: "Kjemiske reaksjoner og reaksjonsligninger", meny: "Reaksjonsligninger", status: "utkast" },
      { fil: "balansere-ligninger.html", tittel: "Øv: balanser ligninger (PhET)", status: "utkast" },
      { fil: "stokiometri.html", tittel: "Støkiometriske beregninger", meny: "Støkiometri", status: "utkast" },
      { fil: "forbrenning.html", tittel: "Forbrenning – fullstendig og ufullstendig", meny: "Forbrenning", status: "utkast" },
      { fil: "energi-i-reaksjoner.html", tittel: "Energi i reaksjoner – endoterm og eksoterm", meny: "Energi i reaksjoner", status: "utkast" },
      { fil: "varmepumpe.html", tittel: "Øv: varmepumpe (simulering)", meny: "Varmepumpe", status: "utkast" },
      { fil: "hva-kan-du-na-2c.html", tittel: "Hva kan du nå?", status: "utkast" },
      { fil: "begrensende-reaktant-utbytte.html", tittel: "Begrensende reaktant og utbytte", meny: "Begrensende reaktant", status: "utkast", fordypning: true },
      { fil: "reaktanter-og-overskudd.html", tittel: "Øv: reaktanter og overskudd (PhET)", status: "utkast", fordypning: true }
    ]
  },
  {
    emne: "2D Elektrokjemi",
    sider: [
      { tittel: "Redoks og spenningsrekka", status: "planlagt" },
      { tittel: "Elektrolyse", status: "planlagt" },
      { tittel: "Galvanisk element", status: "planlagt" },
      { tittel: "Korrosjon", status: "planlagt" }
    ]
  },
  {
    emne: "2E Syrer og baser",
    sider: [
      { tittel: "Syrer og baser", status: "planlagt" },
      { tittel: "pH og pH-måling", status: "planlagt" },
      { tittel: "Likevekt og buffer", status: "planlagt" }
    ]
  }
]);
