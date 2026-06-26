import Image from "next/image";

export function Sello({
  line1,
  line2,
  tone = "light",
}: {
  line1: string;
  line2: string;
  tone?: "light" | "dark";
}) {
  const ring = tone === "light" ? "border-sage text-sage" : "border-forest text-forest";
  const dashed = tone === "light" ? "border-sage/60" : "border-forest/60";
  const image = tone === "light" ? "/brand/adv-logo-compacto-fondo-oscuro.png" : "/brand/adv-logo-compacto.svg";
  const strongColor = tone === "light" ? "text-white" : "text-carbon";

  return (
    <div
      className={`relative flex h-60 w-60 shrink-0 rotate-[-9deg] items-center justify-center rounded-full border-2 text-center font-mono ${ring}`}
    >
      <div className={`absolute inset-2.5 rounded-full border border-dashed ${dashed}`} />
      <div className="flex flex-col items-center px-3.5 text-[1rem] leading-relaxed tracking-[0.12em] uppercase">
        <Image
          src={image}
          alt="Administración del Valle"
          width={250}
          height={240}
          className="h-20 w-auto"
          priority
        />
        {line1}
        <br />
        {line2}
      </div>
    </div>
  );
}
