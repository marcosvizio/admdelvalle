import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare-env";
import { getExpensasSlug } from "@/lib/auth";
import { getArchivos } from "@/lib/expensas-data";

export async function GET(request: NextRequest) {
  const env = await getEnv();
  const slug = await getExpensasSlug(env.SESSION_SECRET);

  if (!slug) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get("year") ?? "", 10);
  const month = parseInt(searchParams.get("month") ?? "", 10);

  // Confirmamos que el archivo pedido realmente pertenece a ESTE
  // consorcio (el de la sesión) antes de servirlo — así nadie puede
  // pedir el PDF de otro consorcio cambiando el año/mes en la URL.
  const archivos = await getArchivos(env.CONSORCIOS_KV, slug);
  const archivo = archivos.find((a) => a.year === year && a.month === month);

  if (!archivo) {
    return NextResponse.json({ error: "Archivo no encontrado." }, { status: 404 });
  }

  const objeto = await env.EXPENSAS_BUCKET.get(archivo.r2Key);
  if (!objeto) {
    return NextResponse.json({ error: "El archivo no está disponible." }, { status: 404 });
  }

  return new NextResponse(objeto.body as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${archivo.label}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
