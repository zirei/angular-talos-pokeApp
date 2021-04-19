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
import { first, map } from 'rxjs/operators';
import { ToastComponent } from '../toast/toast.component';

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
  showToast: boolean = false;
  isSearching: boolean = false;
  search_bar: string = '';
  keepSelected: boolean = false;
  maxFavoritesSelected: boolean = false;

  constructor(
    private PokemonDataService: PokemonDataService,
    private store: Store<State>,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.loadPokemonsFromApi();
  }

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
    this.store.dispatch(
      PokemonActions.loadPokemonsDescriptionGender({ pokemon })
    );
    this.store.dispatch(PokemonActions.maximumNumberOfFavoritesUnSelected());
    this.getSelectedPokemonsFromStore();
    this.openDialog(this.selectedPokemons.length);
  }
  openDialog(amountSelectedPokemons: any) {
    setTimeout(() => {
      if (amountSelectedPokemons > 1) {
        const dialogRef = this.dialog.open(PokemonsModalVsComponent, {
        });
        dialogRef.afterClosed().subscribe(() => this.getKeepSelectedFromStore());
      } else {
        this.maxFavoritesSelected = false;
        const dialogRef = this.dialog.open(PokemonsModalComponent, {
        });
        dialogRef.afterClosed().subscribe(() => this.getKeepSelectedFromStore());
      }
    }, 350);
    
  }

  getSelectedPokemonsFromStore() {
    this.store.select(getSelectedPokemons).subscribe((selectedPokemons) => {
      if (selectedPokemons) {
        this.selectedPokemons = selectedPokemons;
      }
    });
  }

  isSearchingSubscription() {
    this.store
      .select(getIsSearching)
      .pipe(
        map((isSearching: boolean) => {
          this.isSearching = isSearching;
          this.getPokemonsDataFromStore();
        })
      )
      .subscribe();
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

  openToast() {
    const snackBarRed = this._snackBar.openFromComponent(ToastComponent);
  }

  getKeepSelectedFromStore() {
    this.store
      .select(getPokemonsInfo)
      .pipe(
        first(),
        map((pokemon) => {
          if (pokemon) {
            this.keepSelected = pokemon.keepSelected;
            this.showToast= pokemon.showSelected;
            this.maxFavoritesSelected = pokemon.maxFavoritesSelected
            if (this.maxFavoritesSelected === true) {
              this.openToast()
            }
          }
        })
      )
      .subscribe();
  }
}
