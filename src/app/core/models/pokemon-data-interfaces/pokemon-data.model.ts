import { SpritesPokemonData } from './sprites-pokemon-data.model';
import { MovesPokemonData } from './moves-pokemon-data.model';
import { StatsPokemonData } from './stats-pokemon-data.model';

export interface PokemonData {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MovesPokemonData[];
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites?: SpritesPokemonData;
  stats: StatsPokemonData[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}
