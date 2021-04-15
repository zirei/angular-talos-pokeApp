import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from 'src/app/core/services/pokemon/pokemon-data.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonsModalComponent } from '../pokemons-modal/pokemons-modal.component';
import { Pokemon } from 'src/app/core/models/pokemon.model';

// Redux
import {
  State,
  getPokemons,
  getSelectedPokemons,
  getIsSearching,
  getPokemonsInfo,
} from '../../state/pokemon.reducer';
import * as PokemonActions from '../../state/pokemon.actions';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { PokemonsModalVsComponent } from '../pokemons-modal-vs/pokemons-modal-vs.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-gallery',
  templateUrl: './pokemon-gallery.component.html',
  styleUrls: ['./pokemon-gallery.component.css'],
})
export class PokemonGalleryComponent implements OnInit {
  errorMessage = '';
  rootPokemonList: Pokemon[] = [];
  queriedPokemons: Pokemon[] = [];
  selectedPokemons: Pokemon[] = [];
  showModal: boolean = false;
  isSearching: boolean = false;
  search_bar: string = '';

  // toast
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private PokemonDataService: PokemonDataService,
    private store: Store<State>,
    public dialog: MatDialog,
    // private _snackBar: MatSnackBar
  ) {
    this.loadPokemonsFromApi();
  }
  // TODO: launch the toast component
  // constructor(private _snackBar: MatSnackBar) {}
  // openToast() {
  //   const snackBarRed = this._snackBar.openFromComponent(ToastComponent);
  // }
  // openSnackBar() {
  //   this._snackBar.open('pokemon!!', 'x', {
  //     duration: 500,
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }

  ngOnInit(): void {
    this.getPokemonsDataFromStore();
    this.isSearchingSubscription();
  }

  pokemonDescriptionUrl = (url: string) => {
    return `${environment.POKEMONDATAAPI}pokemon-species/${url.split('/')[6]}/`;
  };

  selectPokemon(pokemon: Pokemon) {
    this.store.dispatch(PokemonActions.selectedPokemons({ pokemon }));
    this.store.dispatch(PokemonActions.loadPokemonsDescription({ pokemon }));
    this.store.dispatch(PokemonActions.loadPokemonsDescriptionGender({ pokemon }));
    // this.openToast()
    this.getSelectedPokemonsFromStore();

    setTimeout(() => {
      if (this.selectedPokemons.length > 1) {
        const dialogRef = this.dialog.open(PokemonsModalVsComponent);
      } else {
        const dialogRef = this.dialog.open(PokemonsModalComponent, {
          width: '512px'
        });
      }
    }, 300);
  }

  getSelectedPokemonsFromStore() {
    this.store.select(getSelectedPokemons).subscribe((selectedPokemons) => {
      if (selectedPokemons) {
        this.selectedPokemons = selectedPokemons;
      }
    });
  }

  isSearchingSubscription(){
    this.store.select(getIsSearching).pipe(
      map((isSearching:boolean)=> {
        this.isSearching = isSearching;
        this.getPokemonsDataFromStore();
        console.log(isSearching);
      })
    ).subscribe()
  }

  getPokemonsDataFromStore() {
    this.store.select(getPokemonsInfo).subscribe((pokemons) => {
      if (pokemons) {
        this.rootPokemonList = pokemons.rootPokemonList;
        this.queriedPokemons = pokemons.queriedPokemons;
      }
    });
  }

  loadPokemonsFromApi(): void {
    this.store.dispatch(PokemonActions.loadPokemons());
    this.getPokemonsDataFromStore();
  }
}
