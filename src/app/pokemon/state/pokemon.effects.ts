import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonDataService } from 'src/app/core/services/pokemon/pokemon-data.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
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

  // selectedPokemon$ = createEffect (() => {
  //   return (

  //   );
  // });

}
