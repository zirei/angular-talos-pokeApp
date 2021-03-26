import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../../models/pokemon.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  counter: Number = 0;
  private pokemonDataApi = `${environment.POKEMONDATAAPI}pokemon?offset=${this.counter}&limit=20`;

  constructor(private http: HttpClient) { }

  getPokemonsData(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonDataApi)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        // catchError(this.handleError)
      );
  }
}
