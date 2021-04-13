import { PokemonData } from "./pokemon-data.model";

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  gender_rate: any;
  results: any;
}

export function getPokemonId(pokemon: Pokemon): number {
  const lastSlashInUrl = pokemon.url.lastIndexOf('/');
  const firstSlashInUrl = pokemon.url.indexOf('/', lastSlashInUrl - 4);
  const pokemonId = pokemon.url.slice(firstSlashInUrl + 1, lastSlashInUrl);

  return parseInt(pokemonId);
}
