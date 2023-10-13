import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { AdminRemisionService } from '../../../services/admin-remision.service';
import { MatPaginator } from '@angular/material/paginator';
import { Movil } from 'src/app/agenda/interfaces/conductores.interface';
import { MatTableDataSource } from '@angular/material/table';
import { AccionFormulario } from '../../../interfaces/enum';
import { funtionGetNombreRegionalById } from '../../../../shared/interfaces/maestros.interfaces';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-admin-personal-vehiculos-page',
  templateUrl: './admin-personal-vehiculos-page.component.html',
  styleUrls: ['./admin-personal-vehiculos-page.component.css']
})
export class AdminPersonalVehiculosPageComponent implements OnInit, AfterViewInit {

  constructor(
    private adminService: AdminRemisionService,
    private maestrosService: MaestrosService) { }

  @ViewChild('paginatorVehiculo') paginator!: MatPaginator;

  columnas: string[] = ['matricula', 'marca', 'modelo', 'regional', "acciones"];
  movilesSource = new MatTableDataSource<Movil>([]);

  accionFormulario = AccionFormulario.CREAR;
  estadoVisualFormCrear?: string;
  movilSeleccionado?: Movil;
  tituloButtomDesplagarForm = "Crear vehiculo";
  converIdRegional = funtionGetNombreRegionalById;

  ngOnInit(): void {
    registerLocaleData(localeEs);
    this.estadoVisualFormCrear = "";
    this.maestrosService.getTiposIdentificacion();
    this.maestrosService.getRegionales();
    this.adminService.getAllMoviles().subscribe(resp => {
      if (resp.status === 200) {
        this.movilesSource.data = resp.result;
      }
    })
  }
  ngAfterViewInit(): void {
    this.movilesSource.paginator = this.paginator;
  }

  get regionales() {
    return this.maestrosService.regionales;
  }

  actualizarDatos() {
    this.adminService.getAllMoviles()
      .subscribe(
        resp => {
          this.movilesSource.data = resp.result;
          this.paginator.pageIndex = 0;
        }

      );

  }
  mostrarFormularioCrearMovil() {

    if (this.estadoVisualFormCrear == 'activate') {
      this.estadoVisualFormCrear = ""
    } else {
      this.estadoVisualFormCrear = "activate"
    }
  }
  getIconActivar(estado: boolean) {
    if (estado) {
      return "on"
    } else {
      return "off"
    }

  }
  volverCrear() {
    this.accionFormulario = AccionFormulario.CREAR;
    this.movilSeleccionado = undefined;
    this.cambiarAccionFormulario()
  }
  cambiarAccionFormulario() {
    this.tituloButtomDesplagarForm = (this.accionFormulario === AccionFormulario.CREAR) ? "Crear vehículo" : "Actualizar vehículo";
  }
  abrirFormEditarMovil(movilActualizar: Movil) {
    this.accionFormulario = AccionFormulario.ACTUALIZAR;
    this.cambiarAccionFormulario()
    this.movilSeleccionado = movilActualizar;
    const buttomDesplegarForm = document.getElementById("desplegar-form");
    const btn = buttomDesplegarForm as HTMLButtonElement

    if (!btn?.getAttribute("class")?.includes("activate")) {
      buttomDesplegarForm?.click()
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"

    })

  }
}


