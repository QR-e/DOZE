/* Solo documentos locales y versionados. No cargar cartas antiguas de Drive. */
const base = "cartas/2026-09-15/";
const documents = {
  es: { hash: "#carta-es", title: "Carta · Español", file: "carta-es.pdf", pages: ["carta-es-1.webp", "carta-es-2.webp"], lang: "es", hint: "Amplía con dos dedos para leer la carta.", open: "Abrir PDF ↗", back: "Volver" },
  en: { hash: "#carta-en", title: "Menu · English", file: "carta-en.pdf", pages: ["carta-en-1.webp", "carta-en-2.webp"], lang: "en", hint: "Pinch to zoom and read the menu.", open: "Open PDF ↗", back: "Back" },
  de: { hash: "#carta-de", title: "Speisekarte · Deutsch", file: "carta-de.pdf", pages: ["carta-de-1.webp", "carta-de-2.webp"], lang: "de", hint: "Zum Lesen mit zwei Fingern vergrößern.", open: "PDF öffnen ↗", back: "Zurück" },
  bebidas: { hash: "#bebidas", title: "Bebidas y postres", file: "bebidas-postres.jpg", pages: ["bebidas-postres.jpg"], lang: "es", hint: "Amplía con dos dedos para leer la carta.", open: "Abrir imagen ↗", back: "Volver" },
};
const selector = document.getElementById("selector");
const viewer = document.getElementById("viewer");
const pages = document.getElementById("pages");
let previousKey;
function renderDocument() {
  const entry = Object.entries(documents).find(([, doc]) => doc.hash === location.hash);
  const key = entry?.[0];
  const doc = entry?.[1];
  selector.hidden = Boolean(doc);
  viewer.hidden = !doc;
  document.documentElement.lang = doc?.lang || "es";
  document.title = doc ? `${doc.title} | DOZE Burger & Drink` : "La carta | DOZE Burger & Drink";
  pages.replaceChildren();
  if (doc) {
    document.getElementById("document-title").textContent = doc.title;
    document.getElementById("zoom-hint").textContent = doc.hint;
    const original = document.getElementById("original");
    original.href = base + doc.file + "?v=carta-aprobada-3";
    original.textContent = doc.open;
    const back = document.querySelector(".back");
    back.querySelector("span").textContent = doc.back;
    back.setAttribute("aria-label", doc.back);
    document.querySelectorAll(".document-nav [data-menu]").forEach(link => {
      if (link.dataset.menu === key) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    doc.pages.forEach((file, index) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.alt = `${doc.title} (${index + 1}/${doc.pages.length})`;
      img.width = key === "bebidas" ? 1600 : 1378;
      img.height = key === "bebidas" ? 1131 : 2200;
      img.decoding = "async";
      img.loading = index === 0 ? "eager" : "lazy";
      img.addEventListener("error", () => {
        const error = document.createElement("p");
        error.className = "page-error";
        error.textContent = ({es:"No se ha podido cargar esta página.", en:"This page could not be loaded.", de:"Diese Seite konnte nicht geladen werden."})[doc.lang];
        const fallback = document.createElement("a");
        fallback.href = base + doc.file + "?v=carta-aprobada-3";
        fallback.textContent = doc.open;
        fallback.target = "_blank";
        fallback.rel = "noopener";
        error.append(fallback);
        img.replaceWith(error);
      }, { once: true });
      img.src = base + file + "?v=carta-aprobada-3";
      figure.append(img);
      pages.append(figure);
    });
    document.getElementById("document-title").focus({ preventScroll: true });
  } else if (previousKey) {
    selector.querySelector(`[data-menu="${previousKey}"]`).focus({ preventScroll: true });
  }
  previousKey = key;
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", renderDocument);
renderDocument();
