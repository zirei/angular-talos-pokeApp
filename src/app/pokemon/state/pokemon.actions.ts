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

// selected

// export const loadPokemonsDescription = createAction(
//   '[Pokemon] Selected Pokemon',
//   props<{ url:string }>()
// );
// export const loadPokemonsDescriptionSuccess = createAction(
//   '[Pokemon] Selected Pokemon',
//   props<{ pokemons:any }>()
// );
// export const loadPokemonsDescriptionFailure = createAction(
//   '[Pokemon] Load Fail',
//   props<{ error: string }>()
// );

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
  '[Pokemon] selected Success',
  props<{ pokemon: Pokemon }>()
);

export const unselectedFavorite = createAction(
  '[Pokemon] selected Success',
  props<{ pokemon: Pokemon }>()
);