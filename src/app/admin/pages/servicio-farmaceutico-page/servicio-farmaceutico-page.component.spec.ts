import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioFarmaceuticoPageComponent } from './servicio-farmaceutico-page.component';

describe('ServicioFarmaceuticoPageComponent', () => {
  let component: ServicioFarmaceuticoPageComponent;
  let fixture: ComponentFixture<ServicioFarmaceuticoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioFarmaceuticoPageComponent]
    });
    fixture = TestBed.createComponent(ServicioFarmaceuticoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
