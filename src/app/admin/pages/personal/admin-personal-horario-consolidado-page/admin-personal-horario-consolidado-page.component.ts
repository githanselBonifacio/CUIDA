
import { Component, OnInit } from '@angular/core';
import { AdminRemisionService } from 'src/app/admin/services/admin-remision.service';
import { ConvertTurno, ProfesionalConTurnos, Turno } from 'src/app/agenda/interfaces/profesional.interface';
import { Dia, funtionGetColorReferenciaTurnoById, funtionGetNombreProfesionById } from 'src/app/shared/interfaces/maestros.interfaces';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAsignarTurnoIndividualComponent } from 'src/app/admin/components/modal-asignar-turno-individual/modal-asignar-turno-individual.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';
@Component({
  selector: 'app-admin-personal-horario-consolidado-page',
  templateUrl: './admin-personal-horario-consolidado-page.component.html',
  styleUrls: ['./admin-personal-horario-consolidado-page.component.css']
})
export class AdminPersonalHorarioConsolidadoPageComponent implements OnInit {

  constructor(
    private adminService: AdminRemisionService,
    private maestroService: MaestrosService,
    private dialogo: MatDialog,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) { registerLocaleData(localeEs); }

  getNombreProfesion = funtionGetNombreProfesionById;
  getColorRefenciaTurno = funtionGetColorReferenciaTurnoById;
  currentPagePaginator = 1;
  numerosPaginaSeleccionada = 4;
  numeroPaginasPaginator = [4, 5, 6, 7, 8, 9, 10];
  inputTextPersonal = "";
  placeHolderVisible = true;
  diasSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  dias: Dia[] = [];
  mesFiltro: string = '2023-07'//formatoFecha(new Date()).slice(0, 7);
  opcionIdRegional: string = "427";
  profesionales: ProfesionalConTurnos[] = [];
  profesionalesMostrados: ProfesionalConTurnos[] = [];

  ngOnInit(): void {
    this.maestroService.getRegionales();
    this.maestroService.getProfesiones();
    this.maestroService.getHorarioTurno();
    this.buscarTurno();
  }

  get regionales() {
    return this.maestroService.regionales;

  }
  get profesiones() {
    return this.maestroService.profesiones;

  }
  get horariosTurnos() {
    return this.maestroService.horariosTurno;
  }

  buscarTurno() {
    this.spinnerService.show()
    this.currentPagePaginator = 1;
    this.dias = [];
    const fecha = new Date(`${this.mesFiltro}-02`)
    const mes = fecha.getMonth();
    const year = fecha.getFullYear();
    const diasEnMes = new Date(year, mes + 1, 0).getDate();
    for (let i = 1; i <= diasEnMes; i++) {
      const date = new Date(year, mes, i);
      const day = {
        numero: `${i}`.padStart(2, '0'),
        nombre: this.diasSemana[date.getDay()]
      };
      this.dias.push(day);
    }

    this.adminService.getProfesionalesWithTurno(this.mesFiltro, this.opcionIdRegional)

      .subscribe(resp => {
        this.profesionales = resp.result;
        this.profesionalesMostrados = resp.result;
        this.placeHolderVisible = false;
        this.spinnerService.hide()
      })
  }

  filtrarPersonal() {
    this.profesionalesMostrados = this.profesionales.slice().filter(p => {
      const filtroBusqueda = this.inputTextPersonal.toLowerCase();
      const nombres = p.nombres.toLowerCase();
      const apellidos = p.apellidos.toLowerCase();
      const nombreCompleto = `${nombres} ${apellidos}`
      const numeroIdentificacion = p.numeroIdentificacion;

      return nombres.includes(filtroBusqueda) ||
        apellidos.includes(filtroBusqueda) ||
        nombreCompleto.includes(filtroBusqueda) ||
        numeroIdentificacion.includes(filtroBusqueda)

    })
  }

  filtrarTurnoAsignadoDia(dia: string, turnos: Turno[]) {
    if (turnos.length > 0) {
      return turnos.slice().filter(t => `${t.fechaTurno}`.slice(8) == dia)
    } else {
      return []
    }

  }
  openDialogAsignarTurno(dia: string, profesionalSeleccionado: ProfesionalConTurnos) {

    const dialogoRef = this.dialogo.open(ModalAsignarTurnoIndividualComponent, {
      data: {
        fechaTurno: this.mesFiltro.concat(`-${dia}`),
        dia: dia,
        profesional: profesionalSeleccionado,
        horariosTurno: this.horariosTurnos
      }
    })
    dialogoRef.afterClosed().subscribe(turnos => {
      if (turnos != null) {
        this.adminService.actualizarTurnoProfesional(turnos).subscribe(
          resp => {
            if (resp.status == 200) {
              this.buscarTurno();
              this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
            } else {
              this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
            }
          }
        )
      }
    })
  }

}


