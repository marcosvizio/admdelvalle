/**
 * Utilidades de seguridad para el módulo "Sus Expensas".
 *
 * Todo está hecho con Web Crypto (la API nativa del navegador / de
 * Cloudflare Workers) — no usamos bcrypt ni otras librerías de Node,
 * porque Workers corre en un entorno tipo "edge" que no las soporta
 * directamente. PBKDF2 + HMAC son el estándar para este tipo de entorno.
 */

const ENCODER = new TextEncoder();
const PBKDF2_ITERATIONS = 100_000;

function bufToHex(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuf(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/** Comparación que no filtra información por tiempo de respuesta. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function deriveBits(password: string, salt: Uint8Array): Promise<ArrayBuffer> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    ENCODER.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  return crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256
  );
}

/**
 * Genera un hash seguro de una contraseña. Guardar SOLO este string
 * (nunca la contraseña en texto plano). Formato: "saltHex:hashHex".
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derived = await deriveBits(password, salt);
  return `${bufToHex(salt)}:${bufToHex(derived)}`;
}

/** Verifica una contraseña contra un hash generado por hashPassword(). */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = hexToBuf(saltHex);
  const derived = await deriveBits(password, salt);
  return timingSafeEqual(bufToHex(derived), hashHex);
}

async function hmac(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    ENCODER.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, ENCODER.encode(data));
  return bufToHex(sig);
}

/**
 * Crea un token de sesión firmado (no encriptado: no poner datos
 * sensibles adentro, solo identificadores). Incluye expiración.
 */
export async function signSession(
  payload: Record<string, unknown>,
  secret: string,
  ttlSeconds: number
): Promise<string> {
  const fullPayload = { ...payload, exp: Date.now() + ttlSeconds * 1000 };
  const data = btoa(JSON.stringify(fullPayload));
  const sig = await hmac(data, secret);
  return `${data}.${sig}`;
}

/** Verifica y decodifica un token de sesión. Devuelve null si es inválido o expiró. */
export async function verifySession<T extends Record<string, unknown>>(
  token: string | undefined,
  secret: string
): Promise<T | null> {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;

  const expected = await hmac(data, secret);
  if (!timingSafeEqual(sig, expected)) return null;

  try {
    const payload = JSON.parse(atob(data)) as T & { exp: number };
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
