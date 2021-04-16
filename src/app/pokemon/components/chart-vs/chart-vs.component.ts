import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-vs',
  templateUrl: './chart-vs.component.html',
  styleUrls: ['./chart-vs.component.css']
})
export class ChartVSComponent implements OnInit {
  @Input() descriptionPokemons: any;
  @Input() descriptionPokemonsGender: any;
  xAxisTicks: any[] = [];
  pokemonStats: any[] = [];
  firstPokemonStats: any[] = [];
  secondPokemonStats: any[] = [];
  pokemonName: string = '';
  pokemonColor: string = '';
  secondPokemonName: string = '';
  secondPokemonColor: string = '';

  // options
  showDataLabel: boolean = true;
  showXAxis = true
  showYAxis = true;
  colorScheme:any = {
    domain: [] = [],
  };

  constructor() { }

  ngOnInit() {
    this.getPokemonStats(this.descriptionPokemons[0], this.descriptionPokemons[1]);
    this.getPokemonsNamesAndColors(this.descriptionPokemonsGender[0], this.descriptionPokemonsGender[1]);
  }

  mergeStats(pokemon1: any[], pokemon2: any[]){
    const size = pokemon1.length + pokemon2.length;
    let item = 0;
    for(let i = 0; i<size  ;i = i+2){
      this.pokemonStats[i] = pokemon1[item] ;
      this.pokemonStats[i+1] = pokemon2[item];
      item += 1 ;
    }
  }

  getPokemonStats(pokemon1: any, pokemon2: any) {
    //TODO: name + color improve the transmission of information
    // const firstPokemon = pokemon1.name
    const secondPokemon = pokemon2.name
    pokemon1.stats.map((state: any) => {
      this.firstPokemonStats.push({ name: state.stat.name, value: state.base_stat });
    });
    pokemon2.stats.map((state: any) => {
      this.secondPokemonStats.push({ name: state.stat.name +2, value: state.base_stat });
    });
    return this.mergeStats(this.firstPokemonStats,this.secondPokemonStats);
  }

  getPokemonsNamesAndColors(pokemon: any, pokemon2: any) {
    this.pokemonName = pokemon.name;
    this.pokemonColor = pokemon.color.name;
    this.secondPokemonName = pokemon2.name;
    this.secondPokemonColor = pokemon2.color.name;
    this.pokemonColor === 'white'
    ? this.pokemonColor = 'rgba(255, 140, 0, 1)'
    : this.pokemonColor
    this.secondPokemonColor === 'white'
    ? this.secondPokemonColor = 'rgba(255, 140, 0, 1)'
    : this.secondPokemonColor
    this.pokemonColor === this.secondPokemonColor
    ? this.secondPokemonColor = 'rgba(167, 246, 222, 1)'
    : ''
    this.colorScheme.domain.push(this.pokemonColor, this.secondPokemonColor);
    return (this.pokemonName, this.pokemonColor) ;
  }

}
