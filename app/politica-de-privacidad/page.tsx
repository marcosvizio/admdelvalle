import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Administración del Valle (ADV): qué datos recolectamos, con qué fin, y cómo ejercer sus derechos según la Ley 25.326.",
  robots: { index: true, follow: true },
};

const ACTUALIZADO = "25 de junio de 2026";

export default function PoliticaDePrivacidad() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-190 px-6 py-20">
        <p className="mb-3.5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.18em] text-forest uppercase before:block before:h-0.5 before:w-4.5 before:bg-forest">
          Información legal
        </p>
        <h1 className="mb-2 font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02] text-forest">
          Política de Privacidad
        </h1>
        <p className="mb-10 font-mono text-[0.78rem] text-[#5b6655]">
          Última actualización: {ACTUALIZADO}
        </p>

        <div className="flex flex-col gap-8 text-[0.98rem] leading-relaxed text-[#33402e]">
          <section>
            <h2 className="mb-2 font-display text-[1.2rem] font-bold text-carbon">
              Responsable del tratamiento
            </h2>
            <p>
              El responsable de los datos personales recolectados a través de este
              sitio es {siteConfig.administrator}, en representación de{" "}
              {siteConfig.name} ({siteConfig.shortName}), con domicilio en{" "}
              {siteConfig.address.full}.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[1.2rem] font-bold text-carbon">
              Qué datos recolectamos y para qué
            </h2>
            <p className="mb-3">
              A través del formulario de contacto de este sitio solicitamos
              nombre, dirección del consorcio y el mensaje que la persona quiera
              enviarnos. Estos datos se usan exclusivamente para responder la
              consulta y, si corresponde, conversar sobre la administración del
              consorcio en cuestión.
            </p>
            <p>
              El botón de envío del formulario redirige a WhatsApp con ese mensaje
              ya redactado: el envío final ocurre dentro de WhatsApp, fuera de
              este sitio, sujeto a la política de privacidad de Meta/WhatsApp. Si
              en cambio nos escribe por email, sus datos quedan únicamente en
              nuestra casilla de correo.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[1.2rem] font-bold text-carbon">
              Consentimiento
            </h2>
            <p>
              Al completar y enviar el formulario de contacto, la persona presta
              su consentimiento informado para el tratamiento de los datos
              indicados arriba, con la única finalidad descripta. Ese
              consentimiento puede revocarse en cualquier momento, según se
              explica en &quot;Sus derechos&quot; más abajo.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[1.2rem] font-bold text-carbon">
              Cesión a terceros
            </h2>
            <p>
              No vendemos ni compartimos los datos recibidos con terceros. No
              utilizamos los datos del formulario para fines comerciales
              distintos a responder la consulta.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[1.2rem] font-bold text-carbon">
              Cookies y analítica
            </h2>
            <p>
              Este sitio no utiliza cookies de seguimiento ni herramientas de
              analítica de terceros. Si eso cambia en el futuro, esta política se
              actualizará para reflejarlo.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[1.2rem] font-bold text-carbon">
              Conservación de los datos
            </h2>
            <p>
              Conservamos los datos de contacto únicamente durante el tiempo
              necesario para atender la consulta o, si se inicia una relación
              comercial, mientras dure la administración del consorcio.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[1.2rem] font-bold text-carbon">
              Sus derechos
            </h2>
            <p className="mb-3">
              De acuerdo con la Ley N.º 25.326 de Protección de Datos
              Personales, usted tiene derecho a acceder, rectificar, actualizar
              o solicitar la supresión de sus datos personales. Para ejercer
              estos derechos, puede escribirnos a{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-forest underline">
                {siteConfig.email}
              </a>{" "}
              o por WhatsApp al {siteConfig.whatsappDisplay}.
            </p>
            <p>
              La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA (AAIP), órgano de
              control de la Ley N.º 25.326, tiene la atribución de atender las
              denuncias y reclamos que se interpongan en relación al
              incumplimiento de las normas sobre protección de datos personales.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[1.2rem] font-bold text-carbon">
              Cambios a esta política
            </h2>
            <p>
              Podemos actualizar esta política para reflejar cambios en el sitio
              o en la normativa vigente. La fecha de la última actualización
              figura al inicio de esta página.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
