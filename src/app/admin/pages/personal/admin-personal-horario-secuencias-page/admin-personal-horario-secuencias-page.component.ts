import { DatePipe, registerLocaleData } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminRemisionService } from 'src/app/admin/services/admin-remision.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import localeEs from '@angular/common/locales/es';
import { Profesional, Secuencia } from 'src/app/agenda/interfaces/profesional.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalConfiguracionSecuenciaComponent } from 'src/app/admin/components/modal-configuracion-secuencia/modal-configuracion-secuencia.component';
import { AccionFormulario } from 'src/app/admin/interfaces/enum';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalAccionLimpiarHorarioComponent } from 'src/app/admin/components/modal-accion-limpiar-horario/modal-accion-limpiar-horario.component';

@Component({
  selector: 'app-admin-personal-horario-secuencias-page',
  templateUrl: './admin-personal-horario-secuencias-page.component.html',
  styleUrls: ['./admin-personal-horario-secuencias-page.component.css']
})
export class AdminPersonalHorarioSecuenciasPageComponent implements OnInit, AfterViewInit {

  constructor(
    private adminService: AdminRemisionService,
    private maestroService: MaestrosService,
    private dialogo: MatDialog,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) { registerLocaleData(localeEs); }


  mostrarListAccionesMasivas = false;

  mesFiltro: string = '2023-07'//formatoFecha(new Date()).slice(0, 7);
  opcionIdRegional: string = "427";


  secuencias: Secuencia[] = [];

  //tablas
  @ViewChild('paginatorPersonalSecuencias') paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'identificacion', 'profesional', 'profesion', 'regional'];
  dataSource = new MatTableDataSource<Profesional>();
  selection = new SelectionModel<Profesional>(true, []);

  ngOnInit(): void {
    this.spinnerService.show()
    this.maestroService.getRegionales();
    this.maestroService.getProfesiones();
    this.maestroService.getHorarioTurno();
    this.consultarSecuencia();
    this.buscarPersonal();
  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
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

  buscarPersonal() {

    this.adminService.getProfesionalesRegional(this.opcionIdRegional)
      .subscribe(resp => {
        this.dataSource.data = resp.result;

      })
  }
  consultarSecuencia() {
    this.spinnerService.show()
    this.adminService.getSecuenciasTurno().subscribe(resp => {
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
      if (result != null) {
        this.spinnerService.show();
        this.adminService.crearSecuenciaTurno(result)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
            } else {
              this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
            }
            this.consultarSecuencia();
            this.spinnerService.hide();
          });
      }
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
        this.adminService.eliminarTurnoProfesionalAccionMasiva(data)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
            } else {
              this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
            }
          })
      }
    })
  }
  abrirModalAccionAsignarSecuencia(profesionales: Profesional[]) {
    window.alert("asignar secuencia")
  }
}
