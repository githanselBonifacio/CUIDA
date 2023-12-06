import { TestBed } from '@angular/core/testing';

import { AdminReportesServiceService } from './admin-reportes.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { environment } from 'src/environments/environments';

describe('AdminReportesServiceService', () => {
  let service: AdminReportesServiceService;
  let httpMock: HttpTestingController;

  const urlRecurso = 'reportes';
  const anio = 2023;
  const idRegional = '427';
  const numeroMes = 5;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgendaService]
    });
    service = TestBed.inject(AdminReportesServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('crear servicio reporte', () => {
    expect(service).toBeTruthy();
  });


  it('consultar reporte turno anual', () => {
    service.getReporteTurnoAnual(anio, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/turno/anual?anio=${anio}&idRegional=${idRegional}`
      , "consultar reporte turno anual")
    expect(req.request.method).toBe('GET');
  })

  it('consultar reporte turno mensual', () => {
    service.getReporteTurnoMensual(anio, numeroMes, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/turno/mensual?anio=${anio}&numeroMes=${numeroMes}&idRegional=${idRegional}`
      , "consultar reporte turno mensual")
    expect(req.request.method).toBe('GET');
  })

  it('consultar reporte cancelacion de citas anual', () => {
    service.getReporteCancelacioncitasAnual(anio, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/cancelacionCitas/anual?anio=${anio}&idRegional=${idRegional}`
      , "consultar reporte cancelacion de citas anual")
    expect(req.request.method).toBe('GET');
  })

  it('consultar reporte cancelación de citas mensual', () => {
    service.getReporteCancelacioncitasMensual(anio, numeroMes, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/cancelacionCitas/mensual?anio=${anio}&numeroMes=${numeroMes}&idRegional=${idRegional}`
      , "consultar reporte cancelación de citas mensual")
    expect(req.request.method).toBe('GET');
  })
});
