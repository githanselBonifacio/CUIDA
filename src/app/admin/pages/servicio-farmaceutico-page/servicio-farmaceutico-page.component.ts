import { Component, AfterViewInit, ViewChild, OnInit, SimpleChanges } from '@angular/core';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { NotificacionFarmacia } from '../../interfaces/servicioFarmaceutico.interface';
import { ToastComponent, TitleToast, crearConfig, ToastType } from 'src/app/shared/components/toast/toast.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-servicio-farmaceutico-page',
  templateUrl: './servicio-farmaceutico-page.component.html',
  styleUrls: ['./servicio-farmaceutico-page.component.css']
})
export class ServicioFarmaceuticoPageComponent implements OnInit, AfterViewInit {

  constructor(
    private adminService: AdminRemisionService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) { }

  @ViewChild('paginatorFarmacia') paginator!: MatPaginator;

  displayedColumns: string[] = ['Remisión', 'Paciente', 'Tipo', 'Medicamento', 'Dosis', 'Vía', 'Volumen', 'Fecha programada', 'Notificado'];
  dataSource = new MatTableDataSource<NotificacionFarmacia>([]);

  filtroAvanzadoActivado: string = "";
  filtroBusqueda: string = "";
  checkedNotificado: boolean = false;
  checkedSinNotificado: boolean = false;
  checkedDisabledMaster: boolean = false;
  notificacionesCompleta: NotificacionFarmacia[] = [];
  notificacionesSeleccionadas: NotificacionFarmacia[] = [];


  ngOnInit(): void {
    this.notificacionesSeleccionadas = [];
    this.dataSource.paginator = this.paginator;
    this.adminService.getNotificacionesFarmacia()
      .subscribe(resp => {
        if (resp.status == 200) {
          this.notificacionesCompleta = resp.result;
          this.dataSource.data = this.notificacionesCompleta;
          this.validarMasterCheck();
          setTimeout(() => {
            this.cdr.detectChanges();
          });
        }

      });
  }

  ngAfterViewInit() {
    this.spinnerService.show();
    this.dataSource.paginator = this.paginator;
    this.spinnerService.hide();
  }

  activarFiltro() {
    if (this.filtroAvanzadoActivado == "activate") {
      this.filtroAvanzadoActivado = "";
    } else {
      this.filtroAvanzadoActivado = "activate"
    }
  }
  filtrarNotificaciones(): void {
    const textoBuscado = this.filtroBusqueda.toLowerCase();

    if (this.filtroBusqueda.length == 0) {

      this.dataSource.data = this.notificacionesCompleta;
      this.filtrarByEstadoNotificacion();
    } else {
      this.dataSource.data = this.dataSource.data.filter(notificacion => {
        const nombreCompleto = `${notificacion.nombres.toLowerCase()} ${notificacion.apellidos.toLowerCase()}`;
        const numeroIdentificacion = notificacion.numeroIdentificacion.toLowerCase();
        const idRemision = notificacion.idRemision;
        return nombreCompleto.includes(textoBuscado) || numeroIdentificacion.includes(textoBuscado) || idRemision.includes(textoBuscado);

      });
    }
  }

  filtrarByEstadoNotificacion() {
    this.dataSource.data = this.notificacionesCompleta;
    if (this.checkedNotificado === true && this.checkedSinNotificado === false) {
      this.dataSource.data = this.dataSource.data.filter(notificacion => {
        const notificado = notificacion.notificado
        return notificado === true;
      });
    }
    if (this.checkedNotificado === false && this.checkedSinNotificado === true) {
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
    return this.notificacionesSeleccionadas.length > 0
  }

  onCheckboxChangeNotificado(event: any) {
    this.checkedNotificado = event.target.checked;
    this.filtrarByEstadoNotificacion();
    this.quitarSeleccionCompleta();
    this.validarMasterCheck()
  }
  onCheckboxChangeSinNotificado(event: any) {
    this.checkedSinNotificado = event.target.checked;
    this.filtrarByEstadoNotificacion();
    this.quitarSeleccionCompleta();
    this.validarMasterCheck()
  }

  agregarListaSeleccionada(notificacionSeleccionada: NotificacionFarmacia, event: any): void {
    this.quitarSeleccionCompleta();
    const checkbox = document.getElementById(`${(notificacionSeleccionada.idTratamiento ?? 0) + (notificacionSeleccionada.idSoporteNutricional ?? 0)}`);
    var tr = checkbox?.closest('tr');
    if (event.target.checked) {

      this.notificacionesSeleccionadas.push(notificacionSeleccionada);
      tr?.setAttribute("activaCelta", "true")
    } else {
      tr?.setAttribute("activaCelta", "false")
      this.notificacionesSeleccionadas = this.notificacionesSeleccionadas.filter(notificacion => {
        const idTratamiento = notificacionSeleccionada.idTratamiento;
        const idSoporteNutricional = notificacionSeleccionada.idSoporteNutricional;
        if (idTratamiento != null && notificacion.idTratamiento != null) {

          return notificacion.idTratamiento != idTratamiento;
        } else if (idSoporteNutricional != null && notificacion.idSoporteNutricional != null) {

          return notificacion.idSoporteNutricional != idSoporteNutricional;
        } else {
          return true;
        }

      });
    }
    this.checkedMasterListaCompleta();
    this.validarMasterCheck();

  }
  handlePageChange(event: any): void {
    this.notificacionesSeleccionadas = [];
    const checkboxMaster = document.getElementById('master-check') as HTMLInputElement;
    checkboxMaster.checked = false;
  }

  quitarSeleccionCompleta(): void {

    const checkboxMaster = document.getElementById('master-check') as HTMLInputElement;
    checkboxMaster.checked = false;

  }
  checkedMasterListaCompleta(): void {

    if (this.notificacionesSeleccionadas.length === this.dataSource.data.length) {
      const checkboxMaster = document.getElementById('master-check') as HTMLInputElement;
      checkboxMaster.checked = true;

    }
  }
  agregarTodasNotificacionesMostradas(event: any): void {

    const checkboxes = document.getElementsByName('individual-check');

    for (var i = 0; i < checkboxes.length; i++) {
      const check = checkboxes[i] as HTMLInputElement;
      var tr = checkboxes[i]?.closest('tr');
      if (check.type === 'checkbox' && !check.disabled) {
        check.checked = event.target.checked;
        tr?.setAttribute("activaCelta", `${check.checked}`)
      }
    }
    if (event.target.checked) {

      this.notificacionesSeleccionadas = this.dataSource.data;
    } else {

      this.notificacionesSeleccionadas = [];
    }

  }
  notificarSeleccion(): void {
    this.spinnerService.show();
    this.adminService.notificarMedicamentosToFarmacia(this.notificacionesSeleccionadas)
      .subscribe(resp => {
        if (resp.status == 200) {

          this.toastService.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5)
        } else {

          this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5)
        }
        const checkboxMaster = document.getElementById('master-check') as HTMLInputElement;
        checkboxMaster.checked = false;
        this.ngOnInit();
        this.spinnerService.hide();
      })
  }
  backRemisionesTabla() {
    this.router.navigate(['admin']);
  }

}
