import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon = { name: '', url: '', id: 0};

}
