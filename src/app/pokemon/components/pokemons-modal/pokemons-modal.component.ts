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
  getkeepSelected,
  getMaxFav,
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
  showSelected: boolean = false;
  showSelectedFavoriteButtonRed: boolean = false;
  favoriteSelected: boolean = false;
  maxFavoritesSelected: boolean = false;
  selectedPokemons2: PokemonState | undefined;
  description: string = '';
  selectedPokemons: Pokemon[] = [];
  descriptionPokemons: any[] = [];
  descriptionPokemonsGender: any[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.getSelectedPokemonsFromStore();
    this.getFavs(this.selectedPokemons);
  }

  // ConvertGender(genderRate: number) {
  //   let defaultGender = 'male';
  //   if (genderRate >= 4) {
  //     return (defaultGender = 'female');
  //   } else if (genderRate === -1) {
  //     return (defaultGender = 'genderless');
  //   } else {
  //     return defaultGender;
  //   }
  // }

  getSelectedPokemonsFromStore() {
    // this.store
    //   .select(getPokemonsInfo)
    //   .pipe(
    //     map((pokemon) => {
    //       if (pokemon) {
    //         this.descriptionPokemons = pokemon.descriptionPokemons;
    //         this.descriptionPokemonsGender = pokemon.descriptionPokemonsGender;
    //       }
    //     })
    //   )
    //   .toPromise();
    this.store.select(getPokemonsInfo).subscribe((pokemons) => {
      if (pokemons) {
        this.descriptionPokemons = pokemons.descriptionPokemons;
        this.descriptionPokemonsGender = pokemons.descriptionPokemonsGender;
      }
    });
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
      .toPromise();
  }

  setFavs(selectedPokemons: any) {
    this.getFavoriteFromStore(selectedPokemons[0]);
  }

  getFavs(pokemon: any) {
    this.store
      .select(getFavoritePokemon)
      .pipe(
        first(),
        map((favoritePokemon) => {
          if (favoritePokemon.length < 1) {
            this.showSelectedFavoriteButtonRed = false;
          }
          let inFavorites = favoritePokemon.find(
            (item) => item.id === pokemon[0].id
          );
          if (inFavorites) {
            this.showSelectedFavoriteButtonRed = true;
          } else {
            this.showSelectedFavoriteButtonRed = false;
          }
        })
      )
      .toPromise();
  }

  getFavoriteFromStore(pokemon: Pokemon) {
    this.store
      .select(getFavoritePokemon)
      .pipe(
        first(),
        map((favorites) => {
          if (favorites.length < 1) {
            this.showSelectedFavoriteButtonRed = true;
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
            this.showSelectedFavoriteButtonRed = false;
            this.favoriteSelected = true;
          } else if (favorites.length > 4) {
            const maxFavName = pokemon.name;
            this.store.dispatch(
              PokemonActions.maximumNumberOfFavoritesSelected({ maxFavName })
            );
            alert(
              `You have selected to: ${favorites.map((item) =>
                item.name.toLocaleUpperCase()
              )}. You can only have five favorite pokemons, that's why you can't add to ${maxFavName.toLocaleUpperCase()}`
            );
          } else {
            this.store.dispatch(
              PokemonActions.selectedFavorite({ pokemon: pokemon })
            );
            this.store.dispatch(
              PokemonActions.maximumNumberOfFavoritesUnSelected()
            );
            this.favoriteSelected = false;
            this.showSelectedFavoriteButtonRed = true;
          }
        })
      )
      .toPromise()
  }

  getKeepSelectedFromStore() {
    this.store
      .select(getPokemonsInfo)
      .pipe(
        first(),
        map((pokemon) => {
          if (pokemon) {
            this.keepSelected = pokemon.keepSelected;
            if (this.keepSelected === true) {
              this.store.dispatch(
                PokemonActions.maximumNumberOfFavoritesUnSelected()
              );
              console.log(pokemon)
              this.maxFavoritesSelected = pokemon.maxFavoritesSelected;
            }
          }
        })
      )
      .toPromise();
  }

  ngOnDestroy(): void {
    if (!this.keepSelected) {
      this.store.dispatch(PokemonActions.unSelectedPokemons());
      this.store.dispatch(PokemonActions.unloadPokemonsDescription());
    }
  }
}
