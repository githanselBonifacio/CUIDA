import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponentAgendaComponent } from './main-agenda.page';
import { AgendaService } from '../../services/agenda.service';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GanttComponent } from 'src/app/diagramas/components/gantt/gantt.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { horarioTurnoTest, regionalesTest } from 'src/assets/files/test/maestros';
import { routes } from '../../agenda-routing.module';
import { citasTest, estadosCitaTest } from 'src/assets/files/test/citas';
import { actividadesTest } from 'src/assets/files/test/actividades';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CardCitaComponent } from '../../components/card-cita/card-cita.component';
import { profesionalesDataTest2 } from 'src/assets/files/test/personal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalSeleccionProfesionalComponent } from '../../components/modal-seleccion-profesional/modal-seleccion-profesional.component';
import { Cita } from 'src/app/shared/interfaces/agenda/remision.interface';
import { VentanaConfirmacionComponent } from 'src/app/shared/components/ventana-confirmacion/ventana-confirmacion.component';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of('10:50')
    };
  }
}
describe('MainComponentAgendaComponent', () => {
  let component: MainComponentAgendaComponent;
  let fixture: ComponentFixture<MainComponentAgendaComponent>;


  const routerspy: any = {
    navigate: (url: string[]) => of(url)
  }

  const fechaTurno = "2023-07-07";
  const idRegional = '427';
  const idHorarioTurno = 1;

  const citaDataTest: Cita = {
    "idCita": "74hjg45_2",
    "idRemision": "74hjg45",
    "duracion": 7200,
    "holgura": 900,
    "fechaInicio": new Date("2023-07-08 11:40"),
    "fechaProgramada": new Date("2023-07-08 11:40"),
    "latitud": 10.96535,
    "longitud": -74.817936,
    "especialidad": "Enfermeria",
    "idEstado": 1,
    "idRegional": "427",
    "idHorarioTurno": 1,
    "idProfesional": null,
    "idConductor": null,
    "paciente": "MARIANA VILLA GARCIA",
    "numeroIdentificacionPaciente": "14528746825",
    "tipoIdentificacionPaciente": "Cédula ciudadania"
  }

  const agendaServiceMock = {
    getCitas: (): Observable<any> => of({
      result: citasTest,
      status: 200,
      flag: true,
      message: "peticion exitosa",
      tecnicalMessage: "peticion exitosa",
      detail: "peticion exitosa"
    }),
    getActividadesAgendaGantt: (): Observable<any> => of({
      result: actividadesTest,
      status: 200,
      flag: true,
      message: "peticion exitosa",
      tecnicalMessage: "peticion exitosa",
      detail: "peticion exitosa"
    }),
    getProfesionaTurnoRegional: (): Observable<any> => of({
      result: profesionalesDataTest2,
      status: 200,
      flag: true,
      message: "peticion exitosa",
      tecnicalMessage: "peticion exitosa",
      detail: "peticion exitosa"
    }),
    asignarProfesionaByIdCita: (): Observable<any> => of({
      result: profesionalesDataTest2,
      status: 200,
      flag: true,
      message: "peticion exitosa",
      tecnicalMessage: "peticion exitosa",
      detail: "peticion exitosa"
    }),
    autoagendar: (): Observable<any> => of({ status: 200, }),

    desagendarTurnoCompleto: (): Observable<any> => of({ status: 200, }),
    getProfesionalDisponibleByturnoRegional: (): Observable<any> => of({
      result: profesionalesDataTest2,
      status: 200,
      flag: true,
      message: "peticion exitosa",
      tecnicalMessage: "peticion exitosa",
      detail: "peticion exitosa"
    }),
    asignarProfesionalTurno: (): Observable<any> => of({ status: 200, }),
    desasignarProfesionalTurno: (): Observable<any> => of({ status: 200, }),
    retirarProfesional: (): Observable<any> => of({ status: 200, }),
    reprogramarCita: (): Observable<any> => of({ status: 200 })
  };

  const maestrosServiceMock = {
    getRegionalesObservable: (): Observable<any> => of(
      {
        result: regionalesTest,
        status: 200,
        flag: true,
        message: "peticion exitosa",
        tecnicalMessage: "peticion exitosa",
        detail: "peticion exitosa"
      }),
    getHorarioTurnoObservable: (): Observable<any> => of(
      {
        result: horarioTurnoTest,
        status: 200,
        flag: true,
        message: "peticion exitosa",
        tecnicalMessage: "peticion exitosa",
        detail: "peticion exitosa"
      }
    ),
    getEstadosCita: (): Observable<any> => of({
      result: estadosCitaTest,
      status: 200,
      flag: true,
      message: "peticion exitosa",
      tecnicalMessage: "peticion exitosa",
      detail: "peticion exitosa"
    })
  };

  const activateRouteSpy = {
    params: of(
      {
        "fechaTurno": fechaTurno,
        "idRegional": idRegional,
        "idHorarioTurno": `${idHorarioTurno}`
      })
  };
  const toastServiceMock = {
    mostrarToast: (): Observable<any> => of(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponentAgendaComponent,
        GanttComponent,
        CardCitaComponent,
        ModalSeleccionProfesionalComponent,
        VentanaConfirmacionComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        RouterModule,
        MatDialogModule,
        PipesModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: AgendaService, useValue: agendaServiceMock },
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: ActivatedRoute, useValue: activateRouteSpy },
        { provide: Router, useValue: routerspy },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        DatePipe
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MainComponentAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('iniciar componente sin datos almacendados en filtro', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  })

  it('iniciar componente con los datos consultados', () => {
    component.ngOnInit();
    const autoAgendarDeshabilitado = component.disabledAutoagendar;
    fixture.detectChanges();
    expect(component).toBeTruthy()
    expect(component.citas).toEqual(citasTest);
    expect(component.actividades).toEqual(actividadesTest);
    expect(autoAgendarDeshabilitado).toBeTruthy();
  })

  it('actualizar valores en filtros', () => {
    component.ngOnInit();
    component.actualizarRegionalFilter(regionalesTest[0].id);
    component.actualizarHorarioFilter(horarioTurnoTest[0].id);

    fixture.detectChanges();
    expect(component.opcionRegional).toEqual(regionalesTest[0].id);
    expect(component.opcionHorarioTurno).toEqual(horarioTurnoTest[0].id);
  })

  it('filtrar por remision', () => {
    component.ngOnInit();

    const criterioBusquedaRemision = citasTest[0].idRemision;
    component.idRemision = criterioBusquedaRemision;
    component.filtrarCitasByIdRemision();
    fixture.detectChanges();
    expect(component.citas.length).toEqual(1);

    component.idRemision = "";
    component.filtrarCitasByIdRemision();
    fixture.detectChanges()

    const criterioBusquedaPaciente = citasTest[0].paciente;
    component.idRemision = criterioBusquedaPaciente;
    component.filtrarCitasByIdRemision();
    fixture.detectChanges();
    expect(component.citas.length).toEqual(1);

    component.idRemision = "";
    component.filtrarCitasByIdRemision();
    fixture.detectChanges()

    const criterioNumeroCedulaPaciente = citasTest[0].numeroIdentificacionPaciente;
    component.idRemision = criterioNumeroCedulaPaciente;
    component.filtrarCitasByIdRemision();
    fixture.detectChanges();
    expect(component.citas.length).toEqual(1);

    component.idRemision = "";
    component.filtrarCitasByIdRemision();
    fixture.detectChanges()

    const criterioNumeroCedulaprofesional = citasTest[1].idProfesional;
    component.idRemision = `${criterioNumeroCedulaprofesional}`;
    component.filtrarCitasByIdRemision();
    fixture.detectChanges();
    expect(component.citas.length).toEqual(1);
  })

  it('auto agendar turno', () => {
    component.ngOnInit();
    component.autoagendar();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('desagendar turno', () => {
    component.ngOnInit();
    component.desagendarTurnoCompleto();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('agendar profesional turno', () => {
    component.ngOnInit();
    component.agregarProfesionalTurno();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('desagendar profesional turno', () => {
    component.ngOnInit();
    component.desasignarProfesionalTurno(component.actividades[0]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('desagendar cita a profesional', () => {
    component.ngOnInit();
    component.citas = [citaDataTest];
    component.desagendarCita(citaDataTest.idCita);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('reprogramar cita a profesional', () => {
    component.ngOnInit();
    component.citas = [citaDataTest];
    component.reprogramarCita(citaDataTest.idCita);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('asignar cita a profesional', () => {
    component.ngOnInit();
    component.citas = [citaDataTest];
    component.asignarProfesionalCita(citaDataTest);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('mostrar detalle cita', () => {
    component.ngOnInit();
    component.citas = [citaDataTest];
    component.mostrarDetalleCita(citaDataTest);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })
});

