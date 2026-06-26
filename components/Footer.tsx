import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-carbon px-6 py-8.5 text-[#9aa394]">
      <div className="mx-auto flex max-w-280 flex-wrap items-center justify-between gap-3 font-mono text-[0.76rem] tracking-[0.03em]">
        <span>
          <strong className="text-sage">{siteConfig.shortName}</strong> —{" "}
          {siteConfig.name}
        </span>
        <span>
          {siteConfig.address.street}, CABA · Lun a Vie 10:00–16:00
        </span>
        <Link href="/politica-de-privacidad" className="underline hover:text-sage">
          Política de Privacidad
        </Link>
      </div>
    </footer>
  );
}