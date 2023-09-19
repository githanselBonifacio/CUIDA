import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialRemision } from '../../interfaces/historialRemison.interface';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { MaestrosService } from '../../../shared/services/maestros/maestros.service';
import { EstadoCita, getNombreEstadoCitaById } from 'src/app/shared/interfaces/maestros.interfaces';
import { Cita } from '../../interfaces/historialRemison.interface';

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

  remisionDataActual: HistorialRemision | any = {};
  historialRemisiones: HistorialRemision[] = [];

  constructor(
    private adminService: AdminRemisionService,
    private maestroService: MaestrosService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.maestroService.getEstadosCita();
    this.activateRoute.params.subscribe(
      params => {
        this.idRemision = params['idRemision'];
      }
    )
    this.adminService.consultarHistorialRemision(this.idRemision)
      .subscribe(resp => {
        this.historialRemisiones = resp.result
      })
    this.adminService.consultarDataActualRemision(this.idRemision)
      .subscribe(resp => {
        this.remisionDataActual = resp.result
      })
  }

  get estados(): EstadoCita[] {
    return this.maestroService.estadosCita;
  }
  getNombreEstadoCita(id: string) {
    return getNombreEstadoCitaById(id, this.estados);
  }
  backRemisionesTabla() {
    this.router.navigate(['admin/remisiones']);
  }

  agregarCitasEstadoAnterior(citaAnteriores: Cita[], citasNuevas: Cita[], fechaAplicacionNovedad: Date): Cita[] {
    let cn: Cita[] = citasNuevas?.map(cita => ({ ...cita, datosCita: { ...cita.datosCita, idEstado: "0" } })) ?? [];
    cn = cn.filter(c => fechaAplicacionNovedad < c.datosCita.fechaProgramada);
    if (citaAnteriores != null) {
      const ca: Cita[] = citaAnteriores.slice();

      return ca.concat(cn);

    } else {
      cn = cn.filter(c1 => !this.remisionDataActual.citas.some((c2: { datosCita: { idCita: string; }; }) => c2.datosCita.idCita === c1.datosCita.idCita));
      return cn;
    }
  }

}
