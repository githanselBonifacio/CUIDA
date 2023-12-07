import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccionAgregarSecuenciaComponent } from './modal-accion-agregar-secuencia.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ModalAccionAgregarSecuenciaComponent', () => {
  let component: ModalAccionAgregarSecuenciaComponent;
  let fixture: ComponentFixture<ModalAccionAgregarSecuenciaComponent>;

  const valorSemana = '2023-w49';
  const secuenciaIncompleta = {
    "secuencia": {},
    "semana": [
      new Date("2023-12-04 00:00"),
      new Date("2023-12-05 00:00"),
      new Date("2023-12-06 00:00"),
      new Date("2023-12-07 00:00"),
      new Date("2023-12-08 00:00"),
      new Date("2023-12-09 00:00"),
      new Date("2023-12-10 00:00"),
    ]

  }
  const secuencia = {
    "secuencia": {
      "nombre": "S-001",
      "descripcion": "secuencia 001",
      "itemsDiaTurno": [
        {
          "numeroDia": 0,
          "nombreDia": "Domingo",
          "horariosTurno": [
            {
              "id": 1,
              "nombre": "T1",
              "horaInicio": "06:00:00",
              "horaFin": "13:59:00",
              "colorHexReferencia": "#7FD9E1",
              "esHorarioBase": true,
              "descripcion": "mañana",
              "duracionHoras": 8
            }
          ]
        }
      ]
    },
    "semana": [
      new Date("2023-12-04 00:00"),
      new Date("2023-12-05 00:00"),
      new Date("2023-12-06 00:00"),
      new Date("2023-12-07 00:00"),
      new Date("2023-12-08 00:00"),
      new Date("2023-12-09 00:00"),
      new Date("2023-12-10 00:00"),
    ]

  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAccionAgregarSecuenciaComponent],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ToastService, useValue: {} },
        DatePipe
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalAccionAgregarSecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente modal accion agregar secuencia', () => {
    expect(component).toBeTruthy();
  });

  it('cambio en input semana', () => {
    component.semanaInput = valorSemana;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#semanaSeleccionada');
    expect(input.getAttribute("ng-reflect-model")).toBe(valorSemana)
  })

  it('validar inserción de semanas a la lista secuencias', () => {
    component.secuenciasSemana = [];
    component.semanaInput = valorSemana;
    const dias = component.extraerSemanaSecuencia();
    const validarInsercion = component.validarInsercionSemanaSecuencia(dias);
    fixture.detectChanges();
    expect(validarInsercion).toEqual(true);
  })

  it('validar inserción de semanas a la lista secuencias cuando ya esta en la lista', () => {
    component.secuenciasSemana = [];
    component.secuenciasSemana.push(secuencia)
    component.semanaInput = valorSemana;
    const dias = component.extraerSemanaSecuencia();
    const validarInsercion = component.validarInsercionSemanaSecuencia(dias);
    fixture.detectChanges();
    expect(validarInsercion).toEqual(false);
  })

  it('validar eliminacion de semanas a la lista secuencias', () => {
    component.secuenciasSemana = [];
    component.secuenciasSemana.push(secuencia);
    component.semanaInput = valorSemana;
    const dias = component.extraerSemanaSecuencia();
    const validarInsercion = component.validarInsercionSemanaSecuencia(dias);
    fixture.detectChanges();
    expect(validarInsercion).toEqual(false);
  })

  it('validar secuencias completa antes de enviar', () => {
    component.secuenciasSemana = [];
    component.secuenciasSemana.push(secuencia);
    fixture.detectChanges();
    const validacion = component.validarSecuencias();
    expect(validacion).toEqual(true);
  })

  it('validar secuencias incompleta antes de enviar', () => {
    component.secuenciasSemana = [];
    component.secuenciasSemana.push(secuenciaIncompleta);
    fixture.detectChanges();
    const validacion = component.validarSecuencias();
    expect(validacion).toEqual(false);
  })
});
