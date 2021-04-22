/* NgRx */
import { createAction, props } from '@ngrx/store';
import { PokemonData } from 'src/app/core/models/pokemon-data.model';
import { Pokemon } from 'src/app/core/models/pokemon.model'

export const loadPokemons = createAction(
    '[Pokemon] Load',
);
  
export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Load Fail',
  props<{ error: string }>()
);

// queryPokemon Search in navigator
export const queryPokemon = createAction(
  '[Pokemon] query Pokemons',
  props<{ query: string }>()
);
export const unqueryPokemon = createAction(
  '[Pokemon] unquery Pokemons',
);


// Description Data

export const loadPokemonsDescription = createAction(
  '[Pokemon] Selected Pokemon Description',
  props<{ pokemon: Pokemon }>()
);
export const loadPokemonsDescriptionSuccess = createAction(
  '[Pokemon] Selected Pokemon Description Success',
  props<{ pokemonData: PokemonData }>()
);
export const loadPokemonsDescriptionFailure = createAction(
  '[Pokemon] Load Pokemon Description Fail',
  props<{ error: string }>()
);

// gender
export const loadPokemonsDescriptionGender = createAction(
  '[Pokemon] Selected Pokemon Gender',
  props<{ pokemon: Pokemon }>()
);
export const loadPokemonsDescriptionGenderSuccess = createAction(
  '[Pokemon] Selected Pokemon Gender Success',
  props<{ pokemonData: PokemonData }>()
);
export const loadPokemonsDescriptionGenderFailure = createAction(
  '[Pokemon] Load Pokemon Gender Fail',
  props<{ error: string }>()
);

// selected
export const selectedPokemons = createAction(
  '[Pokemon] selected Success',
  props<{ pokemon: Pokemon }>()
);
 
export const selectedPokemonsFailure = createAction(
  '[Pokemon] Load Fail',
  props<{ error: string }>()
);

export const unSelectedPokemons = createAction(
  '[Pokemon] unselected pokemon',
);

export const keepSelectedPokemons = createAction(
  '[Pokemon] keep selected pokemon'
  
);

// FAVS
export const selectedFavorite = createAction(
  '[Pokemon] selected favorite Success ',
  props<{ pokemon: Pokemon }>()
);

export const unselectedFavorite = createAction(
  '[Pokemon] selected unload favorite',
  props<{ pokemon: Pokemon }>()
);

export const unloadPokemonsDescription = createAction(
  '[Pokemon] unload pokemon Description',
);

// maxFavsMessaje
export const maximumNumberOfFavoritesSelected = createAction(
  '[Pokemon] maximum number of favorites selected ',
  props<{ maxFavName: string }>()
);

export const maximumNumberOfFavoritesUnSelected = createAction(
  '[Pokemon] maximum number of favorites unselected',
);