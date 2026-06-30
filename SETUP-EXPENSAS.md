# Módulo "Sus Expensas" — guía de puesta en marcha

Este módulo agrega un portal privado donde cada consorcio, con su propia
clave, puede ver y descargar sus liquidaciones de expensas por año y mes.
También agrega un panel de administración (`/admin`) donde Walter da de
alta consorcios y sube los PDFs todos los meses, sin tocar código.

## Cambio importante de arquitectura

Hasta la v1.1.0 el sitio era 100% estático (HTML/CSS/JS, sin servidor).
A partir de ahora **necesita servidor**, porque hay login, contraseñas y
archivos que se suben dinámicamente. Por eso pasamos a correr el sitio
sobre **Cloudflare Workers** (en vez del export estático + Cloudflare
Pages que usábamos antes). Internamente esto lo logra el adaptador
**OpenNext**, que ya está configurado en este proyecto.

No hace falta migrar a mano: simplemente seguí los pasos de abajo.

## 1. Instalar las dependencias nuevas

```bash
npm install
```

## 2. Crear el namespace de KV (datos) y el bucket de R2 (archivos)

Necesitás tener la CLI de Wrangler logueada en tu cuenta de Cloudflare
(`npx wrangler login` si todavía no lo hiciste).

```bash
npx wrangler kv namespace create CONSORCIOS_KV
```

Esto imprime algo como:
```
{ binding = "CONSORCIOS_KV", id = "abcd1234..." }
```

Copiá ese `id` y pegalo en `wrangler.jsonc`, reemplazando donde dice
`COMPLETAR_CON_EL_ID_QUE_DEVUELVE_WRANGLER`.

Después creá el bucket de R2 (para los PDFs):

```bash
npx wrangler r2 bucket create adv-expensas
```

(Si querés usar otro nombre de bucket, está bien — solo asegurate de
que coincida con `bucket_name` en `wrangler.jsonc`.)

## 3. Generar la contraseña del panel de administrador

Elegí una contraseña segura para el panel `/admin` (la va a usar Walter
para cargar los PDFs) y generá su hash:

```bash
node scripts/hash-password.mjs "la-contraseña-que-elijas"
```

Esto imprime un hash largo tipo `a1b2c3...:d4e5f6...`. **Copiá ese hash
completo** (no la contraseña original — el hash es lo que se guarda).

## 4. Configurar los secrets en Cloudflare (producción)

```bash
npx wrangler secret put ADMIN_PASSWORD_HASH
```
Pega ahí el hash que generaste en el paso 3 cuando te lo pida.

```bash
npx wrangler secret put SESSION_SECRET
```
Para esto generá un string random y largo, por ejemplo:
```bash
node -e "console.log(crypto.randomUUID() + crypto.randomUUID())"
```
y pegalo cuando wrangler te lo pida.

## 5. Configurar los secrets para desarrollo local

Copiá `.dev.vars.example` a `.dev.vars` (este archivo nunca se sube a
git) y completá los mismos dos valores ahí, para poder probar en tu
máquina antes de subir a producción.

```bash
cp .dev.vars.example .dev.vars
```

## 6. Probar en local

```bash
npm run dev
```

- `http://localhost:3000/admin` — panel de Walter (con la contraseña
  que elegiste en el paso 3, no el hash).
- `http://localhost:3000/sus-expensas` — portal de consorcios.

## 7. Deploy a Cloudflare

Si ya tenías el proyecto conectado por GitHub a Cloudflare Workers (el
deploy automático), el `wrangler.jsonc` actualizado y el comando
`npm run deploy` ya están configurados — con el próximo `git push`
Cloudflare va a detectar y usar la configuración nueva sola.

Si preferís deployar manualmente desde tu máquina:

```bash
npm run deploy
```

## Cómo se usa día a día

**Walter, cada mes:**
1. Entra a `tudominio.com.ar/admin`
2. Si el consorcio es nuevo: lo da de alta una vez (nombre + clave —
   esa clave es la que después usan los vecinos para entrar)
3. Sube el PDF de la liquidación: elige el consorcio, año, mes, y el
   archivo

**Los consorcistas:**
1. Entran a `tudominio.com.ar/sus-expensas`
2. Ingresan la clave de su consorcio (una sola, sin usuario)
3. Ven las liquidaciones organizadas por año → mes, y pueden
   descargarlas

## Notas de seguridad

- Las contraseñas nunca se guardan en texto plano — solo su hash
  (PBKDF2, 100.000 iteraciones), tanto la de Walter como la de cada
  consorcio.
- Cada consorcista solo puede ver y descargar los archivos de SU
  propio consorcio — está verificado en el servidor, no solo escondido
  en la pantalla.
- Tanto `/admin` como `/sus-expensas` están marcados para que Google
  no los indexe (no van a aparecer en buscadores).
- Las sesiones expiran solas: 4 horas para el admin, 2 horas para los
  consorcistas.
