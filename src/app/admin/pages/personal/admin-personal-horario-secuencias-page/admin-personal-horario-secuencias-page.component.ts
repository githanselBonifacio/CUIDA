import { registerLocaleData } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminRemisionService } from 'src/app/admin/services/admin-remision.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import localeEs from '@angular/common/locales/es';
import { ProfesionalConTurnos } from 'src/app/agenda/interfaces/profesional.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-admin-personal-horario-secuencias-page',
  templateUrl: './admin-personal-horario-secuencias-page.component.html',
  styleUrls: ['./admin-personal-horario-secuencias-page.component.css']
})
export class AdminPersonalHorarioSecuenciasPageComponent implements OnInit, AfterViewInit {

  constructor(
    private adminService: AdminRemisionService,
    private maestroService: MaestrosService,
    private dialogo: MatDialog,
    private spinnerService: SpinnerService,
    private toastService: ToastService
  ) { registerLocaleData(localeEs); }


  mostrarListAccionesMasivas = false;

  mesFiltro: string = '2023-07'//formatoFecha(new Date()).slice(0, 7);
  opcionIdRegional: string = "427";
  profesionales: ProfesionalConTurnos[] = [];
  profesionalesMostrados: ProfesionalConTurnos[] = [];

  //tablas
  @ViewChild('paginatorPersonalSecuencias') paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'identificacion', 'profesional', 'profesion', 'regional'];
  dataSource = new MatTableDataSource<ProfesionalConTurnos>();
  selection = new SelectionModel<ProfesionalConTurnos>(true, []);

  ngOnInit(): void {
    this.maestroService.getRegionales();
    this.maestroService.getProfesiones();
    this.maestroService.getHorarioTurno();
    this.buscarPersonal();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  get regionales() {
    return this.maestroService.regionales;

  }
  get profesiones() {
    return this.maestroService.profesiones;

  }
  get horariosTurnos() {
    return this.maestroService.horariosTurno;
  }

  buscarPersonal() {
    this.spinnerService.show()
    this.adminService.getProfesionalesWithTurno(this.mesFiltro, this.opcionIdRegional)

      .subscribe(resp => {
        this.profesionales = resp.result;
        this.profesionalesMostrados = resp.result;
        this.dataSource.data = resp.result;
        //this.placeHolderVisible = false;
        this.spinnerService.hide()
      })
  }
  mostrarOpcionesMasivas() {
    if (this.mostrarListAccionesMasivas) {
      this.mostrarListAccionesMasivas = false;
    } else {
      this.mostrarListAccionesMasivas = true;
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
