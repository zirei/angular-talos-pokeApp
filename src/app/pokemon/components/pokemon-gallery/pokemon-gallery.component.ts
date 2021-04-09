import { Component, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { PokemonDataService } from 'src/app/core/services/pokemon/pokemon-data.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonsModalComponent } from '../pokemons-modal/pokemons-modal.component';
import { Pokemon } from 'src/app/core/models/pokemon.model';

// Redux
import { State, getPokemons, getSelectedPokemons } from '../../state/pokemon.reducer'
import * as PokemonActions from '../../state/pokemon.actions'
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-pokemon-gallery',
  templateUrl: './pokemon-gallery.component.html',
  styleUrls: ['./pokemon-gallery.component.css'],
})
export class PokemonGalleryComponent implements OnInit {
  errorMessage = '';
  rootPokemonList: Pokemon[] = [];
  pokemonsList: Pokemon[] = [];
  showModal: boolean = false;

  constructor(
    private PokemonDataService: PokemonDataService,
    private store: Store<State>,
    public dialog: MatDialog,
  ) {}

  selectPokemon() {
    const dialogRef = this.dialog.open(PokemonsModalComponent);
    // const dialogRef = this.dialog.open(PokemonsModalComponent, {
    //   width: '512px'
    // });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.getPokemonsFromApi();
    this.getPokemonsDataFromStore();
    // console.log('Lista de pokemones', this.pokemonsList);
  }

  getPokemonsFromApi() {
    this.PokemonDataService.getPokemonsFromApi().subscribe({
      next: (rootPokemonList: any) => {
        this.rootPokemonList = [...this.rootPokemonList, ...rootPokemonList.results];
        // console.log(rootPokemonList);
      },
      error: err => this.errorMessage = err
    });
  }

  getPokemonsDataFromStore() {
    this.store.select(getPokemons).subscribe(
      rootPokemonList => {
        if (rootPokemonList) {
          this.pokemonsList = rootPokemonList
          console.log('rootPokemonList:', this.rootPokemonList)
        }
      }
    )
  }
  
  // receiveMessage($event: boolean) {
  //   this.showModal = $event;
  // }
}
