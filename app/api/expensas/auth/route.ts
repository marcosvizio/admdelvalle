import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare-env";
import { verifyPassword } from "@/lib/crypto-utils";
import { createExpensasSession, getExpensasSlug, clearExpensasSession } from "@/lib/auth";
import { getConsorcio } from "@/lib/expensas-data";

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };

  if (!password) {
    return NextResponse.json({ error: "Falta la contraseña." }, { status: 400 });
  }

  const env = await getEnv();

  // Buscamos entre todos los consorcios cuál tiene esta contraseña.
  // Con la cantidad de consorcios que maneja ADV esto es perfectamente
  // rápido; si en el futuro son cientos, conviene pedir también el
  // nombre/slug del consorcio en el login para no iterar todos.
  const list = await env.CONSORCIOS_KV.list({ prefix: "consorcio:" });

  for (const key of list.keys) {
    const raw = await env.CONSORCIOS_KV.get(key.name);
    if (!raw) continue;
    const consorcio = JSON.parse(raw) as { slug: string; nombre: string; passwordHash: string };
    const ok = await verifyPassword(password, consorcio.passwordHash);
    if (ok) {
      await createExpensasSession(consorcio.slug, env.SESSION_SECRET);
      return NextResponse.json({ ok: true, nombre: consorcio.nombre });
    }
  }

  await new Promise((r) => setTimeout(r, 400));
  return NextResponse.json({ error: "Clave incorrecta." }, { status: 401 });
}

export async function GET() {
  const env = await getEnv();
  const slug = await getExpensasSlug(env.SESSION_SECRET);
  if (!slug) return NextResponse.json({ authenticated: false });

  const consorcio = await getConsorcio(env.CONSORCIOS_KV, slug);
  return NextResponse.json({ authenticated: true, nombre: consorcio?.nombre ?? slug });
}

export async function DELETE() {
  await clearExpensasSession();
  return NextResponse.json({ ok: true });
}
