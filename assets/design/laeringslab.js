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
    alle.textContent = "Alle temaer og kompetansemål →";
    rad.appendChild(alle);
    indre.appendChild(rad);
    document.body.classList.add("med-temabrikker");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
