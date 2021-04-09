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
import { environment } from 'src/environments/environment';


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

  
  ngOnInit(): void {
    this.loadPokemonsFromApi();
    this.getPokemonsFromApi();
    this.getPokemonsDataFromStore();
    // console.log('Lista de pokemones', this.pokemonsList);
  }

  pokemonDescriptionUrl = (url: string) => {
    return `${environment.POKEMONDATAAPI}pokemon-species/${url.split('/')[6]}/`
  }

  selectPokemon(pokemonName: string, urlPokemonImage: string) {
    const dialogRef = this.dialog.open(PokemonsModalComponent);
    // const dialogRef = this.dialog.open(PokemonsModalComponent, {
    //   width: '512px'
    // });
    const pokemonDescriptionUrl2 = this.pokemonDescriptionUrl(urlPokemonImage);
    localStorage.setItem('pokemonName', pokemonName);
    localStorage.setItem('urlPokemonImage', urlPokemonImage);
    localStorage.setItem('pokemonDescriptionUrl2', pokemonDescriptionUrl2);
    console.log('info: ' , pokemonDescriptionUrl2);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // selectPokemon(pokemon: Pokemon[]):void {
  //   const dialogRef = this.dialog.open(PokemonsModalComponent);
  //   // const dialogRef = this.dialog.open(PokemonsModalComponent, {
  //     //   width: '512px'
  //     // });
  //   this.store.dispatch(PokemonActions.selectedPokemons({pokemon}));
  //   // const pokemonDescriptionUrl2 = this.pokemonDescriptionUrl(urlPokemonImage);
  //   // localStorage.setItem('pokemonName', pokemonName);
  //   // localStorage.setItem('urlPokemonImage', urlPokemonImage);
  //   // localStorage.setItem('pokemonDescriptionUrl2', pokemonDescriptionUrl2);
  //   // console.log('info: ' , pokemonDescriptionUrl2);

  //   // dialogRef.afterClosed().subscribe((result) => {
  //   //   console.log(`Dialog result: ${result}`);
  //   // });
  
  
  getPokemonsFromApi() {
    this.PokemonDataService.getPokemonsFromApi().subscribe({
      next: (rootPokemonList: any) => {
        this.rootPokemonList = [...this.rootPokemonList, ...rootPokemonList.results];
        console.log(this.store);
      },
      error: err => this.errorMessage = err
    });
  }

  getPokemonsDataFromStore() {
    console.log('entre')
    this.store.select(getPokemons).subscribe(
      rootPokemonList => {
        if (rootPokemonList) {
          this.pokemonsList = rootPokemonList
          console.log('rootPokemonList:', this.rootPokemonList)
        }
        console.log('Dont if rootPokemonList:', this.rootPokemonList)
      }
    )
  }
  loadPokemonsFromApi(): void {
    this.store.dispatch(PokemonActions.loadPokemons())
  }
  // receiveMessage($event: boolean) {
  //   this.showModal = $event;
  // }
}
