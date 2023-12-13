import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Cita, EstadosCita } from '../../../shared/interfaces/agenda/remision.interface';

import { MatDialog } from '@angular/material/dialog'
import { ModalSeleccionProfesionalComponent } from '../modal-seleccion-profesional/modal-seleccion-profesional.component';
import { VentanaConfirmacionComponent } from '../../../shared/components/ventana-confirmacion/ventana-confirmacion.component'
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { ModalCambioHoraCitaComponent } from '../modal-cambio-hora-cita/modal-cambio-hora-cita.component';
import { ModalDetalleRemisionComponent } from '../modal-detalle-remision/modal-detalle-remision.component';
import { switchMap, filter } from 'rxjs/operators';
import { EstadoCita, formatoFechaHora, funtionGetNombreEstadoCitaById } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-agenda-card-cita',
  templateUrl: './card-cita.component.html',
  styleUrls: ['./card-cita.component.css'],
})
export class CardCitaComponent {
  @Input() public cita?: Cita;
  @Input() public estadosCita: EstadoCita[] = [];
  @Input() public idRegional: string = '';
  @Input() public fechaTurno: string = new Date().toISOString().slice(0, 10);
  @Input() public idHorarioTurno: number = 0

  @Output() actualizarMainView = new EventEmitter();

  convertEstado = funtionGetNombreEstadoCitaById;
  constructor(
    private dialogo: MatDialog,
    private agendaService: AgendaService,
    private toastService: ToastService,
  ) {
    registerLocaleData(localeEs);
  }
  asignarProfesionalCita(): void {

    this.agendaService
      .getProfesionaTurnoRegional(this.fechaTurno, this.idRegional, this.idHorarioTurno)
      .subscribe(resp => {
        const dialogRef = this.dialogo.open(ModalSeleccionProfesionalComponent, {
          data: {
            profesionales: resp.result
          }

        });
        dialogRef.afterClosed()
          .pipe(filter(opcionProfesional => opcionProfesional !== '' && opcionProfesional))
          .subscribe(opcionProfesional => {

            this.agendaService.asignarProfesionaByIdCita(
              this.cita!.idCita,
              opcionProfesional,
              formatoFechaHora(this.cita!.fechaProgramada),
              this.idHorarioTurno,
              this.idRegional
            ).subscribe(resp => {
              this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
              this.actualizarComponenteMainAgenda();

            });
          })
      })
  }

  desagendarProfesionalCita(): void {

    const dialogRef = this.dialogo.open(VentanaConfirmacionComponent, {
      data: {
        mensaje: "Desea desagendar cita ?"
      }
    });
    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => this.agendaService.retirarProfesional(
          this.cita!.idCita,
          this.cita!.idProfesional ?? '',
          this.fechaTurno,
          this.idHorarioTurno,
          this.idRegional
        )))
      .subscribe(resp => {
        this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
        this.actualizarComponenteMainAgenda()

      });

  }

  reprogramarHoraCita(): void {
    const fecha = new Date(this.cita!.fechaProgramada);
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const horaActual = `${hours}:${minutes}`

    const dialogRef = this.dialogo.open(ModalCambioHoraCitaComponent, {
      data: horaActual
    })
    dialogRef.afterClosed().pipe(
      switchMap(nuevaHora => {
        if (nuevaHora !== '') {
          return this.agendaService.reprogramarCita(
            this.cita!.idCita,
            formatoFechaHora(fecha),
            nuevaHora,
            this.idHorarioTurno,
            this.idRegional,
            this.cita!.idProfesional!
          )
        } else {
          throw Error('No se ha seleccionado hora');
        }
      }
      ))
      .subscribe(resp => {
        this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
        this.actualizarComponenteMainAgenda()
      });
  }

  mostrarDetalleCita(citaSeleccionada: Cita | undefined): void {
    const modalCita = this.dialogo.open(ModalDetalleRemisionComponent, {
      data: citaSeleccionada
    })
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
