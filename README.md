# Cartas de DOZE para el QR de las mesas

Página estática publicada bajo `/DOZE/`. No necesita instalación ni build.

## Contenido

- Tres cartas de comida (español, inglés y alemán), con ambas páginas.
- JPG original de bebidas y postres compartido entre idiomas.
- Originales y vistas WebP bajo `cartas/2026-09-15/`.
- El PDF exterior corregido está en BurgerDoze/output/pdf/cartas-2026-09-15/carta-exterior.pdf; Luis lo subirá a Drive.

Los PDFs conservan las cartas facilitadas el 15/09/2026. Se ha corregido el texto `www.dozeburger.com` en la segunda página, con la
fuente original. En La Fuerte se ha sustituido el icono de moluscos por
cacahuetes y se ha añadido su entrada a la leyenda en los tres idiomas.
Los QR dibujados dentro de los PDFs no se han modificado.

## Actualizar

Añadir la siguiente versión en una carpeta con fecha y actualizar `base` y
`documents` en `menu.js`. Generar las vistas a partir de los PDFs corregidos,
incluyendo todas sus páginas. Mantener los originales accesibles mediante
«Abrir PDF». No recuperar fuentes antiguas de Google Drive.

Conservar la URL de la página para que siga funcionando el QR impreso.
Comprobar las cuatro opciones, regreso al selector, enlaces a originales,
lectura con zoom y errores de carga en móvil y escritorio antes de publicar.

## Preview local

Desde la carpeta padre: `python -m http.server 8765 --bind 127.0.0.1`.
Abrir `http://127.0.0.1:8765/DOZE/` para verificar también la subruta de Pages.

## Identidad visual

Fondo #0d0d0d, rojo hsl(350 75% 52%), Bebas Neue, DM Sans y botones derivados
del hero de BurgerDoze. Solo selección y lectura de documentos, sin promoción,
redes ni enlaces a la web principal añadidos a la interfaz.

## Criterio de alérgenos aprobado

La carta es la referencia elegida por Luis. Solo se corrigen La Fuerte (cacahuetes en lugar de moluscos) y El Verde (añadir huevo) en los tres PDFs de comida. Se conservan los demás símbolos, los distintivos originales y las páginas de contacto con el dominio corregido. Bebidas y postres utiliza el JPG original, sin anexo nuevo.

La trazabilidad de la web está en BurgerDoze/docs/alergenos-2026-09-15.json. Las tartas enteras se conservan. El PDF exterior también incorpora las dos correcciones; su subida a Drive la realiza Luis.
