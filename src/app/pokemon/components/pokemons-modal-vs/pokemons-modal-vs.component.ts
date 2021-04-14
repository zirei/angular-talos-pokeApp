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
  pokemonReducer,
} from '../../state/pokemon.reducer';
import * as PokemonActions from '../../state/pokemon.actions';
import { state } from '@angular/animations';
import { first, map, tap } from 'rxjs/operators';
// import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemons-modal-vs',
  templateUrl: './pokemons-modal-vs.component.html',
  styleUrls: ['./pokemons-modal-vs.component.css'],
})
export class PokemonsModalVsComponent implements OnInit {
  constructor(private store: Store<State>) {}

  selectedPokemons: Pokemon[] = [];
  image: string = '';
  image2: string = '';
  descriptionPokemons: any[] = [];
  descriptionPokemonsGender: any[] = [];

  ngOnInit(): void {
    this.getSelectedPokemonsFromStore();
  }

  ConvertGender(gender_rate:number){
    let default_gender = 'male'
    if (gender_rate >= 4) {
      return default_gender = 'female'
    } else if (gender_rate === -1) {
      return default_gender = 'genderless'
    } else {
      return default_gender
    }
  }
  getSelectedPokemonsFromStore() {
    this.store.select(getPokemonsInfo).pipe(
      map((pokemon) => {
        if (pokemon) {
          this.descriptionPokemons = pokemon.descriptionPokemons;
          this.descriptionPokemonsGender = pokemon.descriptionPokemonsGender;
        }
      })
    ).subscribe();
    this.store.select(getSelectedPokemons)
    .pipe(
      first(),
      map((selectedPokemons) => {
        if (selectedPokemons) {
          this.selectedPokemons = selectedPokemons;
          this.image = `${environment.POKEMONIMAGEAPI}${this.selectedPokemons[0].url.split('/')[6]}.png`;
          this.image2 = `${environment.POKEMONIMAGEAPI}${this.selectedPokemons[1].url.split('/')[6]}.png`;
        }
      })
    ).subscribe(); 
  }

  ngOnDestroy(): void {
    this.store.dispatch(PokemonActions.unSelectedPokemons());
    this.store.dispatch(PokemonActions.unloadPokemonsDescription());
  }
}
