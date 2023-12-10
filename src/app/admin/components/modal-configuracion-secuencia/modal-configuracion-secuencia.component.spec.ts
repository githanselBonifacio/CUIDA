import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { ModalConfiguracionSecuenciaComponent } from './modal-configuracion-secuencia.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { Secuencia } from 'src/app/agenda/interfaces/profesional.interface';
import { AccionFormulario } from '../../interfaces/enum';
import { SimpleChange } from '@angular/core';
import { horarioTurnoTest, horarioTurnoTest2, horarioTurnoTestDescanso } from 'src/assets/files/test/maestros';
import { of } from 'rxjs';

export class MatDialogMock {
  close() {
    return {
      afterClosed: () => of('string')
    };
  }
}
describe('ModalConfiguracionSecuenciaComponent', () => {

  const diaSinTurnoSecuenciaTest = 5;
  const diaDescansoSecuenciaTest = 1;
  const diaConTurnoPrevioSecuenciaTest = 2;
  const secuencia: Secuencia = {
    "nombre": "S-001",
    "descripcion": "secuencia 001",
    "itemsDiaTurno": [
      {
        "numeroDia": 1,
        "nombreDia": "Domingo",
        "horariosTurno": horarioTurnoTestDescanso
      },
      {
        "numeroDia": 2,
        "nombreDia": "Lunes",
        "horariosTurno": horarioTurnoTest
      },
      {
        "numeroDia": 3,
        "nombreDia": "Martes",
        "horariosTurno": horarioTurnoTest
      },
      {
        "numeroDia": 4,
        "nombreDia": "Miercoles",
        "horariosTurno": horarioTurnoTest2
      },
      {
        "numeroDia": 5,
        "nombreDia": "Jueves",
        "horariosTurno": []
      },
    ]
  }
  const sumaHoraHorariosList = 8;
  const sumaHorasTotalesSecuencia = 24;

  const maestrosServiceMock = {
    getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
      .returnValue(horarioTurnoTest)
  };
  const toastServiceMock = {
    mostrarToast: () => of({ result: true }),
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfiguracionSecuenciaComponent],
      imports: [FormsModule],
      providers: [
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: MatDialogRef, useClass: MatDialogMock },
      ]
    }).compileComponents();
  });

  it('crear componente', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });

  it('crear componente actualizar', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.ACTUALIZAR
    }
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('cambiar descripcion secuencia', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.CREAR
    }
    component.descripcionSecuencia = 'nueva descripcion';
    component.ngOnChanges({
      descripcionSecuencia: new SimpleChange(null, component.descripcionSecuencia, true),
    });
    expect(component).toBeTruthy();
  })

  it('calcular duracion total', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.ACTUALIZAR
    }
    component.ngOnInit();
    const duracionTotal = component.calcularDuracionTotal(horarioTurnoTest);
    expect(duracionTotal).toEqual(sumaHoraHorariosList);
    expect(component.secuenciaEditable).toEqual(secuencia);
  })

  it('calcular duracion total secuencia', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.ACTUALIZAR
    }

    fixture.detectChanges()
    expect(component.sumaTotalHoras).toEqual(sumaHorasTotalesSecuencia);
    expect(component.secuenciaEditable).toEqual(secuencia);
  })

  it('validar seleccion de horarios', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.ACTUALIZAR
    }
    component.ngOnInit();
    component.secuenciaEditable = secuencia;
    fixture.detectChanges();
    const horarios = component.gethorariosSeleccionadosDiaTurno(1);
    expect(component.secuenciaEditable).toEqual(secuencia)
    expect(horarios?.length).toEqual(horarioTurnoTest.length);
  })

  it('validar de horario de descanso', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.ACTUALIZAR
    }
    component.ngOnInit();
    component.secuenciaEditable = secuencia;
    fixture.detectChanges();
    const validarDescanso = component.validarTurnoDescanso(diaDescansoSecuenciaTest);
    expect(validarDescanso).toBeTruthy();
  })

  it('validar turno seleccionado  con turno de descanso', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.ACTUALIZAR
    }
    component.ngOnInit();
    component.secuenciaEditable = secuencia;
    fixture.detectChanges();
    const validarTurno = component.validarturnoSeleccionado(horarioTurnoTest[0], diaDescansoSecuenciaTest);
    expect(validarTurno).toBeTruthy();
  })

  it('validar turno seleccionado  invalido', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.secuenciaEditable = secuencia;
    fixture.detectChanges();

    const validarTurno = component.validarturnoSeleccionado(horarioTurnoTest2[0], diaConTurnoPrevioSecuenciaTest);
    expect(validarTurno).toBeFalsy();
  })

  it('validar turno seleccionado  valido con turno', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.ACTUALIZAR
    }
    component.ngOnInit();
    component.secuenciaEditable = secuencia;
    fixture.detectChanges();

    const validarTurno = component.validarturnoSeleccionado(horarioTurnoTest[0], diaConTurnoPrevioSecuenciaTest);
    expect(validarTurno).toBeTruthy();
  })

  it('validar turno seleccionado  valido', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.secuenciaEditable = secuencia;
    fixture.detectChanges();
    const validarTurno = component.validarturnoSeleccionado(horarioTurnoTest[0], diaSinTurnoSecuenciaTest);
    expect(validarTurno).toBeFalsy();
  })

  it('guardar secuencia', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.secuenciaEditable = secuencia;
    component.nombreSecuencia = "secuencia"
    fixture.detectChanges();
    component.guardarSecuencia();
    expect(component).toBeTruthy();
  })

  it('guardar secuencia incompleta', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.secuenciaEditable = secuencia;
    fixture.detectChanges();
    component.guardarSecuencia();
    expect(component).toBeTruthy();
  })
  it('on cancel', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.onCancel();
    expect(component).toBeTruthy()
  })


  it('eliminar turno asignado', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.secuenciaEditable = secuencia;
    component.eliminarHorarioTurno(horarioTurnoTest[0], diaConTurnoPrevioSecuenciaTest)
    fixture.detectChanges();
    expect(component.secuenciaEditable.itemsDiaTurno[diaConTurnoPrevioSecuenciaTest - 1].horariosTurno.length).toEqual(0);
  })

  it('agregar horario turno vacio', () => {
    const fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    const component = fixture.componentInstance;
    component.data = {
      "secuencia": secuencia,
      "accion": AccionFormulario.ACTUALIZAR
    }
    component.ngOnInit();
    component.agregarHorarioTurno(horarioTurnoTest[0], diaSinTurnoSecuenciaTest)
    fixture.detectChanges();
    expect(component.secuenciaEditable?.itemsDiaTurno[diaSinTurnoSecuenciaTest - 1].horariosTurno[0]).toEqual(horarioTurnoTest[0]);
    component.eliminarHorarioTurno(horarioTurnoTest[0], diaSinTurnoSecuenciaTest)
    fixture.detectChanges();
  })
});
