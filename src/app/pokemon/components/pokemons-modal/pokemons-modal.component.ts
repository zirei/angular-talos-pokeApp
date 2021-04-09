import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private _snackBar: MatSnackBar) {}

  openToast() {
    this._snackBar.openFromComponent(PokemonsModalComponent, {
    });
  }
  ngOnInit(): void {
    this.getPokemonInfo();
  }
  getPokemonInfo() {
    this.name = localStorage.getItem('pokemonName') || 'Not Found name';
    this.url = localStorage.getItem('urlPokemonImage') || 'Not Found url';
    this.image = `${environment.POKEMONIMAGEAPI}${this.url.split('/')[6]}.png`;
  }
}
