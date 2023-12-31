import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AdminRemisionService } from '../../services/admin-remision.service';

import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Remision } from 'src/app/shared/interfaces/agenda/remision.interface';

@Component({
  selector: 'app-admin-remisiones-page',
  templateUrl: './admin-remisiones-page.component.html',
  styleUrls: ['./admin-remisiones-page.component.css']
})
export class AdminRemisionesPageComponent implements AfterViewInit {
  constructor(
    private adminService: AdminRemisionService,
    private router: Router,
  ) { }

  @ViewChild('paginatorRemisiones') paginator!: MatPaginator;

  displayedColumns: string[] = ['Id', 'Paciente', 'Admisión', 'Programa', 'Regional', 'Remitente', 'Estado', 'Historial'];
  dataSource = new MatTableDataSource<Remision>([]);
  pageSizeOptions = [7, 8, 9, 10, 15, 20, 50, 100];

  filtroBusqueda: string = "";
  remisiones: Remision[] = [];

  ngAfterViewInit() {
    Promise.resolve().then(resp => {
      registerLocaleData(localeEs);
      this.dataSource.paginator = this.paginator;
      this.adminService.consultarRemisiones()
        .subscribe(resp => {
          this.remisiones = resp.result;
          this.dataSource.data = this.remisiones;
        })
      this.paginator.pageSize = parseInt(localStorage.getItem("pageSizeRemisiones")!);
    });

  }


  verHistorialRemision(idRemision: string) {
    this.router.navigate(['admin/remisiones', idRemision]);
  }
  filtrarRemisiones(): void {
    const textoBuscado = this.filtroBusqueda;
    const textoLowerCase = this.filtroBusqueda.toLowerCase()

    if (this.filtroBusqueda.length == 0) {
      this.dataSource.data = this.remisiones;
    } else {
      this.dataSource.data = this.dataSource.data.filter(remision => {
        const nombrePaciente = `${remision.paciente.toLowerCase()}`
        const idRemision = `${remision.idRemision}`
        return nombrePaciente.includes(textoLowerCase) || idRemision.includes(textoBuscado)
      })
    }
  }

  backAdmin() {
    this.router.navigate(['admin']);
  }

  actualizarPage() {
    localStorage.setItem("pageSizeRemisiones", `${this.paginator.pageSize}`);
  }
}
