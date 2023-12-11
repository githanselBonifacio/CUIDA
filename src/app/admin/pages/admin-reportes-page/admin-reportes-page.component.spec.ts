import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReportesPageComponent } from './admin-reportes-page.component';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { Observable, of } from 'rxjs';
import { AdminReportesServiceService } from '../../services/admin-reportes.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DecimalPipe } from '@angular/common';
import { DiagramaVarchartComponent } from 'src/app/diagramas/components/diagrama-varchart/diagrama-varchart.component';
import { DiagramaProgressChartComponent } from 'src/app/diagramas/components/diagrama-progress-chart/diagrama-progress-chart.component';
import { DiagramaPiechartComponent } from 'src/app/diagramas/components/diagrama-piechart/diagrama-piechart.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { motivoCancelacionCitaReporteAnual, motivoCancelacionCitaReporteMensual, reporteAnual, reporteMensual } from 'src/assets/files/test/reporteEjemplo';
import { regionalesTest } from 'src/assets/files/test/maestros';

describe('AdminReportesPageComponent', () => {
  let component: AdminReportesPageComponent;
  let fixture: ComponentFixture<AdminReportesPageComponent>;

  const anio = 2023;
  const numeroMes = 1;
  const idRegional = '427';
  const opcionMes = '2023-05'
  const opcionAnio = 2023;
  const opcionTipoReporteAnual = "Anual";
  const opcionTipoReporteMensual = "Mensual";
  const tituloReporteMensual = 'dia'
  const tituloReporteAnual = 'mes'
  const maestrosServiceMock = {
    getRegionalesObservable: () => of({
      status: 200,
      result: regionalesTest
    }),
  };

  const adminReportesServiceMock = {
    getReporteTurnoMensual: (anio: number, numeroMes: number, idRegional: string) => of(
      {
        status: 200,
        result: reporteMensual
      }),
    getReporteCancelacioncitasMensual: (anio: number, numeroMes: number, idRegional: string) => of(
      {
        status: 200,
        result: motivoCancelacionCitaReporteMensual
      }),
    getReporteTurnoAnual: (anio: number, idRegional: string) => of(
      {
        status: 200,
        result: reporteAnual
      }
    ),
    getReporteCancelacioncitasAnual: (anio: number, idRegional: string) => of(
      {
        status: 200,
        result: motivoCancelacionCitaReporteAnual
      })

  };

  const toastServiceMock = {
    mostrarToast: (): Observable<any> => of(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminReportesPageComponent,
        DiagramaVarchartComponent,
        DiagramaProgressChartComponent,
        DiagramaPiechartComponent
      ],
      imports: [
        FormsModule,
        PipesModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: AdminReportesServiceService, useValue: adminReportesServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        DecimalPipe
      ]
    });
    fixture = TestBed.createComponent(AdminReportesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('consultar reporte turno anual', () => {
    adminReportesServiceMock.getReporteTurnoAnual(anio, idRegional).subscribe(resp => {
      expect(resp.result).toEqual(reporteAnual);
    });
  });

  it('consultar reporte turno mensual', () => {
    adminReportesServiceMock.getReporteTurnoMensual(anio, numeroMes, idRegional).subscribe(resp => {
      expect(resp.result).toEqual(reporteMensual);
    });
  });

  it('consultar reporte cancelacion anual', () => {
    adminReportesServiceMock.getReporteCancelacioncitasAnual(anio, idRegional).subscribe(resp => {
      expect(resp.result).toEqual(motivoCancelacionCitaReporteAnual);
    });
  });

  it('consultar reporte cancelacion mensual', () => {
    adminReportesServiceMock.getReporteCancelacioncitasMensual(anio, numeroMes, idRegional).subscribe(resp => {
      expect(resp.result).toEqual(motivoCancelacionCitaReporteMensual);
    });
  });

  it('actualizar filtro id regional', () => {
    component.ngOnInit();
    component.opcionIdRegional = idRegional;
    component.actualizarfiltroIdRegional();
    fixture.detectChanges();
    expect(component.opcionIdRegional).toEqual(idRegional);
  })

  it('actualizar filtro id regional', () => {
    component.ngOnInit();
    component.actualizarTipoReporte(opcionTipoReporteAnual);
    fixture.detectChanges();
    expect(component.opcionTipoReporte).toEqual(opcionTipoReporteAnual);
    expect(localStorage.getItem('tipoReporte')).toEqual(`${opcionTipoReporteAnual}`)
  })

  it('actualizar filtro mes', () => {
    component.ngOnInit();
    component.mesFiltro = opcionMes;
    component.actualizarMes();
    fixture.detectChanges();
    expect(component.mesFiltro).toEqual(opcionMes);
    expect(localStorage.getItem('mesTurnoReporte')).toEqual(`${opcionMes}`)
  })

  it('actualizar año', () => {
    component.ngOnInit();
    component.opcionYear = opcionAnio;
    component.actualizarOpcionYear(opcionAnio);
    fixture.detectChanges();
    expect(component.opcionYear).toEqual(opcionAnio);
    expect(localStorage.getItem('opcionYearReporte')).toEqual(`${opcionAnio}`)
  })

  it('titulo eje x de grafico de reportes turno mes', () => {
    component.opcionYear = opcionAnio;
    component.opcionIdRegional = idRegional;
    component.actualizarTipoReporte(opcionTipoReporteAnual);
    component.ngOnInit();
    component.reporteTurno = reporteMensual
    fixture.detectChanges();
    expect(component.titleX).toEqual(tituloReporteMensual);
  })

  it('titulo eje x de grafico de reportes turno año', () => {
    component.mesFiltro = opcionMes;
    component.opcionIdRegional = idRegional;
    component.actualizarTipoReporte(opcionTipoReporteMensual);
    component.ngOnInit();
    component.reporteTurno = reporteAnual
    fixture.detectChanges();
    expect(component.titleX).toEqual(tituloReporteAnual);
  })

  it('consultar data reportes anuales', () => {
    component.opcionYear = opcionAnio;
    component.opcionIdRegional = idRegional;
    component.actualizarTipoReporte(opcionTipoReporteAnual);
    component.ngOnInit();
    component.consultarData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('consultar data reportes mensual', () => {
    component.opcionYear = opcionAnio;
    component.mesFiltro = opcionMes;
    component.opcionIdRegional = idRegional;
    component.actualizarTipoReporte(opcionTipoReporteMensual);
    component.ngOnInit();
    component.consultarData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })
});
