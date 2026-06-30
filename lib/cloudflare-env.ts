import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Forma del "env" de Cloudflare para este proyecto: los bindings
 * (KV, R2) más las variables/secrets. Los nombres acá deben coincidir
 * exactamente con los definidos en wrangler.jsonc y con los secrets
 * cargados con `wrangler secret put`.
 */
export interface CloudflareEnv {
  CONSORCIOS_KV: KVNamespace;
  EXPENSAS_BUCKET: R2Bucket;
  ADMIN_PASSWORD_HASH: string;
  SESSION_SECRET: string;
}

/** Acceso tipado al entorno de Cloudflare desde cualquier Route Handler. */
export async function getEnv(): Promise<CloudflareEnv> {
  const { env } = await getCloudflareContext({ async: true });
  return env as unknown as CloudflareEnv;
}
