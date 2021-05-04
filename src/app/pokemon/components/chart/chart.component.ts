import { Component, Input, OnInit } from '@angular/core';
import { PokemonDataGender } from 'src/app/core/models/pokemon-data-gender.model';
import { PokemonData } from 'src/app/core/models/pokemon-data.model';
import { Pokemon } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() descriptionPokemons: PokemonData[] = [];
  @Input() descriptionPokemonsGender: PokemonDataGender[] = [];
  xAxisTicks: any[] = [];
  pokemonStats: any[] = [];
  pokemonName: string = '';
  pokemonColor: string = '';
  showDataLabel: boolean = true;

  // options
  showXAxis = true
  showYAxis = true;
  colorScheme: any = {
    domain: [] = [],
  };

  constructor(
  ) {}

  ngOnInit() {
    this.getPokemonStats(this.descriptionPokemons[0]);
    this.getPokemonNameAndColor(this.descriptionPokemonsGender[0]);
  }

  getPokemonStats(pokemon: any) {
    pokemon.stats.map((state: any) => {
      this.pokemonStats.push({ name: state.stat.name, value: state.base_stat });
    });
    return this.pokemonStats;
  }

  getPokemonNameAndColor(pokemon: any) {
    this.pokemonName = pokemon.name;
    this.pokemonColor = pokemon.color.name;
    this.pokemonColor === 'white'
    ? this.pokemonColor = 'rgba(255, 140, 0, 1)'
    : ''
    this.pokemonColor === 'yellow'
    ? this.pokemonColor = 'rgba(255, 140, 0, 1)'
    : ''
    this.colorScheme.domain.push(this.pokemonColor)
    return (this.pokemonName, this.pokemonColor) ;
  }
}