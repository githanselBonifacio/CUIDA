import { Component, OnInit } from '@angular/core';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { NotificacionFarmacia } from '../../interfaces/servicioFarmaceutico.interface';
import { ToastComponent, TitleToast, crearConfig, ToastType } from 'src/app/shared/components/toast/toast.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-servicio-farmaceutico-page',
  templateUrl: './servicio-farmaceutico-page.component.html',
  styleUrls: ['./servicio-farmaceutico-page.component.css']
})
export class ServicioFarmaceuticoPageComponent implements OnInit {

  constructor(
    private adminService: AdminRemisionService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  currentPage: number = 1;
  totalItems: number = 0;
  filtroBusqueda: string = "";
  checkedNotificado: boolean = false;
  checkedSinNotificado: boolean = false;
  notificacionesCompleta: NotificacionFarmacia[] = [];
  notificacionesMostradas: NotificacionFarmacia[] = [];
  notificacionesSeleccionadas: NotificacionFarmacia[] = [];

  ngOnInit() {
    this.notificacionesSeleccionadas = [];
    this.adminService.getNotificacionesFarmacia()
      .subscribe(resp => {
        if (resp.status == 200) {
          this.notificacionesCompleta = resp.result;
          this.totalItems = this.notificacionesCompleta.length;
          this.notificacionesMostradas = this.notificacionesCompleta;
        }

      });
  }

  filtrarNotificaciones(): void {
    const textoBuscado = this.filtroBusqueda.toLowerCase();

    if (this.filtroBusqueda.length == 0) {

      this.notificacionesMostradas = this.notificacionesCompleta;
      this.filtrarByEstadoNotificacion();
    } else {
      this.notificacionesMostradas = this.notificacionesMostradas.filter(notificacion => {
        const nombreCompleto = `${notificacion.nombres.toLowerCase()} ${notificacion.apellidos.toLowerCase()}`;
        const numeroIdentificacion = notificacion.numeroIdentificacion.toLowerCase();
        const idRemision = notificacion.idRemision;
        return nombreCompleto.includes(textoBuscado) || numeroIdentificacion.includes(textoBuscado) || idRemision.includes(textoBuscado);

      });
      this.totalItems = this.notificacionesMostradas.length;
    }
  }

  filtrarByEstadoNotificacion() {
    this.notificacionesMostradas = this.notificacionesCompleta;
    if (this.checkedNotificado === true && this.checkedSinNotificado === false) {
      this.notificacionesMostradas = this.notificacionesMostradas.filter(notificacion => {
        const notificado = notificacion.notificado
        return notificado === true;
      });
    }
    if (this.checkedNotificado === false && this.checkedSinNotificado === true) {
      this.notificacionesMostradas = this.notificacionesMostradas.filter(notificacion => {
        const notificado = notificacion.notificado
        return notificado === false;
      });
    }


    this.totalItems = this.notificacionesMostradas.length;
  }

  hayNotificacionesSeleccionadas() {
    return this.notificacionesSeleccionadas.length > 0
  }

  onCheckboxChangeNotificado(event: any) {
    this.checkedNotificado = event.target.checked;
    this.filtrarByEstadoNotificacion();
    this.quitarSeleccionCompleta();
  }
  onCheckboxChangeSinNotificado(event: any) {
    this.checkedSinNotificado = event.target.checked;
    this.filtrarByEstadoNotificacion();
    this.quitarSeleccionCompleta();
  }

  agregarListaSeleccionada(notificacionSeleccionada: NotificacionFarmacia, event: any): void {
    this.quitarSeleccionCompleta();

    if (event.target.checked) {
      this.notificacionesSeleccionadas.push(notificacionSeleccionada);

    } else {
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

  }
  handlePageChange(event: any): void {
    this.notificacionesSeleccionadas = [];
  }

  quitarSeleccionCompleta(): void {

    const checkboxMaster = document.getElementById('master-check') as HTMLInputElement;
    checkboxMaster.checked = false;

  }
  checkedMasterListaCompleta(): void {

    if (this.notificacionesSeleccionadas.length === this.notificacionesMostradas.length) {
      const checkboxMaster = document.getElementById('master-check') as HTMLInputElement;
      checkboxMaster.checked = true;

    }
  }
  agregarTodasNotificacionesMostradas(event: any): void {

    const checkboxes = document.getElementsByName('individual-check');
    for (var i = 0; i < checkboxes.length; i++) {
      const check = checkboxes[i] as HTMLInputElement;
      if (check.type === 'checkbox') {
        check.checked = event.target.checked;
      }
    }
    if (event.target.checked) {
      this.notificacionesSeleccionadas = this.notificacionesMostradas;
    } else {
      this.notificacionesSeleccionadas = [];
    }

  }
  notificarSeleccion(): void {

    this.adminService.notificarMedicamentosToFarmacia(this.notificacionesSeleccionadas)
      .subscribe(resp => {
        if (resp.status == 200) {
          this.ngOnInit();
          this.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5)
        } else {
          this.ngOnInit();
          this.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5)
        }
      })
  }
  backRemisionesTabla() {
    this.router.navigate(['admin']);
  }

  mostrarToast(tipo: ToastType, titulo: TitleToast, mensaje: string, duracion: number) {
    const config: MatSnackBarConfig = crearConfig(tipo, titulo, mensaje, duracion)
    this._snackBar.openFromComponent(ToastComponent, config)
  }

}
