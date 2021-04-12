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
// import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private store: Store<State>) {
    // this.pokemones$ = this.store.select(state => state.pokemons.selectedPokemons);
  }
  // constructor(private _snackBar: MatSnackBar) {}
  // openToast() {
  //   this._snackBar.openFromComponent(PokemonsModalComponent, {
  //   });
  // }
  ngOnInit(): void {
    // console.log('selecciones',  this.pokemones$);
    this.getSelectedPokemonsFromStore();
  }

  ngOnChange() {
    console.log('hola mundo', this.selectedPokemons.length);
    // this.getShowModal(this.pokemon.length);
    // this.getPokemonsDescriptionFromApi();
    console.log('cargo en modal****************');
    // this.getPokemonsDescriptionFromApi(url);
  }

  // getShowModal(length: number): void {
  //   length >= 2
  //   ? this.showModalVS = true
  //   : this.showModalVS = false
  // }

  pokemonDescriptionUrl = (url: string) => {
    return `${environment.POKEMONDATAAPI}pokemon-species/${url.split('/')[6]}/`;
  };
  getPokemonsDescriptionFromApi(): void {
    // this.store.dispatch(PokemonActions.loadPokemonsDescription(this.se));
    console.log('descripcion');
    // this.getPokemonsDescriptionFromStore();
  }

  // getPokemonsDescriptionFromStore() {
  //   this.store.select(getPokemonsInfo).subscribe(
  //     pokemon => {
  //       if (pokemon) {
  //         this.image = `${environment.POKEMONIMAGEAPI}${this.selectedPokemons[0].url.split('/')[6]}.png`
  //         console.log('descripcion', pokemon)
  //         // console.log('selectedPokemons:', this.selectedPokemons, 'Pokemons: ', pokemon)
  //       }
  //     }
  //   )
  // }

  getSelectedPokemonsFromStore() {
    this.store.select(getSelectedPokemons).subscribe((pokemon) => {
      if (pokemon) {
        this.selectedPokemons.push(...pokemon);
        this.image = `${environment.POKEMONIMAGEAPI}${
          this.selectedPokemons[0].url.split('/')[6]
        }.png`;
        console.log(
          'selectedPokemons:',
          this.selectedPokemons,
          'Pokemons: ',
          pokemon
        );
      }
    });
  }
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
      console.log('Unselected pokemon', this.selectedPokemons);
    }
    console.log('Cerrando modal pokemon', this.selectedPokemons);
  }
}
