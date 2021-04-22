import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/pokemon/state/pokemon.reducer';
import * as PokemonActions from '../../../pokemon/state/pokemon.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private _searchPokemon: string = '';

  constructor(private store: Store<State>) { }

  get searchPokemon(): string {
    return this._searchPokemon;
  }

  set searchPokemon(value: string){
    this._searchPokemon = value;
    if (this._searchPokemon === '') {
      this.store.dispatch(PokemonActions.unqueryPokemon());
    }else{
      this.store.dispatch(PokemonActions.queryPokemon({query: this._searchPokemon}));
    }
  }
}
