import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCitaComponent } from './card-cita.component';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgendaService } from '../../services/agenda.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { Cita, EstadosCita } from '../../interfaces/remision.interface';
import { Observable, of } from 'rxjs';
import { profesionalesDataTest2 } from 'src/assets/files/test/personal';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of('string')
    };
  }
}

describe('CardCitaComponent', () => {
  let component: CardCitaComponent;
  let fixture: ComponentFixture<CardCitaComponent>;

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
    getProfesionaTurnoRegional: () => of(
      {
        status: 200,
        result: profesionalesDataTest2
      }
    ),
    retirarProfesional: () => of(
      {
        status: 200
      }
    ),
    reprogramarCita: () => of()
  };
  const toastServiceMock = {
    mostrarToast: (): Observable<any> => of(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCitaComponent],
      imports: [
        MatDialogModule,
        PipesModule,
      ],
      providers: [
        { provide: AgendaService, useValue: agendaServiceMock },
        { provide: ToastService, useValue: {} },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: ToastService, useValue: toastServiceMock },
        DatePipe]
    });
    fixture = TestBed.createComponent(CardCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('validar estado agendado cita', () => {
    component.cita = citaDataTest;
    component.cita.idEstado = EstadosCita.agendada;
    fixture.detectChanges()
    expect(component.validarEstadoAgendado(component.cita)).toBeTruthy();
  })

  it('validar estado sin agendar cita', () => {
    component.cita = citaDataTest;
    component.cita.idEstado = EstadosCita.sinAgendar;
    fixture.detectChanges()
    expect(component.validarEstadoNoAgendado(component.cita)).toBeTruthy();
  })

  it('agendar cita a profesional', () => {
    component.cita = citaDataTest;
    component.asignarProfesionalCita()
    expect(component).toBeDefined();
  })

  it('desagendar cita a profesional', () => {
    component.cita = citaDataTest;

    component.desagendarProfesionalCita()
    expect(component).toBeDefined();
  })

  it('reprogramar cita a profesional', () => {
    component.cita = citaDataTest;

    component.reprogramarHoraCita()
    expect(component).toBeDefined();
  })
});
