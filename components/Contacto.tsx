import { siteConfig, whatsappLink } from "@/lib/site-config";

export function Contacto() {
  return (
    <section id="contacto" className="bg-hueso px-6 py-[88px]" aria-label="Contacto">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-14 md:grid-cols-2">
        <div>
          <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-forest uppercase before:block before:h-0.5 before:w-[18px] before:bg-forest">
            Hablemos de su consorcio
          </p>
          <h2 className="mb-[18px] font-display text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold uppercase leading-[1.02] text-forest">
            Pida una propuesta
          </h2>
          <p className="mb-[26px] max-w-[440px] text-[#3a4536]">
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
              <span className="text-[0.66rem] tracking-[0.1em] text-sello uppercase">
                WhatsApp
              </span>{" "}
              · {siteConfig.whatsappDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 border-b border-black/10 py-3.5 font-mono text-[0.95rem] text-carbon transition-colors hover:text-forest"
            >
              <span className="text-[0.66rem] tracking-[0.1em] text-sello uppercase">
                Email
              </span>{" "}
              · {siteConfig.email}
            </a>
          </div>
        </div>

        <form
          action={`mailto:${siteConfig.email}`}
          method="post"
          encType="text/plain"
          className="flex flex-col gap-4"
        >
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
              className="w-full resize-y border border-black/20 bg-white px-3.5 py-3 text-[0.95rem] text-tinta focus-visible:outline-3 focus-visible:outline-sello"
            />
          </div>
          <button
            type="submit"
            className="self-start bg-forest px-[22px] py-[15px] font-mono text-[0.85rem] tracking-[0.04em] text-white uppercase transition-colors hover:bg-carbon"
          >
            Enviar consulta
          </button>
        </form>
      </div>
    </section>
  );
}
