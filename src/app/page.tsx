"use client";

import { useEffect, useState } from "react";
import CardModal from "@/components/cardmodal";
import SearchBar from "@/components/searchbar";
import Modal from "@/components/cardmodal/modal";
interface Pokemon {
  name: string;
  id: string;
  sprites: {
    front_default: string;
  };
  types: [
    {
      type: {
        name: string;
      };
    },
  ];
}

async function fetchPokemonData(pokemonName: string): Promise<Pokemon | null> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Pokemon = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

async function fetchAllPokemon(): Promise<Pokemon[]> {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151"); // Fetch first 151 Pokémon
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const pokemonList = await Promise.all(
      data.results.map(async (pokemon: { name: string }) => {
        return await fetchPokemonData(pokemon.name);
      }),
    );
    return pokemonList.filter(
      (pokemon): pokemon is Pokemon => pokemon !== null,
    );
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return [];
  }
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  
  useEffect(() => {
    fetchAllPokemon().then((data) => {
      setAllPokemon(data);
      setPokemonData(data);
    });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredPokemon = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchTerm),
      );
      setPokemonData(filteredPokemon);
    } else {
      setPokemonData(allPokemon);
    }
  }, [searchTerm, allPokemon]);

  function capitalize(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  const sortedPokemonData = pokemonData.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-white">Poke Search</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid h-full w-full grid-cols-4 place-items-center gap-4 overflow-auto rounded-lg bg-black/10 p-12">
        {sortedPokemonData.map((pokemon, index) => (
          <CardModal
            name={capitalize(pokemon.name)}
            type={pokemon.types.map((type) => type.type.name).join(", ")}
            bgUrl={pokemon.sprites.front_default}
            key={index}
            onOpenModal={() => handleOpenModal(pokemon)}
          />
        ))}
      </div>
      {selectedPokemon && (
        <Modal
          name={selectedPokemon.name}
          type={selectedPokemon.types.map((type) => type.type.name).join(", ")}
          characterPic={selectedPokemon.sprites.front_default}
          isOpen={!!selectedPokemon}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
