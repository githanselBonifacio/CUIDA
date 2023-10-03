import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { AccionFormulario } from '../../interfaces/enum';
import { Conductor } from 'src/app/agenda/interfaces/conductores.interface';
import { funtionGetIdTipoIdentificacionById, funtionGetNombreRegionalById } from 'src/app/shared/interfaces/maestros.interfaces';
import { AdminRemisionService } from '../../services/admin-remision.service';

@Component({
  selector: 'app-admin-personal-conductores-page',
  templateUrl: './admin-personal-conductores-page.component.html',
  styleUrls: ['./admin-personal-conductores-page.component.css']
})
export class AdminPersonalConductoresPageComponent implements OnInit, AfterViewInit {

  constructor(
    private adminService: AdminRemisionService,
    private maestrosService: MaestrosService) { }

  @ViewChild('paginatorConductor') paginator!: MatPaginator;
  columnas: string[] = ['TipoIdentificacion', 'Nombres', 'Apellidos', 'Regional', "acciones"];
  conductoresSource = new MatTableDataSource<Conductor>([]);
  accionFormulario = AccionFormulario.CREAR;
  estadoVisualFormCrear?: string;
  conductorSeleccionado?: Conductor;
  tituloButtomDesplagarForm = "Crear conductor";
  convetIdTipoIdentificacion = funtionGetIdTipoIdentificacionById;
  convetIdRegional = funtionGetNombreRegionalById;

  ngOnInit(): void {
    this.estadoVisualFormCrear = "";
    this.maestrosService.getTiposIdentificacion();
    this.maestrosService.getRegionales();
    this.adminService.getAllConductores().subscribe(resp => {
      if (resp.status === 200) {
        this.conductoresSource.data = resp.result;
      }
    })
  }
  actualizarDatos() {
    this.adminService.getAllConductores().subscribe(resp => {
      if (resp.status === 200) {
        this.conductoresSource.data = resp.result;
        this.paginator.pageIndex = 0;
      }
    })
  }

  ngAfterViewInit(): void {
    this.conductoresSource.paginator = this.paginator;
  }

  get tiposIdentificacion() {
    return this.maestrosService.tiposIdentificacion
      .filter(tipoIdentificacion => tipoIdentificacion.esMayorEdad == true);;
  }

  get regionales() {
    return this.maestrosService.regionales;
  }


  mostrarFormularioCrearConductor() {

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
    this.conductorSeleccionado = undefined;
    this.cambiarAccionFormulario()
  }
  cambiarAccionFormulario() {
    this.tituloButtomDesplagarForm = (this.accionFormulario === AccionFormulario.CREAR) ? "Crear conductor" : "Actualizar conductor";
  }
  abrirFormEditarProfesional(conductorActualizar: Conductor) {
    this.accionFormulario = AccionFormulario.ACTUALIZAR;
    this.cambiarAccionFormulario()
    this.conductorSeleccionado = conductorActualizar;
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
