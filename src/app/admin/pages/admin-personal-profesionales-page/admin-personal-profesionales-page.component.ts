import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { getNombreRegionalById, getNombreTipoIdentificacionById } from 'src/app/shared/interfaces/maestros.interfaces';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';


@Component({
  selector: 'app-personal-admin-profesionales-page',
  templateUrl: './admin-personal-profesionales-page.component.html',
  styleUrls: ['./admin-personal-profesionales-page.component.css']
})
export class AdminPersonalProfesionalesPageComponent implements OnInit, AfterViewInit {

  constructor(
    private agendaService: AgendaService,
    private maestrosService: MaestrosService) { }

  @ViewChild('paginatorProfesionales') paginator!: MatPaginator;
  columnas: string[] = ['TipoIdentificacion', 'Nombres', 'Apellidos', 'FechaNacimiento', 'Regional', 'Activo', "acciones"];
  profesionalesSource = new MatTableDataSource<Profesional>([]);

  estadoVisualFormCrearProfesional?: string;

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
    return getNombreTipoIdentificacionById(id, this.tiposIdentificacion)
  }

  getNombreRegional(id: string) {
    return getNombreRegionalById(id, this.regionales)
  }

  getIconActivar(estado: boolean) {
    if (estado) {
      return "on"
    } else {
      return "off"
    }
  }

}
