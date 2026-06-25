import { whatsappLink } from "@/lib/site-config";
import { Sello } from "./Sello";
import { SkylineDivider } from "./SkylineDivider";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-carbon pt-24 text-white" aria-label="Presentación">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-8 px-6 pb-[60px] md:grid-cols-[1.3fr_0.9fr]">
        <div>
          <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-sage uppercase before:block before:h-0.5 before:w-[18px] before:bg-sage">
            Administración de consorcios · CABA
          </p>
          <h1 className="font-display text-[clamp(2.6rem,5.6vw,4.4rem)] font-extrabold uppercase leading-[1.02]">
            Su consorcio,
            <br />
            en orden,
            <br />
            <span className="text-sage">sin sorpresas.</span>
          </h1>
          <p className="mt-6 mb-8 max-w-[520px] text-[1.08rem] text-[#D9DECF]">
            Liquidación de expensas, pago a proveedores y toda la documentación del
            edificio, llevada con trato directo por un administrador, no por un call
            center.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href={whatsappLink(
                "Hola, quiero consultar sobre la administración de mi consorcio"
              )}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 bg-sage px-6 py-3.5 font-mono text-sm tracking-[0.03em] text-carbon uppercase transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              Hablar por WhatsApp →
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2.5 border-[1.5px] border-white/40 px-6 py-3.5 font-mono text-sm tracking-[0.03em] text-white uppercase transition-all hover:-translate-y-0.5 hover:border-white"
            >
              Ver servicios
            </a>
          </div>
        </div>

        <Sello line1="Consorcios" line2="en CABA" tone="light" />
      </div>

      <SkylineDivider />
    </section>
  );
}
