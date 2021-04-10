import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  // Receive information of father component
  @Input() pokemon: any;
  image: string = '';
  // showModal: boolean = false;
  // @Output() sendShowModalToParent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.image = `${environment.POKEMONIMAGEAPI}${this.pokemon.url.split('/')[6]}.png`
  }

  // selectPokemon(){
  //   // TODO: Add modal and remove alert
  //   alert(`${this.pokemon.name} was selected`)
  //   this.showModal = !this.showModal;
  //   this.sendShowModalToParent.emit(this.showModal)
  // }
  

}
