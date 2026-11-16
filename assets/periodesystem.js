/*
 * Periodesystemet som vindu (popup). Lastes av meny.js ved behov.
 * Åpnes fra knappen «Periodesystem» i temaer med periodesystem: true (se TEMAER i meny.js),
 * eller fra et hvilket som helst element med klassen «periodesystem-lenke».
 *
 * Data: symbol|navn|atommasse|kategori. Atommasse i hakeparentes = massetall for den mest stabile isotopen.
 * Kategorier: m = metall, h = halvmetall, i = ikke-metall, e = edelgass.
 */
(function () {
  "use strict";
  var DATA = [
    "H|hydrogen|1.008|i", "He|helium|4.003|e",
    "Li|litium|6.94|m", "Be|beryllium|9.012|m", "B|bor|10.81|h", "C|karbon|12.01|i", "N|nitrogen|14.01|i", "O|oksygen|16.00|i", "F|fluor|19.00|i", "Ne|neon|20.18|e",
    "Na|natrium|22.99|m", "Mg|magnesium|24.31|m", "Al|aluminium|26.98|m", "Si|silisium|28.09|h", "P|fosfor|30.97|i", "S|svovel|32.06|i", "Cl|klor|35.45|i", "Ar|argon|39.95|e",
    "K|kalium|39.10|m", "Ca|kalsium|40.08|m", "Sc|scandium|44.96|m", "Ti|titan|47.87|m", "V|vanadium|50.94|m", "Cr|krom|52.00|m", "Mn|mangan|54.94|m", "Fe|jern|55.85|m", "Co|kobolt|58.93|m", "Ni|nikkel|58.69|m", "Cu|kobber|63.55|m", "Zn|sink|65.38|m", "Ga|gallium|69.72|m", "Ge|germanium|72.63|h", "As|arsen|74.92|h", "Se|selen|78.97|i", "Br|brom|79.90|i", "Kr|krypton|83.80|e",
    "Rb|rubidium|85.47|m", "Sr|strontium|87.62|m", "Y|yttrium|88.91|m", "Zr|zirkonium|91.22|m", "Nb|niob|92.91|m", "Mo|molybden|95.95|m", "Tc|technetium|[98]|m", "Ru|ruthenium|101.07|m", "Rh|rhodium|102.91|m", "Pd|palladium|106.42|m", "Ag|sølv|107.87|m", "Cd|kadmium|112.41|m", "In|indium|114.82|m", "Sn|tinn|118.71|m", "Sb|antimon|121.76|h", "Te|tellur|127.60|h", "I|jod|126.90|i", "Xe|xenon|131.29|e",
    "Cs|cesium|132.91|m", "Ba|barium|137.33|m",
    "La|lantan|138.91|m", "Ce|cerium|140.12|m", "Pr|praseodym|140.91|m", "Nd|neodym|144.24|m", "Pm|prometium|[145]|m", "Sm|samarium|150.36|m", "Eu|europium|151.96|m", "Gd|gadolinium|157.25|m", "Tb|terbium|158.93|m", "Dy|dysprosium|162.50|m", "Ho|holmium|164.93|m", "Er|erbium|167.26|m", "Tm|thulium|168.93|m", "Yb|ytterbium|173.05|m", "Lu|lutetium|174.97|m",
    "Hf|hafnium|178.49|m", "Ta|tantal|180.95|m", "W|wolfram|183.84|m", "Re|rhenium|186.21|m", "Os|osmium|190.23|m", "Ir|iridium|192.22|m", "Pt|platina|195.08|m", "Au|gull|196.97|m", "Hg|kvikksølv|200.59|m", "Tl|thallium|204.38|m", "Pb|bly|207.2|m", "Bi|vismut|208.98|m", "Po|polonium|[209]|m", "At|astat|[210]|h", "Rn|radon|[222]|e",
    "Fr|francium|[223]|m", "Ra|radium|[226]|m",
    "Ac|actinium|[227]|m", "Th|thorium|232.04|m", "Pa|protactinium|231.04|m", "U|uran|238.03|m", "Np|neptunium|[237]|m", "Pu|plutonium|[244]|m", "Am|americium|[243]|m", "Cm|curium|[247]|m", "Bk|berkelium|[247]|m", "Cf|californium|[251]|m", "Es|einsteinium|[252]|m", "Fm|fermium|[257]|m", "Md|mendelevium|[258]|m", "No|nobelium|[259]|m", "Lr|lawrencium|[266]|m",
    "Rf|rutherfordium|[267]|m", "Db|dubnium|[268]|m", "Sg|seaborgium|[269]|m", "Bh|bohrium|[270]|m", "Hs|hassium|[277]|m", "Mt|meitnerium|[278]|m", "Ds|darmstadtium|[281]|m", "Rg|røntgenium|[282]|m", "Cn|copernicium|[285]|m", "Nh|nihonium|[286]|m", "Fl|flerovium|[289]|m", "Mc|moscovium|[290]|m", "Lv|livermorium|[293]|m", "Ts|tenness|[294]|h", "Og|oganesson|[294]|e"
  ];
  var KATEGORI = { m: "metall", h: "halvmetall", i: "ikke-metall", e: "edelgass" };

  // Plassering i tabellen: [rad, kolonne]. Rad 9 og 10 er lantanoider og aktinoider.
  function plass(z) {
    if (z === 1) return [1, 1];
    if (z === 2) return [1, 18];
    if (z <= 10) return [2, z <= 4 ? z - 2 : z + 8];
    if (z <= 18) return [3, z <= 12 ? z - 10 : z];
    if (z <= 36) return [4, z - 18];
    if (z <= 54) return [5, z - 36];
    if (z >= 57 && z <= 71) return [9, z - 54];
    if (z >= 89 && z <= 103) return [10, z - 86];
    if (z <= 86) return [6, z <= 56 ? z - 54 : z - 68];
    return [7, z <= 88 ? z - 86 : z - 100];
  }
  function komma(m) { return m.replace(".", ","); }

  var vindu = null, detalj = null;

  function bygg() {
    vindu = document.createElement("div");
    vindu.className = "ps-slor";
    vindu.hidden = true;
    vindu.innerHTML =
      '<div class="ps-vindu" role="dialog" aria-modal="true" aria-label="Periodesystemet">' +
      '<div class="ps-topp"><strong>Periodesystemet</strong>' +
      '<span class="ps-forklaring"><i class="m"></i>metall <i class="h"></i>halvmetall <i class="i"></i>ikke-metall <i class="e"></i>edelgass</span>' +
      '<button type="button" class="ps-lukk" aria-label="Lukk periodesystemet">✕</button></div>' +
      '<div class="ps-rull"><div class="ps-tabell"></div></div>' +
      '<p class="ps-merknad">Atommasse i u (avrundet). Tall i [ ] er massetallet for den mest stabile isotopen. Klikk på et grunnstoff for detaljer.</p>' +
      "</div>";
    var tabell = vindu.querySelector(".ps-tabell");
    detalj = document.createElement("div");
    detalj.className = "ps-detalj";
    detalj.style.gridColumn = "3 / span 10";
    detalj.innerHTML = '<span class="ps-hint">Klikk på et grunnstoff</span>';
    tabell.appendChild(detalj);
    for (var g = 1; g <= 18; g++) {
      var hode = document.createElement("span");
      hode.className = "ps-gruppe";
      hode.textContent = g;
      hode.style.gridColumn = String(g);
      tabell.appendChild(hode);
    }
    [["57–71", 6], ["89–103", 7]].forEach(function (p) {
      var s = document.createElement("span");
      s.className = "ps-plass";
      s.textContent = p[0];
      s.style.gridRow = String(p[1] + 1);
      s.style.gridColumn = "3";
      tabell.appendChild(s);
    });
    DATA.forEach(function (rad, i) {
      var d = rad.split("|"), z = i + 1, p = plass(z);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ps-celle " + d[3];
      b.style.gridRow = String(p[0] + 1);
      b.style.gridColumn = String(p[1]);
      b.innerHTML = "<small>" + z + "</small><b>" + d[0] + "</b><span>" + komma(d[2]) + "</span>";
      b.title = d[1];
      b.setAttribute("aria-label", d[1] + ", " + d[0] + ", atomnummer " + z);
      b.addEventListener("click", function () {
        detalj.innerHTML =
          '<span class="ps-stor ' + d[3] + '"><small>' + z + "</small><b>" + d[0] + "</b></span>" +
          '<span class="ps-info"><strong>' + d[1] + "</strong>" +
          "Atomnummer: " + z + "<br>Atommasse: " + komma(d[2]) + " u" +
          (d[2].charAt(0) === "[" ? "" : "<br>Molmasse: " + komma(d[2]) + " g/mol") +
          "<br>" + KATEGORI[d[3]].charAt(0).toUpperCase() + KATEGORI[d[3]].slice(1) +
          (p[0] <= 7 ? "<br>Periode " + p[0] + ", gruppe " + p[1] : "") + "</span>";
      });
      tabell.appendChild(b);
    });
    // Mellomrom før lantanoider og aktinoider
    var luft = document.createElement("span");
    luft.className = "ps-luft";
    luft.style.gridRow = "9";
    luft.style.gridColumn = "1 / span 18";
    tabell.appendChild(luft);
    // Rutenett: rad 1 = gruppenumre, rad 2–8 = periode 1–7, rad 9 = luft, rad 10–11 = lantanoider/aktinoider
    Array.prototype.forEach.call(tabell.querySelectorAll(".ps-gruppe"), function (h) { h.style.gridRow = "1"; });
    detalj.style.gridRow = "2 / span 3";

    vindu.addEventListener("click", function (e) { if (e.target === vindu) lukk(); });
    vindu.querySelector(".ps-lukk").addEventListener("click", lukk);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !vindu.hidden) lukk(); });
    document.body.appendChild(vindu);
  }
  var forrigeFokus = null;
  function aapne() {
    if (!vindu) bygg();
    forrigeFokus = document.activeElement;
    vindu.hidden = false;
    document.body.classList.add("ps-apent");
    vindu.querySelector(".ps-lukk").focus();
  }
  function lukk() {
    vindu.hidden = true;
    document.body.classList.remove("ps-apent");
    if (forrigeFokus && forrigeFokus.focus) forrigeFokus.focus();
  }
  window.KPL = window.KPL || {};
  window.KPL.aapnePeriodesystem = aapne;
})();
