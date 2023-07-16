import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDesplazamientoComponent } from './card-desplazamiento.component';

describe('CardDesplazamientoComponent', () => {
  let component: CardDesplazamientoComponent;
  let fixture: ComponentFixture<CardDesplazamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDesplazamientoComponent]
    });
    fixture = TestBed.createComponent(CardDesplazamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
