"use client";

import { useEffect, useState, useRef } from "react";
import SearchBar from "@/components/search_components/search_bar";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col text-center items-center justify-center pt-10">
      <h1 className="text-4xl font-bold">PokeDex NextWind</h1>
      <p className="text-base font-normal w-1/2">
        PokeDex NextWind is a pokedex made with Next.js and TailwindCSS.
        <br />
        Built with the intention of learning Next.js and TailwindCSS, as well as
        fetching API data.
      </p>
    </main>
  );
}
