import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import { Nav } from "@/commons/components/Nav";

import "@/app/globals.scss";

const noto_sans = Noto_Sans({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Concordance of Pāṇinian Dhātuvṛttis",
  description:
    "A concordance of three paninian dhatuvrittis - Madhaviya Dhatu Vritti, Kshiratarangini, Dhatupradipa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto_sans.className}>
        <Nav />

        {children}
      </body>
    </html>
  );
}
