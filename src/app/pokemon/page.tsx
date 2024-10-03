"use client";

import Card from "@/components/search_components/cards";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faArrowUpWideShort,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/pro-solid-svg-icons";

import { PokeDetail, PokeEntry } from "@/types/types";
import { fetchPokemonList } from "@/services/pokemonService";

export default function Pokemon() {
  // Search States
  const [search, setSearch] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState<string>("");

  // List States
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const limit = 20;
  const [filteredPokemon, setFilteredPokemon] = useState<PokeDetail[]>([]);
  const [allPokemonList, setAllPokemonList] = useState<PokeDetail[]>([]);

  // Cache States
  const [pokemonCache, setPokemonCache] = useState<{
    [key: string]: PokeDetail;
  }>({});

  const [allPokemonEntries, setAllPokemonEntries] = useState<PokeEntry[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const pokemonList = await fetchPokemonList(limit, offset);
        setAllPokemonList((prevList) => [...prevList, ...pokemonList]);

        const newCacheEntries = pokemonList.reduce(
          (acc, pokemon) => {
            acc[pokemon.name.toLowerCase()] = pokemon;
            return acc;
          },
          {} as { [key: string]: PokeDetail },
        );

        setPokemonCache((prevCache) => ({ ...prevCache, ...newCacheEntries }));
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    loadPokemon();
  }, [offset]);

  useEffect(() => {
    const fetchAllPokemonEntries = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
        );
        const data = await response.json();
        setAllPokemonEntries(data.results);
      } catch {
        console.log("Error during fetchAllPokemon:", error);
      }
    };

    fetchAllPokemonEntries();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSubmittedSearch("");
      setFilteredPokemon([]);
      setError(null);
    }
  };

  const handleSearchSubmit = async () => {
    const trimmedSearch = search.trim().toLowerCase();
    setSubmittedSearch(trimmedSearch);
    setError(null);

    if (trimmedSearch === "") {
      setFilteredPokemon([]);
      return;
    }

    const matchedEntries = allPokemonEntries.filter((entry) =>
      entry.name.includes(trimmedSearch),
    );

    if (matchedEntries.length === 0) {
      setError(`No Pokemon Found`)
    }

    await fetchPokemonDetails(matchedEntries)
  };

  const fetchPokemonDetails = async (matchedEntries: PokeEntry[]) => {
    try {
      setLoading(true)
      const promises = matchedEntries.map(async (pokemon) => {
        if (pokemonCache[pokemon.id]) {
          return pokemonCache[pokemon.id];
        } else {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          // Cache the data
          setPokemonCache((prevCache) => ({ ...prevCache, [pokemon.id]: data }));
          return data;
        }
    }
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <main className="flex flex-col items-center justify-center gap-8 bg-white py-8">
      <h1 className="text-4xl font-bold">Search for a Pokémon</h1>
      <section className="flex w-full flex-row items-center justify-between gap-2 px-10">
        <div className="group/searchbar flex w-1/2 flex-row items-center">
          <input
            type="search"
            placeholder="Search for a Pokémon"
            aria-label="Search for a Pokémon"
            className="h-10 w-full rounded-l-md border border-slate-300 p-2 focus:outline-none group-focus/searchbar:border-slate-500"
            onChange={handleSearchChange}
            value={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          <button
            className="h-10 w-fit rounded-r-md bg-slate-300 p-2 px-4 text-white group-focus/searchbar:bg-slate-500"
            onClick={handleSearchSubmit}
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button
            className="flex size-10 items-center justify-center rounded-md p-2 hover:bg-slate-100"
            aria-label="Filter"
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button
            className="flex size-10 items-center justify-center rounded-md p-2 hover:bg-slate-100"
            aria-label="Sort"
          >
            <FontAwesomeIcon icon={faArrowUpWideShort} />
          </button>
        </div>
      </section>

      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : submittedSearch ? (
        <>
          {error && (
            <div className="flex w-full items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          {filteredPokemon.length > 0 ? (
            <section className="grid h-full w-full grid-cols-4 place-items-center gap-4 scroll-smooth">
              {filteredPokemon.map((p) => (
                <Card
                  id={p.id}
                  key={p.id}
                  name={p.name}
                  image={p.sprites.other["official-artwork"].front_default}
                  type={p.types.map((t) => capitalize(t.type.name))}
                  typeColor={p.types.map((t) => getTypeColor(t.type.name))}
                />
              ))}
            </section>
          ) : null}
        </>
      ) : (
        <section className="grid h-full w-full grid-cols-4 place-items-center gap-4 scroll-smooth">
          {allPokemonList.map((p) => (
            <Card
              id={p.id}
              key={p.id}
              name={p.name}
              image={p.sprites.other["official-artwork"].front_default}
              type={p.types.map((t) => capitalize(t.type.name))}
              typeColor={p.types.map((t) => getTypeColor(t.type.name))}
            />
          ))}
        </section>
      )}
      {submittedSearch === "" && !loading && (
        <div className="flex w-full justify-center">
          <button
            className="rounded-xl bg-slate-500 p-2 px-4 font-semibold text-white hover:bg-slate-400 active:bg-slate-300"
            onClick={() => {
              setOffset((prevOffset) => prevOffset + limit);
            }}
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

function getTypeColor(typeName: string): string {
  const colors: { [key: string]: string } = {
    normal: "bg-gray-400",
    fire: "bg-red-400",
    water: "bg-indigo-400",
    electric: "bg-yellow-400",
    grass: "bg-green-400",
    ice: "bg-sky-400",
    fighting: "bg-red-400",
    poison: "bg-purple-400",
    ground: "bg-yellow-400",
    flying: "bg-blue-400",
    psychic: "bg-pink-400",
    bug: "bg-green-400",
    rock: "bg-gray-400",
    ghost: "bg-violet-400",
    dragon: "bg-blue-400",
    dark: "bg-gray-400",
  };
  return colors[typeName] || "bg-gray-400";
}
