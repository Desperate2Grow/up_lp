import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://upclips.com.br"),
  title: "Up Clips — Marcas que são lembradas",
  description:
    "Posicionamento, conteúdo e tráfego pago para marcas que querem ser percebidas de outro jeito.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/up-clips-logo.png",
  },
  openGraph: {
    title: "Up Clips — Marcas que são lembradas",
    description: "Posicionamento, conteúdo, captação e tráfego para marcas que querem ocupar espaço.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Up Clips — Sua marca precisa ocupar espaço" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Up Clips — Marcas que são lembradas",
    description: "Posicionamento, conteúdo, captação e tráfego para marcas que querem ocupar espaço.",
    images: ["/og.png"],
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
