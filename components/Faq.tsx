const faqs = [
  {
    pregunta: "¿Qué incluye exactamente la administración de un consorcio?",
    respuesta:
      "Incluye el armado y reparto de la liquidación de expensas, el pago y seguimiento de proveedores (mantenimiento, limpieza, ascensores, etc.), la organización del archivo y la documentación del consorcio (actas, pólizas, reglamento), y la atención de los reclamos y necesidades diarias del edificio.",
  },
  {
    pregunta: "¿Cada cuánto se entrega la liquidación de expensas?",
    respuesta:
      "La liquidación se arma y se entrega todos los meses, con el detalle de los gastos comunes ordinarios y, cuando corresponde, los extraordinarios.",
  },
  {
    pregunta: "¿Cuál es la diferencia entre gastos ordinarios y extraordinarios?",
    respuesta:
      "Los gastos ordinarios son los habituales del mantenimiento del edificio: limpieza, luz de espacios comunes, sueldos del personal, servicios. Los extraordinarios son gastos puntuales o de mayor monto, como una refacción importante o una obra, y normalmente se aprueban en asamblea antes de afrontarse.",
  },
  {
    pregunta: "¿Cómo se hace para cambiar de administrador?",
    respuesta:
      "El cambio de administrador se decide en una asamblea de propietarios, donde se vota la designación del nuevo administrador. Si su consorcio está evaluando un cambio, podemos acompañarlos en ese proceso y conversar los próximos pasos.",
  },
  {
    pregunta: "¿Atienden consorcios fuera de CABA?",
    respuesta:
      "Nuestra oficina está en CABA. Escribinos contándonos la ubicación del edificio y te confirmamos si podemos cubrir la zona.",
  },
  {
    pregunta: "¿Cómo los contacto si mi consorcio ya trabaja con ADV?",
    respuesta:
      "Pueden escribirnos por WhatsApp o por email en los horarios de atención (lunes a viernes de 10 a 16), o contactar directamente a Walter Carrizo.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.pregunta,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.respuesta,
    },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="bg-hueso px-6 py-22" aria-label="Preguntas frecuentes">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-190">
        <div className="mb-12">
          <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-forest uppercase before:block before:h-0.5 before:w-4.5 before:bg-forest">
            Preguntas frecuentes
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02] text-forest">
            Dudas comunes sobre la administración
          </h2>
        </div>

        <div className="flex flex-col">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group border-b border-black/10 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.05rem] font-bold text-carbon">
                {f.pregunta}
                <span className="shrink-0 font-mono text-lg text-forest transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[#43503d]">
                {f.respuesta}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
