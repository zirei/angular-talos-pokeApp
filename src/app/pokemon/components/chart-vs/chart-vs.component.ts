import { Component, Input, OnInit } from '@angular/core';
import { PokemonDataGender } from 'src/app/core/models/pokemon-data-gender.model';
import { PokemonData } from 'src/app/core/models/pokemon-data-interfaces/pokemon-data.model';
import { StatsPokemonData } from 'src/app/core/models/pokemon-data-interfaces/stats-pokemon-data.model';
import { PokemonStatsCharts } from 'src/app/core/models/pokemon-charts-interfaces/pokemon-stats-charts.model';
import { PokemonColorCharts } from 'src/app/core/models/pokemon-charts-interfaces/pokemon-color-charts';

@Component({
  selector: 'app-chart-vs',
  templateUrl: './chart-vs.component.html',
  styleUrls: ['./chart-vs.component.css'],
})
export class ChartVSComponent implements OnInit {
  @Input() descriptionPokemons: PokemonData[] = [];
  @Input() descriptionPokemonsGender: PokemonDataGender[] = [];
  xAxisTicks: [] = [];
  pokemonStats: PokemonStatsCharts[] = [];
  firstPokemonStats: PokemonStatsCharts[] = [];
  secondPokemonStats: PokemonStatsCharts[] = [];
  pokemonName: string = '';
  pokemonColor: string = '';
  secondPokemonName: string = '';
  secondPokemonColor: string = '';

  // options
  showDataLabel: boolean = true;
  showXAxis = true;
  showYAxis = true;
  colorScheme: PokemonColorCharts = {
    domain: ([] = []),
  };

  constructor() {}

  ngOnInit() {
    this.getPokemonStats(
      this.descriptionPokemons[0],
      this.descriptionPokemons[1]
    );
    this.getPokemonsNamesAndColors(
      this.descriptionPokemonsGender[0],
      this.descriptionPokemonsGender[1]
    );
  }

  mergeStats(pokemon1: PokemonStatsCharts[], pokemon2: PokemonStatsCharts[]) {
    const size = pokemon1.length + pokemon2.length;
    let item = 0;
    for (
      let iteratorPokemonSize = 0;
      iteratorPokemonSize < size;
      iteratorPokemonSize = iteratorPokemonSize + 2
    ) {
      this.pokemonStats[iteratorPokemonSize] = pokemon1[item];
      this.pokemonStats[iteratorPokemonSize + 1] = pokemon2[item];
      item += 1;
    }
  }

  getPokemonStats(pokemon1: PokemonData, pokemon2: PokemonData) {
    const secondPokemon = pokemon2.name;
    pokemon1.stats.map((state: StatsPokemonData) => {
      this.firstPokemonStats.push({
        name: state.stat.name,
        value: state.base_stat,
      });
    });
    pokemon2.stats.map((state: StatsPokemonData) => {
      this.secondPokemonStats.push({
        name: state.stat.name + 2,
        value: state.base_stat,
      });
    });
    return this.mergeStats(this.firstPokemonStats, this.secondPokemonStats);
  }

  getPokemonsNamesAndColors(pokemon: PokemonDataGender, pokemon2: PokemonDataGender) {
    this.pokemonName = pokemon.name;
    this.pokemonColor = pokemon.color.name;
    this.secondPokemonName = pokemon2.name;
    this.secondPokemonColor = pokemon2.color.name;
    this.pokemonName === this.secondPokemonName
      ? (this.secondPokemonName = this.secondPokemonName + 2)
      : '';
    this.pokemonColor === 'white'
      ? (this.pokemonColor = 'rgba(255, 140, 0, 1)')
      : '';
    this.pokemonColor === 'yellow'
      ? (this.pokemonColor = 'rgba(255, 140, 0, 1)')
      : '';
    this.secondPokemonColor === 'white'
      ? (this.secondPokemonColor = 'rgba(255, 0, 141, 1)')
      : '';
    this.secondPokemonColor === 'yellow'
      ? (this.secondPokemonColor = 'rgba(255, 0, 141, 1)')
      : '';
    this.pokemonColor === this.secondPokemonColor
      ? (this.secondPokemonColor = 'rgba(255, 100, 183, 1)')
      : '';
    this.colorScheme.domain.push(this.pokemonColor, this.secondPokemonColor);
    return this.pokemonName, this.pokemonColor;
  }
}
