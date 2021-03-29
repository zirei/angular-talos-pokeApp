import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonDataService } from 'src/app/core/services/pokemon/pokemon-data.service';

@Component({
  selector: 'app-pokemon-gallery',
  templateUrl: './pokemon-gallery.component.html',
  styleUrls: ['./pokemon-gallery.component.css']
})
export class PokemonGalleryComponent implements OnInit {

  errorMessage = '';
  sub!: Subscription;
  pokemonsList: any = [];
  showModal:boolean =false;

  constructor(private PokemonDataService: PokemonDataService) { }

  ngOnInit(): void {
    this.getPokemonsData();
    console.log('Lista de pokemones', this.pokemonsList)
  }

  getPokemonsData() {
    this.sub = this.PokemonDataService.getPokemonsData().subscribe({
      next: pokemonsList => {
        this.pokemonsList = pokemonsList;
      },
      error: err => this.errorMessage = err
    });
  }
  receiveMessage($event: boolean) {
    this.showModal = $event
  }
  

}
