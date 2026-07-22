import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Up Clips — Marcas que são lembradas",
  description:
    "Posicionamento, conteúdo e tráfego pago para marcas que querem ser percebidas de outro jeito.",
  icons: {
    icon: "/up-clips-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
