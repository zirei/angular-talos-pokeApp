import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonGalleryComponent } from './components/pokemon-gallery/pokemon-gallery.component';
import { SharedModule } from '../shared/shared.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonsModalComponent } from './components/pokemons-modal/pokemons-modal.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [ PokemonCardComponent, PokemonGalleryComponent, PokemonsModalComponent, PokemonsModalComponent ],
  imports: [
    CommonModule,
    SharedModule,
    PokemonRoutingModule,
    MaterialModule
  ]
})
export class PokemonModule { }
