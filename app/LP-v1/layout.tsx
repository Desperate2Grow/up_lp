import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Up Clips — Arquivo LP v1",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function ArchivedLandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
