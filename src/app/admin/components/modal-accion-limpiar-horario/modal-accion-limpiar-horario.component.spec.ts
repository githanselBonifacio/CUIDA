import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccionLimpiarHorarioComponent } from './modal-accion-limpiar-horario.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { profesionalesDataTest } from 'src/assets/files/test/personal';

describe('ModalAccionLimpiarHorarioComponent', () => {
  let component: ModalAccionLimpiarHorarioComponent;
  let fixture: ComponentFixture<ModalAccionLimpiarHorarioComponent>;

  const valorSemana = '2023-w49';
  const diasW49 = [

    new Date("2023-12-04 00:00"),
    new Date("2023-12-05 00:00"),
    new Date("2023-12-06 00:00"),
    new Date("2023-12-07 00:00"),
    new Date("2023-12-08 00:00"),
    new Date("2023-12-09 00:00"),
    new Date("2023-12-10 00:00"),

  ];
  const matDialogRefMock = {
    close: () => of("resp"),
  }
  const toastServiceMock = {
    mostrarToast: (): Observable<any> => of(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAccionLimpiarHorarioComponent],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ToastService, useValue: toastServiceMock },
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
    component.fechasSemanas.push(diasW49)
    component.semanaInput = valorSemana;
    const dias = component.extraerSemanaSecuencia();
    const validarInsercion = component.validarInsercionSemanaSecuencia(dias);
    fixture.detectChanges();
    expect(validarInsercion).toEqual(false);
  })

  it('validar eliminacion de semanas a la lista secuencias', () => {
    component.fechasSemanas = [];
    component.fechasSemanas.push(diasW49);
    component.semanaInput = valorSemana;
    const dias = component.extraerSemanaSecuencia();
    const validarInsercion = component.validarInsercionSemanaSecuencia(dias);
    fixture.detectChanges();
    expect(validarInsercion).toEqual(false);
  })

  it('agregar fecha a secuencia', () => {
    var fixtureAgregar = TestBed.createComponent(ModalAccionLimpiarHorarioComponent);
    var componentAgregar = fixtureAgregar.componentInstance;
    componentAgregar.semanaInput = valorSemana;
    const diasExtraidos = componentAgregar.extraerSemanaSecuencia();
    const validacion = componentAgregar.validarInsercionSemanaSecuencia(diasExtraidos);
    fixtureAgregar.detectChanges();
    componentAgregar.agregarFechasSemanas();
    fixtureAgregar.detectChanges();
    expect(diasExtraidos).toEqual(diasW49);
    expect(validacion).toBeTruthy();
    expect(componentAgregar.fechasSemanas).toEqual([diasW49])

  })

  it('eliminar semana', () => {
    var fixtureEliminar = TestBed.createComponent(ModalAccionLimpiarHorarioComponent);
    var componentEliminar = fixtureEliminar.componentInstance;
    componentEliminar.semanaInput = valorSemana;
    componentEliminar.agregarFechasSemanas();
    componentEliminar.eliminarSemana(diasW49)
    fixtureEliminar.detectChanges();
    expect(componentEliminar.fechasSemanas).toEqual([]);
  })

  it('enviar datos ', () => {
    var fixtureEnviar = TestBed.createComponent(ModalAccionLimpiarHorarioComponent);
    var componentEnviar = fixtureEnviar.componentInstance;
    componentEnviar.data = {
      profesionales: profesionalesDataTest,
    }
    const spyDialog = spyOn(matDialogRefMock, 'close').and.callThrough();
    componentEnviar.fechasSemanas = [diasW49];
    componentEnviar.enviar();
    fixtureEnviar.detectChanges();
    expect(component).toBeTruthy();
    expect(spyDialog).toHaveBeenCalled();
  })
});
