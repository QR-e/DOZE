# DOZE · Carta digital

Web de las cartas de **DOZE Burger & Drink**, en Llucmajor (Mallorca), accesible desde los códigos QR de las mesas.

Permite consultar la carta en español, inglés y alemán, además de bebidas y postres. Es un sitio estático hecho con HTML, CSS y JavaScript, sin dependencias de instalación ni proceso de compilación. Las cartas y sus imágenes están incluidas en este repositorio.

**[Abrir la carta digital](https://qr-e.github.io/DOZE/)** · [Web oficial de DOZE](https://www.dozeburger.com/)

## Qué ofrece

- Selector de idioma y navegación entre cartas sin recargar la página.
- Visor de las dos páginas de cada carta mediante imágenes WebP, adaptado a móvil y escritorio.
- Apertura del PDF de cada idioma o de la imagen de bebidas y postres en una pestaña nueva.
- Enlaces directos a los documentos cuando JavaScript está desactivado y acceso al original si falla una imagen del visor.
- Textos del visor en el idioma elegido y enlace a la web oficial del restaurante.

## Enlaces directos

| Carta | Enlace |
| --- | --- |
| Español | [Abrir](https://qr-e.github.io/DOZE/#carta-es) |
| English | [Open](https://qr-e.github.io/DOZE/#carta-en) |
| Deutsch | [Öffnen](https://qr-e.github.io/DOZE/#carta-de) |
| Bebidas y postres | [Abrir](https://qr-e.github.io/DOZE/#bebidas) |

## Estructura

```text
.
├── index.html                 # Selector, visor y enlaces sin JavaScript
├── styles.css                 # Identidad visual y diseño adaptable
├── menu.js                    # Documentos, idiomas y navegación por fragmentos
└── cartas/
    └── 2026-09-15/
        ├── carta-{es,en,de}.pdf
        ├── carta-{es,en,de}-{1,2}.webp
        └── bebidas-postres.jpg
```

Los nombres con llaves representan los archivos de cada idioma y página. La carpeta activa se define en la constante `base` de `menu.js`. Las tipografías Bebas Neue y DM Sans se cargan desde Google Fonts.

## Ver en local

Clona el repositorio y abre `index.html` en el navegador. Para revisarlo mediante HTTP, puedes usar Python 3 desde la carpeta del proyecto:

```sh
git clone https://github.com/QR-e/DOZE.git
cd DOZE
python -m http.server 8000 --bind 127.0.0.1
```

Después abre [http://127.0.0.1:8000](http://127.0.0.1:8000). No se necesitan variables de entorno ni un backend.

## Actualizar las cartas

1. Añade los documentos aprobados a `cartas/`. Para una nueva edición, utiliza una carpeta con su fecha.
2. Incluye el PDF y las imágenes WebP de sus páginas para cada idioma, además de la imagen de bebidas y postres. El visor muestra las imágenes; el botón de apertura lleva al documento original.
3. Actualiza `base` y las entradas de `documents` en `menu.js` si cambian la carpeta, los nombres o el número de páginas. Si cambian las proporciones, ajusta también las dimensiones de las imágenes en `renderDocument()`.
4. Mantén al día los enlaces de `index.html`, incluidos los de `<noscript>` y el enlace inicial del documento original.
5. Si sustituyes archivos manteniendo sus rutas, cambia el parámetro `?v=` de las imágenes y documentos en `menu.js`. Actualiza también las versiones de `menu.js` y `styles.css` en `index.html` cuando cambies esos archivos, para renovar la caché.
6. Revisa los cuatro destinos, todas sus páginas y los documentos originales en móvil y escritorio antes de publicar. Comprueba también precios, traducciones y alérgenos con el material aprobado por el restaurante.

## Publicación

El sitio se publica con **GitHub Pages** desde la raíz de la rama `main`, sin compilación. Los cambios publicados en esa rama se reflejan en la carta digital cuando finaliza el despliegue de Pages.

Conserva la URL `https://qr-e.github.io/DOZE/` y los fragmentos de navegación existentes para mantener la compatibilidad con los QR impresos y los enlaces compartidos.

Para recuperar una edición anterior, restaura desde el historial de Git sus documentos y las referencias correspondientes de `menu.js` e `index.html`.
