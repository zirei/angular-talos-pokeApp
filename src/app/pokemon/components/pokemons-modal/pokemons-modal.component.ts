import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
import { tap } from 'rxjs/operators';
import { PokemonData } from 'src/app/core/models/pokemon-data.model';


@Component({
  selector: 'app-pokemons-modal',
  templateUrl: './pokemons-modal.component.html',
  styleUrls: ['./pokemons-modal.component.css'],
})
export class PokemonsModalComponent implements OnInit, OnDestroy {
  // @Input() pokemon: any;
  // pokemones$: Observable<any>;
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

  ngOnChange() {

  }

  getSelectedPokemonsFromStore() {
    this.store.select(getPokemonsInfo).subscribe((pokemon) => {
      if (pokemon) {
        this.descriptionPokemons = pokemon.descriptionPokemons;
        this.descriptionPokemonsGender = pokemon.descriptionPokemonsGender;
        console.log('pokeINfo', this.descriptionPokemons[0]);
        console.log('pokeINfoGender', this.descriptionPokemonsGender[0]);
      }
    });
    this.store.select(getSelectedPokemons).subscribe((selectedPokemons) => {
      if (selectedPokemons) {
        this.selectedPokemons = selectedPokemons;
        this.image = `${environment.POKEMONIMAGEAPI}${
          this.selectedPokemons[0].url.split('/')[6]
        }.png`;
        console.log('selectPomenosModal', this.selectedPokemons[0])
      }
    });
  }

  // TODO: implement favs
  setFavs() {
    if (this.favoriteSelected) {
      console.log('remove favs');
      // this.store.dispatch(PokemonActions.unselectedFavorite(this.selectedPokemons[0]));
    } else {
      console.log('Add favs');
      // this.store.select(getFavoritePokemon).subscribe((pokemon) => {
      //   if (pokemon) {
      //     this.store.dispatch(PokemonActions.selectedFavorite(pokemon));
      //   }
      // }
    }
  }

  getKeepSelectedFromStore() {
    this.store.dispatch(PokemonActions.keepSelectedPokemons());
    this.store.select(getPokemonsInfo).subscribe((pokemon) => {
      if (pokemon) {
        this.keepSelected = pokemon.keepSelected;
        console.log(
          'keepSelected store:',
          pokemon.keepSelected,
          'keepSelected new valor: ',
          pokemon
        );
        console.log('array2: ', pokemon.selectedPokemons);
      }
    });
  }

  ngOnDestroy(): void {
    console.log(this.keepSelected);
    if (!this.keepSelected) {
      console.log('destroy selected pokemon', this.selectedPokemons);
      this.store.dispatch(PokemonActions.unSelectedPokemons());
      this.store.dispatch(PokemonActions.unloadPokemonsDescription());
      console.log('Unselected pokemon', this.selectedPokemons);
    }
    console.log('Cerrando modal pokemon', this.selectedPokemons);
  }
}
