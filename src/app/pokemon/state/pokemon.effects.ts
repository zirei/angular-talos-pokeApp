import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonDataService } from 'src/app/core/services/pokemon/pokemon-data.service';

/* NgRx */
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as PokemonActions from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private PokemonDataService: PokemonDataService
  ) {}

  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      mergeMap(() =>
        this.PokemonDataService.getPokemonsFromApi().pipe(
          map((pokemons) => PokemonActions.loadPokemonsSuccess({ pokemons })),
          catchError((error) =>
            of(PokemonActions.loadPokemonsFailure({ error }))
          )
        )
      )
    );
  });

  // selectedPokemons$ = createEffect(() =>
  //   return this.actions$.pipe(
  //     ofType(PokemonActions.selectedPokemons)
  //     .switchMap(() => this.PokemonDataService.)
  //   )
  //   )

  // selectedPokemon$ = createEffect (() => {
  //   return this.actions$
  //     .pipe(
  //       ofType(PokemonActions.selectedPokemons),
  //       mergeMap(action =>
  //         this.PokemonDataService.selectedPokemonFromStore()
  //           .pipe(
  //             map(pokemons => PokemonActions.selectedPokemonsSuccess({ pokemons })),
  //             catchError(error => of(PokemonActions.selectedPokemonsFailure({ error })))
  //           )
  //       )
  //     );
  // });
  // selectedPokemon$ = createEffect (() => {
  //   return this.actions$
  //     .pipe(
  //       ofType(PokemonActions.selectedPokemons),
  //       concatMap(action =>
  //         this.PokemonDataService.selectedPokemonFromStore()
  //           .pipe(
  //             map(pokemons => PokemonActions.selectedPokemonsSuccess({ pokemons })),
  //             catchError(error => of(PokemonActions.selectedPokemonsFailure({ error })))
  //           )
  //       )
  //     );
  // });

}
