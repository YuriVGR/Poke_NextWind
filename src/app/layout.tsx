import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/navbar";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokéDex NextWind",
  description:
    "PokéDex NextWind is a pokedex made with Next.js and TailwindCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} m-0 flex h-screen w-screen flex-row justify-center overflow-hidden bg-slate-100 p-0 antialiased overflow-y-scroll`}
      >
        <Nav />
        <div className="flex h-full w-full justify-center">
          <div className="h-full w-4/5 bg-white pt-20">{children}</div>
        </div>
      </body>
    </html>
  );
}
