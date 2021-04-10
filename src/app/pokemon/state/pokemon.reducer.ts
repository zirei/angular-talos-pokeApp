/* NgRx */
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import * as PokemonActions from './pokemon.actions';
import * as AppState from '../../state/app.state.module';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  pokemons: PokemonState;
}

// State for this feature (Product)
export interface PokemonState {
  rootPokemonList: Pokemon[];
  pokemonsList: Pokemon[];
  selectedPokemons: Pokemon[];
  // isFetching: boolean;
  showSelected: boolean;
  keepSelected: boolean;
  scrollCounter: number;
  search_bar: string;
  error: string;
}

const initialState: PokemonState = {
  rootPokemonList: [],
  pokemonsList: [],
  selectedPokemons: [],
  // isFetching: false,
  showSelected: false,
  keepSelected: false,
  scrollCounter: 0,
  search_bar: '',
  error: '',
};

// Selector functions
const getPokemonFeatureState = createFeatureSelector<PokemonState>(
  'pokemons'
);
const getSelectedPokemonFeatureState = createFeatureSelector<PokemonState>(
  'pokemons'
);

export const getPokemons = createSelector(
  getPokemonFeatureState,
  state => state.rootPokemonList
);

export const getSelectedPokemons = createSelector(
  getSelectedPokemonFeatureState,
  state => state.selectedPokemons
);
// export const getSelectedPokemons = createSelector(
//   getSelectedPokemonFeatureState,
//   getCurrentProductId,
//   (state, currentProductId) => {
//     if (currentProductId === 0) {
//       return {
//         id: 0,
//         productName: '',
//         productCode: 'New',
//         description: '',
//         starRating: 0
//       };
//     } else {
//       return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
//     }
//   }
// );

export const pokemonReducer = createReducer<PokemonState>(
  initialState,
  on(
    PokemonActions.loadPokemonsSuccess,
    (state, action: any): PokemonState => {
      // const updatedProducts = action.pokemons.map(
      //   item =>  item);
      return {
        ...state,
        rootPokemonList: [
          ...state.rootPokemonList,
          ...action.pokemons.results,
        ],
        error: '',
      };
    }
  ),
  on(
    PokemonActions.loadPokemonsFailure,
    (state, action): PokemonState => {
      return {
        ...state,
        rootPokemonList: [],
        error: action.error
    };
    }
  ),
  on(
    PokemonActions.selectedPokemonsSuccess,
    (state, action): PokemonState => {
      return {
        ...state,
        showSelected: true,
        keepSelected: true,
        selectedPokemons: [
          ...state.selectedPokemons,
          ...action.pokemons,
        ],
        error: '',
      };
    }
  ),
  on(
    PokemonActions.unSelectedPokemons,
    (state): PokemonState => {
      return {
        ...state,
        showSelected: false,
        keepSelected: false,
        selectedPokemons: [],
    };
    }
  ),
  on(
    PokemonActions.keepSelectedPokemons,
    (state): PokemonState => {
      return {
        ...state,
        showSelected: false,
        keepSelected: true,
        selectedPokemons: [
          ...state.selectedPokemons,
        ],
    };
    }
  ),
);
