import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccionLimpiarHorarioComponent } from './modal-accion-limpiar-horario.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

describe('ModalAccionLimpiarHorarioComponent', () => {
  let component: ModalAccionLimpiarHorarioComponent;
  let fixture: ComponentFixture<ModalAccionLimpiarHorarioComponent>;

  const valorSemana = '2023-w49';
  const fechasSemanas = [

    new Date("2023-12-04 00:00"),
    new Date("2023-12-05 00:00"),
    new Date("2023-12-06 00:00"),
    new Date("2023-12-07 00:00"),
    new Date("2023-12-08 00:00"),
    new Date("2023-12-09 00:00"),
    new Date("2023-12-10 00:00"),

  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAccionLimpiarHorarioComponent],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ToastService, useValue: {} },
        DatePipe
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalAccionLimpiarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente modal accion limpiar horario', () => {
    expect(component).toBeTruthy();
  });

  it('cambio en input semana', () => {
    component.semanaInput = valorSemana;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#semanaSeleccionada');
    expect(input.getAttribute("ng-reflect-model")).toBe(valorSemana)
  })

  it('validar inserción de semanas a la lista secuencias', () => {
    component.fechasSemanas = [];
    component.semanaInput = valorSemana;
    const dias = component.extraerSemanaSecuencia();
    const validarInsercion = component.validarInsercionSemanaSecuencia(dias);
    fixture.detectChanges();
    expect(validarInsercion).toEqual(true);
  })

  it('validar inserción de semanas a la lista secuencias cuando ya esta en la lista', () => {
    component.fechasSemanas = [];
    component.fechasSemanas.push(fechasSemanas)
    component.semanaInput = valorSemana;
    const dias = component.extraerSemanaSecuencia();
    const validarInsercion = component.validarInsercionSemanaSecuencia(dias);
    fixture.detectChanges();
    expect(validarInsercion).toEqual(false);
  })

  it('validar eliminacion de semanas a la lista secuencias', () => {
    component.fechasSemanas = [];
    component.fechasSemanas.push(fechasSemanas);
    component.semanaInput = valorSemana;
    const dias = component.extraerSemanaSecuencia();
    const validarInsercion = component.validarInsercionSemanaSecuencia(dias);
    fixture.detectChanges();
    expect(validarInsercion).toEqual(false);
  })

});
