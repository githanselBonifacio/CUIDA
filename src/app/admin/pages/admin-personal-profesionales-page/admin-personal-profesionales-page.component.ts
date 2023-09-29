import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { getIdTipoIdentificacionById, getNombreProfesionById, getNombreRegionalById } from 'src/app/shared/interfaces/maestros.interfaces';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { AccionFormulario } from '../../interfaces/enum'

@Component({
  selector: 'app-personal-admin-profesionales-page',
  templateUrl: './admin-personal-profesionales-page.component.html',
  styleUrls: ['./admin-personal-profesionales-page.component.css']
})
export class AdminPersonalProfesionalesPageComponent implements OnInit, AfterViewInit {

  constructor(
    public dialogRef: MatDialog,
    private agendaService: AgendaService,
    private maestrosService: MaestrosService) { }

  @ViewChild('paginatorProfesionales') paginator!: MatPaginator;
  columnas: string[] = ['TipoIdentificacion', 'Nombres', 'Apellidos', 'Regional', "Profesion", "acciones"];
  profesionalesSource = new MatTableDataSource<Profesional>([]);
  accionFormulario = AccionFormulario.CREAR;
  estadoVisualFormCrearProfesional?: string;
  profesionalSeleccionado?: Profesional;
  tituloButtomDesplagarForm = "Crear profesional";


  ngOnInit(): void {
    this.estadoVisualFormCrearProfesional = "";
    this.maestrosService.getTiposIdentificacion();
    this.maestrosService.getRegionales();
    this.maestrosService.getProfesiones();
    this.agendaService.getAllProfesionales()
      .subscribe(
        resp => {
          this.profesionalesSource.data = resp.result;
        }

      );

  }
  actualizarDatos() {
    this.agendaService.getAllProfesionales()
      .subscribe(
        resp => {
          this.profesionalesSource.data = resp.result;
          this.paginator.pageIndex = 0;
        }

      );

  }

  ngAfterViewInit(): void {
    this.profesionalesSource.paginator = this.paginator;
  }

  get tiposIdentificacion() {
    return this.maestrosService.tiposIdentificacion;
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

  getNombreTipoIdentificacion(id: number) {
    return getIdTipoIdentificacionById(id, this.tiposIdentificacion)
  }

  getNombreRegional(id: string) {
    return getNombreRegionalById(id, this.regionales)
  }

  getNombreProfesion(id: number) {
    return getNombreProfesionById(id, this.profesiones)
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
