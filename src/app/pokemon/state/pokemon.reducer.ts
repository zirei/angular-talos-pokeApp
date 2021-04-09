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
  isFetching: boolean;
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
  isFetching: false,
  showSelected: false,
  keepSelected: false,
  scrollCounter: 0,
  search_bar: '',
  error: '',
};

// Selector functions
const getPokemonFeatureState = createFeatureSelector<PokemonState>(
  'rootPokemonList'
);
const getSelectedPokemonFeatureState = createFeatureSelector<PokemonState>(
  'selectedPokemons'
);

export const getPokemons = createSelector(
  getPokemonFeatureState,
  state => state.rootPokemonList
);

export const getSelectedPokemons = createSelector(
  getSelectedPokemonFeatureState,
  state => state.selectedPokemons
);

export const pokemonReducer = createReducer<PokemonState>(
  initialState,
  on(
    PokemonActions.loadPokemonsSuccess,
    (state, action): PokemonState => {
      return {
        ...state,
        rootPokemonList: [
          ...state.rootPokemonList,
          ...action.pokemons,
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
    PokemonActions.setPokemonsModalView,
    (state): PokemonState => {
      return {
        ...state,
        showSelected: !state.showSelected
    };
    }
  ),
);
