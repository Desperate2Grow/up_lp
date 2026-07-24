import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços Up Clips — Estratégia, Conteúdo e Performance",
  description:
    "Conheça os serviços da Up Clips: posicionamento, conteúdo, captação cinematográfica, Meta Ads, Google Ads e landing pages.",
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    title: "Serviços Up Clips — Estratégia, Conteúdo e Performance",
    description:
      "As frentes certas para sua marca ser entendida, lembrada e escolhida.",
    url: "/servicos",
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
