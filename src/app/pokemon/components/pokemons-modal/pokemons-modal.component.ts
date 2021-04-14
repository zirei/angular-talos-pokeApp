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
  selectedPokemons2: PokemonState | undefined;
  description: string = '';
  selectedPokemons: Pokemon[] = [];
  descriptionPokemons: any[] = [];
  descriptionPokemonsGender: any[] = [];

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
  // Last version
  // this.store.select(getSelectedPokemons).subscribe((selectedPokemons) => {
  //   if (selectedPokemons) {
  //     this.selectedPokemons = selectedPokemons;
  //     this.image = `${environment.POKEMONIMAGEAPI}${
  //       this.selectedPokemons[0].url.split('/')[6]
  //     }.png`;
  //     console.log('selectPomenosModal', this.selectedPokemons[0]);
  //   }
  // });
  // }

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
            this.favoriteSelected = true;
          } else if (favorites.length > 4) {
            console.log('Hay 5 o mas', favorites);
            return;
          } else {
            this.store.dispatch(
              PokemonActions.selectedFavorite({ pokemon: pokemon })
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
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    console.log(this.keepSelected);
    if (!this.keepSelected) {
      console.log('destroy selected pokemon', this.selectedPokemons);
      this.store.dispatch(PokemonActions.unSelectedPokemons());
      this.store.dispatch(PokemonActions.unloadPokemonsDescription());
      console.log('Unselected pokemon', this.selectedPokemons);
    }
    console.log('Closing modal pokemon', this.selectedPokemons);
  }
}
