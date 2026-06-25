import { siteConfig } from "@/lib/site-config";

export function Info() {
  const mapQuery = encodeURIComponent(siteConfig.address.full);

  return (
    <section
      id="horarios"
      className="bg-carbon px-6 py-[88px] text-white"
      aria-label="Horarios y ubicación"
    >
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-14 md:grid-cols-2">
        <div>
          <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-sage uppercase before:block before:h-0.5 before:w-[18px] before:bg-sage">
            Atención
          </p>
          <h2 className="mb-7 font-display text-[clamp(1.8rem,3.4vw,2.3rem)] font-extrabold uppercase leading-[1.02] text-white">
            Horarios
          </h2>
          <table className="w-full border-collapse font-mono text-[0.92rem]">
            <tbody>
              {siteConfig.hours.map((h) => (
                <tr key={h.day} className="border-b border-white/15">
                  <td className="py-3 px-1">{h.day}</td>
                  <td
                    className={`py-3 px-1 text-right ${
                      h.closed ? "text-white/45" : "text-sage"
                    }`}
                  >
                    {h.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-sage uppercase before:block before:h-0.5 before:w-[18px] before:bg-sage">
            Dónde estamos
          </p>
          <h2 className="mb-7 font-display text-[clamp(1.8rem,3.4vw,2.3rem)] font-extrabold uppercase leading-[1.02] text-white">
            Ubicación
          </h2>
          <address className="mb-5 font-mono text-[0.95rem] leading-relaxed text-sage not-italic">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.cityZip}
            <br />
            {siteConfig.address.country}
          </address>
          <iframe
            className="h-[220px] w-full border border-white/20 [filter:grayscale(0.2)_contrast(1.05)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            title="Mapa de ubicación de Administración del Valle"
          />
        </div>
      </div>
    </section>
  );
}
