// PokeList Interface

export interface PokeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeListItem[];
}

export interface PokeListItem {
  name: string;
  url: string;
  id: number;
}

// Poke Interface

interface PokeType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
interface PokeSprite {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}
interface PokeMove {
  move: {
    name: string;
    url: string;
  };
}
export interface PokeAbility {
  ability: {
    name: string;
    url: string;
  };
}
interface PokeStats {
  base_stat: number;
  stat: {
    name: string;
  };
}
export interface PokeDetail {
  is_default: boolean;
  name: string;
  url: string;
  id: number;
  weight: number;
  height: number;
  sprites: PokeSprite;
  types: PokeType[];
  abilities: PokeAbility[];
  moves: PokeMove[];
  stats: PokeStats[];
}

export interface PokeEntry {
  name: string;
  url: string;
  id: number;
}

export type Berry = {
  name: string;
  url: string;
  id: number;
  firmness: {
    name: string;
  };
};

export type Filter = {
  abilities: string[];
  types: string[];
  name: string;
};
