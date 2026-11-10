# PUNTO A→B

Sitio estático del mapa **Del punto A al punto B** — Infraestructura Visual de taller.zz.

Proyecto independiente: no necesita build, ni dependencias, ni conexión con ningún otro repo. Se publica como estático.

---

## Qué es

Un diagnóstico en seis preguntas que devuelve **una acción**:

| Bloque | Contenido |
|---|---|
| **I. Punto A** | Tres preguntas (A1–A3) que te sitúan hoy |
| **II. El puente** | Tres preguntas (P1–P3) para pasar de A a B, y los cuatro activos |
| **III. Punto B** | La fórmula que **combina** las respuestas y devuelve una sola acción |

> La frase de P1 **+** La prueba de A2 **+** El activo de P2 **+** El proyecto de P3 **=** Una sola imagen que demuestra la frase

---

## Cómo responde el visitante

1. Botón **“Preparar mi respuesta”** → abre el formulario con las seis preguntas.
2. Al completarlas, **la acción se arma sola** en vivo.
3. Botón **“Enviar mis respuestas”** → abre **WhatsApp con todo ya escrito**. Ese mensaje llega con el punto A, el punto B y la acción combinada.
4. (Opcional) **“Copiar mi respuesta”** → al portapapeles, para pegar por otro canal.

El número de WhatsApp está en `pagina.js`, primera línea de la constante `WHATSAPP`:

```js
const WHATSAPP = "5491158380925";   // con código de país, sin +
```

Para cambiarlo: editás esa línea y listo.

---

## Archivos

```text
index.html        La página (contenido + estructura)
estilos.css       Sistema visual: blanco, tinta, Inter + Instrument Serif + Geist Mono
pagina.js         Formulario, armado de la acción, link de WhatsApp
favicon.svg       Ícono
apple-touch-icon.png
vercel.json       Configuración de deploy (estático, sin build)
robots.txt        SEO
sitemap.xml       SEO
README.md         Esta guía
.gitignore        Lo que no va al repo
.vercelignore    Lo que no va al deploy
```

**No hay build ni dependencias.** Las tipografías vienen de Google Fonts por CDN.

---

## Ver en local

```bash
npx serve .
```

O con Python:

```bash
python -m http.server 8000
```

Después abrí `http://localhost:3000` (o `:8000`).

---

## Publicar

### Opción A — Vercel directo (sin GitHub)

```bash
npx vercel --prod
```

Te pide login la primera vez (se abre el navegador) y sube la carpeta tal cual.

### Opción B — GitHub + Vercel

1. Creá un repositorio nuevo en GitHub.
2. Subí todo el contenido de esta carpeta (**Add file → Upload files**).
3. En [vercel.com/new](https://vercel.com/new) importá el repositorio:
   - **Framework Preset**: `Other`
   - **Build Command**: *vacío*
   - **Output Directory**: `.`
4. **Deploy**.

Cada push a `main` redespliega solo.

### Dominio

`Settings → Domains → Add` en Vercel. Después de definir el dominio final, actualizá en `index.html` (las etiquetas `canonical` y `og:url`), en `robots.txt` y en `sitemap.xml`.

---

## Editar el contenido

- **Preguntas y textos:** `index.html` (marcadores `data-marca="A1"` etc. y los bloques `h2`/`h3`).
- **Los cuatro activos:** la lista `activos` en `index.html`.
- **Número de WhatsApp:** `pagina.js` → constante `WHATSAPP`.
- **Campos del formulario:** `pagina.js` → array `CAMPOS`.
- **Opciones del activo faltante:** `pagina.js` → array `ACCIONES`.

Si cambiás los marcadores de las preguntas, actualizá también la fórmula (`La frase de P1`, etc.) y los textos del bloque III.

---

Taller ZZ © 2026 · Dirección: Tomás Zapata · Buenos Aires — Global
