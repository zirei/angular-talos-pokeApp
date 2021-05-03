import { Injectable } from '@angular/core';
import {
  mergeMap,
  map,
  catchError,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonDataService } from 'src/app/core/services/pokemon/pokemon-data.service';

/* NgRx */
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as PokemonActions from './pokemon.actions';
import { getPokemonId, Pokemon } from 'src/app/core/models/pokemon.model';
import { PokemonLoad } from 'src/app/core/models/pokemon-load.model';

@Injectable()
export class PokemonEffects {
  store: any;
  constructor(
    private actions$: Actions,
    private PokemonDataService: PokemonDataService
  ) {}

  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      mergeMap(() =>
        this.PokemonDataService.getPokemonsFromApi().pipe(
          map((pokemons: PokemonLoad) => 
            {
              pokemons['results'].forEach( (pokemon:Pokemon) => pokemon.id = getPokemonId(pokemon))
              return PokemonActions.loadPokemonsSuccess({ pokemons: pokemons.results })
            }
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonsFailure({ error }))
          )
        )
      )
    );
  });

  loadPokemonsDescription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemonsDescription),
      switchMap((action) =>
        this.PokemonDataService.getPokemonsDescriptionFromApi(action.pokemon.url).pipe(
          map((pokemonData) => 
           PokemonActions.loadPokemonsDescriptionSuccess({ pokemonData })),
          catchError((error) =>
            of(PokemonActions.loadPokemonsDescriptionFailure({ error }))
          )
        )
      )
    );
  });

  loadPokemonsDescriptionGender$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemonsDescriptionGender),
      switchMap((action) =>
        this.PokemonDataService.getPokemonsDescriptionGenderFromApi(action.pokemon.id).pipe(
          map((pokemonData) => {
            return PokemonActions.loadPokemonsDescriptionGenderSuccess({ pokemonData })
          },
          catchError((error) =>
            of(PokemonActions.loadPokemonsDescriptionGenderFailure({ error }))
          )
        )
      )
    )
  )});
}
