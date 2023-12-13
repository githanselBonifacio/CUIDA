import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialRemision } from '../../../shared/interfaces/admin/historialRemison.interface';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { MaestrosService } from '../../../shared/services/maestros/maestros.service';
import { EstadoCita } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-admin-historial-remision-page',
  templateUrl: './admin-historial-remision-page.component.html',
  styleUrls: ['./admin-historial-remision-page.component.css']
})
export class AdminHistorialRemisionPageComponent implements OnInit {

  idRemision: string = "";

  currentPageRegistro: number = 1;

  currentPageHistorico: number = 1;
  maxCeldadRegistros = 3;

  remisionDataActual!: HistorialRemision;
  historialRemisiones: HistorialRemision[] = [];

  constructor(
    private adminService: AdminRemisionService,
    private maestroService: MaestrosService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private spinner: SpinnerService
  ) {

  }

  ngOnInit() {
    this.spinner.show();
    registerLocaleData(localeEs);
    this.maestroService.getEstadosCita();

    this.activateRoute.params.subscribe(
      params => {
        this.idRemision = params['idRemision'];
      }
    )
    forkJoin([
      this.adminService.consultarHistorialRemision(this.idRemision),
      this.adminService.consultarDataActualRemision(this.idRemision)
    ]).subscribe(response => {
      this.historialRemisiones = response[0].result;
      this.remisionDataActual = response[1].result;
      this.spinner.hide();
    })

  }

  get estados(): EstadoCita[] {
    return this.maestroService.estadosCita;
  }

  backRemisionesTabla() {
    this.router.navigate(['admin/remisiones']);
  }



}
