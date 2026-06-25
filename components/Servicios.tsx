import { siteConfig } from "@/lib/site-config";

export function Servicios() {
  return (
    <section id="servicios" className="bg-hueso px-6 py-[88px]" aria-label="Servicios">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-12 max-w-[640px]">
          <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-forest uppercase before:block before:h-0.5 before:w-[18px] before:bg-forest">
            Lo que hacemos
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02] text-forest">
            Gestión completa del consorcio
          </h2>
          <p className="mt-3.5 text-[1.02rem] text-[#3a4536]">
            Nos encargamos de las tareas administrativas del edificio para que el
            consejo y los propietarios tengan información clara y a tiempo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-forest/20 bg-forest/20 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.servicios.map((s) => (
            <div
              key={s.numero}
              className="bg-hueso p-8 transition-colors hover:bg-[#EAE6D6]"
            >
              <span className="font-mono text-[0.75rem] tracking-[0.1em] text-sello">
                {s.numero}
              </span>
              <h3 className="mt-3.5 mb-3 font-display text-[1.3rem] font-extrabold text-carbon">
                {s.titulo}
              </h3>
              <p className="text-[0.92rem] text-[#43503d]">{s.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
