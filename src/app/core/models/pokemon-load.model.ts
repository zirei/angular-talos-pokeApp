import { Pokemon } from './pokemon.model';

export interface PokemonLoad {
  count: string;
  next: string;
  previous: number;
  results: Pokemon[];
}
