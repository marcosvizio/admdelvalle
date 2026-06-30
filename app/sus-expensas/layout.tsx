import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sus Expensas",
  description: "Portal privado de consulta de liquidaciones de expensas.",
  robots: { index: false, follow: false },
};

export default function SusExpensasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
