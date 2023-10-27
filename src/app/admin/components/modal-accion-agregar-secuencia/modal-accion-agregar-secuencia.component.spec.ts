import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccionAgregarSecuenciaComponent } from './modal-accion-agregar-secuencia.component';

describe('ModalAccionAgregarSecuenciaComponent', () => {
  let component: ModalAccionAgregarSecuenciaComponent;
  let fixture: ComponentFixture<ModalAccionAgregarSecuenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAccionAgregarSecuenciaComponent]
    });
    fixture = TestBed.createComponent(ModalAccionAgregarSecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
