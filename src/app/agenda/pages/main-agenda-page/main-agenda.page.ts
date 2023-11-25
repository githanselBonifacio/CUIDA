import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog'


import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { TurnoProfesional } from 'src/app/agenda/interfaces/profesional.interface'
import { Cita } from "../../interfaces/remision.interface"
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { EstadoCita, HorarioTurno, Regional, formatoFecha } from 'src/app/shared/interfaces/maestros.interfaces';
import { Actividad } from 'src/app/diagramas/interfaces/tarea-gantt.interface';
import { generarHorario } from '../../../shared/interfaces/maestros.interfaces'
import { EstadosCita } from '../../interfaces/estadosCita.interface'

import { ModalSeleccionProfesionalComponent } from '../../../agenda/components/modal-seleccion-profesional/modal-seleccion-profesional.component';
import { VentanaConfirmacionComponent } from 'src/app/shared/components/ventana-confirmacion/ventana-confirmacion.component';
import { switchMap, filter } from 'rxjs/operators';
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
  regionales: Regional[] = [];
  horariosTurno: HorarioTurno[] = [];

  idRemision: string = "";
  fechaFiltroTurno: string = localStorage.getItem("fechaTurnoAgenda") ?? formatoFecha(new Date());
  opcionRegional: string = localStorage.getItem("idRegionalAgendaFiltro") ?? "";
  opcionHorarioTurno: number = Number(localStorage.getItem("idHorarioTurnoAgendaFiltro")) ?? 0;

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
    this.maestroService.getRegionalesObservable()
      .subscribe(resp => {
        if (resp.status == 200) {
          this.regionales = resp.result;
          this.opcionRegional = (this.opcionRegional == "") ? this.regionales[0].id : this.opcionRegional;
        }
      });
    this.maestroService.getHorarioTurnoObservable()
      .subscribe(resp => {
        if (resp.status == 200) {
          this.horariosTurno = resp.result.filter((h: HorarioTurno) => h.esHorarioBase);
          this.opcionHorarioTurno = (this.opcionHorarioTurno == 0) ? this.horariosTurno[0].id : this.opcionHorarioTurno;
        }
      });


    this.maestroService.getEstadosCita();
    this.activateRoute.params.subscribe(
      params => {
        if (params['fechaTurno'] != null) {

          this.fechaFiltroTurno = params['fechaTurno'];
          this.opcionRegional = params['idRegional'];
          this.opcionHorarioTurno = params['idHorarioTurno'];
        }
        this.consultarCitas()
        this.spinnerService.hide();
      }

    )

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

  get estadosCita(): EstadoCita[] {
    return this.maestroService.estadosCita;
  }

  get disabledAutoagendar(): boolean {
    return !this.citas.slice().every(cita => cita.idEstado == EstadosCita.SIN_AGENDAR || cita.idEstado == EstadosCita.AGENDADA);
  }
  guardarLocalStorage() {
    localStorage.setItem("fechaTurnoAgenda", this.fechaFiltroTurno);
    localStorage.setItem("idRegionalAgendaFiltro", this.opcionRegional);
    localStorage.setItem("idHorarioTurnoAgendaFiltro", `${this.opcionHorarioTurno}`);
  }
  getRegionalfiltro(idRegional: string) {
    return this.regionales.find(r => r.id == idRegional);
  }
  actualizarRegionalFilter(idRegional: string) {
    this.opcionRegional = idRegional;
    localStorage.setItem("idRegionalAgendaFiltro", this.opcionRegional);
  }
  getHorariofiltro(idHorario: number) {
    return this.horariosTurno.find(h => h.id == idHorario);
  }
  actualizarHorarioFilter(idHorario: number) {
    this.opcionHorarioTurno = idHorario;
    localStorage.setItem("idHorarioTurnoAgendaFiltro", `${this.opcionHorarioTurno}`);
  }
  consultarCitas(): void {
    this.horasTurnoString = generarHorario(this.opcionHorarioTurno);
    this.agendaService.getCitas(this.fechaFiltroTurno, this.opcionRegional, this.opcionHorarioTurno);
    this.agendaService.getActividadesAgendaGantt(this.fechaFiltroTurno, this.opcionRegional, this.opcionHorarioTurno);
    this.horasTurnoString = generarHorario(this.opcionHorarioTurno);
    this.router.navigate(['agenda', this.fechaFiltroTurno, this.opcionRegional, this.opcionHorarioTurno]);
    this.guardarLocalStorage();
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
      this.opcionHorarioTurno,
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
    this.agendaService.desagendarTurnoCompleto(this.citas[0].fechaProgramada, this.opcionHorarioTurno, this.opcionRegional)
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

    const dialogRef = this.dialogoSeleccionProfesional.open(VentanaConfirmacionComponent, {
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
        this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
      } else {
        this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 6)
      }
    });

  }

  actualizarComponenteMainAgenda() {
    this.consultarCitas()
  }
}

