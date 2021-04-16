import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscriber } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { environment } from 'src/environments/environment';
import {
  State,
  getPokemons,
  getSelectedPokemons,
  PokemonState,
  getPokemonsInfo,
  getFavoritePokemon,
  pokemonReducer,
} from '../../state/pokemon.reducer';
import * as PokemonActions from '../../state/pokemon.actions';
import { state } from '@angular/animations';
import { first, map, tap } from 'rxjs/operators';
import { PokemonData } from 'src/app/core/models/pokemon-data.model';

@Component({
  selector: 'app-pokemons-modal',
  templateUrl: './pokemons-modal.component.html',
  styleUrls: ['./pokemons-modal.component.css'],
})
export class PokemonsModalComponent implements OnInit, OnDestroy {
  name: string = '';
  url: string = '';
  image: string = '';
  keepSelected: boolean = false;
  showSelected: boolean = true;
  showModalVS: boolean = false;
  favoriteSelected: boolean = false;
  maxFavoritesSelected: boolean = false;
  selectedPokemons2: PokemonState | undefined;
  description: string = '';
  selectedPokemons: Pokemon[] = [];
  descriptionPokemons: any[] = [];
  descriptionPokemonsGender: any[] = [];

  pokemonStats: any[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.getSelectedPokemonsFromStore();
  }

  ConvertGender(gender_rate: number) {
    let default_gender = 'male';
    if (gender_rate >= 4) {
      return (default_gender = 'female');
    } else if (gender_rate === -1) {
      return (default_gender = 'genderless');
    } else {
      return default_gender;
    }
  }

  getSelectedPokemonsFromStore() {
    this.store
      .select(getPokemonsInfo)
      .pipe(
        map((pokemon) => {
          if (pokemon) {
            this.descriptionPokemons = pokemon.descriptionPokemons;
            this.descriptionPokemonsGender = pokemon.descriptionPokemonsGender;
          }
        })
      )
      .subscribe();
    this.store
      .select(getSelectedPokemons)
      .pipe(
        first(),
        map((selectedPokemons) => {
          if (selectedPokemons) {
            this.selectedPokemons = selectedPokemons;
            this.image = `${environment.POKEMONIMAGEAPI}${
              this.selectedPokemons[0].url.split('/')[6]
            }.png`;
          }
        })
      )
      .subscribe();
  }

  setFavs(selectedPokemons: any) {
    this.getFavoriteFromStore(selectedPokemons[0]);
  }

  getFavoriteFromStore(pokemon: Pokemon) {
    this.store
      .select(getFavoritePokemon)
      .pipe(
        first(),
        map((favorites) => {
          if (favorites.length < 1) {
            return this.store.dispatch(
              PokemonActions.selectedFavorite({ pokemon: pokemon })
            );
          }
          const inFavorites = favorites.find((item) => item.id === pokemon.id);
          if (inFavorites) {
            this.store.dispatch(
              PokemonActions.unselectedFavorite({ pokemon: pokemon })
            );
            this.store.dispatch(
              PokemonActions.maximumNumberOfFavoritesUnSelected()
            );
            this.favoriteSelected = true;
          } else if (favorites.length > 4) {
            const maxFavName = pokemon.name;
            this.store.dispatch(
              PokemonActions.maximumNumberOfFavoritesSelected({ maxFavName })
            );
            alert(`You have selected to: ${favorites.map((item)=> item.name.toLocaleUpperCase(),)}. You can only have five favorite pokemons, that's why you can't add to ${maxFavName.toLocaleUpperCase()}`);
          } else {
            this.store.dispatch(
              PokemonActions.selectedFavorite({ pokemon: pokemon })
            );
            this.store.dispatch(
              PokemonActions.maximumNumberOfFavoritesUnSelected()
            );
            this.favoriteSelected = false;
          }
        })
      )
      .subscribe();
  }

  getKeepSelectedFromStore() {
    this.store.dispatch(PokemonActions.keepSelectedPokemons());
    this.store
    .select(getPokemonsInfo)
    .pipe(
      first(),
      map((pokemon) => {
        if (pokemon) {
          this.keepSelected = pokemon.keepSelected;
          if (this.keepSelected === true){
            this.store.dispatch(PokemonActions.maximumNumberOfFavoritesUnSelected());
            this.maxFavoritesSelected = pokemon.maxFavoritesSelected;
          }
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (!this.keepSelected) {
      this.store.dispatch(PokemonActions.unSelectedPokemons());
      this.store.dispatch(PokemonActions.unloadPokemonsDescription());
    }
  }
}
