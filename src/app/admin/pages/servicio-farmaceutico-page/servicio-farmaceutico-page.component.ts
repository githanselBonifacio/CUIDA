import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { NotificacionFarmacia } from '../../interfaces/servicioFarmaceutico.interface';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { HorarioTurno, Regional, formatoFecha } from 'src/app/shared/interfaces/maestros.interfaces';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-servicio-farmaceutico-page',
  templateUrl: './servicio-farmaceutico-page.component.html',
  styleUrls: ['./servicio-farmaceutico-page.component.css']
})
export class ServicioFarmaceuticoPageComponent implements OnInit, AfterViewInit {

  constructor(
    private adminService: AdminRemisionService,
    private maestrosService: MaestrosService,
    private router: Router,
    private formBuilder: FormBuilder,
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

  //filtro oculto
  formfiltro = this.formBuilder.group({
    fecha: [formatoFecha(new Date()), Validators.required],
    idHorario: [0, [Validators.required]],
    idRegional: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.maestrosService.getRegionales();
    this.maestrosService.getHorarioTurno();
    this.dataSource.paginator = this.paginator;
    this.adminService.getNotificacionesFarmacia()
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

  consultaAvanzada() {
    this.spinnerService.show();
    if (this.formfiltro.valid) {
      this.adminService.getNotificacionesFarmaciaWithFilter(
        this.fecha ?? '', this.idHorario ?? 0, this.idRegional ?? '')
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
      this.adminService.getNotificacionesFarmacia();
      this.dataSource.data = this.notificacionesCompleta.slice();
      this.validarMasterCheck();
      this.spinnerService.hide()

    } else {
      this.filtroAvanzadoActivado = "activate"
    }
  }
  filtrarNotificaciones(): void {
    const textoBuscado = this.filtroBusqueda.toLowerCase();

    if (this.filtroBusqueda.length == 0) {

      this.dataSource.data = this.notificacionesCompleta.slice();
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
    this.quitarSeleccionCompleta();
    this.validarMasterCheck()
  }
  onCheckboxChangeSinNotificado(event: any) {
    this.checkedSinNotificado = event.target.checked;
    this.checkedNotificado = false;
    this.deshabilitarCheckbox("check-notificado");
    this.filtrarByEstadoNotificacion();
    this.quitarSeleccionCompleta();
    this.validarMasterCheck()
  }


  deshabilitarCheckbox(idCheckbox: string) {
    const checkbox = document.getElementById(idCheckbox) as HTMLInputElement;
    checkbox.checked = false;
  }

  filtrarByEstadoNotificacion() {
    console.log(`notificado: ${this.checkedNotificado}; sin notificar: ${this.checkedSinNotificado}`)
    this.dataSource.data = this.notificacionesCompleta.slice();
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
    return this.notificacionesSeleccionadas.length > 0
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

      this.notificacionesSeleccionadas = this.dataSource.data.slice()
        .filter(notificacion => notificacion.notificado == false);
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
