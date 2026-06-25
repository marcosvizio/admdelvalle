import type { Metadata } from "next";
import { Big_Shoulders, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const SITE_URL = "https://www.administraciondelvalle.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Administración de Consorcios en CABA | Administración del Valle (ADV)",
    template: "%s | Administración del Valle (ADV)",
  },
  description:
    "ADV administra consorcios en Buenos Aires: liquidación de expensas, pago a proveedores y organización de documentación. Atención directa con Walter Carrizo. Av. Francisco Beiró 3316, CABA.",
  keywords: [
    "administración de consorcios",
    "administrador de consorcios CABA",
    "liquidación de expensas",
    "administración de edificios Buenos Aires",
    "expensas",
  ],
  authors: [{ name: "Administración del Valle" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Administración del Valle (ADV)",
    title: "Administración de Consorcios en CABA | Administración del Valle (ADV)",
    description:
      "Liquidación de expensas, pago a proveedores y documentación de su consorcio, siempre en orden. Atención directa y de confianza.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Administración del Valle (ADV)",
  alternateName: "ADV Administración de Consorcios",
  description:
    "Administración de consorcios en Buenos Aires: liquidación de expensas, pago a proveedores, organización de archivos y documentación.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida Francisco Beiró 3316",
    addressLocality: "Buenos Aires",
    addressRegion: "CABA",
    postalCode: "C1419",
    addressCountry: "AR",
  },
  areaServed: "Ciudad Autónoma de Buenos Aires",
  founder: {
    "@type": "Person",
    name: "Walter Carrizo",
    jobTitle: "Administrador",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  priceRange: "Consultar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${bigShoulders.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
