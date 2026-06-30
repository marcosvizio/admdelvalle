 Last Modification Date: 2026-06-30 17:02:54

 Author: Sam
 Email: Sam@example.com

 Creation Date: 2026-06-30 17:02:23
 Last Modification Date: 2026-06-30 17:02:23

 Another File Header is a Visual Studio Code extension to automatically or by command insert a header to your files.

*/# Administración del Valle (ADV) — sitio en Next.js

Landing page de ADV, migrada a Next.js (App Router + TypeScript + Tailwind CSS v4),
pensada para SEO y carga rápida: todo el sitio se genera como HTML estático en el
build (no necesita servidor para funcionar).

## Antes de tocar nada: datos a completar

Todos los datos de contacto están centralizados en **`lib/site-config.ts`**.
Buscar la palabra `COMPLETAR` y reemplazar:

- `whatsapp` / `whatsappDisplay` — número real de WhatsApp
- `email` — dirección de contacto real

También conviene revisar/actualizar `metadataBase` y las URLs en
`app/layout.tsx`, `app/sitemap.ts` y `app/robots.ts` cuando tengan el dominio
definitivo (hoy apuntan a `administraciondelvalle.com.ar` como ejemplo).

## Cómo correrlo

Requiere [Node.js](https://nodejs.org) 20 o más nuevo.

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

La primera vez que corran `npm install`/`npm run dev`/`npm run build`,
Next.js va a descargar automáticamente las fuentes (Big Shoulders, Inter,
IBM Plex Mono) desde Google Fonts y las va a empaquetar dentro del sitio
— necesitan conexión a internet para ese paso, pero el resultado final no
depende de Google Fonts en producción (las fuentes quedan alojadas en el
propio sitio).

## Cómo generar el sitio para publicar

```bash
npm run build
```

Esto genera una carpeta `out/` con HTML, CSS y JS estáticos — son los
archivos que se suben al hosting. No hace falta un servidor Node corriendo:
se puede subir `out/` tal cual a:

- **Vercel** (`vercel deploy`, detecta Next.js automáticamente)
- **Netlify**, **Cloudflare Pages**, **GitHub Pages**
- Cualquier hosting tradicional que sirva archivos estáticos (cPanel, etc.)

## Estructura del proyecto

```
app/
  layout.tsx       → metadata SEO global, fuentes, datos estructurados (JSON-LD)
  page.tsx          → arma la página con las secciones
  sitemap.ts        → genera sitemap.xml
  robots.ts         → genera robots.txt
  globals.css       → paleta de colores y tipografías (tokens de Tailwind v4)
components/
  Nav, Hero, Servicios, Sobre, Info, Contacto, Footer
  Sello, SkylineGlyph, SkylineDivider → piezas de marca reutilizables
lib/
  site-config.ts    → todos los datos del negocio en un solo lugar
public/brand/        → logos e isotipos (los mismos archivos que ya tienen)
```

## SEO ya configurado

- Metadata completa (título, descripción, Open Graph) en `app/layout.tsx`
- Datos estructurados `LocalBusiness` (Schema.org) para resultados de Google
- `sitemap.xml` y `robots.txt` generados automáticamente
- HTML estático: cada visita carga una página ya armada, sin esperar a un
  servidor — esto es lo que más ayuda tanto al posicionamiento como a la
  velocidad de carga

Como hablamos antes: esto resuelve el SEO "on-page". Para aparecer entre los
primeros resultados de "administración de consorcio" también conviene crear
el Perfil de Negocio de Google con la misma dirección y horarios, y subir el
sitio a un dominio propio.
