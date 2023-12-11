import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccionAgregarSecuenciaComponent } from './modal-accion-agregar-secuencia.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Secuencia } from 'src/app/agenda/interfaces/profesional.interface';
import { profesionalesDataTest, profesionalesDataTest2 } from 'src/assets/files/test/personal';

describe('ModalAccionAgregarSecuenciaComponent', () => {
  let component: ModalAccionAgregarSecuenciaComponent;
  let fixture: ComponentFixture<ModalAccionAgregarSecuenciaComponent>;

  const valorSemana = '2023-w49';
  const diasW49 = [
    new Date("2023-12-04 00:00"),
    new Date("2023-12-05 00:00"),
    new Date("2023-12-06 00:00"),
    new Date("2023-12-07 00:00"),
    new Date("2023-12-08 00:00"),
    new Date("2023-12-09 00:00"),
    new Date("2023-12-10 00:00"),
  ]
  const secuenciaIncompleta = {
    "secuencia": {},
    "semana": diasW49

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
    "semana": diasW49

  }
  const toastServiceMock = {
    mostrarToast: (): Observable<any> => of(),
  };
  const matDialogRefMock = {
    close: () => of("resp"),
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAccionAgregarSecuenciaComponent],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ToastService, useValue: toastServiceMock },
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

  it('validar extraccion de semena ', () => {
    component.semanaInput = valorSemana;
    fixture.detectChanges();
    const diasExtraidos = component.extraerSemanaSecuencia();
    expect(diasExtraidos).toEqual(diasW49)
  })

  it('agregar fecha a secuencia', () => {
    var fixtureAgregar = TestBed.createComponent(ModalAccionAgregarSecuenciaComponent);
    var componentAgregar = fixtureAgregar.componentInstance;
    const spyToast = spyOn(toastServiceMock, 'mostrarToast').and.callThrough();
    componentAgregar.semanaInput = valorSemana;
    fixtureAgregar.detectChanges();
    componentAgregar.agregarFechaSecuencia();
    fixtureAgregar.detectChanges();
    expect(componentAgregar.secuenciasSemana).toEqual([{ secuencia: {}, semana: diasW49 }]);
    componentAgregar.agregarFechaSecuencia();
    expect(spyToast).toHaveBeenCalled()
  })

  it('eliminar semana', () => {
    var fixtureEliminar = TestBed.createComponent(ModalAccionAgregarSecuenciaComponent);
    var componentEliminar = fixtureEliminar.componentInstance;
    componentEliminar.semanaInput = valorSemana;
    componentEliminar.secuenciasSemana = [];
    componentEliminar.secuenciasSemana.push(secuencia)
    componentEliminar.eliminarSemana(diasW49)
    fixtureEliminar.detectChanges();
    expect(componentEliminar.secuenciasSemana).toEqual([]);
  })

  it('agregar semana a secuencia', () => {
    var fixtureAgregarSemana = TestBed.createComponent(ModalAccionAgregarSecuenciaComponent);
    var componentSemana = fixtureAgregarSemana.componentInstance;
    componentSemana.secuenciasSemana = [{ secuencia: {}, semana: diasW49 }];
    const secuenciaAgregar: Secuencia = {
      nombre: "s001",
      descripcion: "descriptcion",
      itemsDiaTurno: []
    }
    componentSemana.agregarSecuenciaSemana(secuenciaAgregar, 0)
    fixtureAgregarSemana.detectChanges();
    expect(componentSemana.secuenciasSemana[0].secuencia).toEqual(secuenciaAgregar)
  })

  it('enviar secuencia', () => {
    var fixtureEnviar = TestBed.createComponent(ModalAccionAgregarSecuenciaComponent);
    var componentEnviar = fixtureEnviar.componentInstance;
    componentEnviar.data = {
      profesionales: profesionalesDataTest,
    }
    const spyDialog = spyOn(matDialogRefMock, 'close').and.callThrough();
    componentEnviar.secuenciasSemana = [secuencia];
    componentEnviar.enviar();
    fixtureEnviar.detectChanges();
    expect(component).toBeTruthy();
    expect(spyDialog).toHaveBeenCalled();
  })
});
