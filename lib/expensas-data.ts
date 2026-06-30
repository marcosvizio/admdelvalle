import type { CloudflareEnv } from "./cloudflare-env";

/** Un consorcio dado de alta en el portal "Sus Expensas". */
export interface Consorcio {
  slug: string;
  nombre: string;
  /** "saltHex:hashHex" — nunca la contraseña en texto plano. */
  passwordHash: string;
  createdAt: string;
}

/** Un archivo de liquidación ya subido para un consorcio. */
export interface ArchivoExpensa {
  year: number;
  /** 1-12 */
  month: number;
  /** Nombre del archivo tal como se muestra al usuario, ej "Marzo 2026.pdf" */
  label: string;
  /** Key dentro del bucket R2. */
  r2Key: string;
  uploadedAt: string;
  sizeBytes: number;
}

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function nombreMes(month: number): string {
  return MESES[month - 1] ?? `Mes ${month}`;
}

function consorcioKey(slug: string) {
  return `consorcio:${slug}`;
}

function archivosKey(slug: string) {
  return `archivos:${slug}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getConsorcio(
  kv: KVNamespace,
  slug: string
): Promise<Consorcio | null> {
  const raw = await kv.get(consorcioKey(slug));
  return raw ? (JSON.parse(raw) as Consorcio) : null;
}

export async function listConsorcios(kv: KVNamespace): Promise<Consorcio[]> {
  const list = await kv.list({ prefix: "consorcio:" });
  const consorcios = await Promise.all(
    list.keys.map(async (k) => {
      const raw = await kv.get(k.name);
      return raw ? (JSON.parse(raw) as Consorcio) : null;
    })
  );
  return consorcios.filter((c): c is Consorcio => c !== null);
}

export async function saveConsorcio(kv: KVNamespace, consorcio: Consorcio): Promise<void> {
  await kv.put(consorcioKey(consorcio.slug), JSON.stringify(consorcio));
}

export async function deleteConsorcio(kv: KVNamespace, slug: string): Promise<void> {
  await kv.delete(consorcioKey(slug));
  await kv.delete(archivosKey(slug));
}

export async function getArchivos(kv: KVNamespace, slug: string): Promise<ArchivoExpensa[]> {
  const raw = await kv.get(archivosKey(slug));
  return raw ? (JSON.parse(raw) as ArchivoExpensa[]) : [];
}

export async function addArchivo(
  kv: KVNamespace,
  slug: string,
  archivo: ArchivoExpensa
): Promise<void> {
  const archivos = await getArchivos(kv, slug);
  const sinDuplicado = archivos.filter(
    (a) => !(a.year === archivo.year && a.month === archivo.month)
  );
  sinDuplicado.push(archivo);
  sinDuplicado.sort((a, b) => b.year - a.year || b.month - a.month);
  await kv.put(archivosKey(slug), JSON.stringify(sinDuplicado));
}

export async function removeArchivo(
  kv: KVNamespace,
  slug: string,
  year: number,
  month: number
): Promise<ArchivoExpensa | null> {
  const archivos = await getArchivos(kv, slug);
  const archivo = archivos.find((a) => a.year === year && a.month === month) ?? null;
  const restantes = archivos.filter((a) => !(a.year === year && a.month === month));
  await kv.put(archivosKey(slug), JSON.stringify(restantes));
  return archivo;
}

/** Agrupa los archivos por año, ordenados de más nuevo a más viejo. */
export function agruparPorAnio(
  archivos: ArchivoExpensa[]
): { year: number; archivos: ArchivoExpensa[] }[] {
  const porAnio = new Map<number, ArchivoExpensa[]>();
  for (const a of archivos) {
    if (!porAnio.has(a.year)) porAnio.set(a.year, []);
    porAnio.get(a.year)!.push(a);
  }
  return Array.from(porAnio.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, archivos]) => ({
      year,
      archivos: archivos.sort((a, b) => b.month - a.month),
    }));
}

export type { CloudflareEnv };
