import { Component, AfterViewInit, ViewChild, OnInit, LOCALE_ID } from '@angular/core';
import { NotificacionFarmacia } from '../../interfaces/servicioFarmaceutico.interface';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { HorarioTurno, Regional, formatoFecha } from 'src/app/shared/interfaces/maestros.interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminFarmaciaService } from '../../services/admin-farmacia.service';

@Component({
  selector: 'app-servicio-farmaceutico-page',
  templateUrl: './servicio-farmaceutico-page.component.html',
  styleUrls: ['./servicio-farmaceutico-page.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class ServicioFarmaceuticoPageComponent implements OnInit, AfterViewInit {

  constructor(
    private adminFarmaciaService: AdminFarmaciaService,
    private maestrosService: MaestrosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) { registerLocaleData(localeEs); }

  @ViewChild('paginatorFarmacia') paginator!: MatPaginator;

  displayedColumns: string[] = ['Remisión', 'Paciente', 'Tipo', 'Medicamento', 'Dosis', 'Vía', 'Volumen', 'Fecha programada', 'Notificado'];
  dataSource = new MatTableDataSource<NotificacionFarmacia>([]);
  selection = new SelectionModel<NotificacionFarmacia>(true, []);

  filtroAvanzadoActivado: string = "";
  filtroBusqueda: string = "";
  checkedNotificado: boolean = false;
  checkedSinNotificado: boolean = false;
  checkedDisabledMaster: boolean = false;
  notificacionesCompleta: NotificacionFarmacia[] = [];
  notificacionesSeleccionadas: NotificacionFarmacia[] = [];

  //filtro oculto
  formfiltro = this.formBuilder.group({
    fecha: [formatoFecha(new Date()), Validators.required],
    idHorario: [0, [Validators.required]],
    idRegional: ['', [Validators.required]]
  })

  ngOnInit(): void {
    registerLocaleData(localeEs);
    this.maestrosService.getRegionales();
    this.maestrosService.getHorarioTurno();
    this.dataSource.paginator = this.paginator;
    this.adminFarmaciaService.getNotificacionesFarmacia()
      .subscribe(resp => {
        if (resp.status == 200) {
          this.notificacionesCompleta = resp.result;
          this.dataSource.data = resp.result;
          this.validarMasterCheck();
        }

      });
  }

  ngAfterViewInit() {
    this.spinnerService.show();
    this.dataSource.paginator = this.paginator;
    this.spinnerService.hide();
  }

  get regionales(): Regional[] {
    return this.maestrosService.regionales;
  }
  get horariosTurno(): HorarioTurno[] {
    return this.maestrosService.horariosTurno;
  }

  get fecha() {
    return this.formfiltro.get("fecha")?.value;
  }
  get idHorario() {
    return this.formfiltro.get("idHorario")?.value;
  }
  get idRegional() {
    return this.formfiltro.get("idRegional")?.value;
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

    this.selection.select(...this.dataSource.data.slice().filter(s => !s.notificado));
  }


  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.todoEstaSeleccionado() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  validarDisabledMasterCheck() {
    return this.dataSource.data.slice().filter(d => !d.notificado).length == 0;
  }
  consultaAvanzada() {
    this.spinnerService.show();
    if (this.formfiltro.valid) {
      this.adminFarmaciaService.getNotificacionesFarmaciaWithFilter(
        this.fecha!, this.idHorario!, this.idRegional!)
        .subscribe(resp => {
          this.dataSource.data = resp.result
        })
    }
    this.spinnerService.hide();
  }

  activarFiltro() {
    if (this.filtroAvanzadoActivado == "activate") {
      this.spinnerService.show()
      this.filtroAvanzadoActivado = "";
      this.adminFarmaciaService.getNotificacionesFarmacia();
      this.dataSource.data = this.notificacionesCompleta?.slice();
      this.validarMasterCheck();
      this.spinnerService.hide()

    } else {
      this.filtroAvanzadoActivado = "activate"
    }
  }
  filtrarNotificaciones(): void {
    const textoBuscado = this.filtroBusqueda.toLowerCase();

    if (this.filtroBusqueda.length == 0) {

      this.dataSource.data = this.notificacionesCompleta?.slice();
      this.filtrarByEstadoNotificacion();
    } else {
      this.dataSource.data = this.notificacionesCompleta.slice()
      this.dataSource.data = this.dataSource.data.filter(notificacion => {
        const nombreCompleto = `${notificacion.nombres.toLowerCase()} ${notificacion.apellidos.toLowerCase()}`;
        const numeroIdentificacion = notificacion.numeroIdentificacion.toLowerCase();
        const idRemision = notificacion.idRemision;
        return nombreCompleto.includes(textoBuscado) || numeroIdentificacion.includes(textoBuscado) || idRemision.includes(textoBuscado);

      });
    }
  }

  onCheckboxChangeNotificado(event: any) {
    this.checkedNotificado = event.target.checked;
    this.checkedSinNotificado = false;
    this.deshabilitarCheckbox("check-sin-notificar");
    this.notificacionesSeleccionadas = [];
    this.filtrarByEstadoNotificacion();
    this.selection.clear();

  }
  onCheckboxChangeSinNotificado(event: any) {
    this.checkedSinNotificado = event.target.checked;
    this.checkedNotificado = false;
    this.deshabilitarCheckbox("check-notificado");
    this.filtrarByEstadoNotificacion();
    this.selection.clear();
  }


  deshabilitarCheckbox(idCheckbox: string) {
    const checkbox = document.getElementById(idCheckbox) as HTMLInputElement;
    checkbox.checked = false;
  }

  filtrarByEstadoNotificacion() {
    this.dataSource.data = this.notificacionesCompleta?.slice();
    if (this.checkedNotificado === true && this.checkedSinNotificado === false) {
      this.dataSource.data = this.dataSource.data.filter(notificacion => {
        const notificado = notificacion.notificado
        return notificado === true;
      });
    }
    if (this.checkedSinNotificado === true && this.checkedNotificado === false) {
      this.dataSource.data = this.dataSource.data.filter(notificacion => {
        const notificado = notificacion.notificado
        return notificado === false;
      });
    }

  }
  validarMasterCheck() {
    const hayNotificaciones = this.dataSource.data.filter((notificacion) => !notificacion.notificado).length;
    this.checkedDisabledMaster = (hayNotificaciones == 0)
  }


  hayNotificacionesSeleccionadas() {
    return this.selection.selected.length > 0
  }


  notificarSeleccion(): void {
    this.spinnerService.show();
    this.adminFarmaciaService.notificarMedicamentosToFarmacia(this.selection.selected)
      .subscribe(resp => {
        this.toastService.mostrarToast({ status: resp.status, menssage: resp.message });
        this.ngOnInit();
        this.spinnerService.hide();
      })
  }
  backRemisionesTabla() {
    this.router.navigate(['admin']);
  }

}
