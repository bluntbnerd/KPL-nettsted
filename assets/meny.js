/*
 * KPL – felles oppførsel for hele nettstedet.
 *
 * Bygger topplinje, brødsmulesti, læringssti (sidepanel), Forrige/Neste,
 * «På denne siden», fremdrift (haker), quiz, ordkort og søk.
 *
 * HVOR LIGGER HVA
 * - Temaene (navn, farge, ikon): TEMAER under. Endres i hovedøkten.
 * - Sidene i hvert tema og rekkefølgen: temaer/<tema>/sti.js. Endres i temaøkten.
 * - «Nå jobber vi med» på forsiden: NAA under. Endres i hovedøkten.
 * - VIS_UTKAST: true = utkast vises i læringsstien (merket UTKAST).
 *   Settes til false før nettstedet publiseres for elevene.
 */
(function () {
  "use strict";

  var VIS_UTKAST = true;
  // Engelske begreper i ordlistene: lagres i tabellene, men vises ikke foreløpig.
  var VIS_ENGELSK = false;
  // Rødt «utkast»-merke og -varsel på sider som har innhold. Status beholdes i sti.js.
  var VIS_UTKASTMERKE = false;

  // Sidetyper. Settes med type: "…" i sti.js, ellers gjettes den ut fra tittelen.
  var SIDETYPER = {
    oversikt: "Oversikt", fagstoff: "Teori", simulering: "Simulering", lab: "Lab",
    sjekk: "Quiz", oppgaver: "Oppgaver", ressurser: "Ressurser", video: "Video", fordypning: "Fordypning",
    vurdering: "Vurdering"
  };
  // Kort tittel i venstremenyen: meny: "…" i sti.js, ellers fjernes «Øv:» og «(PhET)»,
  // siden sidetype-merket allerede sier at det er en simulering.
  function menyTittel(s) {
    if (s.meny) return s.meny;
    return String(s.tittel).replace(/^\s*Øv:\s*/i, "").replace(/\s*\(PhET\)\s*$/i, "").replace(/^./, function (c) { return c.toUpperCase(); });
  }
  function gjettType(s) {
    if (s.type && SIDETYPER[s.type]) return s.type;
    if (/^øv\b|phet|simulering/i.test(s.tittel)) return "simulering";
    if (/^hva (kan|vet) du/i.test(s.tittel)) return "sjekk";
    if (/^lab\b|^forsøk|^øvelse/i.test(s.tittel)) return "lab";
    return "fagstoff";
  }

  var NETTSTED = "Kjemiprosess- og laboratoriefag";
  var KORTNAVN = "KPL";
  var BUNNTEKST = "Sauda vgs · Vg2 kjemiprosess- og laboratoriefag";

  // Designvarianter til utprøving: assets/design/<id>.css (og eventuelt <id>.js), se CLAUDE.md.
  // Ingen varianter nå. Læringslab er valgt (27.11.2026) og ligger i stil.css og nederst i denne filen.
  var DESIGNER = [];

  // «Nå jobber vi med» på forsiden. Oppdateres når en ny periode starter.
  // Slått av 16.11.2026: klassen hopper mellom temaer i samme uke. Sett tilbake ved behov.
  var NAA = null && {
    overskrift: "Kjemiske reaksjoner og reaksjonsligninger",
    tekst: "Vi repeterer atomer og bindinger og går videre til reaksjoner. Start i Kjemiske prinsipper.",
    temaer: ["02-kjemi-og-beregninger"]
  };

  var TEMAER = [
    // Rekkefølgen her er rekkefølgen elevene ser. Mappenavnene er faste (de er nettadresser)
    // og trenger ikke stemme med navn eller rekkefølge. Nummer vises ikke for elevene.
    // Tidligere tema 8 (rapportering og kvalitet) og 9 (miljø) er slått inn i Laboratorium og analyse og Bransjelære.
    { mappe: "01-hms", nr: 1, tittel: "HMS", farge: "#c2410c", ikon: "skjold", fag: ["PT", "ADK"] },
    { mappe: "02-kjemi-og-beregninger", nr: 2, tittel: "Kjemiske prinsipper", farge: "#2563eb", ikon: "kolbe", fag: ["KT", "ADK"], periodesystem: true },
    { mappe: "04-masse-og-energibalanser", nr: 3, tittel: "Fysiske prinsipper", farge: "#7c3aed", ikon: "vekt", fag: ["KT"], periodesystem: true },
    { mappe: "03-enhetsoperasjoner", nr: 4, tittel: "Enhetsoperasjoner", farge: "#0f766e", ikon: "kolonne", fag: ["KT"] },
    { mappe: "05-maling-styring-regulering", nr: 5, tittel: "Automasjon", farge: "#b45309", ikon: "maler", fag: ["PT"] },
    { mappe: "06-drift-og-vedlikehold", nr: 6, tittel: "Drift og vedlikehold", farge: "#475569", ikon: "tannhjul", fag: ["PT", "ADK"] },
    { mappe: "07-laboratorium-og-analyse", nr: 7, tittel: "Laboratorium og analyse", farge: "#0e7490", ikon: "reagensror", fag: ["ADK"], periodesystem: true },
    { mappe: "10-yrket-og-arbeidslivet", nr: 8, tittel: "Bransjelære", farge: "#be185d", ikon: "hjelm", fag: ["PT", "KT", "ADK"] },
    { mappe: "11-tekniske-flytskjemaer", nr: 9, tittel: "Tekniske flytskjemaer", farge: "#4d7c0f", ikon: "flytskjema", fag: ["PT"] }
  ];

  var HOVEDLENKER = [
    { tittel: "Årsplan", fil: "arsplan.html" },
    { tittel: "Temaer", fil: "temaer/index.html" },
    { tittel: "Eksamen", fil: "eksamen.html" },
    { tittel: "Fagoversikt", fil: "fag/index.html" }
  ];

  var FAGSIDER = [
    { tittel: "Produksjon og tjenester", fil: "fag/produksjon-og-tjenester.html" },
    { tittel: "Kjemisk teknologi", fil: "fag/kjemisk-teknologi.html" },
    { tittel: "Analyse, dokumentasjon og kvalitet", fil: "fag/analyse-dokumentasjon-og-kvalitet.html" }
  ];

  // Enkle strektegnede ikoner (24 × 24)
  var IKONER = {
    skjold: '<path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    kolbe: '<path d="M9 3h6"/><path d="M10 3v6l-5.2 9.2A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-2.8L14 9V3"/><path d="M7.5 15h9"/>',
    kolonne: '<rect x="7" y="3" width="7" height="18" rx="3.5"/><path d="M7 8.5h7M7 12h7M7 15.5h7"/><path d="M14 6h4v12h-4"/>',
    vekt: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>',
    maler: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1.3"/><path d="M6 13.5l1 .6M12 9v1.2M18 13.5l-1 .6"/>',
    tannhjul: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/><circle cx="12" cy="12" r="6.5"/>',
    reagensror: '<path d="M8 3h5"/><path d="M9 3v14.5a2.5 2.5 0 0 0 5 0V3"/><path d="M9 11h5"/><path d="M17 7h4M19 5v4"/>',
    skjema: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4"/>',
    blad: '<path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',
    hjelm: '<path d="M3 17.5h18"/><path d="M5 17.5a7 7 0 0 1 14 0"/><path d="M10 10.8V8h4v2.8"/>',
    flytskjema: '<rect x="2.5" y="4" width="6" height="6" rx="1"/><rect x="15.5" y="14" width="6" height="6" rx="1"/><path d="M8.5 7h4.5v10h2.5"/><path d="M13.5 15l2 2-2 2"/>',
    kalender: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    hatt: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    liste: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    hake: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    laas: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'
  };
  function ikon(navn, klasse) {
    return '<svg class="ikon ' + (klasse || "") + '" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (IKONER[navn] || "") + "</svg>";
  }

  // ---------- Adresser ----------
  var skript = document.currentScript;
  var ROT = new URL("../", skript.src);
  function adresse(fil) { return new URL(fil, ROT).href; }
  function relativ(href) {
    var h = decodeURIComponent(href.split("#")[0].split("?")[0]);
    var r = decodeURIComponent(ROT.href);
    var rel = h.indexOf(r) === 0 ? h.slice(r.length) : h;
    if (rel === "" || /\/$/.test(rel)) rel += "index.html";
    return rel;
  }
  var HER = relativ(location.href);

  // ---------- Designvariant ----------
  // Læringslab er fast utseende. Reglene i stil.css bruker klassen design-laeringslab.
  var DESIGN = "laeringslab";
  document.documentElement.classList.add("design-laeringslab");
  (function () {
    try { localStorage.removeItem("kpl-design"); } catch (e) { /* privat modus */ }
    var onsket = new URLSearchParams(location.search).get("design");
    if (onsket && DESIGNER.some(function (d) { return d.id === onsket; })) {
      DESIGN = onsket;
      document.documentElement.classList.add("design-" + DESIGN);
      var l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = adresse("assets/design/" + DESIGN + ".css");
      document.head.appendChild(l);
      var d = DESIGNER.filter(function (x) { return x.id === DESIGN; })[0];
      if (d && d.js) { var s = document.createElement("script"); s.src = adresse("assets/design/" + DESIGN + ".js"); document.head.appendChild(s); }
    }
  })();
  var temaTreff = HER.match(/^temaer\/([^/]+)\/(.+)$/);
  var TEMA = temaTreff ? TEMAER.filter(function (t) { return t.mappe === temaTreff[1]; })[0] : null;

  // ---------- Fremdrift (lagres i elevens egen nettleser) ----------
  var NOKKEL = "kpl-ferdig";
  function lesFerdig() {
    try { return JSON.parse(localStorage.getItem(NOKKEL) || "{}"); } catch (e) { return {}; }
  }
  function settFerdig(fil, verdi) {
    var f = lesFerdig();
    if (verdi) f[fil] = Date.now(); else delete f[fil];
    try { localStorage.setItem(NOKKEL, JSON.stringify(f)); } catch (e) { /* privat modus */ }
  }
  function erFerdig(fil) { return !!lesFerdig()[fil]; }

  // ---------- Læringsstier fra sti.js ----------
  var STIER = {};
  window.KPL = window.KPL || {};
  // Valg: { oppslag: true } gjør temaet til et oppslagstema med undertemaer som kort
  // (ingen nummer og ingen Forrige/Neste). Sider kan da ha beskrivelse og ikon.
  var STIVALG = {};
  window.KPL.sti = function (mappe, sider, valg) { STIER[mappe] = sider || []; STIVALG[mappe] = valg || {}; };
  function erOppslag(tema) { return !!(tema && STIVALG[tema.mappe] && STIVALG[tema.mappe].oppslag); }

  function lastSti(mappe) {
    return new Promise(function (ok) {
      if (STIER[mappe]) return ok();
      var s = document.createElement("script");
      s.src = adresse("temaer/" + mappe + "/sti.js");
      s.onload = function () { ok(); };
      s.onerror = function () { STIER[mappe] = []; ok(); };
      document.head.appendChild(s);
    });
  }
  function lastAlleStier() { return Promise.all(TEMAER.map(function (t) { return lastSti(t.mappe); })); }

  // sti.js kan være en flat liste med sider, eller en liste med emner:
  // { emne: "2A …", vurdering: "Prøve", sider: [ … ] }
  // Side: { fil, tittel, status: "utkast" | "ferdig" | "planlagt" }  (planlagt trenger ingen fil)
  function emner(tema) {
    var b = "temaer/" + tema.mappe + "/";
    var raa = STIER[tema.mappe] || [];
    var grupper = raa.length && raa[0].emne ? raa : [{ emne: null, sider: raa }];
    return grupper.map(function (g) {
      var sider = (g.sider || []).filter(function (s) {
        if (s.status === "planlagt") return VIS_UTKAST;
        return VIS_UTKAST || s.status !== "utkast";
      }).map(function (s) {
        return s.status === "planlagt"
          ? { tittel: s.tittel, meny: s.meny, type: "planlagt" }
          : { tittel: s.tittel, meny: s.meny, fil: b + s.fil, type: "fagstoff", sidetype: s.fordypning ? "fordypning" : gjettType(s), utkast: s.status === "utkast", fordypning: !!s.fordypning };
      });
      // Fordypningssider (ekstrastoff utenfor hovedstien) står nederst i emnet
      sider = sider.filter(function (s) { return !s.fordypning; }).concat(sider.filter(function (s) { return s.fordypning; }));
      // Nummerering som «2A» vises ikke for elevene
      var navn = g.emne ? g.emne.replace(/^\s*\d+\s*[A-Za-zÆØÅæøå]?\s*[.:–-]?\s+/, "") : g.emne;
      return { navn: navn, vurdering: g.vurdering, sider: sider };
    });
  }
  function steg(tema) {
    var b = "temaer/" + tema.mappe + "/";
    var sider = [];
    emner(tema).forEach(function (e) {
      // Fordypning er utenfor hovedstien: ikke i Forrige/Neste og ikke i fremdriften
      e.sider.forEach(function (s) { if (s.type === "fagstoff" && !s.fordypning) { s.emne = e.navn; sider.push(s); } });
    });
    return [{ tittel: "Oversikt", fil: b + "index.html", type: "oversikt" }]
      .concat(sider)
      .concat([
        { tittel: "Oppgaver", fil: b + "oppgaver.html", type: "oppgaver" },
        { tittel: "Ressurser", fil: b + "ressurser.html", type: "ressurser" }
      ]);
  }
  function telles(s) { return s.type === "fagstoff" || s.type === "oppgaver"; }
  function fremdrift(tema) {
    var alle = steg(tema).filter(telles);
    var ferdig = alle.filter(function (s) { return erFerdig(s.fil); }).length;
    return { ferdig: ferdig, totalt: alle.length };
  }

  // ---------- Små hjelpere ----------
  function lag(tag, klasse, tekst) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (tekst != null) e.textContent = tekst;
    return e;
  }
  function lenke(fil, tekst, klasse) {
    var a = lag("a", klasse, tekst);
    a.href = adresse(fil);
    return a;
  }
  function temaFarge(el, tema) { el.style.setProperty("--tema", tema.farge); }

  // =====================================================================
  var main = document.querySelector("main");
  if (!main) return;
  var body = document.body;
  var erForside = body.getAttribute("data-side") === "forside";
  if (TEMA) { temaFarge(document.documentElement, TEMA); body.classList.add("i-tema"); }

  // ---------- Topplinje ----------
  var topp = lag("header", "topp");
  var knapp = lag("button", "menyknapp");
  knapp.type = "button";
  knapp.innerHTML = '<span aria-hidden="true">☰</span> Meny';
  knapp.setAttribute("aria-label", "Vis eller skjul menyen");
  knapp.addEventListener("click", function () { body.classList.toggle("meny-apen"); });

  var merke = lenke("index.html", "", "merke");
  merke.innerHTML = '<span class="merke-tekst"><strong>' + KORTNAVN + "</strong></span>";
  merke.title = NETTSTED;

  var hovednav = lag("nav", "hovedlenker");
  hovednav.setAttribute("aria-label", "Hovedmeny");
  HOVEDLENKER.forEach(function (h) {
    var a = lenke(h.fil, h.tittel);
    var aktiv = HER === h.fil || (h.fil === "temaer/index.html" && TEMA) || (h.fil === "fag/index.html" && /^fag\//.test(HER));
    if (aktiv) a.className = "aktiv";
    hovednav.appendChild(a);
  });

  // Søk
  var sok = lag("div", "sok");
  var felt = lag("input");
  felt.type = "search";
  felt.placeholder = "Søk …";
  felt.setAttribute("aria-label", "Søk etter side");
  var treff = lag("ul");
  treff.hidden = true;
  var sokSider = null;
  function byggSokSider() {
    var liste = [{ tittel: "Forside", fil: "index.html", sted: "" }];
    HOVEDLENKER.forEach(function (h) { liste.push({ tittel: h.tittel, fil: h.fil, sted: "" }); });
    FAGSIDER.forEach(function (f) { liste.push({ tittel: f.tittel, fil: f.fil, sted: "Fagoversikt" }); });
    TEMAER.forEach(function (t) {
      steg(t).forEach(function (s) {
        liste.push({ tittel: s.type === "oversikt" ? t.tittel : s.tittel, fil: s.fil, sted: s.type === "oversikt" ? "Tema" : t.tittel, utkast: s.utkast });
      });
    });
    return liste;
  }
  felt.addEventListener("focus", function () {
    if (!sokSider) lastAlleStier().then(function () { sokSider = byggSokSider(); visTreff(); });
  });
  function visTreff() {
    var q = felt.value.trim().toLowerCase();
    treff.innerHTML = "";
    if (!q || !sokSider) { treff.hidden = true; return; }
    var funn = sokSider.filter(function (s) { return (s.tittel + " " + s.sted).toLowerCase().indexOf(q) !== -1; }).slice(0, 12);
    funn.forEach(function (s) {
      var li = lag("li"), a = lenke(s.fil, s.tittel);
      if (s.sted) a.appendChild(lag("small", "", s.sted + (s.utkast ? " · utkast" : "")));
      li.appendChild(a);
      treff.appendChild(li);
    });
    if (!funn.length) treff.appendChild(lag("li", "ingen", "Ingen treff"));
    treff.hidden = false;
  }
  felt.addEventListener("input", visTreff);
  felt.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { var f = treff.querySelector("a"); if (f) location.href = f.href; }
    if (e.key === "Escape") { felt.value = ""; visTreff(); }
  });
  document.addEventListener("click", function (e) { if (!sok.contains(e.target)) treff.hidden = true; });
  sok.appendChild(felt);
  sok.appendChild(treff);

  topp.appendChild(knapp);
  topp.appendChild(merke);
  topp.appendChild(hovednav);
  topp.appendChild(sok);

  // ---------- Oppsett ----------
  // Sidepanelet vises bare inne i et tema (læringsstien). Ellers brukes det bare som mobilmeny.
  // Sidemeny bare inne på sidene i et tema, ikke på temaets oversiktsside (der er det kort)
  var erTemaOversikt = TEMA && /\/index\.html$/.test(HER);
  var oppsett = lag("div", "oppsett" + (erForside ? " uten-sidemeny" : (TEMA && !erTemaOversikt) ? "" : " ingen-sti"));
  var sidemeny = lag("nav", "sidemeny");
  sidemeny.setAttribute("aria-label", TEMA ? "Læringssti" : "Temaer");
  var toc = lag("aside", "toc");
  toc.setAttribute("aria-label", "På denne siden");
  var bunn = lag("footer", "bunn");
  bunn.appendChild(lag("span", "", BUNNTEKST));
  if (DESIGNER.length > 1) {
    var dv = lag("label", "designvelger", "Utseende: ");
    var sel = lag("select");
    DESIGNER.forEach(function (d) { var o = lag("option", "", d.navn); o.value = d.id; if (d.id === DESIGN) o.selected = true; sel.appendChild(o); });
    sel.addEventListener("change", function () {
      try { localStorage.setItem("kpl-design", sel.value); } catch (e) { /* privat modus */ }
      var u = new URL(location.href); u.searchParams.set("design", sel.value); location.href = u.href;
    });
    dv.appendChild(sel);
    bunn.appendChild(dv);
  }

  main.parentNode.insertBefore(topp, main);
  var banner = null;
  if (!erForside) {
    banner = lag("div", "banner");
    main.parentNode.insertBefore(banner, main);
  }
  main.parentNode.insertBefore(oppsett, main);
  if (!erForside) oppsett.appendChild(sidemeny);
  oppsett.appendChild(main);
  if (!erForside) oppsett.appendChild(toc);
  document.body.appendChild(bunn);

  var slor = lag("div", "slor");
  slor.addEventListener("click", function () { body.classList.remove("meny-apen"); });
  document.body.appendChild(slor);

  // Utkast-varsel
  if (VIS_UTKASTMERKE && body.getAttribute("data-status") === "utkast") {
    main.insertBefore(lag("div", "utkast-varsel", "UTKAST – denne siden er ikke godkjent av lærer ennå."), main.firstChild);
  }

  // ---------- Brødsmulesti og banner ----------
  function byggBanner() {
    if (!banner) return;
    var indre = lag("div", "banner-indre");
    var smule = lag("nav", "brodsmuler");
    smule.setAttribute("aria-label", "Brødsmulesti");
    var ol = lag("ol");
    function ledd(fil, tekst) {
      var li = lag("li");
      if (fil) li.appendChild(lenke(fil, tekst)); else { var s = lag("span", "", tekst); s.setAttribute("aria-current", "page"); li.appendChild(s); }
      ol.appendChild(li);
    }
    var h1 = main.querySelector("h1");
    var sidetittel = h1 ? h1.textContent.replace(/\s+(PT|KT|ADK)$/, "").trim() : document.title;
    ledd("index.html", "Forside");
    if (TEMA) {
      ledd("temaer/index.html", "Temaer");
      var erOversikt = /\/index\.html$/.test(HER);
      if (erOversikt) ledd(null, TEMA.tittel);
      else { ledd("temaer/" + TEMA.mappe + "/index.html", TEMA.tittel); ledd(null, sidetittel); }
    } else if (/^fag\//.test(HER) && HER !== "fag/index.html") {
      ledd("fag/index.html", "Fagoversikt"); ledd(null, sidetittel);
    } else {
      ledd(null, sidetittel);
    }
    smule.appendChild(ol);
    indre.appendChild(smule);

    if (TEMA) {
      var tittel = lag("div", "banner-tema");
      // Temanavnet står allerede i brødsmulestien, så banneret viser bare fremdriften
      var fr = fremdrift(TEMA);
      if (fr.totalt) {
        var maler = lag("div", "fremdrift");
        maler.innerHTML = '<div class="fremdrift-tekst">' + fr.ferdig + " av " + fr.totalt + ' ferdig</div><div class="fremdrift-bar"><span style="width:' + Math.round(100 * fr.ferdig / fr.totalt) + '%"></span></div>';
        tittel.appendChild(maler);
      }
      indre.appendChild(tittel);
    }
    banner.innerHTML = "";
    banner.appendChild(indre);
    maalBanner();
  }
  function maalBanner() {
    if (banner) document.documentElement.style.setProperty("--banner-hoyde", banner.offsetHeight + "px");
  }
  window.addEventListener("resize", maalBanner);

  // ---------- Sidepanel ----------
  function byggSidemeny() {
    sidemeny.innerHTML = "";
    // Hovedlenkene ligger i panelet på mobil
    var mobil = lag("div", "sidemeny-hoved");
    HOVEDLENKER.forEach(function (h) { mobil.appendChild(lenke(h.fil, h.tittel)); });
    sidemeny.appendChild(mobil);

    if (TEMA) {
      // Panelet starter rett på emnene. Temaet, «Alle temaer» og oversikten nås fra topplinjen og brødsmulestien.
      var b = "temaer/" + TEMA.mappe + "/";
      function stegLi(s, merkeTekst) {
        var li = lag("li");
        if (s.type !== "fagstoff") li.className = "sti-" + s.type;
        var a;
        if (s.type === "planlagt") {
          a = lag("span", "sti-lenke");
          a.innerHTML = '<span class="sti-nr">' + merkeTekst + '</span><span class="sti-tittel"></span><span class="kommer-merke">' + ikon("laas", "laas") + 'kommer</span>';
        } else {
          a = lenke(s.fil, "");
          var ferdig = erFerdig(s.fil);
          a.innerHTML = '<span class="sti-nr' + (ferdig ? " ferdig" : "") + '">' + (ferdig ? ikon("hake") : merkeTekst) + '</span><span class="sti-tittel"></span>';
          if (s.utkast && VIS_UTKASTMERKE) a.appendChild(lag("span", "utkast-merke", "utkast"));
          else if (s.sidetype) a.appendChild(lag("span", "type-merke type-" + s.sidetype, SIDETYPER[s.sidetype]));
          if (s.fil === HER) { a.classList.add("aktiv"); a.setAttribute("aria-current", "page"); }
        }
        a.querySelector(".sti-tittel").textContent = menyTittel(s);
        if (menyTittel(s) !== s.tittel) a.title = s.tittel;
        li.appendChild(a);
        return li;
      }

      var grupper = emner(TEMA);
      // Står eleven i et emne, vises bare det emnet. Ellers vises alle emnene lukket.
      var mittEmne = grupper.filter(function (e) { return e.navn && e.sider.some(function (s) { return s.fil === HER; }); });
      if (mittEmne.length) grupper = mittEmne;
      grupper.forEach(function (e) {
        var ol = lag("ol", "sti");
        var nr = 0;
        e.sider.forEach(function (s) {
          var li = stegLi(s, s.fordypning ? "+" : (erOppslag(TEMA) && !e.navn) ? "•" : String(++nr));
          if (s.fordypning) li.classList.add("sti-fordypning");
          ol.appendChild(li);
        });
        if (!e.navn) { sidemeny.appendChild(ol); return; }
        var her = e.sider.some(function (s) { return s.fil === HER; });
        var tellbare = e.sider.filter(function (s) { return s.type === "fagstoff" && !s.fordypning; });
        var ferdige = tellbare.filter(function (s) { return erFerdig(s.fil); }).length;
        var d = lag("details", "emne");
        d.open = her;
        var sum = lag("summary");
        sum.innerHTML = '<span class="emne-navn"></span><span class="emne-status">' + (tellbare.length ? ferdige + "/" + tellbare.length : "") + "</span>";
        sum.querySelector(".emne-navn").textContent = e.navn;
        d.appendChild(sum);
        d.appendChild(ol);
        if (e.vurdering) d.appendChild(lag("div", "emne-vurdering", "Avsluttes med: " + e.vurdering));
        sidemeny.appendChild(d);
      });
      // Oppgaver og Ressurser nås fra temaets oversiktsside, ikke fra menyen.
      sidemeny.appendChild(lag("div", "sidemeny-overskrift", "Verktøy"));
      var ol = lenke("temaer/" + TEMA.mappe + "/index.html#ordliste", "", "ps-knapp ps-sidemeny");
      ol.innerHTML = '<svg class="ikon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/><path d="M9 8h6"/></svg><span>Ordliste og ordkort</span>';
      if (/\/index\.html$/.test(HER)) ol.addEventListener("click", function () { var b = document.getElementById("ordliste"); if (b) b.open = true; });
      sidemeny.appendChild(ol);
      if (TEMA.periodesystem) sidemeny.appendChild(psKnapp("ps-knapp ps-sidemeny"));
    } else {
      sidemeny.appendChild(lag("div", "sidemeny-overskrift", "Temaer"));
      var ul = lag("ul", "temaliste");
      TEMAER.forEach(function (t) {
        var li = lag("li");
        // Tema uten innhold ennå: grått, med lås og uten lenke
        var tomt = !steg(t).some(function (s) { return s.type === "fagstoff"; });
        var a = tomt ? lag("span", "laast") : lenke("temaer/" + t.mappe + "/index.html", "");
        if (tomt) a.title = "Kommer";
        temaFarge(a, t);
        a.innerHTML = '<span class="liten-ikon">' + ikon(t.ikon) + "</span><span>" + t.tittel + "</span>" +
          (tomt ? '<span class="laas-liten">' + ikon("laas") + "</span>" : "");
        li.appendChild(a);
        ul.appendChild(li);
      });
      sidemeny.appendChild(ul);
      if (/^fag\//.test(HER)) {
        sidemeny.appendChild(lag("div", "sidemeny-overskrift", "Programfag"));
        var fl = lag("ul", "temaliste");
        FAGSIDER.forEach(function (f) {
          var li = lag("li"), a = lenke(f.fil, f.tittel);
          if (f.fil === HER) a.classList.add("aktiv");
          li.appendChild(a); fl.appendChild(li);
        });
        sidemeny.appendChild(fl);
      }
    }
  }

  // ---------- Forrige / Neste og «Merk som ferdig» ----------
  function byggBla() {
    if (!TEMA) return;
    var liste = steg(TEMA);
    var i = -1;
    liste.forEach(function (s, n) { if (s.fil === HER) i = n; });
    // Oppslagstema med deltemaer: Forrige/Neste går bare innenfor deltemaet
    if (erOppslag(TEMA) && i > 0 && liste[i].type === "fagstoff" && liste[i].emne) {
      var mine = liste.filter(function (s) { return s.type === "fagstoff" && s.emne === liste[i].emne; });
      var j = mine.indexOf(liste[i]);
      var oversikt = { tittel: "Alle emner i " + TEMA.tittel, fil: "temaer/" + TEMA.mappe + "/index.html" };
      liste = [j > 0 ? mine[j - 1] : oversikt, liste[i], j < mine.length - 1 ? mine[j + 1] : oversikt];
      i = 1;
    } else if (erOppslag(TEMA) && i > 0 && liste[i].type === "fagstoff") {
      // Oppslagstema: «Merk som ferdig» og tilbake til oversikten, ingen Forrige/Neste
      var felt0 = lag("div", "slutt-felt");
      var her0 = liste[i];
      var fk = lag("button", "ferdig-knapp"); fk.type = "button";
      var oppd = function () { var f = erFerdig(her0.fil); fk.classList.toggle("er-ferdig", f); fk.innerHTML = ikon("hake") + (f ? "Ferdig – klikk for å angre" : "Merk siden som ferdig"); };
      fk.addEventListener("click", function () { settFerdig(her0.fil, !erFerdig(her0.fil)); oppd(); byggSidemeny(); byggBanner(); });
      oppd();
      felt0.appendChild(fk);
      var nav0 = lag("nav", "bla");
      var tilbake = lenke("temaer/" + TEMA.mappe + "/index.html", "", "bla-forrige");
      tilbake.innerHTML = "<small>← Tilbake</small>";
      tilbake.appendChild(lag("span", "", "Alle emner i " + TEMA.tittel));
      nav0.appendChild(tilbake);
      felt0.appendChild(nav0);
      main.appendChild(felt0);
      return;
    }
    if (i === -1) return;
    var gammel = main.querySelector(".slutt-felt");
    if (gammel) gammel.remove();
    var felt = lag("div", "slutt-felt");

    var her = liste[i];
    if (telles(her)) {
      var ferdigKnapp = lag("button", "ferdig-knapp");
      ferdigKnapp.type = "button";
      var oppdater = function () {
        var f = erFerdig(her.fil);
        ferdigKnapp.classList.toggle("er-ferdig", f);
        ferdigKnapp.innerHTML = ikon("hake") + (f ? "Ferdig – klikk for å angre" : "Merk siden som ferdig");
      };
      ferdigKnapp.addEventListener("click", function () {
        settFerdig(her.fil, !erFerdig(her.fil));
        oppdater(); byggSidemeny(); byggBanner();
      });
      oppdater();
      felt.appendChild(ferdigKnapp);
    }

    var bla = lag("nav", "bla");
    bla.setAttribute("aria-label", "Bla i læringsstien");
    if (i > 0) {
      var f = lenke(liste[i - 1].fil, "", "bla-forrige");
      f.innerHTML = "<small>← Forrige</small>";
      f.appendChild(lag("span", "", liste[i - 1].tittel));
      bla.appendChild(f);
    } else bla.appendChild(lag("span"));
    if (i < liste.length - 1) {
      var n2 = lenke(liste[i + 1].fil, "", "bla-neste");
      n2.innerHTML = "<small>Neste →</small>";
      n2.appendChild(lag("span", "", liste[i + 1].tittel));
      bla.appendChild(n2);
    }
    felt.appendChild(bla);
    main.appendChild(felt);
  }

  // ---------- «På denne siden» ----------
  function byggToc() {
    var overskrifter = Array.prototype.slice.call(main.querySelectorAll("h2"));
    if (overskrifter.length < 3) { toc.remove(); oppsett.classList.add("uten-toc"); return; }
    toc.appendChild(lag("div", "toc-tittel", "På denne siden"));
    var ul = lag("ul");
    var lenker = [];
    overskrifter.forEach(function (h, n) {
      if (!h.id) h.id = "del-" + (n + 1) + "-" + h.textContent.toLowerCase().replace(/[^a-z0-9æøå]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
      var li = lag("li"), a = lag("a", "", h.textContent);
      a.href = "#" + h.id;
      li.appendChild(a); ul.appendChild(li); lenker.push(a);
    });
    toc.appendChild(ul);
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (oppf) {
        oppf.forEach(function (o) {
          if (o.isIntersecting) {
            lenker.forEach(function (a) { a.classList.toggle("aktiv", a.getAttribute("href") === "#" + o.target.id); });
          }
        });
      }, { rootMargin: "-80px 0px -70% 0px" });
      overskrifter.forEach(function (h) { obs.observe(h); });
    }
  }

  // ---------- Quiz ----------
  // <div class="quiz"><p>Spørsmål</p><ul><li>Galt</li><li data-riktig>Riktig</li></ul><p class="forklaring">…</p></div>
  function stokk(liste) {
    for (var i = liste.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = liste[i]; liste[i] = liste[j]; liste[j] = t; }
    return liste;
  }

  // Gjør ett .quiz-element interaktivt. naarSvart(rett) kalles når eleven svarer.
  // Returnerer en funksjon som nullstiller spørsmålet (og ev. stokker alternativene).
  function lagQuiz(q, naarSvart, egenIgjenKnapp) {
    var liste = q.querySelector("ul");
    var valg = Array.prototype.slice.call(q.querySelectorAll("li"));
    var forklaring = q.querySelector(".forklaring");
    if (forklaring) forklaring.hidden = true;
    var svar = lag("p", "quiz-svar");
    svar.hidden = true;
    q.insertBefore(svar, forklaring || null);
    // Flyt: velg et svar → «Sjekk svar». Feil: «Prøv igjen» eller «Se forklaring».
    // Riktig svar vises bare når eleven får det til selv, eller ber om forklaringen.
    var knapper = lag("div", "quiz-knapper");
    var sjekk = lag("button", "knapp quiz-sjekk", "Sjekk svar"); sjekk.type = "button"; sjekk.disabled = true;
    var proevIgjen = lag("button", "knapp sekundar quiz-proev", "Prøv igjen"); proevIgjen.type = "button"; proevIgjen.hidden = true;
    var seForkl = lag("button", "quiz-igjen quiz-se", "Se forklaring"); seForkl.type = "button"; seForkl.hidden = true;
    knapper.appendChild(sjekk); knapper.appendChild(proevIgjen); knapper.appendChild(seForkl);
    if (liste) liste.parentNode.insertBefore(knapper, liste.nextSibling);
    var valgt = null, forsok = 0;
    var igjen = null;
    function las(laast) { valg.forEach(function (v) { v.querySelector("button").disabled = laast; }); }
    function ferdig() {
      q.classList.add("besvart");
      las(true);
      sjekk.hidden = true; proevIgjen.hidden = true; seForkl.hidden = true;
      if (forklaring) forklaring.hidden = false;
      if (egenIgjenKnapp) {
        igjen = lag("button", "quiz-igjen", "Start på nytt");
        igjen.type = "button";
        igjen.addEventListener("click", function () { nullstill(false); });
        q.appendChild(igjen);
      }
      if (naarSvart) naarSvart(null, true);
    }
    function nullstill(stokkValg) {
      q.classList.remove("besvart");
      valg.forEach(function (v) { v.classList.remove("rett", "feil", "valgt"); });
      las(false);
      valgt = null; forsok = 0;
      sjekk.hidden = false; sjekk.disabled = true; proevIgjen.hidden = true; seForkl.hidden = true;
      svar.hidden = true; if (forklaring) forklaring.hidden = true;
      if (igjen) { igjen.remove(); igjen = null; }
      if (stokkValg && liste) stokk(valg.slice()).forEach(function (v) { liste.appendChild(v); });
    }
    valg.forEach(function (li) {
      var b = lag("button", "quiz-valg");
      b.type = "button";
      b.innerHTML = li.innerHTML;
      li.innerHTML = "";
      li.appendChild(b);
      b.addEventListener("click", function () {
        if (b.disabled) return;
        valg.forEach(function (v) { v.classList.remove("valgt"); v.querySelector("button").setAttribute("aria-pressed", "false"); });
        li.classList.add("valgt"); b.setAttribute("aria-pressed", "true");
        valgt = li; sjekk.disabled = false;
      });
    });
    sjekk.addEventListener("click", function () {
      if (!valgt) return;
      forsok++;
      var rett = valgt.hasAttribute("data-riktig");
      valgt.classList.remove("valgt");
      valgt.classList.add(rett ? "rett" : "feil");
      svar.className = "quiz-svar " + (rett ? "rett" : "feil");
      svar.hidden = false;
      if (forsok === 1 && naarSvart) naarSvart(rett, false);
      if (rett) {
        svar.textContent = forsok === 1 ? "Riktig!" : "Riktig! Du fikk det til.";
        ferdig();
      } else {
        svar.textContent = "Ikke riktig. Prøv igjen, eller se forklaringen.";
        las(true); sjekk.hidden = true; proevIgjen.hidden = false; seForkl.hidden = false;
        proevIgjen.focus({ preventScroll: true });
      }
    });
    proevIgjen.addEventListener("click", function () {
      // Feile svar forblir røde og kan ikke velges igjen.
      valg.forEach(function (v) { v.querySelector("button").disabled = v.classList.contains("feil"); });
      valgt = null; sjekk.hidden = false; sjekk.disabled = true;
      proevIgjen.hidden = true; seForkl.hidden = true; svar.hidden = true;
    });
    seForkl.addEventListener("click", function () {
      valg.forEach(function (v) { if (v.hasAttribute("data-riktig")) v.classList.add("rett"); });
      svar.textContent = "Riktig svar er markert med grønt.";
      svar.className = "quiz-svar";
      ferdig();
    });
    return nullstill;
  }

  // Flere .quiz rett etter hverandre blir én karusell som viser ett spørsmål om gangen.
  function lagKarusell(quizer) {
    var boks = lag("div", "quiz-karusell");
    boks.tabIndex = 0;
    boks.setAttribute("aria-label", "Quiz. Bruk piltastene for å bla.");
    quizer[0].parentNode.insertBefore(boks, quizer[0]);
    var hode = lag("div", "karusell-hode");
    var teller = lag("span", "karusell-teller");
    var forrige = lag("button", "karusell-pil", "◀"); forrige.type = "button"; forrige.setAttribute("aria-label", "Forrige spørsmål");
    var neste = lag("button", "karusell-pil", "▶"); neste.type = "button"; neste.setAttribute("aria-label", "Neste spørsmål");
    hode.appendChild(forrige); hode.appendChild(teller); hode.appendChild(neste);
    var scene = lag("div", "karusell-scene");
    var videre = lag("button", "knapp karusell-videre", "Neste spørsmål →"); videre.type = "button"; videre.hidden = true;
    var prikker = lag("div", "karusell-prikker");
    var poeng = lag("div", "karusell-poeng");
    var igjen = lag("button", "quiz-igjen karusell-igjen", "Start quizen på nytt"); igjen.type = "button";
    boks.appendChild(hode); boks.appendChild(scene); boks.appendChild(videre);
    boks.appendChild(prikker); boks.appendChild(poeng); boks.appendChild(igjen);

    var orden = quizer.slice();
    var resultat = [];
    var ferdige = [];
    var nullstillere = [];
    var n = 0;
    quizer.forEach(function (q, i) {
      scene.appendChild(q);
      nullstillere[i] = lagQuiz(q, function (rett, avsluttet) {
        var k = orden.indexOf(q);
        if (!avsluttet) { resultat[k] = rett; ferdige[k] = false; oppdater(); return; }
        ferdige[k] = true;
        oppdater();
        if (n < orden.length - 1) videre.focus({ preventScroll: true });
      }, false);
    });
    function oppdater() {
      orden.forEach(function (q, i) { q.hidden = i !== n; });
      teller.textContent = "Spørsmål " + (n + 1) + " av " + orden.length;
      forrige.disabled = n === 0;
      neste.disabled = n === orden.length - 1;
      prikker.innerHTML = "";
      orden.forEach(function (q, i) {
        var p = lag("button", "karusell-prikk" + (resultat[i] === true ? " rett" : resultat[i] === false ? " feil" : "") + (i === n ? " her" : ""));
        p.type = "button";
        p.setAttribute("aria-label", "Gå til spørsmål " + (i + 1));
        p.addEventListener("click", function () { gaa(i); });
        prikker.appendChild(p);
      });
      var besvart = resultat.filter(function (r) { return r !== undefined; }).length;
      var riktige = resultat.filter(function (r) { return r === true; }).length;
      poeng.textContent = riktige + " av " + orden.length + " riktige" + (besvart === orden.length ? " – ferdig!" : "");
      videre.hidden = !(ferdige[n] && n < orden.length - 1);
    }
    function gaa(i) { n = Math.max(0, Math.min(orden.length - 1, i)); oppdater(); }
    forrige.addEventListener("click", function () { gaa(n - 1); });
    neste.addEventListener("click", function () { gaa(n + 1); });
    videre.addEventListener("click", function () { gaa(n + 1); });
    boks.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); gaa(n - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); gaa(n + 1); }
    });
    igjen.addEventListener("click", function () {
      quizer.forEach(function (q, i) { nullstillere[i](true); });
      orden = stokk(quizer.slice());
      orden.forEach(function (q) { scene.appendChild(q); });
      resultat = []; ferdige = [];
      gaa(0);
    });
    oppdater();
  }

  function byggQuiz() {
    var alle = Array.prototype.slice.call(main.querySelectorAll(".quiz"));
    var brukt = [];
    alle.forEach(function (q) {
      if (brukt.indexOf(q) !== -1) return;
      var gruppe = [q];
      var nesteEl = q.nextElementSibling;
      while (nesteEl && nesteEl.classList && nesteEl.classList.contains("quiz")) { gruppe.push(nesteEl); nesteEl = nesteEl.nextElementSibling; }
      gruppe.forEach(function (g) { brukt.push(g); });
      if (gruppe.length >= 2) lagKarusell(gruppe);
      else lagQuiz(q, null, true);
    });
  }

  // ---------- Ordkort fra ordlisten ----------
  function byggOrdkort() {
    Array.prototype.forEach.call(main.querySelectorAll("h2"), function (h) {
      if (!/^ordliste/i.test(h.textContent.trim())) return;
      var tabell = h.nextElementSibling;
      while (tabell && tabell.tagName !== "TABLE" && tabell.tagName !== "H2") tabell = tabell.nextElementSibling;
      if (!tabell || tabell.tagName !== "TABLE") return;
      // Kolonner: Begrep (første) | Forklaring | Engelsk – i valgfri rekkefølge etter første
      var hoder = Array.prototype.map.call(tabell.querySelectorAll("thead th"), function (th) { return th.textContent.trim().toLowerCase(); });
      var iForkl = hoder.findIndex(function (h) { return /forklaring|betydning/.test(h); });
      var iEng = hoder.findIndex(function (h) { return /engelsk|english/.test(h); });
      if (iEng === -1 && iForkl === -1 && hoder.length >= 2) iEng = 1;
      if (!VIS_ENGELSK && iEng > -1) {
        // Skjul engelsk-kolonnen i tabellen
        Array.prototype.forEach.call(tabell.querySelectorAll("tr"), function (tr) {
          var c = tr.children[iEng]; if (c) c.style.display = "none";
        });
        if (iForkl === -1) return; // ingen forklaring = ingen ordkort
      }
      var ord = [];
      Array.prototype.forEach.call(tabell.querySelectorAll("tbody tr"), function (tr) {
        var c = tr.querySelectorAll("td");
        var tekst = function (i) { return i > -1 && c[i] ? c[i].textContent.trim() : ""; };
        if (c.length >= 2) ord.push({ begrep: tekst(0), forklaring: tekst(iForkl), engelsk: VIS_ENGELSK ? tekst(iEng) : "" });
      });
      if (ord.length < 2) return;
      var harForklaring = ord.some(function (o) { return o.forklaring; });
      var aapne = lag("button", "ordkort-knapp");
      aapne.type = "button";
      aapne.textContent = "Øv med ordkort (" + ord.length + ")";
      tabell.parentNode.insertBefore(aapne, tabell);
      var boks = lag("div", "ordkort");
      boks.hidden = true;
      var baksideNavn = harForklaring ? "Forklaring" : "Engelsk";
      boks.innerHTML = '<div class="ordkort-kort" tabindex="0" role="button" aria-label="Snu kortet"><small></small><strong></strong><span class="ordkort-ekstra"></span><span class="ordkort-hint">Klikk for å snu</span></div>' +
        '<div class="ordkort-knapper"><button type="button" data-g="forrige">← Forrige</button><span class="ordkort-teller"></span><button type="button" data-g="neste">Neste →</button><button type="button" data-g="bland">Bland</button><button type="button" data-g="retning">' + baksideNavn + ' først</button></div>';
      tabell.parentNode.insertBefore(boks, tabell);
      var n = 0, snudd = false, baksideForst = false;
      var kort = boks.querySelector(".ordkort-kort");
      function vis() {
        var o = ord[n];
        var bak = snudd !== baksideForst;
        var tekstBak = harForklaring ? (o.forklaring || o.engelsk) : o.engelsk;
        kort.querySelector("small").textContent = bak ? baksideNavn : "Begrep";
        kort.querySelector("strong").textContent = bak ? tekstBak : o.begrep;
        kort.querySelector(".ordkort-ekstra").textContent = bak && harForklaring && o.engelsk ? "Engelsk: " + o.engelsk : "";
        kort.classList.toggle("snudd", snudd);
        kort.classList.toggle("lang", bak && harForklaring);
        boks.querySelector(".ordkort-teller").textContent = (n + 1) + " / " + ord.length;
      }
      kort.addEventListener("click", function () { snudd = !snudd; vis(); });
      kort.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); snudd = !snudd; vis(); } });
      boks.addEventListener("click", function (e) {
        var g = e.target.getAttribute && e.target.getAttribute("data-g");
        if (!g) return;
        if (g === "neste") n = (n + 1) % ord.length;
        if (g === "forrige") n = (n - 1 + ord.length) % ord.length;
        if (g === "bland") { for (var i = ord.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = ord[i]; ord[i] = ord[j]; ord[j] = t; } n = 0; }
        if (g === "retning") { baksideForst = !baksideForst; e.target.textContent = baksideForst ? "Begrep først" : baksideNavn + " først"; }
        snudd = false; vis();
      });
      aapne.addEventListener("click", function () {
        boks.hidden = !boks.hidden;
        aapne.textContent = boks.hidden ? "Øv med ordkort (" + ord.length + ")" : "Skjul ordkort";
        if (!boks.hidden) vis();
      });
    });
  }

  // ---------- Ordlisten: forklaring i teksten + sammenleggbar boks ----------
  var BEGREPER = [];
  function byggOrdliste() {
    var erOversikt = /\/index\.html$/.test(HER);
    Array.prototype.forEach.call(main.querySelectorAll("h2"), function (h) {
      if (!/^ordliste/i.test(h.textContent.trim())) return;
      var tabell = h.nextElementSibling;
      while (tabell && tabell.tagName !== "TABLE" && tabell.tagName !== "H2") tabell = tabell.nextElementSibling;
      if (!tabell || tabell.tagName !== "TABLE") return;
      var hoder = Array.prototype.map.call(tabell.querySelectorAll("thead th"), function (th) { return th.textContent.trim().toLowerCase(); });
      var iF = hoder.findIndex(function (x) { return /forklaring|betydning/.test(x); });
      var antall = 0;
      Array.prototype.forEach.call(tabell.querySelectorAll("tbody tr"), function (tr) {
        var c = tr.querySelectorAll("td");
        antall++;
        if (iF > -1 && c[0] && c[iF] && c[iF].textContent.trim()) BEGREPER.push({ begrep: c[0].textContent.trim(), forklaring: c[iF].innerHTML.trim() });
      });
      // Pakk overskrift, ordkort og tabell inn i en sammenleggbar boks
      var d = lag("details", "ordliste-boks");
      d.id = "ordliste";
      if (erOversikt) d.open = true;
      var sum = lag("summary");
      sum.innerHTML = "Ordliste <span>(" + antall + " begreper)</span>";
      d.appendChild(sum);
      h.parentNode.insertBefore(d, h);
      var el = h.nextElementSibling;
      while (el) { var neste = el.nextElementSibling; d.appendChild(el); if (el === tabell) break; el = neste; }
      h.remove();
    });
    if (location.hash === "#ordliste") { var b = document.getElementById("ordliste"); if (b) { b.open = true; setTimeout(function () { b.scrollIntoView(); }, 50); } }
    markerBegreper();
  }

  // Første forekomst av hvert begrep i teksten får prikket understrek og forklaring
  function markerBegreper() {
    if (!BEGREPER.length) return;
    var liste = BEGREPER.slice().sort(function (a, b) { return b.begrep.length - a.begrep.length; });
    var brukt = {};
    var bokstav = "A-Za-zÆØÅæøåÉé";
    var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentElement;
        if (!p || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (n.nodeValue.indexOf("\\") !== -1) return NodeFilter.FILTER_REJECT; // formler (MathJax)
        if (p.closest("h1,h2,h3,h4,summary,a,button,table,figcaption,.ordliste-boks,.quiz,.quiz-karusell,.merker,.boks-tittel,.begrep,script,style,svg,mjx-container,.utkast-varsel")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var noder = [];
    while (walker.nextNode()) noder.push(walker.currentNode);
    noder.forEach(function (node) {
      liste.forEach(function (o) {
        var nokkel = o.begrep.toLowerCase();
        if (brukt[nokkel] || !node.parentNode) return;
        var ord = o.begrep.replace(/\s*\(.*\)\s*$/, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (ord.length < 3) return;
        var rx = new RegExp("(^|[^" + bokstav + "])(" + ord + "[" + bokstav.replace("A-Z", "").replace("É", "") + "]{0,4})(?![" + bokstav + "])", "i");
        var m = rx.exec(node.nodeValue);
        if (!m) return;
        brukt[nokkel] = true;
        var start = m.index + m[1].length;
        var etter = node.splitText(start);
        etter.splitText(m[2].length);
        var span = lag("span", "begrep");
        span.tabIndex = 0;
        span.setAttribute("role", "button");
        span.setAttribute("data-begrep", o.begrep);
        span.setAttribute("data-forklaring", o.forklaring);
        etter.parentNode.replaceChild(span, etter);
        span.appendChild(etter);
        node = span.nextSibling && span.nextSibling.nodeType === 3 ? span.nextSibling : node;
      });
    });
    // Én felles forklaringsboks
    var boble = lag("div", "begrep-boble");
    boble.hidden = true;
    boble.setAttribute("role", "tooltip");
    document.body.appendChild(boble);
    var aktiv = null;
    function vis(el) {
      aktiv = el;
      boble.innerHTML = "<strong>" + el.getAttribute("data-begrep") + "</strong> " + el.getAttribute("data-forklaring");
      boble.hidden = false;
      var r = el.getBoundingClientRect();
      var bredde = Math.min(340, window.innerWidth - 24);
      boble.style.width = bredde + "px";
      var venstre = Math.max(12, Math.min(r.left, window.innerWidth - bredde - 12));
      boble.style.left = venstre + "px";
      var topp = r.bottom + 8;
      if (topp + boble.offsetHeight > window.innerHeight - 8) topp = r.top - boble.offsetHeight - 8;
      boble.style.top = topp + "px";
    }
    function skjul() { boble.hidden = true; aktiv = null; }
    main.addEventListener("mouseover", function (e) { var b = e.target.closest && e.target.closest(".begrep"); if (b) vis(b); });
    main.addEventListener("mouseout", function (e) { var b = e.target.closest && e.target.closest(".begrep"); if (b && !b.contains(e.relatedTarget)) skjul(); });
    main.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest(".begrep"); if (b) { if (aktiv === b && !boble.hidden) skjul(); else vis(b); } });
    main.addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("begrep")) vis(e.target); });
    main.addEventListener("focusout", function (e) { if (e.target.classList && e.target.classList.contains("begrep")) skjul(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") skjul(); });
    window.addEventListener("scroll", skjul, { passive: true });
    document.addEventListener("click", function (e) { if (!e.target.closest(".begrep")) skjul(); });
  }

  // ---------- Temakort (forside og temaoversikt) ----------
  function byggTemakort() {
    var mål = document.getElementById("temakort");
    if (!mål) return;
    mål.className = "temakort";
    mål.innerHTML = "";
    TEMAER.forEach(function (t) {
      var fr = fremdrift(t);
      var antall = steg(t).filter(function (s) { return s.type === "fagstoff"; }).length;
      // Tema uten innhold ennå: grått kort med lås, ingen lenke
      var a = antall ? lenke("temaer/" + t.mappe + "/index.html", "", "temakort-kort") : lag("div", "temakort-kort laast");
      if (!antall) a.title = "Kommer";
      temaFarge(a, t);
      a.innerHTML = (antall ? "" : '<span class="laas-merke">' + ikon("laas") + "</span>") +
        '<span class="temakort-ikon">' + ikon(t.ikon) + "</span>" +
        '<span class="temakort-nr">Tema</span>' +
        '<span class="temakort-tittel">' + t.tittel + "</span>" +
        '<span class="temakort-fag">' + t.fag.map(function (f) { return '<span class="fag">' + f + "</span>"; }).join(" ") + "</span>" +
        '<span class="temakort-bunn">' + (antall ? antall + (antall === 1 ? " side" : " sider") : "Kommer") +
        (fr.totalt && fr.ferdig ? " · " + fr.ferdig + "/" + fr.totalt + " ferdig" : "") + "</span>" +
        (fr.totalt ? '<span class="fremdrift-bar"><span style="width:' + Math.round(100 * fr.ferdig / fr.totalt) + '%"></span></span>' : "");
      mål.appendChild(a);
    });
  }

  // ---------- Sidetype over overskriften ----------
  function byggSidetype() {
    if (!TEMA) return;
    var type = null;
    if (/\/index\.html$/.test(HER)) type = "oversikt";
    else if (/\/oppgaver\.html$/.test(HER)) type = "oppgaver";
    else if (/\/ressurser\.html$/.test(HER)) type = "ressurser";
    else emner(TEMA).forEach(function (e) { e.sider.forEach(function (s) { if (s.fil === HER) type = s.sidetype; }); });
    if (!type) type = "fagstoff";
    var h1 = main.querySelector("h1");
    if (!h1) return;
    // Står først på linja med fagmerkene under overskriften
    var merke = lag("span", "sidetype type-" + type, SIDETYPER[type]);
    var linje = h1.nextElementSibling && h1.nextElementSibling.classList.contains("merker") ? h1.nextElementSibling : null;
    if (!linje) { linje = lag("div", "merker"); h1.parentNode.insertBefore(linje, h1.nextSibling); }
    linje.insertBefore(merke, linje.firstChild);
  }

  // ---------- Emnekort på temaets oversiktsside ----------
  // Undertemaer som kort på oversiktssiden til et oppslagstema
  function byggUndertemakort() {
    if (!TEMA || !erOppslag(TEMA) || !/\/index\.html$/.test(HER)) return;
    var b = "temaer/" + TEMA.mappe + "/";
    var raa = STIER[TEMA.mappe] || [];
    if (raa.length && raa[0].emne) {
      // Deltemaer: ett kort per deltema, som lenker til første side
      raa = raa.map(function (g) {
        var forste = (g.sider || []).filter(function (s) { return s.fil && (VIS_UTKAST || s.status !== "utkast"); })[0];
        return forste ? { fil: forste.fil, tittel: String(g.emne).replace(/^\s*\d+\s*[A-Za-zÆØÅæøå]?\s*[.:–-]?\s+/, ""), beskrivelse: g.beskrivelse, ikon: g.ikon, alle: g.sider } : null;
      }).filter(Boolean);
    } else {
      raa = raa.filter(function (s) { return s.fil && (VIS_UTKAST || s.status !== "utkast"); });
    }
    if (!raa.length) return;
    var seksjon = lag("section", "undertema-seksjon");
    seksjon.appendChild(lag("h2", "", "Emner i temaet"));
    var rutenett = lag("div", "undertemakort");
    raa.forEach(function (s) {
      var filer = s.alle ? s.alle.filter(function (x) { return x.fil; }).map(function (x) { return b + x.fil; }) : [b + s.fil];
      var ferdig = filer.length && filer.every(erFerdig);
      var a = lenke(b + s.fil, "", "undertema-kort" + (ferdig ? " er-ferdig" : ""));
      a.innerHTML = (s.ikon ? '<img class="undertema-ikon" alt="" src="' + adresse(b + s.ikon) + '">' : "") +
        '<span class="undertema-tekst"><strong></strong><small></small></span>' +
        (ferdig ? '<span class="undertema-hake">' + ikon("hake") + "</span>" : "");
      a.querySelector("strong").textContent = s.tittel;
      a.querySelector("small").textContent = s.beskrivelse || "";
      rutenett.appendChild(a);
    });
    seksjon.appendChild(rutenett);
    var etter = main.querySelector(".ingress") || main.querySelector("h1");
    etter.parentNode.insertBefore(seksjon, etter.nextSibling);
  }

  function byggEmnekort() {
    if (!TEMA || !/\/index\.html$/.test(HER) || erOppslag(TEMA)) return;
    var grupper = emner(TEMA).filter(function (e) { return e.navn; });
    if (!grupper.length) return;
    var seksjon = lag("section", "emnekort-seksjon");
    seksjon.appendChild(lag("h2", "", "Emner i temaet"));
    var rutenett = lag("div", "emnekort");
    grupper.forEach(function (e) {
      var tellbare = e.sider.filter(function (s) { return s.type === "fagstoff" && !s.fordypning; });
      var ferdige = tellbare.filter(function (s) { return erFerdig(s.fil); }).length;
      var forste = tellbare[0];
      var kort = forste ? lenke(forste.fil, "", "emnekort-kort") : lag("div", "emnekort-kort tomt");
      var html = (forste ? "" : '<span class="laas-merke">' + ikon("laas") + "</span>") + '<span class="emnekort-tittel"></span>' +
        '<span class="emnekort-info">' + (tellbare.length ? tellbare.length + (tellbare.length === 1 ? " side" : " sider") : "Kommer") +
        (e.sider.length > tellbare.length ? " · " + (e.sider.length - tellbare.length) + " planlagt" : "") + "</span>";
      if (e.vurdering) html += '<span class="emnekort-vurdering">Avsluttes med: ' + e.vurdering + "</span>";
      if (tellbare.length) html += '<span class="fremdrift-bar"><span style="width:' + Math.round(100 * ferdige / tellbare.length) + '%"></span></span>';
      kort.innerHTML = html;
      kort.querySelector(".emnekort-tittel").textContent = e.navn;
      rutenett.appendChild(kort);
    });
    seksjon.appendChild(rutenett);
    var etter = main.querySelector(".ingress") || main.querySelector("h1");
    etter.parentNode.insertBefore(seksjon, etter.nextSibling);
  }

  function byggNaa() {
    var mål = document.getElementById("naa");
    if (!mål || !NAA) return;
    mål.className = "naa";
    mål.innerHTML = "";
    mål.appendChild(lag("div", "naa-etikett", "Nå jobber vi med"));
    mål.appendChild(lag("h2", "", NAA.overskrift));
    mål.appendChild(lag("p", "", NAA.tekst));
    var knapper = lag("div", "naa-knapper");
    NAA.temaer.forEach(function (m) {
      var t = TEMAER.filter(function (x) { return x.mappe === m; })[0];
      if (!t) return;
      var a = lenke("temaer/" + t.mappe + "/index.html", "", "knapp");
      temaFarge(a, t);
      a.innerHTML = ikon(t.ikon) + "Gå til " + t.tittel;
      knapper.appendChild(a);
    });
    knapper.appendChild(lenke("arsplan.html", "Se hele årsplanen", "knapp sekundar"));
    mål.appendChild(knapper);
  }

  // ---------- Periodesystem (popup) ----------
  function aapnePeriodesystem() {
    if (window.KPL.aapnePeriodesystem) return window.KPL.aapnePeriodesystem();
    var s = document.createElement("script");
    s.src = adresse("assets/periodesystem.js");
    s.onload = function () { window.KPL.aapnePeriodesystem(); };
    document.head.appendChild(s);
  }
  function psKnapp(klasse) {
    var b = lag("button", klasse);
    b.type = "button";
    b.innerHTML = '<svg class="ikon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="5" height="5" rx="1"/><rect x="10" y="4" width="5" height="5" rx="1"/><rect x="16" y="4" width="5" height="5" rx="1"/><rect x="3" y="11" width="5" height="5" rx="1"/><rect x="16" y="11" width="5" height="5" rx="1"/><path d="M5 19h14"/></svg><span>Periodesystem</span>';
    b.addEventListener("click", aapnePeriodesystem);
    return b;
  }
  // Lenker i tekst: <span class="periodesystem-lenke">periodesystemet</span>
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".periodesystem-lenke");
    if (t) { e.preventDefault(); aapnePeriodesystem(); }
  });
  Array.prototype.forEach.call(document.querySelectorAll(".periodesystem-lenke"), function (el) {
    el.setAttribute("role", "button"); el.tabIndex = 0;
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); aapnePeriodesystem(); } });
  });

  // ---------- Formler ----------
  function lastFormler() {
    if (!/\\\(|\\\[/.test(main.textContent)) return;
    window.MathJax = { loader: { load: ["[tex]/mhchem"] }, tex: { packages: { "[+]": ["mhchem"] } } };
    var mj = document.createElement("script");
    mj.src = "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js";
    mj.async = true;
    document.head.appendChild(mj);
  }

  // ---------- «Alle sider i temaet» på temaets oversiktsside ----------
  // Lages automatisk fra sti.js, ordnet etter emne, i en sammenleggbar boks.
  // Erstatter en eventuell håndskrevet seksjon <h2>Fagstoff</h2> (den fjernes fra siden).
  function byggAlleSider() {
    if (!TEMA || !/\/index\.html$/.test(HER)) return;
    var gammel = Array.prototype.filter.call(main.querySelectorAll("h2"), function (h) { return /^\s*fagstoff\s*$/i.test(h.textContent); })[0];
    var grupper = emner(TEMA).filter(function (e) { return e.sider.length; });
    var antall = grupper.reduce(function (n, e) { return n + e.sider.filter(function (s) { return s.fil; }).length; }, 0);
    var plass = null;
    if (gammel) {
      plass = gammel;
      var el = gammel.nextElementSibling;
      while (el && el.tagName !== "H2") { var neste = el.nextElementSibling; el.remove(); el = neste; }
    }
    if (!antall) { if (gammel) gammel.remove(); return; }
    var d = lag("details", "ordliste-boks alle-sider");
    d.id = "alle-sider";
    var sum = lag("summary");
    sum.innerHTML = "Alle sider i temaet <span>(" + antall + " sider)</span>";
    d.appendChild(sum);
    grupper.forEach(function (e) {
      if (e.navn) d.appendChild(lag("h3", "alle-sider-emne", e.navn));
      // Samme utseende som læringsstien: nummerbrikke (hake når ferdig), tittel og sidetype
      var ol = lag("ol", "sti");
      var nr = 0;
      e.sider.forEach(function (s) {
        var merke = s.fordypning ? "+" : (erOppslag(TEMA) && !e.navn) ? "•" : String(++nr);
        var li = lag("li");
        if (s.type !== "fagstoff") li.className = "sti-" + s.type;
        if (s.fordypning) li.classList.add("sti-fordypning");
        var a;
        if (s.type === "planlagt") {
          a = lag("span", "sti-lenke");
          a.innerHTML = '<span class="sti-nr">' + merke + '</span><span class="sti-tittel"></span><span class="kommer-merke">' + ikon("laas", "laas") + "kommer</span>";
        } else {
          a = lenke(s.fil, "");
          var ferdig = erFerdig(s.fil);
          a.innerHTML = '<span class="sti-nr' + (ferdig ? " ferdig" : "") + '">' + (ferdig ? ikon("hake") : merke) + '</span><span class="sti-tittel"></span>';
          if (s.sidetype) a.appendChild(lag("span", "type-merke type-" + s.sidetype, SIDETYPER[s.sidetype]));
        }
        a.querySelector(".sti-tittel").textContent = s.tittel;
        li.appendChild(a);
        ol.appendChild(li);
      });
      d.appendChild(ol);
    });
    if (plass) { plass.parentNode.insertBefore(d, plass); plass.remove(); }
    else {
      var ord = document.getElementById("ordliste");
      if (ord) ord.parentNode.insertBefore(d, ord); else main.appendChild(d);
    }
  }

  // ---------- Start ----------
  byggQuiz();
  byggOrdkort();
  byggOrdliste();
  lastFormler();
  // Sider utenfor temaene viser temalista i venstremenyen og trenger alle stiene for å låse tomme temaer
  var trengerAlle = erForside || !TEMA || !!document.getElementById("temakort");
  (trengerAlle ? lastAlleStier() : TEMA ? lastSti(TEMA.mappe) : Promise.resolve()).then(function () {
    byggBanner();
    byggSidetype();
    byggEmnekort();
    byggAlleSider();
    byggUndertemakort();
    if (!erForside) { byggSidemeny(); byggBla(); byggToc(); }
    byggTemakort();
    byggNaa();
  });
})();

// ---------- Læringslab: animert prosessanlegg på forsiden (flyttet inn fra design/laeringslab.js) ----------
/*
 * DESIGNVARIANT «Læringslab» – animert prosessanlegg på forsiden.
 * Egen tegning: reaktor med rører, pumpe, varmeveksler og destillasjonskolonne.
 * Kontrollrommet viser elevens egen fremdrift (fra nettleseren).
 */
(function () {
  function start() {
    var helt = document.querySelector(".helt");
    if (!helt || helt.querySelector(".anlegg")) return;

    var ferdig = 0;
    try {
      var data = JSON.parse(localStorage.getItem("kpl-ferdig") || "{}");
      for (var k in data) if (data[k]) ferdig++;
    } catch (e) { /* privat modus */ }

    var svg =
      '<svg class="anlegg" viewBox="0 0 420 260" role="img" aria-label="Tegning av et lite prosessanlegg med reaktor, pumpe, varmeveksler og destillasjonskolonne">' +
      // rør (grunnlinjer)
      '<g class="ror">' +
        '<path d="M20 200 H70"/><path d="M130 205 H160"/><path d="M190 205 H215 V120 H240"/>' +
        '<path d="M290 120 H315"/><path d="M345 40 V20 H395 V60"/><path d="M345 230 V245 H395"/>' +
        '<path d="M265 95 V70 H230"/>' +
      '</g>' +
      // strømning (animert)
      '<g>' +
        '<path class="flyt" d="M20 200 H70"/><path class="flyt" d="M130 205 H160"/>' +
        '<path class="flyt" d="M190 205 H215 V120 H240"/><path class="flyt" d="M290 120 H315"/>' +
        '<path class="flyt damp" d="M345 40 V20 H395 V60"/><path class="flyt" d="M345 230 V245 H395"/>' +
        '<path class="flyt kjol" d="M265 95 V70 H230"/>' +
      '</g>' +
      // reaktor
      '<rect class="utstyr" x="70" y="140" width="60" height="90" rx="14"/>' +
      '<g class="niva-boks"><rect class="niva" x="74" y="170" width="52" height="56" rx="10"/></g>' +
      '<line class="aksel" x1="100" y1="128" x2="100" y2="200"/><rect class="utstyr" x="90" y="120" width="20" height="10" rx="2"/>' +
      '<g class="rorer"><rect x="86" y="198" width="28" height="4" rx="2"/></g>' +
      '<circle class="boble" cx="88" cy="215" r="2.5"/><circle class="boble b2" cx="108" cy="218" r="2"/><circle class="boble b3" cx="118" cy="212" r="2.5"/>' +
      '<text class="tag" x="100" y="250">R-101</text>' +
      // pumpe
      '<circle class="utstyr" cx="175" cy="205" r="15"/>' +
      '<g class="hjul"><path d="M175 193 V217 M163 205 H187"/></g>' +
      '<text class="tag" x="175" y="236">P-101</text>' +
      // varmeveksler
      '<rect class="utstyr" x="240" y="105" width="50" height="30" rx="15"/>' +
      '<path class="spiral" d="M248 120 q5 -10 10 0 t10 0 t10 0 t6 0"/>' +
      '<text class="tag" x="265" y="152">E-101</text>' +
      // kolonne
      '<rect class="utstyr" x="315" y="40" width="60" height="190" rx="22"/>' +
      '<g class="bunner"><path d="M322 75 H368 M322 105 H368 M322 135 H368 M322 165 H368 M322 195 H368"/></g>' +
      '<text class="tag" x="345" y="30" text-anchor="end" dx="-8">T-101</text>' +
      // lamper
      '<circle class="lampe" cx="125" cy="146" r="3"/><circle class="lampe l2" cx="370" cy="46" r="3"/>' +
      '</svg>' +
      '<div class="kontrollrom" aria-label="Din fremdrift">' +
        '<div class="kr-tittel"><span class="kr-led"></span>Kontrollrom</div>' +
        '<div class="kr-rad"><span>Sider ferdig</span><strong>' + ferdig + '</strong></div>' +
        '<div class="kr-rad"><span>Status</span><strong>' + (ferdig ? "I drift" : "Klar til oppstart") + '</strong></div>' +
      '</div>';

    var wrap = document.createElement("div");
    wrap.className = "anlegg-wrap";
    wrap.innerHTML = svg;
    helt.classList.add("med-anlegg");
    var indre = helt.querySelector(".helt-indre");
    indre.appendChild(wrap);

    // Siste del av tittelen i oransje, som på læringslab
    var h1 = indre.querySelector("h1");
    if (h1 && h1.textContent.indexOf(" og ") > 0) {
      var deler = h1.textContent.split(" og ");
      h1.innerHTML = deler[0] + " og<br><span class=\"oransje\">" + deler.slice(1).join(" og ") + "</span>";
    }
    lagTemabrikker(indre, 0);
  }

  // Temaene som runde «brikker» i toppfeltet (bygd fra temakortene som meny.js lager)
  function lagTemabrikker(indre, forsok) {
    var kort = document.querySelectorAll("#temakort .temakort-kort");
    if (!kort.length) { if (forsok < 40) setTimeout(function () { lagTemabrikker(indre, forsok + 1); }, 50); return; }
    var rad = document.createElement("nav");
    rad.className = "temabrikker";
    rad.setAttribute("aria-label", "Temaer");
    Array.prototype.forEach.call(kort, function (k) {
      var a = document.createElement("a");
      a.className = "temabrikke";
      a.href = k.getAttribute("href");
      a.setAttribute("style", k.getAttribute("style") || "");
      var ikon = k.querySelector(".temakort-ikon");
      var tittel = k.querySelector(".temakort-tittel");
      var bunn = k.querySelector(".temakort-bunn");
      var tall = bunn ? (bunn.textContent.match(/\d+/) || [""])[0] : "";
      a.innerHTML = '<span class="brikke-ikon">' + (ikon ? ikon.innerHTML : "") + '</span>' +
        '<span>' + (tittel ? tittel.textContent : "") + '</span>' +
        (tall ? '<small>' + tall + '</small>' : '<small class="snart">kommer</small>');
      if (!tall) a.classList.add("tom");
      rad.appendChild(a);
    });
    var alle = document.createElement("a");
    alle.className = "temabrikke alle";
    alle.href = "temaer/index.html";
    alle.textContent = "Alle temaer →";
    rad.appendChild(alle);
    indre.appendChild(rad);
    document.body.classList.add("med-temabrikker");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
