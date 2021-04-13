/* NgRx */
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
  State,
} from '@ngrx/store';
import { getPokemonId, Pokemon } from 'src/app/core/models/pokemon.model';
import * as PokemonActions from './pokemon.actions';
import * as AppState from '../../state/app.state.module';
import { Actions } from '@ngrx/effects';

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
  favoritePokemons: Pokemon[];
  favoriteSelected: boolean;
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
  favoritePokemons: [],
  favoriteSelected: false,
  isFetching: false,
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

// Root Pokemon List
export const getPokemons = createSelector(
  getPokemonFeatureState,
  state => state.rootPokemonList
);

// Selected pokemons
export const getSelectedPokemons = createSelector(
  getPokemonFeatureState,
  state => state.selectedPokemons
);

// state info
export const getPokemonsInfo = createSelector(
  getPokemonFeatureState,
  state => state
);

// Favorite info
export const getFavoritePokemon = createSelector(
  getPokemonFeatureState,
  state => state.favoritePokemons
);



export const pokemonReducer = createReducer<PokemonState>(
  initialState,
  on(
    PokemonActions.loadPokemonsSuccess,
    (state, action: any): PokemonState => {
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
    PokemonActions.selectedPokemons,
    (state, action): PokemonState => {
      return {
        ...state,
        showSelected: true,
        keepSelected: true,
        selectedPokemons: [
          ...state.selectedPokemons,
          action.pokemon,
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
  on(
    PokemonActions.selectedFavorite,
    (state, action): PokemonState => {
      return {
        ...state,
        favoriteSelected: true,
        favoritePokemons: [
          ...state.favoritePokemons,
          action.pokemon,
        ],
        error: '',
      };
    }
  ),
  on(
    PokemonActions.unselectedFavorite,
    (state,action): PokemonState => {
      return {
        ...state,
        favoriteSelected: false,
        favoritePokemons: [
          action.pokemon
        ],
    };
    }
  ),
  on(
    PokemonActions.loadPokemonsDescriptionSuccess,
    (state, action): PokemonState => {
      const updatedPokemon = state.selectedPokemons.map(
        data => action.pokemonData.id === data.id ? action.pokemonData : data);
      return {
        ...state,
        selectedPokemons:[
          // state.selectedPokemons
          // action.pokemonData.
          // action.results:[
          //   action.pokemonData: updatedPokemon
          ]
        // [
        //   ...state.selectedPokemons,
        //   action.pokemonData,
        // ]
      };
    }
  ),
  on(
    PokemonActions.loadPokemonsDescriptionFailure,
    (state, action): PokemonState => {
      return {
        ...state,
        selectedPokemons: [
          ...state.selectedPokemons,
        ],
        error: '',
      };
    }
  ),
);
