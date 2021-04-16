import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() descriptionPokemons: any;
  @Input() descriptionPokemonsGender: any;
  xAxisTicks: any[] = [];
  pokemonStats: any[] = [];
  pokemonName: string = '';
  pokemonColor: string = '';
  legendPosition: string = 'below';
  legend:boolean = true;
  legendTitle: string = 'nombre';
  showDataLabel: boolean = true;

  // options
  showXAxis = true
  showYAxis = true;
  colorScheme:any = {
    domain: [] = [],
  };

  constructor() {}

  ngOnInit() {
    console.log('chart info', this.descriptionPokemons);
    this.getPokemonStats(this.descriptionPokemons[0]);
    this.getPokemonNameAndColor(this.descriptionPokemonsGender[0]);
    console.log('stats', this.pokemonStats);
  }
  // function send
  getPokemonStats(pokemon: any) {
    pokemon.stats.map((state: any) => {
      this.pokemonStats.push({ name: state.stat.name, value: state.base_stat });
    });
    return this.pokemonStats;
  }
  getPokemonNameAndColor(pokemon: any) {
    console.log('revolution', pokemon.color.name);
    this.pokemonName = pokemon.name;
    this.pokemonColor = pokemon.color.name;
    this.pokemonColor === 'white'
    ? this.pokemonColor = 'rgba(255, 140, 0, 1)'
    : this.pokemonColor
    this.colorScheme.domain.push(this.pokemonColor)
    return (this.pokemonName, this.pokemonColor) ;
  }
}