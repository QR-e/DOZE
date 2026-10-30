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

  window.dozeHalloween = { render(open) { documentOpen = open; refresh(); } };
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", refresh);
  refresh();
})();
