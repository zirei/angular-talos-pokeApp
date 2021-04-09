/* NgRx */
import { createAction, props } from '@ngrx/store';
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

export const setPokemonsModalView = createAction(
  '[Pokemon] Set Pokemons Modal View',
);

// selected
export const selectedPokemons = createAction(
  '[Pokemon] selected Success',
  props<{ pokemons: Pokemon[] }>()
);

export const unSelectedPokemons = createAction(
  '[Pokemon] selected Fail',
);

export const keepSelectedPokemons = createAction(
  '[Pokemon] keep selected pokemon'
);