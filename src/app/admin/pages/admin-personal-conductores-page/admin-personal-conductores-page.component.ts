import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { AccionFormulario } from '../../interfaces/enum';
import { Conductor } from 'src/app/agenda/interfaces/conductores.interface';
import { getIdTipoIdentificacionById, getNombreRegionalById } from 'src/app/shared/interfaces/maestros.interfaces';

@Component({
  selector: 'app-admin-personal-conductores-page',
  templateUrl: './admin-personal-conductores-page.component.html',
  styleUrls: ['./admin-personal-conductores-page.component.css']
})
export class AdminPersonalConductoresPageComponent {

  constructor(
    public dialogRef: MatDialog,
    private agendaService: AgendaService,
    private maestrosService: MaestrosService) { }

  @ViewChild('paginatorConductor') paginator!: MatPaginator;
  columnas: string[] = ['TipoIdentificacion', 'Nombres', 'Apellidos', 'Regional', "acciones"];
  conductoresSource = new MatTableDataSource<Conductor>([]);
  accionFormulario = AccionFormulario.CREAR;
  estadoVisualFormCrear?: string;
  conductorSeleccionado?: Conductor;
  tituloButtomDesplagarForm = "Crear conductor";


  ngOnInit(): void {
    this.estadoVisualFormCrear = "";
    this.maestrosService.getTiposIdentificacion();
    this.maestrosService.getRegionales();
    this.agendaService.getAllConductores().subscribe(resp => {
      if (resp.status === 200) {
        this.conductoresSource.data = resp.result;
      }
    })
  }
  actualizarDatos() {
    this.agendaService.getAllConductores().subscribe(resp => {
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

  getNombreTipoIdentificacion(id: number) {
    return getIdTipoIdentificacionById(id, this.tiposIdentificacion)
  }

  getNombreRegional(id: string) {
    return getNombreRegionalById(id, this.regionales)
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
