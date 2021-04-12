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
} from '../../state/pokemon.reducer';
import * as PokemonActions from '../../state/pokemon.actions';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { PokemonsModalVsComponent } from '../pokemons-modal-vs/pokemons-modal-vs.component';


@Component({
  selector: 'app-pokemon-gallery',
  templateUrl: './pokemon-gallery.component.html',
  styleUrls: ['./pokemon-gallery.component.css'],
})
export class PokemonGalleryComponent implements OnInit {
  errorMessage = '';
  rootPokemonList: Pokemon[] = [];
  pokemonsList: Pokemon[] = [];
  selectedPokemons: Pokemon[] = [];
  showModal: boolean = false;

  constructor(
    private PokemonDataService: PokemonDataService,
    private store: Store<State>,
    public dialog: MatDialog
  ) {
    this.loadPokemonsFromApi();
  }

  ngOnInit(): void {
    this.getPokemonsDataFromStore();
  }

  pokemonDescriptionUrl = (url: string) => {
    return `${environment.POKEMONDATAAPI}pokemon-species/${url.split('/')[6]}/`;
  };

  selectPokemon(pokemon: Pokemon) {
    this.store.dispatch(PokemonActions.selectedPokemons({ pokemon }));
    // this.PokemonDataService.getPokemonsDescriptionFromApi(pokemon.url);
    // this.store.dispatch(PokemonActions.loadPokemonsDescription());
    
    this.getSelectedPokemonsFromStore()
    if (this.selectedPokemons.length > 1) {
      const url = this.selectedPokemons[0].url;
      const url2 = this.selectedPokemons[1].url;
      console.log('url2', url2);
      // this.store.dispatch(PokemonActions.loadPokemonsDescription({ url }));
      const dialogRef = this.dialog.open(PokemonsModalVsComponent);
    }else{
      const url = this.selectedPokemons[0].url;
      console.log('url1', url);
      // this.store.dispatch(PokemonActions.loadPokemonsDescription({ url }));
      const dialogRef = this.dialog.open(PokemonsModalComponent);
    }
    

    // const dialogRef = this.dialog.open(PokemonsModalComponent, {
    //   width: '512px'
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    // this.store.dispatch(PokemonActions.unSelectedPokemons());
    // console.log(`Modal unselected: ${result}`);
    // });
  }
  // getPokemonsDescriptionFromApi(): void {
  //   this.store.dispatch(PokemonActions.loadPokemonsDescription());
  //   console.log('descripcion')
  //   // this.getPokemonsDescriptionFromStore();
  // }
  getSelectedPokemonsFromStore() {
    this.store.select(getSelectedPokemons).subscribe((selectedPokemons) => {
      if (selectedPokemons) {
        this.selectedPokemons = selectedPokemons;
        console.log('selectedPokemons:', this.selectedPokemons);
      }
    });
  }

  getPokemonsDataFromStore() {
    this.store.select(getPokemons).subscribe((rootPokemonList) => {
      if (rootPokemonList) {
        this.rootPokemonList = rootPokemonList;
        console.log('rootPokemonList:', this.rootPokemonList);
      }
    });
  }

  loadPokemonsFromApi(): void {
    this.store.dispatch(PokemonActions.loadPokemons());
    this.getPokemonsDataFromStore();
  }
}
