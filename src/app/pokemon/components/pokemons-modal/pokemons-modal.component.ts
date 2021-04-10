import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { environment } from 'src/environments/environment';
import {
  State,
  getPokemons,
  getSelectedPokemons,
  getKeepSelected,
  PokemonState,
} from '../../state/pokemon.reducer';
import * as PokemonActions from '../../state/pokemon.actions';
// import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemons-modal',
  templateUrl: './pokemons-modal.component.html',
  styleUrls: ['./pokemons-modal.component.css'],
})
export class PokemonsModalComponent implements OnInit, OnDestroy {
  @Input() pokemon: any;
  name: string = '';
  url: string = '';
  image: string = '';
  keepSelected: boolean = false;
  showSelected: boolean = true;
  selectedPokemons2: PokemonState | undefined;
  description: string = '';
  selectedPokemons: Pokemon[] = [];
  poke$: Observable<any> | undefined;

  constructor(private store: Store<State>) {
    this.poke$ = this.store.select(state => state.pokemons);
  }
  // constructor(private _snackBar: MatSnackBar) {}
  // openToast() {
  //   this._snackBar.openFromComponent(PokemonsModalComponent, {
  //   });
  // }
  ngOnInit(): void {
    this.getSelectedPokemonsFromStore();
    console.log('cargo en modal****************');
  }

  pokemonDescriptionUrl = (url: string) => {
    return `${environment.POKEMONDATAAPI}pokemon-species/${url.split('/')[6]}/`
  }
  getSelectedPokemonsFromStore() {
    this.store.select(getSelectedPokemons).subscribe(
      pokemon => {
        if (pokemon) {
          this.selectedPokemons.push(...pokemon)
          this.image = `${environment.POKEMONIMAGEAPI}${this.selectedPokemons[0].url.split('/')[6]}.png`
          console.log('selectedPokemons:', this.selectedPokemons, 'Pokemons: ', pokemon)
        }
      }
    )
  }
  
  getKeepSelectedFromStore() {
    this.store.select(getKeepSelected).subscribe(
      pokemon => {
        if (pokemon) {
          this.keepSelected=pokemon.keepSelected
          console.log('keepSelected store:', pokemon.keepSelected, 'keepSelected new valor: ', pokemon)
          console.log('array2: ', pokemon.selectedPokemons)
        }
      }
    )
  }

  ngOnDestroy(): void {
    console.log(this.keepSelected)
    if (!this.keepSelected) {
      console.log('destroy selected pokemon', this.selectedPokemons );
      this.store.dispatch(PokemonActions.unSelectedPokemons());
      console.log('Unselected pokemon', this.selectedPokemons);
    }
  }
}
