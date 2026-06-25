import { siteConfig } from "@/lib/site-config";
import { Sello } from "./Sello";

export function Sobre() {
  return (
    <section
      id="nosotros"
      className="bg-white px-6 py-22"
      aria-label="Sobre el administrador"
    >
      <div className="mx-auto grid max-w-280 grid-cols-1 items-center gap-14 md:grid-cols-[0.85fr_1.15fr]">
        <div className="order-2 border border-black/10 bg-hueso p-9 md:order-1">
          <div className="mb-5.5">
            <Sello line1="Atención" line2="directa" tone="dark" />
          </div>
          <h3 className="text-[1.4rem] text-carbon">{siteConfig.administrator}</h3>
          <p className="font-mono text-[0.78rem] tracking-[0.06em] text-forest uppercase">
            Administrador
          </p>
        </div>

        <div className="order-1 md:order-2">
          <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-forest uppercase before:block before:h-0.5 before:w-4.5 before:bg-forest">
            Quiénes administran
          </p>
          <h2 className="mb-5 font-display text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold uppercase leading-[1.02] text-forest">
            Un negocio con trato directo
          </h2>
          <p className="mb-4 text-[1.02rem] text-[#33402e]">
            Administración del Valle (ADV) es un emprendimiento dedicado a la
            administración de consorcios en Buenos Aires. El sr. Walter Carrizo está a cargo
            de la administración del día a día de cada edificio.
          </p>
          <p className="text-[1.02rem] text-[#33402e]">
            Trabajamos con cada consorcio de forma directa: quien atiende el teléfono
            es quien conoce el edificio, sus proveedores y su historial de
            liquidaciones.
          </p>
        </div>
      </div>
    </section>
  );
}
