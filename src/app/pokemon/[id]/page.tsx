"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PokeDetail, PokeListItem } from "@/types/types";
import {
  fetchPokemonDetail,
  fetchAllPokemon,
} from "@/services/pokemonService";

interface PokemonPageProps {
  params: {
    id: string;
  };
}

export default function PokemonPage({ params }: PokemonPageProps) {
  const { id } = params;
  const [pokemon, setPokemon] = useState<PokeDetail | null>(null);
  const [pokemonList, setPokemonList] = useState<PokeListItem[]>([]);
  const [pokemonCache, setPokemonCache] = useState<{ [key: string]: PokeDetail }>({});

  useEffect(() => {
    console.log("useEffect triggered with id:", id);
    const fetchData = async () => {
      try {
        console.log("Fetching all Pokémon...");
        const list = await fetchAllPokemon();
        setPokemonList(list);
        console.log("Fetched Pokémon list:", list);

        // Find the selected Pokémon in the list
        const selectedPokemon = list.find(poke => poke.name === id);
        if (selectedPokemon) {
          console.log("Selected Pokémon:", selectedPokemon);

          // Check if the Pokémon details are already in the cache
          if (pokemonCache[selectedPokemon.name]) {
            console.log("Using cached details for Pokémon:", selectedPokemon.name);
            setPokemon(pokemonCache[selectedPokemon.name]);
          } else {
            // Fetch the Pokémon details if not in the cache
            const detail = await fetchPokemonDetail(selectedPokemon.url);
            setPokemonCache(prevCache => ({ ...prevCache, [selectedPokemon.name]: detail }));
            setPokemon(detail);
          }
        }
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("Pokemon Cache Updated:", pokemonCache);
  }, [pokemonCache]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
    </div>
  );
}
