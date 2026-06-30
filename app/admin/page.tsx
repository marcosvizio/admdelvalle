"use client";

import { useEffect, useState, type FormEvent } from "react";

interface ConsorcioResumen {
  slug: string;
  nombre: string;
  cantidadArchivos: number;
}

type ApiResult = { ok?: boolean; error?: string; [key: string]: unknown };

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [consorcios, setConsorcios] = useState<ConsorcioResumen[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Alta de consorcio
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [creando, setCreando] = useState(false);
  const [crearError, setCrearError] = useState("");
  const [crearOk, setCrearOk] = useState("");

  // Subida de PDF
  const [slugSeleccionado, setSlugSeleccionado] = useState("");
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [subirError, setSubirError] = useState("");
  const [subirOk, setSubirOk] = useState("");

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json() as Promise<{ authenticated: boolean }>)
      .then((data) => setAuthenticated(data.authenticated))
      .finally(() => setChecking(false));
  }, []);

  async function cargarConsorcios() {
    setRefreshing(true);
    const res = await fetch("/api/admin/consorcios");
    const data = (await res.json()) as { consorcios?: ConsorcioResumen[] };
    setConsorcios(data.consorcios ?? []);
    setRefreshing(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- patrón estándar: recargar datos cuando cambia el estado de autenticación
    if (authenticated) cargarConsorcios();
  }, [authenticated]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoadingLogin(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as ApiResult;
      if (!res.ok) {
        setLoginError(data.error ?? "Error al ingresar.");
        return;
      }
      setAuthenticated(true);
    } finally {
      setLoadingLogin(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
  }

  async function handleCrearConsorcio(e: FormEvent) {
    e.preventDefault();
    setCrearError("");
    setCrearOk("");
    setCreando(true);
    try {
      const res = await fetch("/api/admin/consorcios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre, password: nuevaClave }),
      });
      const data = (await res.json()) as ApiResult;
      if (!res.ok) {
        setCrearError(data.error ?? "No se pudo crear el consorcio.");
        return;
      }
      setCrearOk(`Consorcio "${nuevoNombre}" creado.`);
      setNuevoNombre("");
      setNuevaClave("");
      cargarConsorcios();
    } finally {
      setCreando(false);
    }
  }

  async function handleEliminarConsorcio(slug: string, nombre: string) {
    if (!confirm(`¿Eliminar el consorcio "${nombre}" y todos sus archivos? Esta acción no se puede deshacer.`)) {
      return;
    }
    await fetch(`/api/admin/consorcios?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
    cargarConsorcios();
  }

  async function handleSubirArchivo(e: FormEvent) {
    e.preventDefault();
    setSubirError("");
    setSubirOk("");
    if (!archivo) {
      setSubirError("Elegí un archivo PDF.");
      return;
    }
    if (!slugSeleccionado) {
      setSubirError("Elegí un consorcio.");
      return;
    }
    setSubiendo(true);
    try {
      const formData = new FormData();
      formData.set("slug", slugSeleccionado);
      formData.set("year", String(anio));
      formData.set("month", String(mes));
      formData.set("file", archivo);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await res.json()) as ApiResult;
      if (!res.ok) {
        setSubirError(data.error ?? "No se pudo subir el archivo.");
        return;
      }
      setSubirOk(`${MESES[mes - 1]} ${anio} cargado correctamente.`);
      setArchivo(null);
      cargarConsorcios();
    } finally {
      setSubiendo(false);
    }
  }

  if (checking) {
    return <main className="px-6 py-20 text-center text-[#5b6655]">Cargando…</main>;
  }

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-screen max-w-[360px] flex-col justify-center px-6">
        <h1 className="mb-6 font-display text-2xl font-extrabold uppercase text-forest">
          Panel ADV
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            required
            autoFocus
            placeholder="Contraseña de administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black/20 bg-white px-3.5 py-3 text-[0.95rem] text-tinta focus-visible:outline-3 focus-visible:outline-sello"
          />
          {loginError && <p className="text-[0.85rem] text-red-700">{loginError}</p>}
          <button
            type="submit"
            disabled={loadingLogin}
            className="bg-forest px-[22px] py-[15px] font-mono text-[0.85rem] tracking-[0.04em] text-white uppercase transition-colors hover:bg-carbon disabled:opacity-60"
          >
            {loadingLogin ? "Verificando…" : "Ingresar"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[900px] px-6 py-14">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold uppercase text-forest">
          Panel ADV — Sus Expensas
        </h1>
        <button
          onClick={handleLogout}
          className="font-mono text-[0.75rem] tracking-[0.04em] text-forest uppercase underline"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Crear consorcio */}
      <section className="mb-12 border border-black/10 p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-carbon">
          Dar de alta un consorcio
        </h2>
        <form onSubmit={handleCrearConsorcio} className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1.5 block font-mono text-[0.7rem] uppercase text-forest">
              Nombre del consorcio
            </label>
            <input
              type="text"
              required
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              placeholder='Ej: "Edificio Beiró 3316"'
              className="w-full border border-black/20 px-3 py-2.5 text-[0.9rem]"
            />
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="mb-1.5 block font-mono text-[0.7rem] uppercase text-forest">
              Clave de acceso
            </label>
            <input
              type="text"
              required
              minLength={6}
              value={nuevaClave}
              onChange={(e) => setNuevaClave(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full border border-black/20 px-3 py-2.5 text-[0.9rem]"
            />
          </div>
          <button
            type="submit"
            disabled={creando}
            className="bg-forest px-5 py-2.5 font-mono text-[0.78rem] uppercase text-white hover:bg-carbon disabled:opacity-60"
          >
            {creando ? "Creando…" : "Crear"}
          </button>
        </form>
        {crearError && <p className="mt-3 text-[0.85rem] text-red-700">{crearError}</p>}
        {crearOk && <p className="mt-3 text-[0.85rem] text-forest">{crearOk}</p>}
      </section>

      {/* Subir PDF */}
      <section className="mb-12 border border-black/10 p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-carbon">
          Cargar liquidación (PDF)
        </h2>
        <form onSubmit={handleSubirArchivo} className="flex flex-wrap items-end gap-4">
          <div className="min-w-[200px]">
            <label className="mb-1.5 block font-mono text-[0.7rem] uppercase text-forest">
              Consorcio
            </label>
            <select
              required
              value={slugSeleccionado}
              onChange={(e) => setSlugSeleccionado(e.target.value)}
              className="w-full border border-black/20 px-3 py-2.5 text-[0.9rem]"
            >
              <option value="">Elegir…</option>
              {consorcios.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[0.7rem] uppercase text-forest">
              Año
            </label>
            <input
              type="number"
              required
              value={anio}
              onChange={(e) => setAnio(parseInt(e.target.value, 10))}
              className="w-24 border border-black/20 px-3 py-2.5 text-[0.9rem]"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[0.7rem] uppercase text-forest">
              Mes
            </label>
            <select
              required
              value={mes}
              onChange={(e) => setMes(parseInt(e.target.value, 10))}
              className="border border-black/20 px-3 py-2.5 text-[0.9rem]"
            >
              {MESES.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[200px]">
            <label className="mb-1.5 block font-mono text-[0.7rem] uppercase text-forest">
              Archivo PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              required
              onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
              className="w-full text-[0.85rem]"
            />
          </div>
          <button
            type="submit"
            disabled={subiendo}
            className="bg-forest px-5 py-2.5 font-mono text-[0.78rem] uppercase text-white hover:bg-carbon disabled:opacity-60"
          >
            {subiendo ? "Subiendo…" : "Subir"}
          </button>
        </form>
        {subirError && <p className="mt-3 text-[0.85rem] text-red-700">{subirError}</p>}
        {subirOk && <p className="mt-3 text-[0.85rem] text-forest">{subirOk}</p>}
      </section>

      {/* Listado de consorcios */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-carbon">Consorcios</h2>
          <button
            onClick={cargarConsorcios}
            className="font-mono text-[0.72rem] uppercase text-forest underline"
          >
            {refreshing ? "Actualizando…" : "Actualizar"}
          </button>
        </div>
        <table className="w-full border-collapse text-[0.9rem]">
          <thead>
            <tr className="border-b border-black/15 text-left font-mono text-[0.72rem] uppercase text-forest">
              <th className="py-2">Nombre</th>
              <th className="py-2">Archivos cargados</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {consorcios.map((c) => (
              <tr key={c.slug} className="border-b border-black/10">
                <td className="py-3">{c.nombre}</td>
                <td className="py-3">{c.cantidadArchivos}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => handleEliminarConsorcio(c.slug, c.nombre)}
                    className="font-mono text-[0.72rem] uppercase text-red-700 underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {consorcios.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-[#5b6655]">
                  Todavía no hay consorcios dados de alta.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
