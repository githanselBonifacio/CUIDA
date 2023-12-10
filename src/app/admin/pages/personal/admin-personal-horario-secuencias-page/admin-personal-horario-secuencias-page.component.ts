import { registerLocaleData } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import localeEs from '@angular/common/locales/es';
import { Profesional, Secuencia } from 'src/app/agenda/interfaces/profesional.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModalConfiguracionSecuenciaComponent } from 'src/app/admin/components/modal-configuracion-secuencia/modal-configuracion-secuencia.component';
import { AccionFormulario } from 'src/app/admin/interfaces/enum';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';
import { ModalAccionLimpiarHorarioComponent } from 'src/app/admin/components/modal-accion-limpiar-horario/modal-accion-limpiar-horario.component';
import { ModalAccionAgregarSecuenciaComponent } from 'src/app/admin/components/modal-accion-agregar-secuencia/modal-accion-agregar-secuencia.component';
import { Regional, funtionGetIdTipoIdentificacionById, funtionGetNombreProfesionById, funtionGetNombreRegionalById } from 'src/app/shared/interfaces/maestros.interfaces';
import { ModalInfoResultadosAccionMasivaHorarioComponent } from 'src/app/admin/components/modal-info-resultados-accion-masiva-horario/modal-info-resultados-accion-masiva-horario.component';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';

@Component({
  selector: 'app-admin-personal-horario-secuencias-page',
  templateUrl: './admin-personal-horario-secuencias-page.component.html',
  styleUrls: ['./admin-personal-horario-secuencias-page.component.css']
})
export class AdminPersonalHorarioSecuenciasPageComponent implements OnInit, AfterViewInit {

  constructor(
    private personalService: AdminPersonalService,
    private maestroService: MaestrosService,
    private dialogo: MatDialog,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) { registerLocaleData(localeEs); }


  mostrarListAccionesMasivas = false;

  regionales: Regional[] = [];
  opcionIdRegional: string = localStorage.getItem('idRegionalSecuenciaFiltro') ?? '';


  secuencias: Secuencia[] = [];
  profesionales: Profesional[] = [];
  profesionalesMostrados: Profesional[] = [];

  //funciones
  mostrarNombreTipoIdentificacion = funtionGetIdTipoIdentificacionById;
  mostrarNombreRegional = funtionGetNombreRegionalById;
  mostrarNombreProfesion = funtionGetNombreProfesionById;

  //tabla
  @ViewChild('paginatorPersonalSecuencias') paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'identificación', 'profesional', 'profesión', 'regional'];
  dataSource = new MatTableDataSource<Profesional>();
  selection = new SelectionModel<Profesional>(true, []);
  numerosPaginaSeleccionada = Number(localStorage.getItem('paginasTablaProfesionalSecuencia'));
  numeroPaginasPaginator = [4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.maestroService.getRegionalesObservable().subscribe(resp => {
      if (resp.status == 200) {
        this.regionales = resp.result;
        this.opcionIdRegional = (this.opcionIdRegional == '') ? this.regionales[0].id : this.opcionIdRegional;
      }
    });
    this.maestroService.getTiposIdentificacion();
    this.maestroService.getProfesiones();
    this.maestroService.getHorarioTurno();
    this.consultarSecuencia();
    this.buscarPersonal();

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  get profesiones() {
    return this.maestroService.profesiones;

  }
  get horariosTurnos() {
    return this.maestroService.horariosTurno;
  }
  get tiposIdentificacion() {
    return this.maestroService.tiposIdentificacion
      .filter(tipoIdentificacion => tipoIdentificacion.esMayorEdad == true);
  }

  guardarLocalStorage() {
    localStorage.setItem("idRegionalSecuenciaFiltro", this.opcionIdRegional);
    localStorage.setItem("paginasTablaProfesionalSecuencia", `${this.numerosPaginaSeleccionada}`);
  }
  onPaginateChange(event: PageEvent) {
    this.numerosPaginaSeleccionada = event.pageSize;
    this.guardarLocalStorage();
  }
  actualizarfiltroIdRegional() {
    this.profesionalesMostrados = this.profesionales.slice().filter(p => p.idRegional == this.opcionIdRegional);
    this.dataSource.data = this.profesionalesMostrados;
    this.guardarLocalStorage();
    this.selection.clear();
  }

  buscarPersonal() {
    this.personalService.getAllProfesionales()
      .subscribe(resp => {
        this.profesionales = resp.result;
        this.actualizarfiltroIdRegional()

      })

  }
  consultarSecuencia() {
    this.spinnerService.show()
    this.personalService.getSecuenciasTurno()
      .subscribe(resp => {
        this.secuencias = resp.result
        this.spinnerService.hide()
      });

  }
  mostrarOpcionesMasivas() {
    if (this.mostrarListAccionesMasivas) {
      this.mostrarListAccionesMasivas = false;
    } else {
      this.mostrarListAccionesMasivas = true;
    }
  }

  todoEstaSeleccionado() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  seleccionarTodoFilas() {
    if (this.todoEstaSeleccionado()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.todoEstaSeleccionado() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  abrirModalConfiguracionSecuencia(secuencia?: Secuencia) {
    const dialogRef = this.dialogo.open(ModalConfiguracionSecuenciaComponent, {
      data: {
        secuencia: secuencia,
        accion: secuencia ? AccionFormulario.ACTUALIZAR : AccionFormulario.CREAR
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.spinnerService.show();
      if (result != null) {
        this.personalService.crearSecuenciaTurno(result)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
            } else {
              this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);

            }
            this.consultarSecuencia();
          });
      }
      this.spinnerService.hide();
      this.selection.clear();
    });
  }


  abrirModalAccionLimpiarHorario(profesionales: Profesional[]) {
    const dialogRef = this.dialogo.open(ModalAccionLimpiarHorarioComponent, {
      data: {
        profesionales: profesionales
      }
    })
    dialogRef.afterClosed().subscribe(data => {

      if (data != null) {
        this.spinnerService.show();
        this.personalService.eliminarTurnoProfesionalAccionMasiva(data)
          .subscribe(resp => {
            if (resp.status == 200) {
              if (resp.result?.length > 0) {
                this.dialogo.open(ModalInfoResultadosAccionMasivaHorarioComponent, { data: { "profesionales": this.selection.selected, "turnos": resp.result } });

              } else {
                this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
              }

            } else {
              this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
            }
            this.spinnerService.hide();
            this.selection.clear();
          })
      }
    })
  }

  abrirModalAccionAsignarSecuencia(profesionales: Profesional[]) {
    const dialogRef = this.dialogo.open(ModalAccionAgregarSecuenciaComponent, {
      data: {
        profesionales: profesionales,
        secuencias: this.secuencias
      }
    })

    dialogRef.afterClosed().subscribe(data => {

      if (data != null) {
        this.spinnerService.show();
        this.personalService.asignarTurnoProfesionalAccionMasiva(data)
          .subscribe(resp => {

            if (resp.status == 200) {
              if (resp.result?.length > 0) {
                this.dialogo.open(ModalInfoResultadosAccionMasivaHorarioComponent, { data: { "profesionales": this.selection.selected, "turnos": resp.result } });

              } else {
                this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
              }
            } else {
              this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
            }
            this.spinnerService.hide();
            this.selection.clear();
          })

      }

    })
  }
}
