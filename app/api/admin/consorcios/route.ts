import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare-env";
import { requireAdminSession } from "@/lib/auth";
import { hashPassword } from "@/lib/crypto-utils";
import {
  listConsorcios,
  saveConsorcio,
  deleteConsorcio,
  getConsorcio,
  getArchivos,
  slugify,
  type Consorcio,
} from "@/lib/expensas-data";

async function requireAdmin() {
  const env = await getEnv();
  const ok = await requireAdminSession(env.SESSION_SECRET);
  return { env, ok };
}

export async function GET() {
  const { env, ok } = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const consorcios = await listConsorcios(env.CONSORCIOS_KV);
  const conArchivos = await Promise.all(
    consorcios.map(async (c) => ({
      slug: c.slug,
      nombre: c.nombre,
      createdAt: c.createdAt,
      cantidadArchivos: (await getArchivos(env.CONSORCIOS_KV, c.slug)).length,
    }))
  );

  return NextResponse.json({ consorcios: conArchivos });
}

export async function POST(request: NextRequest) {
  const { env, ok } = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const { nombre, password } = (await request.json()) as {
    nombre?: string;
    password?: string;
  };

  if (!nombre || !password) {
    return NextResponse.json(
      { error: "Faltan datos: nombre y contraseña son obligatorios." },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 6 caracteres." },
      { status: 400 }
    );
  }

  const slug = slugify(nombre);
  if (!slug) {
    return NextResponse.json({ error: "El nombre no es válido." }, { status: 400 });
  }

  const existente = await getConsorcio(env.CONSORCIOS_KV, slug);
  if (existente) {
    return NextResponse.json(
      { error: "Ya existe un consorcio con ese nombre." },
      { status: 409 }
    );
  }

  const consorcio: Consorcio = {
    slug,
    nombre,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  await saveConsorcio(env.CONSORCIOS_KV, consorcio);

  return NextResponse.json({ ok: true, slug });
}

export async function DELETE(request: NextRequest) {
  const { env, ok } = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Falta el parámetro slug." }, { status: 400 });
  }

  await deleteConsorcio(env.CONSORCIOS_KV, slug);
  return NextResponse.json({ ok: true });
}
