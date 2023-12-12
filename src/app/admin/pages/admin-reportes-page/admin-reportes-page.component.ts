import { Component, LOCALE_ID, OnInit } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { Regional, formatoFecha } from 'src/app/shared/interfaces/maestros.interfaces';
import * as estilos from '../../../../assets/files/variables';
import { AdminReportesServiceService } from '../../services/admin-reportes.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';


@Component({
  selector: 'app-admin-reportes-page',
  templateUrl: './admin-reportes-page.component.html',
  styleUrls: ['./admin-reportes-page.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class AdminReportesPageComponent implements OnInit {

  constructor(
    private maestroService: MaestrosService,
    private adminReporteService: AdminReportesServiceService,
    private spinner: SpinnerService,
    private toast: ToastService,
  ) { registerLocaleData(localeEs); }

  ngOnInit(): void {
    this.maestroService.getRegionalesObservable()
      .subscribe(resp => {
        this.regionales = resp.result;
        if (this.opcionIdRegional) {
          this.opcionIdRegional = this.regionales[0].id;
        }
        this.consultarData();
      });

    this.opcionYear = (this.opcionYear == 0) ? this.years[0] : this.opcionYear;

  }


  btnConsultaDeshabilitado?: boolean;

  estilos = estilos;
  reporteTurno: any;
  reporteCancelacionCitas: any;


  opcionesTipoReporte: string[] = ["Mensual", "Anual"];
  opcionTipoReporte: string = localStorage.getItem('tipoReporte') ?? this.opcionesTipoReporte[0];

  years: number[] = [2023, 2024, 2025];
  opcionYear?: number = parseInt(localStorage.getItem('opcionYearReporte')!);

  regionales: Regional[] = [];
  opcionIdRegional: string = localStorage.getItem('idRegionalReporteFiltro')!;

  mesFiltro: string = localStorage.getItem('mesTurnoReporte') ?? formatoFecha(new Date());




  actualizarfiltroIdRegional() {
    this.habilitarBtnConsulta();
    this.consultarData();
    localStorage.setItem("idRegionalReporteFiltro", this.opcionIdRegional);

  }

  actualizarMes() {
    this.habilitarBtnConsulta();
    localStorage.setItem("mesTurnoReporte", this.mesFiltro);
  }

  actualizarTipoReporte(tipoReporte: string) {
    this.opcionTipoReporte = tipoReporte;
    this.habilitarBtnConsulta();
    localStorage.setItem("tipoReporte", this.opcionTipoReporte);
  }

  actualizarOpcionYear(year: number) {
    this.opcionYear = year;
    this.habilitarBtnConsulta();
    localStorage.setItem("opcionYearReporte", `${this.opcionYear}`);
  }

  getTipoReporte(idLista: number) {
    this.habilitarBtnConsulta();
    return this.opcionesTipoReporte[idLista];
  }

  get titleX(): string {
    if (!this.reporteTurno) {
      return "";
    }
    const reportes = this.reporteTurno.reportes;
    if (reportes.length === 0) {
      return "";
    }
    return Object.keys(reportes[0])[0];
  }

  get cumplimientoPromedio() {
    return { ...this.reporteTurno }?.resumen?.cumplimientoCitasPromedio!;
  }

  get dataCapacidadTurno() {
    return { ...this.reporteTurno }?.reportes?.map((m: any) => {
      return {
        "name": `${m.dia ?? m.mes}`,
        "value": m.capacidadPromedio
      }
    });

  }

  get dataCitasCanceladasTurno() {
    return { ...this.reporteCancelacionCitas }?.reportes?.map((m: any) => {
      return {
        "name": `${m.dia ?? m.mes}`,
        "value": m.totalCitasCanceladas
      }
    });
  }

  get dataMotivoCancelacionCitaResumen() {
    return { ...this.reporteCancelacionCitas }?.resumen?.registrosCancelacion?.map((m: any) => {
      return {
        "name": `${m.descripcion}`,
        "value": m.cantidad
      }
    });
  }

  consultarData() {
    if (!this.btnConsultaDeshabilitado) {
      if (this.opcionTipoReporte == this.getTipoReporte(0)) {
        this.adminReporteService.getReporteTurnoMensual(this.opcionYear!, parseInt(this.mesFiltro.slice(-2)), this.opcionIdRegional)
          .subscribe(resp => {

            if (resp.status == 200) {
              this.reporteTurno = resp.result;
            }

            this.deshabilitarBtnConsulta();
          });
        this.adminReporteService.getReporteCancelacioncitasMensual(this.opcionYear!, parseInt(this.mesFiltro.slice(-2)), this.opcionIdRegional)
          .subscribe(resp => {

            if (resp.status == 200) {
              this.reporteCancelacionCitas = resp.result;
            }

            this.deshabilitarBtnConsulta();
          });
      } else {
        this.adminReporteService.getReporteTurnoAnual(this.opcionYear!, this.opcionIdRegional)
          .subscribe(resp => {

            if (resp.status == 200) {
              this.reporteTurno = resp.result;

            }

            this.deshabilitarBtnConsulta();
          });
        this.adminReporteService.getReporteCancelacioncitasAnual(this.opcionYear!, this.opcionIdRegional)
          .subscribe(resp => {

            if (resp.status == 200) {
              this.reporteCancelacionCitas = resp.result;

            }

            this.deshabilitarBtnConsulta();
          });
      }
    } else {
      this.toast.mostrarToast({ status: null, menssage: "Los criterios de busqueda son los mismos" }, 5, ToastType.Info);
    }

  }


  deshabilitarBtnConsulta() {
    this.btnConsultaDeshabilitado = true;
  }
  habilitarBtnConsulta() {
    this.btnConsultaDeshabilitado = false;
  }


}


