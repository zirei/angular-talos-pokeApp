import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsModalComponent } from './pokemons-modal.component';

describe('PokemonsModalComponent', () => {
  let component: PokemonsModalComponent;
  let fixture: ComponentFixture<PokemonsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
