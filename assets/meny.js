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
    sjekk: "Quiz", oppgaver: "Oppgaver", ressurser: "Ressurser", video: "Video", fordypning: "Fordypning"
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

  // «Nå jobber vi med» på forsiden. Oppdateres når en ny periode starter.
  var NAA = {
    overskrift: "Kjemiske reaksjoner og reaksjonsligninger",
    tekst: "Vi repeterer atomer og bindinger og går videre til reaksjoner. Start i tema 2.",
    temaer: ["02-kjemi-og-beregninger"]
  };

  var TEMAER = [
    { mappe: "01-hms", nr: 1, tittel: "HMS og sikkerhet", farge: "#c2410c", ikon: "skjold", fag: ["PT", "ADK"] },
    { mappe: "02-kjemi-og-beregninger", nr: 2, tittel: "Kjemi og beregninger", farge: "#2563eb", ikon: "kolbe", fag: ["KT", "ADK"], periodesystem: true },
    { mappe: "03-enhetsoperasjoner", nr: 3, tittel: "Enhetsoperasjoner og prosessanlegg", farge: "#0f766e", ikon: "kolonne", fag: ["KT", "PT"] },
    { mappe: "04-masse-og-energibalanser", nr: 4, tittel: "Masse- og energibalanser", farge: "#7c3aed", ikon: "vekt", fag: ["KT"], periodesystem: true },
    { mappe: "05-maling-styring-regulering", nr: 5, tittel: "Måling, styring og regulering", farge: "#b45309", ikon: "maler", fag: ["PT"] },
    { mappe: "06-drift-og-vedlikehold", nr: 6, tittel: "Drift og vedlikehold", farge: "#475569", ikon: "tannhjul", fag: ["PT", "ADK"] },
    { mappe: "07-laboratorium-og-analyse", nr: 7, tittel: "Laboratorium og analyse", farge: "#0e7490", ikon: "reagensror", fag: ["ADK"], periodesystem: true },
    { mappe: "08-rapportering-og-kvalitet", nr: 8, tittel: "Rapportering og kvalitet", farge: "#4f46e5", ikon: "skjema", fag: ["ADK"] },
    { mappe: "09-miljo-og-barekraft", nr: 9, tittel: "Miljø og bærekraft", farge: "#15803d", ikon: "blad", fag: ["KT", "ADK"] },
    { mappe: "10-yrket-og-arbeidslivet", nr: 10, tittel: "Yrket og arbeidslivet", farge: "#be185d", ikon: "hjelm", fag: ["PT", "ADK"] }
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
    kalender: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    hatt: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    liste: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    hake: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
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
  window.KPL.sti = function (mappe, sider) { STIER[mappe] = sider || []; };

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
  merke.innerHTML = '<span class="merke-logo">' + ikon("kolbe") + '</span><span class="merke-tekst"><strong>' + KORTNAVN + '</strong><span>' + NETTSTED + "</span></span>";

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
        liste.push({ tittel: s.type === "oversikt" ? t.nr + " " + t.tittel : s.tittel, fil: s.fil, sted: s.type === "oversikt" ? "Tema" : t.nr + " " + t.tittel, utkast: s.utkast });
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
  var oppsett = lag("div", "oppsett" + (erForside ? " uten-sidemeny" : TEMA ? "" : " ingen-sti"));
  var sidemeny = lag("nav", "sidemeny");
  sidemeny.setAttribute("aria-label", TEMA ? "Læringssti" : "Temaer");
  var toc = lag("aside", "toc");
  toc.setAttribute("aria-label", "På denne siden");
  var bunn = lag("footer", "bunn");
  bunn.textContent = BUNNTEKST;

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
      if (erOversikt) ledd(null, TEMA.nr + " " + TEMA.tittel);
      else { ledd("temaer/" + TEMA.mappe + "/index.html", TEMA.nr + " " + TEMA.tittel); ledd(null, sidetittel); }
    } else if (/^fag\//.test(HER) && HER !== "fag/index.html") {
      ledd("fag/index.html", "Fagoversikt"); ledd(null, sidetittel);
    } else {
      ledd(null, sidetittel);
    }
    smule.appendChild(ol);
    indre.appendChild(smule);

    if (TEMA) {
      var tittel = lag("div", "banner-tema");
      tittel.innerHTML = '<span class="banner-ikon">' + ikon(TEMA.ikon) + '</span><span><small>Tema ' + TEMA.nr + "</small>" + TEMA.tittel + "</span>";
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
      sidemeny.appendChild(lenke("temaer/index.html", "← Alle temaer", "tilbake"));
      sidemeny.appendChild(lag("div", "sidemeny-overskrift", "Læringssti"));
      var b = "temaer/" + TEMA.mappe + "/";
      function stegLi(s, merkeTekst) {
        var li = lag("li");
        if (s.type !== "fagstoff") li.className = "sti-" + s.type;
        var a;
        if (s.type === "planlagt") {
          a = lag("span", "sti-lenke");
          a.innerHTML = '<span class="sti-nr">' + merkeTekst + '</span><span class="sti-tittel"></span><span class="kommer-merke">kommer</span>';
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
      var topp = lag("ol", "sti");
      topp.appendChild(stegLi({ tittel: "Oversikt", fil: b + "index.html", type: "oversikt" }, "i"));
      sidemeny.appendChild(topp);

      var grupper = emner(TEMA);
      // Står eleven i et emne, vises bare det emnet. Ellers vises alle emnene lukket.
      var mittEmne = grupper.filter(function (e) { return e.navn && e.sider.some(function (s) { return s.fil === HER; }); });
      if (mittEmne.length) grupper = mittEmne;
      grupper.forEach(function (e) {
        var ol = lag("ol", "sti");
        var nr = 0;
        e.sider.forEach(function (s) {
          var li = stegLi(s, s.fordypning ? "+" : String(++nr));
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
      if (TEMA.periodesystem) {
        sidemeny.appendChild(lag("div", "sidemeny-overskrift", "Verktøy"));
        sidemeny.appendChild(psKnapp("ps-knapp ps-sidemeny"));
      }
    } else {
      sidemeny.appendChild(lag("div", "sidemeny-overskrift", "Temaer"));
      var ul = lag("ul", "temaliste");
      TEMAER.forEach(function (t) {
        var li = lag("li");
        var a = lenke("temaer/" + t.mappe + "/index.html", "");
        temaFarge(a, t);
        a.innerHTML = '<span class="liten-ikon">' + ikon(t.ikon) + "</span><span>" + t.nr + " " + t.tittel + "</span>";
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
    var igjen = null;
    function nullstill(stokkValg) {
      q.classList.remove("besvart");
      valg.forEach(function (v) { v.classList.remove("rett", "feil"); v.querySelector("button").disabled = false; });
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
        if (q.classList.contains("besvart")) return;
        q.classList.add("besvart");
        var rett = li.hasAttribute("data-riktig");
        li.classList.add(rett ? "rett" : "feil");
        valg.forEach(function (v) { if (v.hasAttribute("data-riktig")) v.classList.add("rett"); v.querySelector("button").disabled = true; });
        svar.textContent = rett ? "Riktig!" : "Ikke helt. Riktig svar er markert.";
        svar.className = "quiz-svar " + (rett ? "rett" : "feil");
        svar.hidden = false;
        if (forklaring) forklaring.hidden = false;
        if (egenIgjenKnapp) {
          igjen = lag("button", "quiz-igjen", "Prøv igjen");
          igjen.type = "button";
          igjen.addEventListener("click", function () { nullstill(false); });
          q.appendChild(igjen);
        }
        if (naarSvart) naarSvart(rett);
      });
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
    var igjen = lag("button", "quiz-igjen karusell-igjen", "Prøv igjen"); igjen.type = "button";
    boks.appendChild(hode); boks.appendChild(scene); boks.appendChild(videre);
    boks.appendChild(prikker); boks.appendChild(poeng); boks.appendChild(igjen);

    var orden = quizer.slice();
    var resultat = [];
    var nullstillere = [];
    var n = 0;
    quizer.forEach(function (q, i) {
      scene.appendChild(q);
      nullstillere[i] = lagQuiz(q, function (rett) {
        resultat[orden.indexOf(q)] = rett;
        oppdater();
        if (n < orden.length - 1) { videre.hidden = false; videre.focus({ preventScroll: true }); }
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
      videre.hidden = !(resultat[n] !== undefined && n < orden.length - 1);
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
      resultat = [];
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

  // ---------- Temakort (forside og temaoversikt) ----------
  function byggTemakort() {
    var mål = document.getElementById("temakort");
    if (!mål) return;
    mål.className = "temakort";
    mål.innerHTML = "";
    TEMAER.forEach(function (t) {
      var a = lenke("temaer/" + t.mappe + "/index.html", "", "temakort-kort");
      temaFarge(a, t);
      var fr = fremdrift(t);
      var antall = steg(t).filter(function (s) { return s.type === "fagstoff"; }).length;
      a.innerHTML = '<span class="temakort-ikon">' + ikon(t.ikon) + "</span>" +
        '<span class="temakort-nr">Tema ' + t.nr + "</span>" +
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
  function byggEmnekort() {
    if (!TEMA || !/\/index\.html$/.test(HER)) return;
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
      var html = '<span class="emnekort-tittel"></span>' +
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
      a.innerHTML = ikon(t.ikon) + "Gå til tema " + t.nr + ": " + t.tittel;
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

  // ---------- Start ----------
  byggQuiz();
  byggOrdkort();
  lastFormler();
  var trengerAlle = erForside || !!document.getElementById("temakort");
  (trengerAlle ? lastAlleStier() : TEMA ? lastSti(TEMA.mappe) : Promise.resolve()).then(function () {
    byggBanner();
    byggSidetype();
    byggEmnekort();
    if (!erForside) { byggSidemeny(); byggBla(); byggToc(); }
    byggTemakort();
    byggNaa();
  });
})();
