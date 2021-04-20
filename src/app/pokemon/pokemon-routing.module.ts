import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonGalleryComponent } from './components/pokemon-gallery/pokemon-gallery.component';

const routes: Routes = [{
  path: '',
  component: PokemonGalleryComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PokemonRoutingModule { }