import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVSComponent } from './chart-vs.component';

describe('ChartVSComponent', () => {
  let component: ChartVSComponent;
  let fixture: ComponentFixture<ChartVSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartVSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
