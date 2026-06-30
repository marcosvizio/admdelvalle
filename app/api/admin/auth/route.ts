import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare-env";
import { verifyPassword } from "@/lib/crypto-utils";
import { createAdminSession, clearAdminSession, requireAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };

  if (!password) {
    return NextResponse.json({ error: "Falta la contraseña." }, { status: 400 });
  }

  const env = await getEnv();
  const ok = await verifyPassword(password, env.ADMIN_PASSWORD_HASH);

  if (!ok) {
    // Pequeña demora para dificultar fuerza bruta básica.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  await createAdminSession(env.SESSION_SECRET);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const env = await getEnv();
  const ok = await requireAdminSession(env.SESSION_SECRET);
  return NextResponse.json({ authenticated: ok });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
