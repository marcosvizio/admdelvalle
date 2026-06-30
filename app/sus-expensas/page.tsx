"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

interface ArchivoMes {
  month: number;
  nombreMes: string;
  label: string;
}

interface AnioGrupo {
  year: number;
  archivos: ArchivoMes[];
}

export default function SusExpensasPage() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [anios, setAnios] = useState<AnioGrupo[]>([]);
  const [openYear, setOpenYear] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/expensas/auth")
      .then((r) => r.json() as Promise<{ authenticated: boolean; nombre?: string }>)
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
          setNombre(data.nombre ?? "");
        }
      })
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/expensas/files")
      .then((r) => r.json() as Promise<{ anios?: AnioGrupo[] }>)
      .then((data) => {
        setAnios(data.anios ?? []);
        if (data.anios?.[0]) setOpenYear(data.anios[0].year);
      });
  }, [authenticated]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/expensas/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string; nombre?: string };
      if (!res.ok) {
        setError(data.error ?? "No se pudo verificar la clave.");
        return;
      }
      setAuthenticated(true);
      setNombre(data.nombre ?? "");
    } catch {
      setError("Hubo un problema de conexión. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/expensas/auth", { method: "DELETE" });
    setAuthenticated(false);
    setAnios([]);
    setPassword("");
  }

  return (
    <>
      <Nav />
      <main className="mx-auto min-h-[60vh] max-w-[760px] px-6 py-20">
        <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-forest uppercase before:block before:h-0.5 before:w-[18px] before:bg-forest">
          Portal privado
        </p>
        <h1 className="mb-10 font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02] text-forest">
          Sus Expensas
        </h1>

        {checking ? (
          <p className="text-[#5b6655]">Verificando acceso…</p>
        ) : !authenticated ? (
          <form onSubmit={handleLogin} className="flex max-w-[360px] flex-col gap-4">
            <p className="text-[0.95rem] text-[#33402e]">
              Ingrese la clave de su consorcio para ver las liquidaciones de
              expensas cargadas.
            </p>
            <div>
              <label
                htmlFor="clave"
                className="mb-1.5 block font-mono text-[0.72rem] tracking-[0.08em] text-forest uppercase"
              >
                Clave
              </label>
              <input
                id="clave"
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black/20 bg-white px-3.5 py-3 text-[0.95rem] text-tinta focus-visible:outline-3 focus-visible:outline-sello"
              />
            </div>
            {error && <p className="text-[0.85rem] text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="self-start bg-forest px-[22px] py-[15px] font-mono text-[0.85rem] tracking-[0.04em] text-white uppercase transition-colors hover:bg-carbon disabled:opacity-60"
            >
              {loading ? "Verificando…" : "Ingresar"}
            </button>
          </form>
        ) : (
          <div>
            <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-5">
              <p className="font-display text-[1.2rem] font-bold text-carbon">{nombre}</p>
              <button
                onClick={handleLogout}
                className="font-mono text-[0.75rem] tracking-[0.04em] text-forest uppercase underline"
              >
                Cerrar sesión
              </button>
            </div>

            {anios.length === 0 ? (
              <p className="text-[#5b6655]">
                Todavía no hay liquidaciones cargadas para este consorcio.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {anios.map((grupo) => (
                  <div key={grupo.year} className="border border-black/10">
                    <button
                      onClick={() =>
                        setOpenYear(openYear === grupo.year ? null : grupo.year)
                      }
                      className="flex w-full items-center justify-between bg-hueso px-5 py-4 text-left"
                    >
                      <span className="font-display text-[1.3rem] font-extrabold text-forest">
                        {grupo.year}
                      </span>
                      <span className="font-mono text-lg text-forest">
                        {openYear === grupo.year ? "−" : "+"}
                      </span>
                    </button>

                    {openYear === grupo.year && (
                      <ul className="flex flex-col">
                        {grupo.archivos.map((a) => (
                          <li key={a.month} className="border-t border-black/10">
                            <a
                              href={`/api/expensas/download?year=${grupo.year}&month=${a.month}`}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center justify-between px-5 py-3.5 text-[0.95rem] text-carbon transition-colors hover:bg-hueso hover:text-forest"
                            >
                              {a.nombreMes}
                              <span className="font-mono text-[0.72rem] tracking-[0.05em] text-sello uppercase">
                                Ver PDF ↓
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
