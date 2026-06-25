"use client";

import { useState } from "react";
import Image from "next/image";

export function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#nosotros", label: "Administrador" },
    { href: "#horarios", label: "Horarios" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-hueso">
      <div className="mx-auto flex max-w-280 items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/brand/adv-logo-compacto.svg"
            alt="Administración del Valle"
            width={150}
            height={140}
            className="h-11 w-auto"
            priority
          />
          <span className="font-display text-[1.1rem] font-extrabold tracking-[0.03em] text-forest uppercase">
            Administración
            <span className="block font-mono text-[0.55rem] font-normal tracking-[0.12em] text-tinta uppercase">
              del Valle
            </span>
          </span>
        </a>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="block h-0.5 w-6 bg-forest" />
          <span className="block h-0.5 w-6 bg-forest" />
          <span className="block h-0.5 w-6 bg-forest" />
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-b-2 border-transparent pb-1 font-mono text-[0.8rem] tracking-[0.04em] uppercase text-tinta transition-colors hover:border-forest hover:text-forest"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-forest px-4.5 py-2.5 font-mono text-[0.78rem] tracking-[0.03em] text-white uppercase transition-colors hover:bg-carbon"
          >
            Contactar
          </a>
        </nav>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-black/10 bg-hueso md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-black/5 px-6 py-4 font-mono text-sm uppercase text-tinta"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="bg-forest px-6 py-4 text-center font-mono text-sm uppercase text-white"
          >
            Contactar
          </a>
        </nav>
      )}
    </header>
  );
}
