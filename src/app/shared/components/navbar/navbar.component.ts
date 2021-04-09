import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _searchPokemon: string = '';

  get searchPokemon(): string {
    return this._searchPokemon;
  }

  set searchPokemon(value: string){
    this._searchPokemon = value;
    console.log('In setter:' , value);
  }

  
  constructor() { }
  
  ngOnInit(): void {
  }

}
