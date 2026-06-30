// Genera el hash de la contraseña de administrador, para pegar en
// ADMIN_PASSWORD_HASH (.dev.vars en local, o como secret en Cloudflare).
//
// Uso:
//   node scripts/hash-password.mjs "la-contraseña-que-quiero-usar"
//
// Usa el mismo algoritmo (PBKDF2-SHA256) que lib/crypto-utils.ts,
// así que el hash generado acá es compatible con lo que el sitio
// va a verificar.

import { webcrypto as crypto } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Uso: node scripts/hash-password.mjs \"tu-contraseña\"");
  process.exit(1);
}

const ENCODER = new TextEncoder();
const PBKDF2_ITERATIONS = 100_000;

function bufToHex(buf) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    ENCODER.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return `${bufToHex(salt)}:${bufToHex(derived)}`;
}

const hash = await hashPassword(password);
console.log("\nHash generado (copiar todo el valor de abajo):\n");
console.log(hash);
console.log("");
