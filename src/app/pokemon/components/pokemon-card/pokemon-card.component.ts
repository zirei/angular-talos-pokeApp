import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon: any;
  image: string = '';

  constructor() { }

  ngOnInit(): void {
    this.image = `${environment.POKEMONIMAGEAPI}${this.pokemon.url.split('/')[6]}.png`
  }

  

}
