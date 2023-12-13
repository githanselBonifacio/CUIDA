import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { MatPaginator } from '@angular/material/paginator';
import { Movil } from 'src/app/shared/interfaces/agenda/conductores.interface';
import { MatTableDataSource } from '@angular/material/table';
import { AccionFormulario } from '../../../../shared/interfaces/general/enum';
import { funtionGetNombreRegionalById } from '../../../../shared/interfaces/maestros/maestros.interfaces';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';

@Component({
  selector: 'app-admin-personal-vehiculos-page',
  templateUrl: './admin-personal-vehiculos-page.component.html',
  styleUrls: ['./admin-personal-vehiculos-page.component.css']
})
export class AdminPersonalVehiculosPageComponent implements OnInit, AfterViewInit {

  constructor(
    private personalService: AdminPersonalService,
    private maestrosService: MaestrosService) { }

  @ViewChild('paginatorVehiculo') paginator!: MatPaginator;

  columnas: string[] = ['matricula', 'marca', 'modelo', 'regional', "acciones"];
  movilesSource = new MatTableDataSource<Movil>([]);
  pageSizeOptions = [7, 8, 9, 10, 15, 20, 50, 100];

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
    this.personalService.getAllMoviles().subscribe(resp => {
      if (resp.status === 200) {
        this.movilesSource.data = resp.result;
      }
    })
  }
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.movilesSource.paginator = this.paginator;
      this.paginator.pageSize = parseInt(`${localStorage.getItem("pageSizeVehiculo")}` ?? `${this.pageSizeOptions[0]}`);
    });
  }

  get regionales() {
    return this.maestrosService.regionales;
  }

  actualizarPage() {
    localStorage.setItem("pageSizeVehiculo", `${this.paginator.pageSize}`)
  }

  actualizarDatos() {
    this.personalService.getAllMoviles()
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


