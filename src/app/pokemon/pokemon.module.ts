import { NgModule } from '@angular/core';
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
import { PokemonsModalVsComponent } from './components/pokemons-modal-vs/pokemons-modal-vs.component';
import { ChartComponent } from './components/chart/chart.component';
import { ToastComponent } from './components/toast/toast.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartVSComponent } from './components/chart-vs/chart-vs.component';

@NgModule({
  declarations: [ 
    PokemonCardComponent,
    PokemonGalleryComponent,
    PokemonsModalComponent,
    PokemonsModalVsComponent,
    ChartComponent,
    ToastComponent,
    ChartVSComponent,
  ],
  imports: [
    SharedModule,
    PokemonRoutingModule,
    MaterialModule,
    StoreModule.forFeature('pokemons', pokemonReducer),
    EffectsModule.forFeature([PokemonEffects]),
    NgxChartsModule,
  ]
})
export class PokemonModule { }
