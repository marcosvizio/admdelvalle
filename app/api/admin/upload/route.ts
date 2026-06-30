import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare-env";
import { requireAdminSession } from "@/lib/auth";
import { getConsorcio, addArchivo, removeArchivo, nombreMes } from "@/lib/expensas-data";

const MAX_SIZE_BYTES = 15 * 1024 * 1024; // 15MB, de sobra para un PDF de liquidación

async function requireAdmin() {
  const env = await getEnv();
  const ok = await requireAdminSession(env.SESSION_SECRET);
  return { env, ok };
}

export async function POST(request: NextRequest) {
  const { env, ok } = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const formData = await request.formData();
  const slug = formData.get("slug");
  const year = formData.get("year");
  const month = formData.get("month");
  const file = formData.get("file");

  if (
    typeof slug !== "string" ||
    typeof year !== "string" ||
    typeof month !== "string" ||
    !(file instanceof File)
  ) {
    return NextResponse.json({ error: "Faltan datos del formulario." }, { status: 400 });
  }

  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  if (!yearNum || monthNum < 1 || monthNum > 12) {
    return NextResponse.json({ error: "Año o mes inválido." }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "El archivo debe ser un PDF." }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "El PDF supera el tamaño máximo (15MB)." }, { status: 400 });
  }

  const consorcio = await getConsorcio(env.CONSORCIOS_KV, slug);
  if (!consorcio) {
    return NextResponse.json({ error: "El consorcio no existe." }, { status: 404 });
  }

  const r2Key = `${slug}/${yearNum}/${String(monthNum).padStart(2, "0")}.pdf`;

  await env.EXPENSAS_BUCKET.put(r2Key, await file.arrayBuffer(), {
    httpMetadata: { contentType: "application/pdf" },
  });

  await addArchivo(env.CONSORCIOS_KV, slug, {
    year: yearNum,
    month: monthNum,
    label: `${nombreMes(monthNum)} ${yearNum}.pdf`,
    r2Key,
    uploadedAt: new Date().toISOString(),
    sizeBytes: file.size,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const { env, ok } = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  if (!slug || !year || !month) {
    return NextResponse.json({ error: "Faltan parámetros." }, { status: 400 });
  }

  const archivo = await removeArchivo(env.CONSORCIOS_KV, slug, parseInt(year, 10), parseInt(month, 10));
  if (archivo) {
    await env.EXPENSAS_BUCKET.delete(archivo.r2Key);
  }

  return NextResponse.json({ ok: true });
}
