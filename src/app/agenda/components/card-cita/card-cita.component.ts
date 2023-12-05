import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Cita } from '../../interfaces/remision.interface';

import { MatDialog } from '@angular/material/dialog'
import { ModalSeleccionProfesionalComponent } from '../modal-seleccion-profesional/modal-seleccion-profesional.component';
import { VentanaConfirmacionComponent } from '../../../shared/components/ventana-confirmacion/ventana-confirmacion.component'
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { ModalCambioHoraCitaComponent } from '../modal-cambio-hora-cita/modal-cambio-hora-cita.component';
import { ModalDetalleRemisionComponent } from '../modal-detalle-remision/modal-detalle-remision.component';
import { switchMap, filter, tap } from 'rxjs/operators';
import { ToastComponent, ToastType, TitleToast, crearConfig } from 'src/app/shared/components/toast/toast.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { EstadoCita, funtionGetNombreEstadoCitaById } from 'src/app/shared/interfaces/maestros.interfaces';
import localeEs from '@angular/common/locales/es';
import { DatePipe, registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-agenda-card-cita',
  templateUrl: './card-cita.component.html',
  styleUrls: ['./card-cita.component.css'],
  providers: [DatePipe]
})
export class CardCitaComponent {
  @Input()
  public cita!: Cita;
  @Input()
  public estadosCita: EstadoCita[] = [];

  @Output()
  actualizarMainView = new EventEmitter();

  citaSeleccionada: Cita | any = {};

  @Input()
  public idRegional: string = '';
  @Input()
  public fechaTurno: string = new Date().toISOString().slice(0, 10);
  @Input()
  public idHorarioTurno: number = 0

  convertEstado = funtionGetNombreEstadoCitaById;
  constructor(
    private dialogo: MatDialog,
    private agendaService: AgendaService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    registerLocaleData(localeEs);
  }


  asignarProfesionalCita(citaSeleccionada: Cita): void {
    this.agendaService
      .getProfesionaFromTurnoRegional(this.fechaTurno, this.idRegional, this.idHorarioTurno)
      .pipe(
        tap(({ result: profesionales }) => {
          const dialogRef = this.dialogo.open(ModalSeleccionProfesionalComponent, {
            data: { profesionales },
          });

          dialogRef.afterClosed()
            .pipe(filter(opcionProfesional => opcionProfesional !== '' && opcionProfesional))
            .subscribe(opcionProfesional => {

              this.agendaService.asignarProfesionaByIdCita(
                citaSeleccionada.idCita,
                opcionProfesional,
                this.datePipe.transform(citaSeleccionada.fechaProgramada, 'yyyy-MM-dd HH:mm') ?? '',
                this.idHorarioTurno,
                this.idRegional
              ).subscribe(resp => {
                if (resp.status == 200) {

                  this.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
                } else {
                  this.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
                }
                this.actualizarComponenteMainAgenda();
              }, error => {
                this.mostrarToast(ToastType.Error, TitleToast.Error, "Error operación", 5);
              });

            });
        }),
      )
      .subscribe();
  }
  desagendarProfesionalCita(citaSeleccionada: Cita, mensaje: string): void {
    this.citaSeleccionada = citaSeleccionada;

    const dialogRef = this.dialogo.open(VentanaConfirmacionComponent, {
      data: {
        mensaje: mensaje
      }
    });
    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => this.agendaService.retirarProfesional(
          citaSeleccionada.idCita,
          citaSeleccionada.idProfesional ?? '',
          this.fechaTurno,
          this.idHorarioTurno,
          this.idRegional
        )))
      .subscribe(resp => {
        if (resp.status == 200) {
          this.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5)
        } else {
          this.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5)
        }
        this.actualizarComponenteMainAgenda()
      });

  }

  reprogramarHoraCita(citaSeleccionada: Cita): void {
    const fecha = new Date(citaSeleccionada.fechaProgramada);

    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}`
    const horaActual = `${hours}:${minutes}`

    const dialogRef = this.dialogo.open(ModalCambioHoraCitaComponent, {
      data: horaActual
    })
    dialogRef.afterClosed().pipe(
      switchMap(nuevaHora => {
        if (nuevaHora !== '') {
          return this.agendaService.reprogramarCita(
            citaSeleccionada.idCita,
            fechaFormateada,
            nuevaHora,
            this.idHorarioTurno,
            this.idRegional,
            citaSeleccionada.idProfesional ?? ''
          )
        } else {
          throw Error('No se ha seleccionado hora');
        }
      }
      ))
      .subscribe(resp => {

        if (resp.status == 200) {
          this.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5)
        } else {
          this.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5)
        }
        this.actualizarComponenteMainAgenda()
      });
  }

  mostrarDetalleCita(citaSeleccionada: Cita): void {
    this.citaSeleccionada = citaSeleccionada;
    const modalCita = this.dialogo.open(ModalDetalleRemisionComponent, {
      data: this.citaSeleccionada
    })


  }


  mostrarToast(tipo: ToastType, titulo: TitleToast, mensaje: string, duracion: number) {
    const config: MatSnackBarConfig = crearConfig(tipo, titulo, mensaje, duracion)
    this._snackBar.openFromComponent(ToastComponent, config)
  }

  actualizarComponenteMainAgenda() {
    this.actualizarMainView.emit();
  }
}
