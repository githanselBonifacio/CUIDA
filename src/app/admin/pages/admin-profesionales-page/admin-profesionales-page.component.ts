import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';
import { AgendaService } from 'src/app/agenda/services/agenda.service';


@Component({
  selector: 'app-admin-profesionales-page',
  templateUrl: './admin-profesionales-page.component.html',
  styleUrls: ['./admin-profesionales-page.component.css']
})
export class AdminProfesionalesPageComponent implements OnInit, AfterViewInit {

  constructor(
    private agendaService: AgendaService) { }

  @ViewChild('paginatorProfesionales') paginator!: MatPaginator;
  columnas: string[] = ['TipoIdentificacion', 'Nombres', 'Apellidos', 'FechaNacimiento', 'Regional', 'Activo', "acciones"];
  profesionalesSource = new MatTableDataSource<Profesional>([]);

  estadoVisualFormCrearProfesional: string = "";

  ngOnInit(): void {
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

  mostrarFormularioCrearProfesional() {

    if (this.estadoVisualFormCrearProfesional == 'activate') {
      this.estadoVisualFormCrearProfesional = ""
    } else {
      this.estadoVisualFormCrearProfesional = "activate"
    }
  }



}
