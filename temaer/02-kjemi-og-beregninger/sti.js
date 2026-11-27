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
      { fil: "atomet.html", tittel: "Atomet", status: "ferdig" },
      { fil: "skallmodell.html", tittel: "Skallmodellen", status: "ferdig" },
      { fil: "periodesystemet.html", tittel: "Periodesystemet", status: "ferdig" },
      { fil: "skallmodell-bygger.html", tittel: "Øv: bygg et atom (PhET)", status: "ferdig" },
      { fil: "stoffer-og-formler.html", tittel: "Grunnstoffer, forbindelser og formler", meny: "Stoffer og formler", status: "ferdig" },
      { fil: "ioner-og-ionebinding.html", tittel: "Ioner og ionebinding", meny: "Ionebinding", status: "ferdig" },
      { fil: "bygg-ioner.html", tittel: "Øv: bygg ioner (PhET)", status: "ferdig" },
      { fil: "kovalent-binding.html", tittel: "Kovalent binding og polaritet", meny: "Kovalent binding", status: "ferdig" },
      { fil: "metallbinding.html", tittel: "Metallbinding og legeringer", meny: "Metallbinding", status: "ferdig" },
      { fil: "svake-bindinger.html", tittel: "Svake bindinger og egenskapene til vann", meny: "Svake bindinger", status: "ferdig" },
      { fil: "hva-kan-du-na-2a.html", tittel: "Hva kan du nå?", status: "ferdig" }
    ]
  },
  {
    emne: "2B Stoffmengde, konsentrasjon og fortynning",
    vurdering: "videoinnlevering (V2) og prøve (V3)",
    sider: [
      { fil: "mol-og-molmasse.html", tittel: "Mol og molmasse", status: "ferdig" },
      { fil: "konsentrasjon.html", tittel: "Konsentrasjon og molare løsninger", meny: "Konsentrasjon", status: "ferdig" },
      { fil: "lage-losninger.html", tittel: "Å lage en løsning med kjent konsentrasjon", meny: "Lage løsninger", status: "ferdig" },
      { fil: "fortynning.html", tittel: "Fortynning", status: "ferdig" },
      { fil: "fortynning-simulering.html", tittel: "Øv: fortynning (simulering og kalkulator)", meny: "Fortynning – øv", type: "simulering", status: "ferdig" },
      { fil: "hva-kan-du-na-2b.html", tittel: "Hva kan du nå?", status: "ferdig" }
    ]
  },
  {
    emne: "2C Reaksjoner, støkiometri og energi",
    vurdering: "fagsamtale (V4)",
    sider: [
      { fil: "reaksjoner.html", tittel: "Kjemiske reaksjoner og reaksjonsligninger", meny: "Reaksjonsligninger", status: "ferdig" },
      { fil: "balansere-ligninger.html", tittel: "Øv: balanser ligninger (PhET)", status: "ferdig" },
      { fil: "stokiometri.html", tittel: "Støkiometriske beregninger", meny: "Støkiometri", status: "ferdig" },
      { fil: "forbrenning.html", tittel: "Forbrenning – fullstendig og ufullstendig", meny: "Forbrenning", status: "ferdig" },
      { fil: "energi-i-reaksjoner.html", tittel: "Energi i reaksjoner og andre prosesser – endoterm og eksoterm", meny: "Energi i prosesser", status: "ferdig" },
      { fil: "kuldepose-varmepose.html", tittel: "Øv: kuldepose og varmepose (simulering)", meny: "Kuldepose", type: "simulering", status: "ferdig" },
      { fil: "varmepumpe.html", tittel: "Øv: varmepumpe (simulering)", meny: "Varmepumpe", status: "ferdig" },
      { fil: "lab-varmepumpe.html", tittel: "Lab: varmepumpe", meny: "Lab: varmepumpe", type: "lab", status: "utkast" },
      { fil: "varmepumpe-regnehjelp.html", tittel: "Regnehjelp: varmepumpeforsøket", meny: "Regnehjelp", type: "fagstoff", status: "utkast" },
      { fil: "hva-kan-du-na-2c.html", tittel: "Hva kan du nå?", status: "ferdig" },
      { fil: "fagsamtale-reaksjoner-energi.html", tittel: "Forbered fagsamtalen: reaksjoner og energi", meny: "Fagsamtale", type: "sjekk", status: "utkast" },
      { fil: "begrensende-reaktant-utbytte.html", tittel: "Begrensende reaktant og utbytte", meny: "Begrensende reaktant", status: "ferdig", fordypning: true },
      { fil: "reaktanter-og-overskudd.html", tittel: "Øv: reaktanter og overskudd (PhET)", status: "ferdig", fordypning: true },
      { fil: "salt-pa-is.html", tittel: "Salt på is – en kuldeblanding", meny: "Salt på is", type: "simulering", status: "utkast", fordypning: true }
    ]
  },
  {
    emne: "2D Elektrokjemi",
    sider: [
      { fil: "redoks-spenningsrekka.html", tittel: "Redoks og spenningsrekka", meny: "Redoks", type: "fagstoff", status: "utkast" },
      { fil: "elektrolyse.html", tittel: "Elektrolyse", type: "fagstoff", status: "utkast" },
      { fil: "galvanisk-element.html", tittel: "Galvanisk element", meny: "Galvanisk element", type: "fagstoff", status: "utkast" },
      { fil: "korrosjon.html", tittel: "Korrosjon", type: "fagstoff", status: "utkast" },
      { fil: "hva-kan-du-na-2d.html", tittel: "Hva kan du nå?", type: "sjekk", status: "utkast" }
    ]
  },
  {
    emne: "2E Syrer og baser",
    sider: [
      { fil: "syrer-og-baser.html", tittel: "Syrer og baser", type: "fagstoff", status: "utkast" },
      { fil: "ph-og-ph-maling.html", tittel: "pH og pH-måling", meny: "pH", type: "fagstoff", status: "utkast" },
      { fil: "ph-skala-simulering.html", tittel: "Øv: pH-skalaen (PhET)", meny: "pH-skalaen", type: "simulering", status: "utkast" },
      { fil: "syre-base-losninger.html", tittel: "Øv: sterke og svake syrer (PhET)", meny: "Sterk og svak", type: "simulering", status: "utkast" },
      { fil: "likevekt-og-buffer.html", tittel: "Likevekt og buffer", meny: "Likevekt og buffer", type: "fagstoff", status: "utkast" },
      { fil: "hva-kan-du-na-2e.html", tittel: "Hva kan du nå?", type: "sjekk", status: "utkast" }
    ]
  }
]);
