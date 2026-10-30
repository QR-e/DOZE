/* La especial es un suplemento: conserva intactos los PDF y los QR impresos. */
(() => {
  const startsAt = Date.parse("2026-10-30T00:00:00+01:00");
  const endsAt = Date.parse("2026-11-02T00:00:00+01:00");
  if (Date.now() >= endsAt) return;
  const template = document.getElementById("halloween-template");
  const selector = document.getElementById("selector");
  const pages = document.getElementById("pages");
  const landing = document.getElementById("halloween-hero-template").content.firstElementChild.cloneNode(true);
  const feature = template.content.firstElementChild.cloneNode(true);
  landing.classList.add("halloween-special-landing");
  feature.classList.add("halloween-special-feature");
  document.querySelector("main").insertBefore(landing, selector);
  pages.before(feature);
  const intro = document.querySelector(".document-intro");
  const introMarker = document.createComment("Original document introduction");
  intro.before(introMarker);
  let documentOpen = false;
  let timer;
  const translations = {
    es: {
      locale: "es-ES",
      edition: "Especial Halloween",
      dates: "30 y 31 de octubre · 1 de noviembre",
      teaser: "Ternera ahumada, brioche negro y salsa Hechizo by Doze.",
      locations: "Llucmajor y Campos",
      label: "La Belladona, especial Halloween",
      photo: "La Belladona, la especial de Halloween con pan negro y jeringa de salsa roja.",
    },
    en: {
      locale: "en-GB",
      edition: "Halloween Special",
      dates: "30 & 31 October · 1 November",
      teaser: "Smoked beef, black brioche and Hechizo sauce by Doze.",
      locations: "Llucmajor and Campos",
      label: "La Belladona, Halloween special",
      photo: "La Belladona, the Halloween special with a black bun and a syringe of red sauce.",
    },
    de: {
      locale: "de-DE",
      edition: "Halloween-Special",
      dates: "30. und 31. Oktober · 1. November",
      teaser: "Geräuchertes Rindfleisch, schwarzes Brioche-Brötchen und Hechizo-Sauce by Doze.",
      locations: "Llucmajor und Campos",
      label: "La Belladona, Halloween-Special",
      photo: "La Belladona, das Halloween-Special mit schwarzem Brötchen und einer Spritze mit roter Sauce.",
    },
  };

  function setLanguage(language) {
    const lang = Object.hasOwn(translations, language) ? language : "es";
    const copy = translations[lang];
    feature.lang = lang;
    feature.setAttribute("aria-label", copy.label);
    feature.querySelector("img").alt = copy.photo;
    feature.querySelector(".belladona-menu__edition").textContent = copy.edition;
    feature.querySelector(".belladona-menu__dates").textContent = copy.dates;
    feature.querySelector(".belladona-menu__teaser").textContent = copy.teaser;
    feature.querySelector(".belladona-menu__locations").textContent = copy.locations;
    feature.querySelector(".belladona-price").textContent = new Intl.NumberFormat(copy.locale, { style: "currency", currency: "EUR" }).format(12.9);
  }

  function refresh() {
    clearTimeout(timer);
    const now = Date.now();
    const active = now >= startsAt && now < endsAt;
    document.documentElement.classList.toggle("halloween-campaign-active", active);
    if (active) feature.after(intro);
    else introMarker.after(intro);
    landing.hidden = !active || documentOpen;
    feature.hidden = !active || !documentOpen;
    const next = [startsAt, endsAt].find(boundary => boundary > now);
    if (next) timer = setTimeout(refresh, Math.min(next - now, 2_147_483_647));
  }

  window.dozeHalloween = { render(open, lang = "es") { documentOpen = open; setLanguage(lang); refresh(); } };
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", refresh);
  refresh();
})();
