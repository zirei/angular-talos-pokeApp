import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonGalleryComponent } from './components/pokemon-gallery/pokemon-gallery.component';
import { SharedModule } from '../shared/shared.module';
import { PokemonRoutingModule } from './pokemon-routing.module';



@NgModule({
  declarations: [ PokemonCardComponent, PokemonGalleryComponent ],
  imports: [
    CommonModule,
    SharedModule,
    PokemonRoutingModule
  ]
})
export class PokemonModule { }
