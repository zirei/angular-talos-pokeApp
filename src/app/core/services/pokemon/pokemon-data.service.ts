import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../../models/pokemon.model';
import { catchError, map, tap } from 'rxjs/operators';
import { PokemonData } from '../../models/pokemon-data.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  counter: number = 0;
  pokemonDataApi: string = '';
  pokemonDescriptionUrl: string = '';

  constructor(private http: HttpClient) {}

  counterChange() {
    this.pokemonDataApi = `${environment.POKEMONDATAAPI}pokemon?offset=${this.counter}&limit=20`;
    this.counter += 20;
  }

  getPokemonsFromApi(): Observable<Pokemon[]> {
    this.counterChange();
    return this.http.get<Pokemon[]>(this.pokemonDataApi).pipe(
      catchError(this.handleError)
    );
  }

  getPokemonsDescriptionFromApi(url: string): Observable<PokemonData> {
    return this.http.get<PokemonData>(url).pipe(
      catchError(this.handleError)
    );
  }
  
  getPokemonsDescriptionGenderFromApi(id: number): Observable<any> {
    const pokemonDescriptionUrl = `${environment.POKEMONDATAAPI}pokemon-species/${id}/`;
    return this.http.get<any>(pokemonDescriptionUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(kindOfError: string) {
    console.error('error caught in service' + kindOfError);
    return throwError(kindOfError);
  }
}