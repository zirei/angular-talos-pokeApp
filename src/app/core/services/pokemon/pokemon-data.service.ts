import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../../models/pokemon.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  counter: number = 0;
  pokemonDataApi: string = '';

  constructor(private http: HttpClient) { }

  counterChange() {
    this.pokemonDataApi = `${environment.POKEMONDATAAPI}pokemon?offset=${this.counter}&limit=20`;
    this.counter += 20;
  }

  getPokemonsFromApi(): Observable<Pokemon[]> {
    this.counterChange()
    return this.http.get<Pokemon[]>(this.pokemonDataApi)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  
  
  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
    }
}
