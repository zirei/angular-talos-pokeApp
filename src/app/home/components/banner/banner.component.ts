import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import {
  getFavoritePokemon,
  getPokemonsInfo,
  State,
} from 'src/app/pokemon/state/pokemon.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  favoritePokemons: any[] = [];
  images: string []=[];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.getFavoriteFromStore();
  }

  getImage(id: number) {
    this.images = this.favoritePokemons.map((n) => `https://picsum.photos/id/${n}/900/500`);
    console.log('ingreso de datos banner', id);
    return `${environment.POKEMONIMAGEAPI}${id}.png`;
  }

  getFavoriteFromStore() {
    console.log();
    this.store
      .select(getFavoritePokemon)
      .pipe(
        first(),
        map((favorites) => {
          console.log('sdfsd', favorites);
          if (favorites) {
            this.favoritePokemons = favorites;
          }
        })
      )
      .subscribe();
  }
}
