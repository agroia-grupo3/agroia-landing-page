# AgroIA – Landing page

Página web de captación de AgroIA, sistema móvil offline-first para detectar plagas en café y cacao. Su objetivo es que las cooperativas entiendan el producto, comparen los planes y soliciten una demostración. **No es la aplicación móvil**: la app se diseña y prototipa aparte (Figma).

Proyecto del curso 1ASI0385 IHC y Tecnologías Móviles (UPC), grupo 3.

## Autores

- Aranibar Campos, Alex (U201914295)
- Caldas García, Sergio Rubén (U202411274)
- Labio Quispe, Gricel Nohely (U202523306)
- Lazo Sánchez, Marco Antonio (U20241H996)
- López Mogollon, Luhis Álvaro (U202112223)
- Rengifo Del Castillo, River Martín (U20231B003)

## Segmentos objetivo

- Cooperativas y asociaciones agrarias de café y cacao de San Martín (clientes del plan institucional).
- Productores y técnicos de campo (usuarios de la aplicación).

## Qué incluye

HTML, CSS y JavaScript básicos, sin frameworks. JavaScript solo valida los formularios y abre el menú en el celular.

| Sección | Historia de usuario |
|---|---|
| Propuesta de valor, cómo funciona, beneficios y qué detecta | US45 |
| Casos de uso y testimonio | US46 |
| Planes de licenciamiento | US47 |
| Formulario para solicitar una demostración | US48 |
| Ficha técnica en PDF | US49 |
| Diseño responsivo | US50 |
| Boletín por correo | US51 |
| Preguntas frecuentes | US52 |

Las 52 historias de usuario del producto tienen su prueba de aceptación en la carpeta `features/`.

## Ejecutar en local

Abre `public/index.html` en el navegador, o desde esta carpeta:

```bash
python -m http.server 8765 --directory public
```

y entra a http://localhost:8765.

## Estructura

```
public/
  index.html
  favicon.ico
  assets/
    images/   fotos y logo
    styles/   styles.css
    scripts/  main.js
    docs/     ficha técnica en PDF
features/     escenarios Gherkin (.feature), uno por historia
capturas/     capturas de pantalla para el informe
```

## Accesibilidad

Atributo `alt` en las imágenes, etiquetas semánticas, atributos ARIA en el menú (`aria-expanded`, `aria-controls`), en la navegación (`aria-label`) y en los avisos de confirmación (`role="status"`), foco visible y áreas táctiles de al menos 48 px.

## Convenciones

- Ramas con GitFlow (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`).
- Commits con Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`).
- Versionado semántico (`MAJOR.MINOR.PATCH`).

## Créditos de las fotos

Imágenes de Wikimedia Commons con licencia libre (Scot Nelson, CC0; Smartse, CC BY-SA 3.0); las atribuciones están en el informe y en `equipo/fotos-ep03/FUENTES.md`.
