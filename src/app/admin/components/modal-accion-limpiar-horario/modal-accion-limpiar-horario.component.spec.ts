import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccionLimpiarHorarioComponent } from './modal-accion-limpiar-horario.component';

describe('ModalAccionLimpiarHorarioComponent', () => {
  let component: ModalAccionLimpiarHorarioComponent;
  let fixture: ComponentFixture<ModalAccionLimpiarHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAccionLimpiarHorarioComponent]
    });
    fixture = TestBed.createComponent(ModalAccionLimpiarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
