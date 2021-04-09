import { Component, Input, OnInit } from '@angular/core';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokemons-modal',
  templateUrl: './pokemons-modal.component.html',
  styleUrls: ['./pokemons-modal.component.css'],
})
export class PokemonsModalComponent implements OnInit {
  @Input() pokemon: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.pokemon);
  }
}
