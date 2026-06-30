import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare-env";
import { getExpensasSlug } from "@/lib/auth";
import { getArchivos, agruparPorAnio, nombreMes } from "@/lib/expensas-data";

export async function GET() {
  const env = await getEnv();
  const slug = await getExpensasSlug(env.SESSION_SECRET);

  if (!slug) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const archivos = await getArchivos(env.CONSORCIOS_KV, slug);
  const porAnio = agruparPorAnio(archivos).map((grupo) => ({
    year: grupo.year,
    archivos: grupo.archivos.map((a) => ({
      month: a.month,
      nombreMes: nombreMes(a.month),
      label: a.label,
      uploadedAt: a.uploadedAt,
    })),
  }));

  return NextResponse.json({ anios: porAnio });
}
