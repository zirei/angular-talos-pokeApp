import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonGalleryComponent } from './components/pokemon-gallery/pokemon-gallery.component';
import { SharedModule } from '../shared/shared.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonsModalComponent } from './components/pokemons-modal/pokemons-modal.component';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from './state/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './state/pokemon.effects';
import { PokemonToastComponent } from './components/pokemon-toast/pokemon-toast.component';

@NgModule({
  declarations: [ 
    PokemonCardComponent,
    PokemonGalleryComponent,
    PokemonsModalComponent,
    PokemonToastComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    PokemonRoutingModule,
    MaterialModule,
    StoreModule.forFeature('pokemons', pokemonReducer),
    EffectsModule.forFeature([PokemonEffects]),
  ]
})
export class PokemonModule { }
