import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Sobre } from "@/components/Sobre";
import { Info } from "@/components/Info";
import { Faq } from "@/components/Faq";
import { Contacto } from "@/components/Contacto";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Servicios />
        <Sobre />
        <Info />
        <Faq />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
