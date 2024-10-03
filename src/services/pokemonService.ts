import { PokeDetail, PokeListItem, PokeListResponse } from "@/types/types";

export async function fetchPokemonList(limit: number, offset: number) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  const data = await response.json();

  const pokemonList: PokeDetail[] = await Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return details as PokeDetail;
    }),
  );
  return pokemonList;
}
