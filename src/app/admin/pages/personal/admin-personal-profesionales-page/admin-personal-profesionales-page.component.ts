import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';
import { funtionGetIdTipoIdentificacionById, funtionGetNombreProfesionById, funtionGetNombreRegionalById } from 'src/app/shared/interfaces/maestros.interfaces';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { AccionFormulario } from '../../../interfaces/enum'
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';

@Component({
  selector: 'app-personal-admin-profesionales-page',
  templateUrl: './admin-personal-profesionales-page.component.html',
  styleUrls: ['./admin-personal-profesionales-page.component.css']
})
export class AdminPersonalProfesionalesPageComponent implements OnInit, AfterViewInit {

  constructor(
    public dialogRef: MatDialog,
    private personalService: AdminPersonalService,
    private maestrosService: MaestrosService) { }

  @ViewChild('paginatorProfesionales') paginator!: MatPaginator;
  columnas: string[] = ['TipoIdentificacion', 'Nombres', 'Apellidos', 'Regional', "Profesion", "acciones"];
  profesionalesSource = new MatTableDataSource<Profesional>([]);
  pageSizeOptions = [7, 8, 9, 10, 15, 20, 50, 100];
  accionFormulario = AccionFormulario.CREAR;
  estadoVisualFormCrearProfesional?: string;
  profesionalSeleccionado?: Profesional;
  tituloButtomDesplagarForm = "Crear profesional";

  mostrarNombreTipoIdentificacion = funtionGetIdTipoIdentificacionById;
  mostrarNombreRegional = funtionGetNombreRegionalById;
  mostrarNombreProfesion = funtionGetNombreProfesionById;

  ngOnInit(): void {
    this.estadoVisualFormCrearProfesional = "";
    this.maestrosService.getTiposIdentificacion();
    this.maestrosService.getRegionales();
    this.maestrosService.getProfesiones();
    this.personalService.getAllProfesionales()
      .subscribe(
        resp => {
          this.profesionalesSource.data = resp.result;
        }

      );

  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.profesionalesSource.paginator = this.paginator;
      this.paginator.pageSize = parseInt(`${localStorage.getItem("pageSizeProfesional")}` ?? `${this.pageSizeOptions[0]}`);
    });

  }

  actualizarDatos() {
    this.personalService.getAllProfesionales()
      .subscribe(
        resp => {
          this.profesionalesSource.data = resp.result;
          this.paginator.pageIndex = 0;
        }

      );

  }

  actualizarPage() {
    localStorage.setItem("pageSizeProfesional", `${this.paginator.pageSize}`)
  }
  get tiposIdentificacion() {
    return this.maestrosService.tiposIdentificacion
      .filter(tipoIdentificacion => tipoIdentificacion.esMayorEdad == true);
  }

  get regionales() {
    return this.maestrosService.regionales;
  }

  get profesiones() {
    return this.maestrosService.profesiones;
  }
  mostrarFormularioCrearProfesional() {

    if (this.estadoVisualFormCrearProfesional == 'activate') {
      this.estadoVisualFormCrearProfesional = ""
    } else {
      this.estadoVisualFormCrearProfesional = "activate"
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
    this.profesionalSeleccionado = undefined;
    this.cambiarAccionFormulario()
  }
  cambiarAccionFormulario() {
    this.tituloButtomDesplagarForm = (this.accionFormulario === AccionFormulario.CREAR) ? "Crear profesional" : "Actualizar profesional";
  }
  abrirFormEditarProfesional(profesionalActualizar: Profesional) {
    this.accionFormulario = AccionFormulario.ACTUALIZAR;
    this.cambiarAccionFormulario()
    this.profesionalSeleccionado = profesionalActualizar;
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
