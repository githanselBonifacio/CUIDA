import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReportesPageComponent } from './admin-reportes-page.component';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { of } from 'rxjs';
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

describe('AdminReportesPageComponent', () => {
  let component: AdminReportesPageComponent;
  let fixture: ComponentFixture<AdminReportesPageComponent>;

  const anio = 2023;
  const numeroMes = 1;
  const idRegional = '427';
  const maestrosServiceMock = {
    getRegionalesObservable: () => of({ result: [] }),
  };

  const adminReportesServiceMock = {
    getReporteTurnoMensual: (anio: number, numeroMes: number, idRegional: string) => of({ result: reporteMensual }),
    getReporteCancelacioncitasMensual: (anio: number, numeroMes: number, idRegional: string) => of({ result: motivoCancelacionCitaReporteMensual }),
    getReporteTurnoAnual: (anio: number, idRegional: string) => of({ result: reporteAnual }),
    getReporteCancelacioncitasAnual: (anio: number, idRegional: string) => of({ result: motivoCancelacionCitaReporteAnual })

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
        { provide: ToastService, useValue: {} },
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
});
