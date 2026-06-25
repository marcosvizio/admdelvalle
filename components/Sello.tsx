import { SkylineGlyph } from "./SkylineGlyph";

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
  const strongColor = tone === "light" ? "text-white" : "text-carbon";

  return (
    <div
      className={`relative flex h-[148px] w-[148px] flex-shrink-0 -rotate-[9deg] items-center justify-center rounded-full border-2 text-center font-mono ${ring}`}
    >
      <div className={`absolute inset-2.5 rounded-full border border-dashed ${dashed}`} />
      <div className="flex flex-col items-center px-3.5 text-[0.66rem] leading-relaxed tracking-[0.12em] uppercase">
        <SkylineGlyph className="mb-1.5" />
        <strong className={`mb-0.5 block font-display text-base tracking-[0.05em] ${strongColor}`}>
          ADV
        </strong>
        {line1}
        <br />
        {line2}
      </div>
    </div>
  );
}
