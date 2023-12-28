import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Cita, EstadosCita } from '../../../shared/interfaces/agenda/remision.interface';

import { EstadoCita, funtionGetNombreEstadoCitaById } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-agenda-card-cita',
  templateUrl: './card-cita.component.html',
  styleUrls: ['./card-cita.component.css'],
})
export class CardCitaComponent {
  @Input() public cita?: Cita;
  @Input() public estadosCita: EstadoCita[] = [];

  @Output() actualizarMainView = new EventEmitter();
  @Output() reprogramarCitaEvent = new EventEmitter<string>();
  @Output() desagendarCitaEvent = new EventEmitter<string>();
  @Output() mostrarDetalleCitaEvent = new EventEmitter<Cita>();
  @Output() confirmarCitaEvent = new EventEmitter<string>();
  @Output() asignarProfesionalCitaEvent = new EventEmitter<Cita>();

  convertEstado = funtionGetNombreEstadoCitaById;
  constructor() { registerLocaleData(localeEs); }

  asignarProfesionalCita(): void {
    this.asignarProfesionalCitaEvent.emit(this.cita);
  }

  desagendarProfesionalCita(): void {
    this.desagendarCitaEvent.emit(this.cita?.idCita);
  }

  reprogramarHoraCita(): void {
    this.reprogramarCitaEvent.emit(this.cita?.idCita);
  }
  confirmarCita(): void {
    this.confirmarCitaEvent.emit(this.cita?.idCita);
  }

  mostrarDetalleCita(citaSeleccionada: Cita | undefined): void {
    this.mostrarDetalleCitaEvent.emit(citaSeleccionada);
  }

  validarEstadoNoAgendado(cita: Cita | undefined) {
    return cita?.idEstado == EstadosCita.sinAgendar;
  }
  validarEstadoAgendado(cita: Cita | undefined): boolean {
    return cita?.idEstado == EstadosCita.agendada;
  }


  actualizarComponenteMainAgenda() {
    this.actualizarMainView.emit();
  }
}
