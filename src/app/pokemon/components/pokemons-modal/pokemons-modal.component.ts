import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  State,
  getPokemons,
  getSelectedPokemons,
} from '../../state/pokemon.reducer';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemons-modal',
  templateUrl: './pokemons-modal.component.html',
  styleUrls: ['./pokemons-modal.component.css'],
})
export class PokemonsModalComponent implements OnInit {
  @Input() pokemon: any;
  name: string = '';
  url: string = '';
  image: string = '';
  description: string = '';
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
    this.getPokemonInfo();
    console.log('cargo en modal', this.poke$);
  }

  getPokemonInfo() {
    console.log('entro en modal', this.store);
    this.name = localStorage.getItem('pokemonName') || 'Not Found name';
    this.url = localStorage.getItem('urlPokemonImage') || 'Not Found url';
    this.image = `${environment.POKEMONIMAGEAPI}${this.url.split('/')[6]}.png`;
  }
  getSelectedPokemons(){
    // this.poke$ = this.PokemonDataService.getSelectedPokemons(); 
  }
}
