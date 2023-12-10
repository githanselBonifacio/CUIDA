import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalHorarioSecuenciasPageComponent } from './admin-personal-horario-secuencias-page.component';
import { Observable, of } from 'rxjs';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { horarioTurnoTest, horarioTurnoTest2, horarioTurnoTestDescanso, regionalesTest } from 'src/assets/files/test/maestros';
import { FormsModule } from '@angular/forms';
import { Secuencia } from 'src/app/agenda/interfaces/profesional.interface';
import { profesionalesDataTest } from 'src/assets/files/test/personal';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of('string')
    };
  }
}

describe('AdminPersonalHorarioSecuenciasPageComponent', () => {
  let component: AdminPersonalHorarioSecuenciasPageComponent;
  let fixture: ComponentFixture<AdminPersonalHorarioSecuenciasPageComponent>;

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

  const adminPersonalServiceMock = {
    getSecuenciasTurno: () => of({
      status: 200,
      result: []
    }),

    getAllProfesionales: () => of({
      status: 200,
      result: profesionalesDataTest
    }),

    crearSecuenciaTurno: () => of({ status: 200 }),
    eliminarTurnoProfesionalAccionMasiva: () => of({ status: 200 }),
    asignarTurnoProfesionalAccionMasiva: () => of({ status: 200 }),
  }

  const maestrosServiceMock = {
    getProfesiones: jasmine.createSpy('getProfesiones').and
      .returnValue([]),

    getTiposIdentificacion: jasmine.createSpy('getTiposIdentificacion').and
      .returnValue([]),

    getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
      .returnValue([]),

    getRegionalesObservable: () => of({
      result: regionalesTest,
      status: 200
    })
  }
  const spinnerService = {
    show: () => of({ result: [] }),
    hide: () => of({ result: [] })
  }
  const toastServiceMock = {
    mostrarToast: (): Observable<any> => of(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalHorarioSecuenciasPageComponent],
      imports: [
        FormsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatCheckboxModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: SpinnerService, useValue: spinnerService },
        { provide: MatDialog, useClass: MatDialogMock },
      ]
    });
    fixture = TestBed.createComponent(AdminPersonalHorarioSecuenciasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('mostrar opciones masivas', () => {
    component.mostrarOpcionesMasivas();
    expect(component.mostrarListAccionesMasivas).toBeTruthy();
    fixture.detectChanges();

    component.mostrarListAccionesMasivas = true;
    component.mostrarOpcionesMasivas();
    expect(component.mostrarListAccionesMasivas).toBeFalsy();
    fixture.detectChanges();
  });

  it('cambiar de pagina event', () => {
    const event: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 10
    };

    component.onPaginateChange(event);
    expect(component.numerosPaginaSeleccionada).toEqual(event.pageSize);
    expect(component).toBeTruthy();
  })

  it("abrir modal configuracion secuencia", () => {
    component.abrirModalConfiguracionSecuencia(secuencia);
    expect(component).toBeTruthy();
  })

  it("abrir modal limpiar  horario", () => {
    component.abrirModalAccionLimpiarHorario(profesionalesDataTest);
    expect(component).toBeTruthy();
  })

  it("abrir modal asignar secuencia", () => {
    component.abrirModalAccionAsignarSecuencia(profesionalesDataTest);
    expect(component).toBeTruthy();
  })
});
