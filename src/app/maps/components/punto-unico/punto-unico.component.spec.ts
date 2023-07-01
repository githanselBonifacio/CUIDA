import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoUnicoComponent } from './punto-unico.component';

describe('PuntoUnicoComponent', () => {
  let component: PuntoUnicoComponent;
  let fixture: ComponentFixture<PuntoUnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntoUnicoComponent]
    });
    fixture = TestBed.createComponent(PuntoUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
