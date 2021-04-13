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
import { tap } from 'rxjs/operators';
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
        console.log('modal', this.selectedPokemons);

        this.image = `${environment.POKEMONIMAGEAPI}${
          this.selectedPokemons[0].url.split('/')[6]
        }.png`;
        this.image2 = `${environment.POKEMONIMAGEAPI}${
          this.selectedPokemons[1].url.split('/')[6]
        }.png`;
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(PokemonActions.unSelectedPokemons());
    this.store.dispatch(PokemonActions.unloadPokemonsDescription());
  }
}
