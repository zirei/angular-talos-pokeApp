import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { getPokemonsInfo, State } from '../../state/pokemon.reducer';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit{
  @Input() pokemonName: any = 'Pizza party!!!';
  dinamic: boolean = false;
  errorMessage: string = 'You can only have five favorite pokemons';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


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
            this.dinamic = pokemon.keepSelected;
            this.openSnackBar(this.dinamic)
          }
        })
      )
      .subscribe();
  }

  openSnackBar(favoriteMessajeError: boolean) {
    if (favoriteMessajeError === true){
      this._snackBar.open(this.errorMessage, 'X', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

}
