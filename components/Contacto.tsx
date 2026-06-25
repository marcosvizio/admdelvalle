"use client";

import { useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function Contacto() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [mensaje, setMensaje] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const texto = [
      "Hola, quiero consultar sobre la administración de mi consorcio.",
      "",
      `Nombre: ${nombre}`,
      `Dirección del consorcio: ${direccion}`,
      `Mensaje: ${mensaje}`,
    ].join("\n");

    window.open(whatsappLink(texto), "_blank", "noopener");
  }

  return (
    <section id="contacto" className="bg-hueso px-6 py-22" aria-label="Contacto">
      <div className="mx-auto grid max-w-280 grid-cols-1 gap-14 md:grid-cols-2">
        <div>
          <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-forest uppercase before:block before:h-0.5 before:w-4.5 before:bg-forest">
            Hablemos de su consorcio
          </p>
          <h2 className="mb-4.5 font-display text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold uppercase leading-[1.02] text-forest">
            Pida una propuesta
          </h2>
          <p className="mb-6.5 max-w-110 text-[#3a4536]">
            Cuéntenos sobre el edificio y nos comunicamos para conversar sobre la
            administración.
          </p>

          <div className="mb-2 flex flex-col gap-3.5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2.5 border-b border-black/10 py-3.5 font-mono text-[0.95rem] text-carbon transition-colors hover:text-forest"
            >
              <span className="text-[0.66rem] tracking-widest text-sello uppercase">
                WhatsApp
              </span>{" "}
              · {siteConfig.whatsappDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 border-b border-black/10 py-3.5 font-mono text-[0.95rem] text-carbon transition-colors hover:text-forest"
            >
              <span className="text-[0.66rem] tracking-widest text-sello uppercase">
                Email
              </span>{" "}
              · {siteConfig.email}
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="nombre"
              className="mb-1.5 block font-mono text-[0.72rem] tracking-[0.08em] text-forest uppercase"
            >
              Nombre
            </label>
            <input
              id="nombre"
              name="Nombre"
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-black/20 bg-white px-3.5 py-3 text-[0.95rem] text-tinta focus-visible:outline-3 focus-visible:outline-sello"
            />
          </div>
          <div>
            <label
              htmlFor="direccion"
              className="mb-1.5 block font-mono text-[0.72rem] tracking-[0.08em] text-forest uppercase"
            >
              Dirección del consorcio
            </label>
            <input
              id="direccion"
              name="Direccion del consorcio"
              type="text"
              required
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full border border-black/20 bg-white px-3.5 py-3 text-[0.95rem] text-tinta focus-visible:outline-3 focus-visible:outline-sello"
            />
          </div>
          <div>
            <label
              htmlFor="mensaje"
              className="mb-1.5 block font-mono text-[0.72rem] tracking-[0.08em] text-forest uppercase"
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="Mensaje"
              required
              rows={4}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full resize-y border border-black/20 bg-white px-3.5 py-3 text-[0.95rem] text-tinta focus-visible:outline-3 focus-visible:outline-sello"
            />
          </div>
          <button
            type="submit"
            className="self-start bg-forest px-5.5 py-3.75 font-mono text-[0.85rem] tracking-[0.04em] text-white uppercase transition-colors hover:bg-carbon"
          >
            Enviar por WhatsApp
          </button>
          <p className="text-[0.78rem] text-[#5b6655]">
            Se abre WhatsApp con la consulta ya redactada — solo falta confirmar el envío.
          </p>
        </form>
      </div>
    </section>
  );
}
