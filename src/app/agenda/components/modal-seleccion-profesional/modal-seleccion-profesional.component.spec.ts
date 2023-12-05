import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionProfesionalComponent } from './modal-seleccion-profesional.component';

describe('ModalAsignarProfesionalComponent', () => {
  let component: ModalSeleccionProfesionalComponent;
  let fixture: ComponentFixture<ModalSeleccionProfesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSeleccionProfesionalComponent]
    });
    fixture = TestBed.createComponent(ModalSeleccionProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
