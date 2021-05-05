/* NgRx */
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { getPokemonId, Pokemon } from 'src/app/core/models/pokemon.model';
import * as PokemonActions from './pokemon.actions';
import * as AppState from '../../state/app.state.module';
import { act, Actions } from '@ngrx/effects';
import { PokemonData } from 'src/app/core/models/pokemon-data.model';
import { environment } from 'src/environments/environment';
import { PokemonDataGender } from 'src/app/core/models/pokemon-data-gender.model';

export interface State extends AppState.State {
  pokemons: PokemonState;
}

export interface PokemonState {
  rootPokemonList: Pokemon[];
  queriedPokemons: Pokemon[];
  selectedPokemons: Pokemon[];
  favoritePokemons: Pokemon[];
  descriptionPokemons: PokemonData[];
  descriptionPokemonsGender: PokemonDataGender[];
  maxFavoritesSelected: boolean;
  isSearching: boolean;
  showSelected: boolean;
  keepSelected: boolean;
  scrollCounter: number;
  search_bar: string;
  error: string;
  maxFavoritesSelectedName: string;
}

const initialState: PokemonState = {
  rootPokemonList: [],
  queriedPokemons: [],
  selectedPokemons: [],
  favoritePokemons: [
    {
      name: 'bulbasaur',
      url: `${environment.POKEMONDATAAPI}pokemon/1/`,
      id: 1
    },
    {
      name: 'charmander',
      url: `${environment.POKEMONDATAAPI}pokemon/4/`,
      id: 4
    },
    {
      name: 'squirtle',
      url: `${environment.POKEMONDATAAPI}pokemon/7/`,
      id: 7
    },
  ],
  descriptionPokemons: [],
  descriptionPokemonsGender: [],
  maxFavoritesSelected: false,
  isSearching: false,
  showSelected: false,
  keepSelected: false,
  scrollCounter: 0,
  search_bar: '',
  error: '',
  maxFavoritesSelectedName: '',
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
// queried Pokemon List
export const getPokemonsQuery = createSelector(
  getPokemonFeatureState,
  state => state.queriedPokemons
);

// Selected pokemons
export const getSelectedPokemons = createSelector(
  getPokemonFeatureState,
  state => state.selectedPokemons
);
// state info
export const getIsSearching = createSelector(
  getPokemonFeatureState,
  state => state.isSearching
);
// state info
export const getPokemonsInfo = createSelector(
  getPokemonFeatureState,
  state => state
);
// state Gender
export const getPokemonsGender = createSelector(
  getPokemonFeatureState,
  state => state.descriptionPokemonsGender
);
// state Description
export const getPokemonsDescription = createSelector(
  getPokemonFeatureState,
  state => state.descriptionPokemons
);
// keep selected
export const getkeepSelected = createSelector(
  getPokemonFeatureState,
  state => state.keepSelected
);
// keep selected
export const getMaxFav = createSelector(
  getPokemonFeatureState,
  state => state.maxFavoritesSelected
);
// Favorite info
export const getFavoritePokemon = createSelector(
  getPokemonFeatureState,
  state => state.favoritePokemons
);



export const pokemonReducer = createReducer<PokemonState>(
  initialState,
  on(PokemonActions.queryPokemon, (state, action):PokemonState => {
    return {
      ...state,
      queriedPokemons: state.rootPokemonList.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(action.query.toLocaleLowerCase())),
      search_bar:action.query,
      isSearching: true,
    };
  }),
  on(PokemonActions.unqueryPokemon, (state):PokemonState =>{
    return {
      ...state,
      isSearching: false,
    };
  }),
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
        favoritePokemons: [
          ...state.favoritePokemons,
          action.pokemon
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
        favoritePokemons: state.favoritePokemons.filter(pokemon => pokemon.id !== action.pokemon.id)
    };
    }
  ),
  on(
    PokemonActions.maximumNumberOfFavoritesSelected,
    (state,action): PokemonState => {
      return {
        ...state,
        maxFavoritesSelected: true,
        maxFavoritesSelectedName: action.maxFavName,
      };
    }
  ),
  on(
    PokemonActions.maximumNumberOfFavoritesUnSelected,
    (state): PokemonState => {
      return {
        ...state,
        maxFavoritesSelected: false,
        maxFavoritesSelectedName: ''
      };
    }
  ),
  on(
    PokemonActions.loadPokemonsDescriptionSuccess,
    (state, action ): PokemonState => {
      const updatedPokemon = state.selectedPokemons.map(
        data => action.pokemonData.id === data.id ? action.pokemonData : data);
      return {
        ...state,
        descriptionPokemons:[
          ...state.descriptionPokemons,
          action.pokemonData
        ]
      };
    }
  ),
  on(
    PokemonActions.loadPokemonsDescriptionFailure,
    (state, action): PokemonState => {
      return {
        ...state,
        descriptionPokemons: [],
        error: action.error,
      };
    }
  ),
  on(
    PokemonActions.loadPokemonsDescriptionGenderSuccess,
    (state, action): PokemonState => {
      const updatedPokemon = state.selectedPokemons.map(
        data => action.pokemonDataGender.id === data.id ? action.pokemonDataGender : data);
      return {
        ...state,
        descriptionPokemonsGender:[
          ...state.descriptionPokemonsGender,
          action.pokemonDataGender
        ]
      };
    }
  ),
  on(
    PokemonActions.loadPokemonsDescriptionGenderFailure,
    (state, action): PokemonState => {
      return {
        ...state,
        descriptionPokemonsGender: [],
        error: action.error,
      };
    }
  ),
  on(
    PokemonActions.unloadPokemonsDescription,
    (state): PokemonState => {
      return {
        ...state,
        descriptionPokemons: [],
        descriptionPokemonsGender: [],
        error: '',
      };
    }
  ),
);
