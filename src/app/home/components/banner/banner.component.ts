import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import {
  getFavoritePokemon,
  State,
} from 'src/app/pokemon/state/pokemon.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  favoritePokemons: Pokemon[] = [];
  images: string[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .select(getFavoritePokemon)
      .subscribe((favoritePokemons) => {
        this.favoritePokemons = favoritePokemons;
      });
  }

  getImage(id: number) {
    return `${environment.POKEMONIMAGEAPI}${id}.png`;
  }
}