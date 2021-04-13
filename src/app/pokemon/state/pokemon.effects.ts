import { Injectable } from '@angular/core';

import {
  mergeMap,
  map,
  catchError,
  concatMap,
  tap,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonDataService } from 'src/app/core/services/pokemon/pokemon-data.service';

/* NgRx */
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as PokemonActions from './pokemon.actions';
import { getPokemonId, Pokemon } from 'src/app/core/models/pokemon.model';

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
          map((pokemons:any) => 
            {
              console.log(pokemons)
              pokemons["results"].forEach( (pokemon:any) => pokemon.id = getPokemonId(pokemon))
              return PokemonActions.loadPokemonsSuccess({ pokemons })
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
        this.PokemonDataService.getPokemonsDescriptionFromApi(action.pokemon.id).pipe(
          map((pokemonData) => 
           PokemonActions.loadPokemonsDescriptionSuccess({ pokemonData })),
          catchError((error) =>
            of(PokemonActions.loadPokemonsDescriptionFailure({ error }))
          )
        )
      )
    );
  });
  // loadPokemonsDescription$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(PokemonActions.loadPokemonsDescription),
  //     concatMap(action =>
  //       this.PokemonDataService.getPokemonsDescriptionFromApi(action.pokemons).pipe(
  //         map(pokemons => PokemonActions.loadPokemonsDescriptionSuccess({ pokemons })),
  //         catchError((error) =>
  //           of(PokemonActions.loadPokemonsDescriptionFailure({ error }))
  //         )
  //       )
  //     )
  //   );
  // });
  // loadPokemonsDescription$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(PokemonActions.loadPokemonsDescription),
  //     mergeMap(() =>
  //       this.PokemonDataService.getPokemonsDescriptionFromApi().pipe(
  //         map((pokemons) => PokemonActions.loadPokemonsDescriptionSuccess({ pokemons })),
  //         catchError((error) =>
  //           of(PokemonActions.loadPokemonsFailure({ error }))
  //         )
  //       )
  //     )
  //   );
  // });

  // loadPokemonsDescription$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(PokemonActions.loadPokemonsDescription),
  //     switchMap(() =>
  //       this.store.getState().map((pokemon) =>
  //         PokemonActions.selectedPokemonsSuccess(pokemon)
  //       )
  //     )
  //   );
  // });

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
