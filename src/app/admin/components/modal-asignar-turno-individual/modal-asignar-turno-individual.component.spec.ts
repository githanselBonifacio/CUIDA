import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarTurnoIndividualComponent } from './modal-asignar-turno-individual.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HorarioTurno } from 'src/app/shared/interfaces/maestros.interfaces';
import { ProfesionalConTurnos, Turno } from 'src/app/agenda/interfaces/profesional.interface';
import { validacionDescansoTurno, validarHorasMaximasTrabajadas } from '../../interfaces/mensajes.data';

describe('ModalAsignarTurnoIndividualComponent', () => {
  let component: ModalAsignarTurnoIndividualComponent;
  let fixture: ComponentFixture<ModalAsignarTurnoIndividualComponent>;

  const fechaTurno = "2023-07-07";
  const horasMaximasTrabajadas = 10;
  const horarioDescanso: HorarioTurno = {
    "id": 4,
    "nombre": "D",
    "horaInicio": new Date("06:00:00"),
    "horaFin": new Date("05:59:00"),
    "colorHexReferencia": "#BDECB6",
    "esHorarioBase": false,
    "descripcion": "descanso",
    "duracionHoras": 0
  }
  const horarioT1: HorarioTurno = {
    "id": 1,
    "nombre": "T1",
    "horaInicio": new Date("06:00:00"),
    "horaFin": new Date("13:59:00"),
    "colorHexReferencia": "#7FD9E1",
    "esHorarioBase": true,
    "descripcion": "mañana",
    "duracionHoras": 8
  }
  const horarioT2: HorarioTurno = {
    "id": 1,
    "nombre": "T2",
    "horaInicio": new Date("14:00:00"),
    "horaFin": new Date("21:59:00"),
    "colorHexReferencia": "#7FD9E1",
    "esHorarioBase": true,
    "descripcion": "Tarde",
    "duracionHoras": 8
  }
  const profesional: ProfesionalConTurnos = {
    "idTipoIdentificacion": 1,
    "numeroIdentificacion": "1248946452",
    "nombres": "Alicia Paula",
    "apellidos": "Rodriguez",
    "email": "prueba@sura.com.co",
    "telefono": null,
    "celular": "300254896",
    "direccion": "direccion XX prueba",
    "genero": "Femenino",
    "idProfesion": 1,
    "fechaNacimiento": "1996-05-05",
    "idRegional": "427",
    "activo": false,
    "turnos": []
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAsignarTurnoIndividualComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(ModalAsignarTurnoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente asignar turno individual', () => {
    expect(component).toBeTruthy();
  });


  it('filtrar horarios disponibles', () => {
    component.horariosTurnoValidos = [];
    component.data['horariosTurno'] = [horarioT1, horarioDescanso]
    component.filtrarListaHorariosDisponibles()
    fixture.detectChanges();
    expect(component.horariosTurnoValidos.length).toEqual(2)
    expect(component.horariosTurnoValidos).toEqual(component.data['horariosTurno'])
  })

  it('agregar turno exitosamente', () => {
    component.horarioSeleccionado = horarioT1;
    component.data['profesional'] = profesional
    var nuevoTurno = component.buildNuevoTurno();

    fixture.detectChanges();
    expect(nuevoTurno.idProfesional).toEqual(profesional.numeroIdentificacion);
    expect(component.mesajeValidacion).toEqual("");
  })

  it('agregar turno descanso con turnos asignados', () => {

    component.turnosDiaHorario = [{
      idTurno: null,
      fechaTurno: fechaTurno,
      idHorarioTurno: horarioT1,
      idProfesional: profesional.numeroIdentificacion,
      idRegional: profesional.idRegional
    }];
    component.horarioSeleccionado = horarioDescanso;
    component.data['profesional'] = profesional;
    const nuevoTurno = component.buildNuevoTurno();

    fixture.detectChanges();
    expect(nuevoTurno).toBeNull();
    expect(component.mesajeValidacion).toEqual(validacionDescansoTurno);
  })

  it('agregar turno que excede las horas máximas de trabajo', () => {

    component.turnosDiaHorario = [{
      idTurno: null,
      fechaTurno: fechaTurno,
      idHorarioTurno: horarioT1,
      idProfesional: profesional.numeroIdentificacion,
      idRegional: profesional.idRegional
    },
    ];
    component.horasMaximasTrabajadas = horasMaximasTrabajadas;
    component.horarioSeleccionado = horarioT2;
    component.data['profesional'] = profesional;
    component.totalHorasTrabajadas = horarioT1.duracionHoras;
    const nuevoTurno = component.buildNuevoTurno();

    fixture.detectChanges();
    expect(nuevoTurno).toBeNull();
    expect(component.mesajeValidacion).toEqual(`${validarHorasMaximasTrabajadas} ${horasMaximasTrabajadas} horas`);
  })

  it('agregar turno que excede las horas máximas de trabajo', () => {
    component.turnosDiaHorario = [{
      idTurno: null,
      fechaTurno: fechaTurno,
      idHorarioTurno: horarioT1,
      idProfesional: profesional.numeroIdentificacion,
      idRegional: profesional.idRegional
    },
    ];
    component.eliminarTurno(horarioT1.id);
    fixture.detectChanges();
    expect(component.turnosDiaHorario.length).toEqual(0);

  })
});
