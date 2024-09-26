import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/navbar";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poke NextWind",
  description: "Poke NextWind is a pokedex made with Next.js and TailwindCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} m-0 flex h-screen w-screen flex-row overflow-hidden bg-slate-100 p-0 antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
