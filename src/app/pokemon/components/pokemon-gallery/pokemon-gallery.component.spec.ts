import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonGalleryComponent } from './pokemon-gallery.component';

describe('PokemonGaleryComponent', () => {
  let component: PokemonGalleryComponent;
  let fixture: ComponentFixture<PokemonGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
