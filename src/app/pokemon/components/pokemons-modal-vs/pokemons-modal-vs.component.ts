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
import { PokemonData } from 'src/app/core/models/pokemon-data.model';
import { PokemonDataGender } from 'src/app/core/models/pokemon-data-gender.model';

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
  pokemonName2: string = 'Not found name';
  descriptionPokemons: PokemonData[] = [];
  descriptionPokemonsGender: PokemonDataGender[] = [];

  ngOnInit(): void {
    this.getSelectedPokemonsFromStore();
  }
  
  getSelectedPokemonsFromStore() {
    this.store.select(getPokemonsInfo).subscribe((pokemons) => {
      if (pokemons) {
        this.descriptionPokemons = pokemons.descriptionPokemons;
        this.descriptionPokemonsGender = pokemons.descriptionPokemonsGender;
      }
    });

    this.store.select(getSelectedPokemons)
    .pipe(
      first(),
      map((selectedPokemons) => {
        if (selectedPokemons) {
          this.selectedPokemons = selectedPokemons;
          this.image = `${environment.POKEMONIMAGEAPI}${this.selectedPokemons[0].url.split('/')[6]}.png`;
          this.image2 = `${environment.POKEMONIMAGEAPI}${this.selectedPokemons[1].url.split('/')[6]}.png`;
          if(selectedPokemons[0].name === selectedPokemons[1].name){
            this.pokemonName2 = selectedPokemons[1].name +2;
          }else{
            this.pokemonName2 = selectedPokemons[1].name;
          }
        }
      })
    ).toPromise(); 
  }

  ngOnDestroy(): void {
    this.store.dispatch(PokemonActions.unSelectedPokemons());
    this.store.dispatch(PokemonActions.unloadPokemonsDescription());
  }
}
