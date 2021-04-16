import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map, take } from 'rxjs/operators';
import { getPokemonsInfo, State } from '../../state/pokemon.reducer';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as PokemonActions from '../../state/pokemon.actions';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit{
  @Input() pokemonName: any = 'Not found Pokemon';
  @Input() maxFavoritesSelected: boolean = false;
  keepSelected: boolean = false;
  errorMessage: string = "You can only have five favorite pokemons, that's why you can't add to ";
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  maxFavoritesSelectedName: string = '';

  constructor(private store: Store<State>,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(){
    this.getKeepSelectedFromStore();
  }

  getKeepSelectedFromStore() {
    this.store
      .select(getPokemonsInfo)
      .pipe(
        first(),
        map((pokemon) => {
          if (pokemon) {
            this.maxFavoritesSelected = pokemon.maxFavoritesSelected;
            this.keepSelected = pokemon.keepSelected;
            if(this.maxFavoritesSelected){
              this.maxFavoritesSelectedName = pokemon.maxFavoritesSelectedName;
              this.openSnackBar(this.maxFavoritesSelected, this.maxFavoritesSelectedName);
            }
          }
        })
      )
      .subscribe();
  }

  openSnackBar(favoriteMessajeError: boolean, maxFavoritesSelectedName: string) {
    if (favoriteMessajeError === true){
      this.errorMessage += maxFavoritesSelectedName.toLocaleUpperCase();
      this._snackBar.open(this.errorMessage, 'X', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }else{
      this.store.dispatch(PokemonActions.maximumNumberOfFavoritesUnSelected());
      this.errorMessage = "You can only have five favorite pokemons, that's why you can't add to ";
    }
  }

}