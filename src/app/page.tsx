"use client";

import { useEffect, useState, useRef } from "react";
import SearchBar from "@/components/search_components/search_bar";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col p-4">
      <h1 className="text-4xl font-bold">
        <span className="text-pink-500">P</span>
        <span className="text-red-500">o</span>
        <span className="text-yellow-500">k</span>
        <span className="text-blue-500">é</span> NextWind
      </h1>
      <p className="w-1/2 text-base font-normal">
        Poké NextWind is a pokedex made with Next.js and TailwindCSS.
        <br />
        Built with the intention of learning Next.js and TailwindCSS, as well as
        fetching API data.
      </p>
    </main>
  );
}
