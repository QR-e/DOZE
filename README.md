# DOZE · Carta digital

Las cartas de **DOZE Burger & Drink**, en Llucmajor, accesibles desde los QR de las mesas. Un sitio estático con documentos locales: no necesita instalación, variables de entorno, backend ni compilación.

[Abrir la carta](https://qr-e.github.io/DOZE/) · [Web del restaurante](https://www.dozeburger.com/) · [Actualizar documentos](#actualizar-las-cartas)

## Las cuatro cartas

| Carta | Acceso directo | Contenido |
| --- | --- | --- |
| Español | [Abrir](https://qr-e.github.io/DOZE/#carta-es) | Dos páginas WebP y PDF original. |
| English | [Open](https://qr-e.github.io/DOZE/#carta-en) | Two WebP pages and the original PDF. |
| Deutsch | [Öffnen](https://qr-e.github.io/DOZE/#carta-de) | Zwei WebP-Seiten und das Original-PDF. |
| Bebidas y postres | [Abrir](https://qr-e.github.io/DOZE/#bebidas) | Imagen completa y acceso al original. |

El visor permite cambiar de carta sin recargar, amplía las páginas en móvil y adapta sus textos al idioma elegido. Incluye enlaces a los documentos originales si JavaScript está desactivado o falla una imagen.

## Trabajar en local

Abre `index.html` directamente o sirve la carpeta con Python 3:

```sh
git clone https://github.com/QR-e/DOZE.git
cd DOZE
python -m http.server 8000 --bind 127.0.0.1
```

Abre [127.0.0.1:8000](http://127.0.0.1:8000/). HTML, CSS y JavaScript son propios; las tipografías Bebas Neue y DM Sans se cargan desde Google Fonts.

## Dónde está cada cosa

| Ruta | Función |
| --- | --- |
| `index.html` | Selector, visor y enlaces alternativos sin JavaScript. |
| `menu.js` | Edición activa, documentos, idiomas y navegación por fragmentos. |
| `styles.css` | Diseño adaptable y apariencia de la carta. |
| `cartas/2026-09-15/` | PDF e imágenes de la edición que sirve actualmente el visor. |

## Actualizar las cartas

1. Añade la nueva edición aprobada a una carpeta con fecha dentro de `cartas/`.
2. Incluye PDF y páginas WebP para cada idioma, además de `bebidas-postres.jpg`.
3. Actualiza `base` y `documents` en `menu.js`. Si cambian las proporciones, ajusta las dimensiones de las imágenes en `renderDocument()`.
4. Actualiza los enlaces de `index.html`, incluidos `<noscript>` y el enlace inicial al PDF.
5. Renueva los parámetros `?v=` cuando sustituyas archivos que conservan su ruta, tanto en los documentos como en CSS y JavaScript.
6. Comprueba los cuatro accesos, todas las páginas y los originales en móvil y escritorio. Contrasta precios, traducciones y alérgenos con el material aprobado por el restaurante.

## Publicación y recuperación

**GitHub Pages** publica la raíz de **`main`**, sin compilación. Después de subir un cambio, comprueba que Pages termina correctamente y abre los cuatro accesos de la tabla.

Conserva `https://qr-e.github.io/DOZE/` y sus fragmentos para que sigan funcionando los QR impresos. Para recuperar otra edición, restaura sus documentos y las referencias de `menu.js` e `index.html` desde el historial de Git.
