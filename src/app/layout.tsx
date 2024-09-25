import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/navbar";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const hankenGrotesk = Hanken_Grotesk({
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
        className={`${hankenGrotesk.className} flex h-screen w-screen flex-row overflow-hidden p-4 antialiased shadow-black/60 shadow-inner`}
      >
        <section className="flex h-full w-2/6 flex-col items-center overflow-hidden rounded-l-lg bg-red-500 p-12">
          <h1 className="text-center text-4xl font-bold text-white">
            Poke NextWind
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-m text-center text-white">
              Poke NextWind is a pokedex made with Next.js and TailwindCSS.
            </p>
            <p className="text-center text-sm text-white">
              It uses the PokeAPI to fetch data.
            </p>
          </div>
        </section>
        <section className="h-full w-1 bg-black" />
        <section className="relative flex h-full w-4/6 flex-col items-center overflow-hidden rounded-r-lg bg-blue-500">
          <Nav />
          <div className="flex w-full flex-col items-center justify-center gap-4 overflow-hidden p-12">
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
