import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConvertMaestros, ProfesionalConTurnos, Turno } from 'src/app/agenda/interfaces/profesional.interface';
import { HorarioTurno } from 'src/app/shared/interfaces/maestros.interfaces';
import { validacionDescansoTurno, validarHorasMaximasTrabajadas } from '../../interfaces/mensajes.data';

@Component({
  selector: 'app-modal-asignar-turno-individual',
  templateUrl: './modal-asignar-turno-individual.component.html',
  styleUrls: ['./modal-asignar-turno-individual.component.css']
})
export class ModalAsignarTurnoIndividualComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalAsignarTurnoIndividualComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {
    this.turnosDiaHorario = this.turnosDia.map(t => {
      const horarioTurno = this.horariosTurno.find(h => h.id === t.idHorarioTurno);
      return {
        ...t,
        idHorarioTurno: horarioTurno
      };
    }).map(t => ConvertMaestros.toTurno(JSON.stringify(t)));


    this.filtrarListaHorariosDisponibles();
    this.actualizarHorasTrabajadas();
  }

  horarioSeleccionado?: HorarioTurno;
  totalHorasTrabajadas: number = 0;
  mesajeValidacion: string = ""
  turnosDiaHorario: Turno[] = [];
  horariosTurnoValidos: HorarioTurno[] = [];

  horasMaximasTrabajadas = 16;
  seRealizoCambioTurno = false;

  get fechaTurno(): Date {
    return this.data['fechaTurno']
  }

  get dia(): string {
    return this.data['dia']
  }
  get profesional(): ProfesionalConTurnos | undefined {
    return this.data['profesional']
  }

  get horariosTurno(): HorarioTurno[] {
    return this.data['horariosTurno']
  }
  get turnosDia(): Turno[] {
    let turnos: Turno[] = this.profesional?.turnos ?? [];
    if (turnos.length > 0) {
      return turnos.filter(t => `${t.fechaTurno}`.slice(8) == this.dia) ?? [];
    }
    else {
      return [];
    }
  }

  filtrarListaHorariosDisponibles() {
    this.horariosTurnoValidos = this.horariosTurno?.slice()
      .filter(h => this.turnosDiaHorario.find(t => t.idHorarioTurno.nombre == h.nombre) == undefined);
  }

  actualizarHorasTrabajadas() {
    this.totalHorasTrabajadas = this.turnosDiaHorario
      .map(t => t.idHorarioTurno.duracionHoras)
      .reduce((total, h) => total + h, 0);
  }

  eliminarTurno(idHorarioTurno: number) {
    this.mesajeValidacion = "";
    this.turnosDiaHorario = this.turnosDiaHorario.filter(h => h.idHorarioTurno.id !== idHorarioTurno)
    this.actualizarHorasTrabajadas();
    this.filtrarListaHorariosDisponibles();
    this.seRealizoCambioTurno = true;
  }

  buildNuevoTurno() {
    let nuevoTurno: Turno | any = null;
    if (this.horarioSeleccionado != null) {

      if (this.turnosDiaHorario.length == 0) {
        nuevoTurno = {
          idTurno: null,
          fechaTurno: this.fechaTurno,
          idHorarioTurno: this.horarioSeleccionado,
          idProfesional: this.profesional?.numeroIdentificacion,
          idRegional: this.profesional?.idRegional
        }
      } else if (this.horarioSeleccionado?.duracionHoras == 0) {
        this.mesajeValidacion = validacionDescansoTurno

      } else if (this.totalHorasTrabajadas + this.horarioSeleccionado?.duracionHoras > this.horasMaximasTrabajadas) {

        this.mesajeValidacion = `${validarHorasMaximasTrabajadas} ${this.horasMaximasTrabajadas} horas`
      } else {
        this.mesajeValidacion = "";
        nuevoTurno = {
          idTurno: null,
          fechaTurno: this.fechaTurno,
          idHorarioTurno: this.horarioSeleccionado,
          idProfesional: this.profesional?.numeroIdentificacion,
          idRegional: this.profesional?.idRegional
        }
      }

    }
    return nuevoTurno;
  }
  agregarNuevoTurno() {

    const nuevoTurno = this.buildNuevoTurno();
    if (nuevoTurno != null) {
      this.turnosDiaHorario.push(nuevoTurno);

      if (nuevoTurno.idHorarioTurno.nombre == 'D') {
        this.horariosTurnoValidos = [];
      } else {
        this.filtrarListaHorariosDisponibles();
      }
      this.horarioSeleccionado = undefined;
      this.actualizarHorasTrabajadas();
      this.seRealizoCambioTurno = true;

    }
  }


  onConfirm(): void {
    const turnosData = this.turnosDiaHorario.map(t => {
      return {
        ...t,
        idHorarioTurno: t.idHorarioTurno.id
      };
    })
    if (turnosData.length > 0) {
      this.dialogRef.close(turnosData);
    } else {
      this.dialogRef.close(null);
    }
  }

  onClose(): void {
    this.dialogRef.close(null);
  }
}
