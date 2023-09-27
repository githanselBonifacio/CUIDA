import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog'


import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { Cita } from "../../interfaces/remision.interface"
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { EstadoCita, HorarioTurno, Regional, formatoFecha } from 'src/app/shared/interfaces/maestros.interfaces';
import { Actividad } from 'src/app/diagramas/interfaces/tarea-gantt.interface';
import { generarHorario } from '../../../shared/interfaces/maestros.interfaces'

import { ModalSeleccionProfesionalComponent } from '../../../agenda/components/modal-seleccion-profesional/modal-seleccion-profesional.component';
import { VentanaConfirmacionComponent } from 'src/app/shared/components/ventana-confirmacion/ventana-confirmacion.component';
import { switchMap, filter, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ToastType, TitleToast } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-main-component-agenda',
  templateUrl: './main-agenda.page.html',
  styleUrls: ['./main-agenda.page.css']
})
export class MainComponentAgendaComponent implements OnInit {



  loadingPage = false;
  horasTurnoString: string[] = [];

  idRemision: string = "";
  fechaFiltroTurno: string = formatoFecha(new Date());

  opcionRegional: string = "4292";
  opcionHorariosTurno: number = 1;

  constructor(
    private agendaService: AgendaService,
    private maestroService: MaestrosService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dialogoSeleccionProfesional: MatDialog,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.maestroService.getEstadosCita();
    this.maestroService.getRegionales();
    this.maestroService.getHorarioTurno();
    this.activateRoute.params.subscribe(
      params => {
        if (params['idTurno'] != null) {

          this.fechaFiltroTurno = params['idTurno'];
          this.opcionRegional = params['idCiudad'];
          this.opcionHorariosTurno = params['idHorarioTurno'];
        }
        this.consultarCitas()
        this.spinnerService.hide();
      }

    )

  }

  get regionales(): Regional[] {
    return this.maestroService.regionales;
  }

  get horarioTurno(): HorarioTurno[] {
    return this.maestroService.horariosTurno;
  }

  get citas(): Cita[] {
    return this.agendaService.citas;
  }
  set citas(value: Cita[]) {
    this.citas = value;
  }

  get actividades(): Actividad[] {
    return this.agendaService.agendaGantt;
  }
  get horaTurno(): HorarioTurno {
    return this.maestroService.horarioTurnoSeleccionado;
  }
  get estadosCita(): EstadoCita[] {
    return this.maestroService.estadosCita;
  }

  consultarCitas(): void {
    this.horasTurnoString = generarHorario(this.opcionHorariosTurno);
    this.agendaService.getCitas(this.fechaFiltroTurno, this.opcionRegional, this.opcionHorariosTurno);
    this.agendaService.getActividadesAgendaGantt(this.fechaFiltroTurno, this.opcionRegional, this.opcionHorariosTurno);
    this.horasTurnoString = generarHorario(this.opcionHorariosTurno);
    this.router.navigate(['agenda', this.fechaFiltroTurno, this.opcionRegional, this.opcionHorariosTurno]);
  }

  filtrarCitasByIdRemision(): void {
    if (this.idRemision.length === 0) {
      this.consultarCitas()
    }
    this.agendaService.filtrarCitasByIdRemision(this.idRemision);
  }

  autoagendar(): void {
    this.spinnerService.show();
    this.maestroService.getEstadosCita();
    this.agendaService.autoagendar(
      this.citas[0].fechaInicio,
      this.opcionHorariosTurno,
      this.opcionRegional
    ).subscribe(resp => {
      if (resp.status == 200) {
        this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 7)
      } else {
        this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 7)
      }
      this.spinnerService.hide();
      this.consultarCitas();
    });
  }

  desagendarTurnoCompleto(): void {
    this.spinnerService.show();
    this.agendaService.desagendarTurnoCompleto(this.citas[0].fechaProgramada, this.opcionHorariosTurno, this.opcionRegional)
      .subscribe(resp => {
        if (resp.status == 200) {
          this.spinnerService.hide();
          this.consultarCitas();
          this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5)
        } else {
          this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5)
        }

      })
  }
  agregarProfesionalTurno(): void {
    this.agendaService
      .getProfesionalDisponibleByturnoCiudad(this.fechaFiltroTurno, this.opcionRegional)
      .pipe(
        switchMap(profesionales => {
          const dialogRef = this.dialogoSeleccionProfesional.open(ModalSeleccionProfesionalComponent, {
            data: {
              profesionales: profesionales.result
            }
          });
          return dialogRef.afterClosed();
        }),
        switchMap(opcionProfesional => {
          let respuesta: Observable<Respuesta>;
          if (opcionProfesional) {
            this.spinnerService.show();
            respuesta = this.agendaService.asignarProfesionalTurno(
              this.fechaFiltroTurno,
              this.opcionHorariosTurno,
              opcionProfesional
            );
          } else {
            respuesta = new Observable<Respuesta>
          }
          return respuesta
        })
      )
      .subscribe(resp => {
        if (resp.status == 200) {
          this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5)
        } else {
          this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5)
        }
        this.consultarCitas();
        this.spinnerService.hide();
      });
  }
  desasignarProfesionalTurno(actividadProfesional: Actividad): void {
    if (actividadProfesional.tareas.filter(tarea => tarea.idEstado != 1 && tarea.idEstado != 2 && tarea.idEstado != null).length > 0) {
      const msg = "No es posible desagendar el profesional porque tiene citas asignadas en estado confirmada, " +
        "en progreso o finalizada, por favor verifique la agenda"
      this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, msg, 8)

    } else {
      const dialogRef = this.dialogoSeleccionProfesional.open(VentanaConfirmacionComponent, {
        data: {
          mensaje: "Desea desasignar este profesional?",
          nota: "Las citas asociadas serán desagendadas"
        },
      });

      dialogRef.afterClosed().pipe(
        filter(resp => !!resp),

        switchMap(() => this.agendaService.desasignarProfesionalTurno(
          this.fechaFiltroTurno,
          this.opcionHorariosTurno,
          actividadProfesional.numeroIdentificacion)
        )
      ).subscribe(resp => {
        if (resp.status == 200) {
          this.consultarCitas();
          this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
        } else {
          this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5)
        }
      });
    }

  }

  actualizarComponenteMainAgenda() {
    this.consultarCitas()
  }
}

