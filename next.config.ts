import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// IMPORTANTE: a partir del módulo "Sus Expensas" el sitio deja de ser
// estático puro (necesita servidor para login, subir PDFs, leer KV/R2).
// Corre sobre Cloudflare Workers vía el adaptador OpenNext.
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

// Permite que "npm run dev" tenga acceso a los bindings de Cloudflare
// (KV, R2) definidos en wrangler.jsonc, igual que en producción.
initOpenNextCloudflareForDev();

export default nextConfig;
