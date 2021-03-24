import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonGalleryComponent } from './components/pokemon-gallery/pokemon-gallery.component';



@NgModule({
  declarations: [PokemonCardComponent, PokemonGalleryComponent],
  imports: [
    CommonModule
  ]
})
export class PokemonModule { }
