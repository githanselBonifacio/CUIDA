import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog'


import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { TurnoProfesional } from 'src/app/shared/interfaces/agenda/profesional.interface'
import { Cita } from "../../../shared/interfaces/agenda/remision.interface"
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { EstadoCita, HorarioTurno, Regional, formatoFecha, formatoFechaHora, formatoHora } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import { Actividad, Tarea } from 'src/app/diagramas/interfaces/tarea-gantt.interface';
import { generarHorario } from '../../../shared/interfaces/maestros/maestros.interfaces'
import { EstadosCita } from '../../../shared/interfaces/agenda/estadosCita.interface'
import { ModalSeleccionProfesionalComponent } from '../../../agenda/components/modal-seleccion-profesional/modal-seleccion-profesional.component';
import { VentanaConfirmacionComponent } from 'src/app/shared/components/ventana-confirmacion/ventana-confirmacion.component';
import { switchMap, filter } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { Observable, forkJoin } from 'rxjs';
import { Respuesta } from 'src/app/shared/interfaces/maestros/response.interfaces';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ModalCambioHoraCitaComponent } from '../../components/modal-cambio-hora-cita/modal-cambio-hora-cita.component';
import { ModalDetalleRemisionComponent } from '../../components/modal-detalle-remision/modal-detalle-remision.component';
import { DatePipe } from '@angular/common';
import { MapRutaComponent } from 'src/app/maps/components/map-ruta/map-ruta.component';

@Component({
  selector: 'app-main-component-agenda',
  templateUrl: './main-agenda.page.html',
  styleUrls: ['./main-agenda.page.css'],
  providers: [DatePipe]
})
export class MainComponentAgendaComponent implements OnInit {

  public citas: Cita[] = [];
  public actividades: Actividad[] = [];

  loadingPage = false;
  horasTurnoString: string[] = [];
  regionales: Regional[] = [];
  horariosTurno: HorarioTurno[] = [];

  idRemision: string = "";
  fechaFiltroTurno: string = localStorage.getItem("fechaTurnoAgenda") ?? formatoFecha(new Date());
  opcionRegional: string = localStorage.getItem("idRegionalAgendaFiltro")!;
  opcionHorarioTurno: number = Number(localStorage.getItem("idHorarioTurnoAgendaFiltro"))!;

  constructor(
    private agendaService: AgendaService,
    private maestroService: MaestrosService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dialogo: MatDialog,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.maestroService.getEstadosCita();
    this.activateRoute.params.subscribe(
      params => {
        if (params['fechaTurno'] != null) {
          this.fechaFiltroTurno = params['fechaTurno'];
          this.opcionRegional = params['idRegional'];
          this.opcionHorarioTurno = params['idHorarioTurno'];
        }

      })
    forkJoin([
      this.maestroService.getRegionalesObservable(),
      this.maestroService.getHorarioTurnoObservable()
    ]).subscribe(([regionalResp, horarioResp]) => {
      if (regionalResp.status == 200) {
        this.regionales = regionalResp.result;
        this.opcionRegional = this.opcionRegional ?? this.regionales[0].id;
      }
      if (horarioResp.status == 200) {
        this.horariosTurno = horarioResp.result?.filter((h: HorarioTurno) => h.esHorarioBase);
        this.opcionHorarioTurno = this.opcionHorarioTurno == 0 ? this.horariosTurno[0].id : this.opcionHorarioTurno;
      }

      this.consultarCitas();
    })

  }

  get estadosCita(): EstadoCita[] {
    return this.maestroService.estadosCita;
  }

  get disabledAutoagendar(): boolean {
    return !this.citas.slice().every(cita => cita.idEstado == EstadosCita.SIN_AGENDAR || cita.idEstado == EstadosCita.AGENDADA);
  }

  get fechaTurnoFormat() {
    return formatoFecha(this.citas[0].fechaInicio);
  }
  get fechaTurno() {

    if (this.citas.length > 0) {
      return new Date(`${formatoFecha(this.citas[0].fechaInicio)} 00:00:00`);
    } else {
      return new Date(`${this.fechaFiltroTurno} 00:00:00`)
    }

  }
  guardarLocalStorage() {
    localStorage.setItem("fechaTurnoAgenda", this.fechaFiltroTurno);
    localStorage.setItem("idRegionalAgendaFiltro", this.opcionRegional);
    localStorage.setItem("idHorarioTurnoAgendaFiltro", `${this.opcionHorarioTurno}`);
  }
  getRegionalfiltro(idRegional: string) {
    return this.regionales?.find(r => r.id == idRegional);
  }
  actualizarRegionalFilter(idRegional: string) {
    this.opcionRegional = idRegional;
    localStorage.setItem("idRegionalAgendaFiltro", this.opcionRegional);
  }
  getHorariofiltro(idHorario: number) {
    return this.horariosTurno?.find(h => h.id == idHorario);
  }
  actualizarHorarioFilter(idHorario: number) {
    this.opcionHorarioTurno = idHorario;
    localStorage.setItem("idHorarioTurnoAgendaFiltro", `${this.opcionHorarioTurno}`);
  }
  consultarCitas(): void {
    this.spinnerService.show();
    this.horasTurnoString = generarHorario(this.opcionHorarioTurno);

    forkJoin([
      this.agendaService.getCitas(this.fechaFiltroTurno, this.opcionRegional, this.opcionHorarioTurno),
      this.agendaService.getActividadesAgendaGantt(this.fechaFiltroTurno, this.opcionRegional, this.opcionHorarioTurno)
    ]).subscribe(([citas, actividades]) => {
      this.citas = citas.result;
      this.actividades = actividades.result;
      this.spinnerService.hide();
      this.cdr.detectChanges();
      this.spinnerService.hide();
    })
    this.horasTurnoString = generarHorario(this.opcionHorarioTurno);
    this.guardarLocalStorage();
    this.router.navigate(['agenda', this.fechaFiltroTurno, this.opcionRegional, this.opcionHorarioTurno]);
  }

  filtrarCitasByIdRemision() {
    if (this.idRemision.length === 0) {
      this.consultarCitas()
    }
    const criterioNombrePaciente = this.idRemision.toLowerCase();
    this.citas = this.citas?.filter(cita => {
      return cita.idRemision?.includes(this.idRemision) ||
        cita.idProfesional?.includes(this.idRemision) ||
        cita.paciente?.toLowerCase().includes(criterioNombrePaciente) ||
        cita.numeroIdentificacionPaciente?.includes(this.idRemision);

    });
  }

  autoagendar(): void {
    this.spinnerService.show();
    this.agendaService.autoagendar(
      this.fechaTurnoFormat,
      this.opcionHorarioTurno,
      this.opcionRegional
    ).subscribe(resp => {
      this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
      this.spinnerService.hide();
      this.consultarCitas();
    });
  }

  desagendarTurnoCompleto(): void {
    this.spinnerService.show();
    this.agendaService.desagendarTurnoCompleto(this.fechaTurnoFormat, this.opcionHorarioTurno, this.opcionRegional)
      .subscribe(resp => {
        if (resp.status == 200) {
          this.consultarCitas();
        }
        this.spinnerService.hide();
        this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
      })
  }
  confirmarTurno() {
    const dialogoRef = this.dialogo.open(VentanaConfirmacionComponent, {
      data: {
        "mensaje": "Desea confirmar todas las citas de este turno?"
      }
    });

    dialogoRef.afterClosed()
      .subscribe(resp => {
        if (resp) {
          this.spinnerService.show();
          this.agendaService.confirmarCitasTurno(this.citas)
            .subscribe(response => {
              this.consultarCitas();
              this.spinnerService.hide();
              this.toastService.mostrarToast({ status: response.status, menssage: response.message });
            })
        }
      })
  }
  agregarProfesionalTurno(): void {
    this.agendaService
      .getProfesionalDisponibleByturnoRegional(this.fechaFiltroTurno, this.opcionRegional)
      .pipe(
        switchMap(profesionales => {
          const dialogRef = this.dialogo.open(ModalSeleccionProfesionalComponent, {
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
            let turnoProfesional: TurnoProfesional = {
              fechaTurno: this.fechaFiltroTurno,
              idHorarioTurno: this.opcionHorarioTurno,
              idProfesional: opcionProfesional,
              idRegional: this.opcionRegional
            };
            respuesta = this.agendaService.asignarProfesionalTurno(turnoProfesional);
          } else {
            respuesta = new Observable<Respuesta>
          }
          return respuesta
        })
      )
      .subscribe(resp => {
        this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
        this.consultarCitas();
        this.spinnerService.hide();
      });
  }
  desasignarProfesionalTurno(actividadProfesional: Actividad): void {

    const dialogRef = this.dialogo.open(VentanaConfirmacionComponent, {
      data: {
        mensaje: "Desea desasignar este profesional?",
        nota: "Las citas asociadas serán desagendadas"
      },
    });

    dialogRef.afterClosed().pipe(
      filter(resp => !!resp),

      switchMap(() => this.agendaService.desasignarProfesionalTurno(
        {
          fechaTurno: this.fechaFiltroTurno,
          idHorarioTurno: this.opcionHorarioTurno,
          idProfesional: actividadProfesional.numeroIdentificacion,
          idRegional: this.opcionRegional
        })
      )
    ).subscribe(resp => {
      if (resp.status == 200) {
        this.consultarCitas();
      }
      this.toastService.mostrarToast({ status: resp.status, menssage: resp.message }, 6);
    });

  }

  desagendarCita(idCita: string) {
    const citaSeleccionada = this.citas.find(cita => cita.idCita == idCita);
    if (citaSeleccionada) {
      const dialogRef = this.dialogo.open(VentanaConfirmacionComponent, {
        data: {
          mensaje: "Desea desagendar esta cita?"
        }
      });
      dialogRef.afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.agendaService.retirarProfesional(
            citaSeleccionada?.idCita,
            citaSeleccionada?.idProfesional!,
            formatoFecha(citaSeleccionada.fechaProgramada),
            citaSeleccionada?.idHorarioTurno,
            citaSeleccionada?.idRegional
          )))
        .subscribe(resp => {
          this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
          this.actualizarComponenteMainAgenda()
        });
    }

  }

  reprogramarCita(idCita: string) {
    let citaSeleccionada: Cita = this.citas.find(cita => cita.idCita == idCita)!;

    if (citaSeleccionada) {
      const dialogRef = this.dialogo.open(ModalCambioHoraCitaComponent, {
        data: formatoHora(new Date(citaSeleccionada.fechaProgramada))
      })
      dialogRef.afterClosed().pipe(
        switchMap(nuevaHora => {
          if (nuevaHora !== '') {
            const [hora, minutos] = nuevaHora.split(':').map(Number);

            let nuevaFechaProgramada: Date = new Date(`${formatoFechaHora(citaSeleccionada.fechaProgramada)}`);
            nuevaFechaProgramada.setHours(hora, minutos, 0);

            let citaActualizada: Cita = { ...citaSeleccionada, fechaProgramada: new Date(`${formatoFechaHora(nuevaFechaProgramada)}`) }
            citaActualizada["fechaProgramada"] = new Date(`${formatoFechaHora(nuevaFechaProgramada)}:00`);

            return this.agendaService.reprogramarCita(citaActualizada)
          } else {
            throw Error('No se ha seleccionado una hora');
          }
        }
        ))
        .subscribe(resp => {
          this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
          this.actualizarComponenteMainAgenda()
        });
    }
  }

  confirmarCita(idCita: string) {
    const dialogRef = this.dialogo.open(VentanaConfirmacionComponent, {
      data: {
        "mensaje": "Desea confirmar cita?"
      }
    })
    dialogRef.afterClosed()
      .subscribe(resp => {
        if (resp) {
          this.agendaService.confirmarCita(idCita)
            .subscribe(response => {
              this.toastService.mostrarToast({ status: response.status, menssage: response.message });
              this.consultarCitas();
            })
        }
      })
  }
  asignarProfesionalCita(cita: Cita): void {
    this.agendaService
      .getProfesionaTurnoRegional(this.fechaFiltroTurno, this.opcionRegional, this.opcionHorarioTurno)
      .subscribe(resp => {
        const dialogRef = this.dialogo.open(ModalSeleccionProfesionalComponent, {
          data: {
            profesionales: resp.result
          }

        });
        dialogRef.afterClosed()
          .pipe(filter(opcionProfesional => opcionProfesional !== '' && opcionProfesional))
          .subscribe(opcionProfesional => {
            cita["idProfesional"] = opcionProfesional;
            this.agendaService.asignarProfesionaByIdCita(cita)
              .subscribe(resp => {
                this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
                this.actualizarComponenteMainAgenda();

              });
          })
      })
  }

  mostrarDetalleCita(citaSeleccionada: Cita | undefined): void {
    this.dialogo.open(ModalDetalleRemisionComponent, {
      data: citaSeleccionada
    })
  }
  mostrarRutaProfesionalMap(tareas: Tarea[]) {
    const dialogRef = this.dialogo.open(MapRutaComponent, {
      data: {
        "tareas": tareas.filter(t => t.tipo != "DVISITA"),
        "origen": this.regionales.filter(r => r.id == this.opcionRegional)[0]
      }
    })
  }
  actualizarComponenteMainAgenda() {
    this.consultarCitas()
  }
}

