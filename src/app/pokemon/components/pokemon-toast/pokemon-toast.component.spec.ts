import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonToastComponent } from './pokemon-toast.component';

describe('PokemonToastComponent', () => {
  let component: PokemonToastComponent;
  let fixture: ComponentFixture<PokemonToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
