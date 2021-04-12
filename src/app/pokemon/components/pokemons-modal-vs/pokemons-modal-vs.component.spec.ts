import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsModalVsComponent } from './pokemons-modal-vs.component';

describe('PokemonsModalVsComponent', () => {
  let component: PokemonsModalVsComponent;
  let fixture: ComponentFixture<PokemonsModalVsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsModalVsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsModalVsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
