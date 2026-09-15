/* Diseño nuevo con las cartas anteriores vigentes hasta su impresión. */
const base = "";
const documents = {
  es: { hash: "#carta-es", title: "Carta · Español", file: "cartas-anteriores/carta-es.jpg", pages: ["cartas-anteriores/carta-es.jpg"], lang: "es", hint: "Amplía con dos dedos para leer la carta.", open: "Abrir imagen ↗", back: "Volver" },
  en: { hash: "#carta-en", title: "Menu · English", file: "cartas-anteriores/carta-en.jpg", pages: ["cartas-anteriores/carta-en.jpg"], lang: "en", hint: "Pinch to zoom and read the menu.", open: "Open image ↗", back: "Back" },
  de: { hash: "#carta-de", title: "Speisekarte · Deutsch", file: "cartas-anteriores/carta-de.jpg", pages: ["cartas-anteriores/carta-de.jpg"], lang: "de", hint: "Zum Lesen mit zwei Fingern vergrößern.", open: "Bild öffnen ↗", back: "Zurück" },
  bebidas: { hash: "#bebidas", title: "Bebidas y postres", file: "CARTA_BEBIDASPOSTRES.jpeg", pages: ["CARTA_BEBIDASPOSTRES.jpeg", "CARTA_BEBIDASPOSTRES2.jpeg"], lang: "es", hint: "Amplía con dos dedos para leer la carta.", open: "Abrir imagen ↗", back: "Volver" },
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
    const correction = document.getElementById("allergen-corrections");
    correction.hidden = key === "bebidas";
    correction.textContent = ({
      es: "Corrección a los símbolos de esta carta: La Fuerte contiene cacahuetes (en lugar de moluscos). El Verde contiene huevo.",
      en: "Correction to this menu’s symbols: La Fuerte contains peanuts (instead of molluscs). El Verde contains egg.",
      de: "Korrektur der Symbole dieser Speisekarte: La Fuerte enthält Erdnüsse (statt Weichtieren). El Verde enthält Ei."
    })[doc.lang];
    const original = document.getElementById("original");
    original.href = base + doc.file + "?v=carta-anterior-1";
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
      img.width = key === "bebidas" ? 1600 : 1002;
      img.height = key === "bebidas" ? 1131 : 1600;
      img.decoding = "async";
      img.loading = index === 0 ? "eager" : "lazy";
      img.addEventListener("error", () => {
        const error = document.createElement("p");
        error.className = "page-error";
        error.textContent = ({es:"No se ha podido cargar esta página.", en:"This page could not be loaded.", de:"Diese Seite konnte nicht geladen werden."})[doc.lang];
        const fallback = document.createElement("a");
        fallback.href = base + file + "?v=carta-anterior-1";
        fallback.textContent = doc.open;
        fallback.target = "_blank";
        fallback.rel = "noopener";
        error.append(fallback);
        img.replaceWith(error);
      }, { once: true });
      img.src = base + file + "?v=carta-anterior-1";
      if (doc.pages.length > 1) {
        const caption = document.createElement("figcaption");
        const link = document.createElement("a");
        link.href = base + file + "?v=carta-anterior-1";
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = `${doc.open} (${index + 1}/${doc.pages.length})`;
        caption.append(link);
        figure.append(img, caption);
      } else figure.append(img);
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

