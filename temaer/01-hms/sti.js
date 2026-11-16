/*
 * HMS er et oppslagstema med deltemaer. Hvert deltema vises som ett kort på temasiden,
 * og kortet går til første side. Forrige/Neste går bare innenfor deltemaet.
 *
 * Deltema: { emne: "Navn", beskrivelse: "Én linje", ikon: "bilder/…", sider: [ … ] }
 * Side:    { fil, tittel, meny: "Kort tittel", status }
 * Sider med tittel «Øv: …» vises som Simulering.
 * Når læreren godkjenner en side: endre status til "ferdig".
 * Sidene kom fra kildemateriale/sider/hms-tema.zip (16.11.2026) og er delt opp i korte sider.
 */
KPL.sti("01-hms", [
  { emne: "Grunnlaget for HMS-arbeid", beskrivelse: "Lover, ansvar, verneombud og internkontroll", ikon: "bilder/ikon-lov.svg", sider: [
    { fil: "01-grunnlag.html", tittel: "Grunnlaget for HMS-arbeid", meny: "Grunnlaget", status: "utkast" }
  ]},
  { emne: "Kjemikaliesikkerhet", beskrivelse: "Faremerking, sikkerhetsdatablad og lagring", ikon: "bilder/ghs02.png", sider: [
    { fil: "02-kjemikalier.html", tittel: "Faremerking av kjemikalier", meny: "Faremerking", status: "utkast" },
    { fil: "02-farepiktogrammer.html", tittel: "Øv: Farepiktogrammene", meny: "Piktogrammer", status: "utkast" },
    { fil: "02-sikkerhetsdatablad.html", tittel: "Sikkerhetsdatablad og eksponering", meny: "Datablad", status: "utkast" },
    { fil: "02-lagring.html", tittel: "Øv: Lagring av kjemikalier", meny: "Lagring", status: "utkast" }
  ]},
  { emne: "Risikovurdering", beskrivelse: "Risikomatrise, tiltakshierarkiet og skjemaet for skolelaben", ikon: "bilder/ikon-risiko.svg", sider: [
    { fil: "03-risiko.html", tittel: "Fare og risiko", meny: "Fare og risiko", status: "utkast" },
    { fil: "03-risikomatrise.html", tittel: "Øv: Risikomatrisen", meny: "Risikomatrisen", status: "utkast" },
    { fil: "03-tiltakshierarkiet.html", tittel: "Øv: Tiltakshierarkiet", meny: "Tiltakshierarkiet", status: "utkast" },
    { fil: "03-risikovurdering-lab.html", tittel: "Risikovurdering på skolelaben", meny: "På skolelaben", status: "utkast" }
  ]},
  { emne: "Personlig verneutstyr", beskrivelse: "Velg riktig vern – og riktig hanske", ikon: "bilder/pabud-verneutstyr.png", sider: [
    { fil: "04-verneutstyr.html", tittel: "Personlig verneutstyr", meny: "Verneutstyr", status: "utkast" }
  ]},
  { emne: "Sikkert arbeid på laboratoriet", beskrivelse: "Labregler, avtrekk, gassflasker og god laboratoriepraksis", ikon: "bilder/ikon-lab.svg", sider: [
    { fil: "05-laboratoriet.html", tittel: "Grunnreglene på laben", meny: "Grunnreglene", status: "utkast" },
    { fil: "05-finn-feilene.html", tittel: "Øv: Finn feilene på labbenken", meny: "Finn feilene", status: "utkast" },
    { fil: "05-avtrekksskap.html", tittel: "Øv: Avtrekksskapet", meny: "Avtrekksskapet", status: "utkast" },
    { fil: "05-glass-gass-varme.html", tittel: "Glass, gass, varme og biologiske farer", meny: "Glass, gass, varme", status: "utkast" }
  ]},
  { emne: "Brann og eksplosjon", beskrivelse: "Branntrekanten, eksplosjonsgrenser og Ex-soner", ikon: "bilder/ikon-ex.svg", sider: [
    { fil: "06-prosessanlegg.html", tittel: "Brann og eksplosjon", meny: "Brann og eksplosjon", status: "utkast" },
    { fil: "06-slokk-brannen.html", tittel: "Øv: Slokk brannen", meny: "Slokk brannen", status: "utkast" },
    { fil: "06-eksplosjonsomrade.html", tittel: "Øv: Eksplosjonsområdet", meny: "Eksplosjonsområdet", status: "utkast" }
  ]},
  { emne: "Trykk og løpske reaksjoner", beskrivelse: "Overtrykk, nivåsikring og løpske reaksjoner", ikon: "bilder/ikon-trykk.svg", sider: [
    { fil: "06-trykk.html", tittel: "Trykk og løpske reaksjoner", meny: "Trykk og reaksjoner", status: "utkast" },
    { fil: "06-trykktank.html", tittel: "Øv: Trykktanken", meny: "Trykktanken", status: "utkast" },
    { fil: "06-overfylling.html", tittel: "Øv: Overfylling av tank", meny: "Overfylling", status: "utkast" },
    { fil: "06-reaktor.html", tittel: "Øv: Reaktoren", meny: "Reaktoren", status: "utkast" }
  ]},
  { emne: "Sikkert arbeid i anlegget", beskrivelse: "Lås og merk, lukkede rom, SJA og barrierer", ikon: "bilder/ikon-las.svg", sider: [
    { fil: "06-loto.html", tittel: "Lås og merk og lukkede rom", meny: "Lås og merk", status: "utkast" },
    { fil: "06-loto-rekkefolge.html", tittel: "Øv: Lås og merk i riktig rekkefølge", meny: "Rekkefølgen", status: "utkast" },
    { fil: "06-sja.html", tittel: "SJA og arbeidstillatelse", meny: "SJA og AT", status: "utkast" },
    { fil: "06-barrierer.html", tittel: "Øv: Sveitserostmodellen", meny: "Barrierer", status: "utkast" }
  ]},
  { emne: "Fysisk og psykososialt arbeidsmiljø", beskrivelse: "Støy, ergonomi, skiftarbeid og samarbeid", ikon: "bilder/ikon-horsel.svg", sider: [
    { fil: "07-arbeidsmiljo.html", tittel: "Fysisk og psykososialt arbeidsmiljø", meny: "Arbeidsmiljø", status: "utkast" }
  ]},
  { emne: "Ytre miljø og avfall", beskrivelse: "Utslipp, farlig avfall og grønn kjemi", ikon: "bilder/ghs09.png", sider: [
    { fil: "08-ytre-miljo.html", tittel: "Ytre miljø og avfall", meny: "Ytre miljø", status: "utkast" }
  ]},
  { emne: "Beredskap og avvikshåndtering", beskrivelse: "Nødprosedyrer, førstehjelp og læring av hendelser", ikon: "bilder/ikon-forstehjelp.svg", sider: [
    { fil: "09-beredskap.html", tittel: "Beredskap og avvikshåndtering", meny: "Beredskap", status: "utkast" }
  ]},
  { emne: "Storulykker – hva kan vi lære?", beskrivelse: "Piper Alpha, Bhopal, Texas City og Vest Tank", ikon: "bilder/ikon-storulykke.svg", sider: [
    { fil: "10-storulykker.html", tittel: "Storulykker – hva kan vi lære?", meny: "Storulykker", status: "utkast" }
  ]}
], { oppslag: true });
