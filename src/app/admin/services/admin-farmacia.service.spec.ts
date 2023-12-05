import { TestBed } from '@angular/core/testing';

import { AdminFarmaciaService } from './admin-farmacia.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environments';
import { NotificacionFarmacia } from '../interfaces/servicioFarmaceutico.interface';

describe('AdminFarmaciaService', () => {
  let service: AdminFarmaciaService;
  let httpMock: HttpTestingController
  const urlRecurso = 'farmacia'
  const idRegional = '427';
  const fechaTurno = '2023-07-07';
  const idHorarioTurno = 1;
  const notificaciones: NotificacionFarmacia[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminFarmaciaService]
    });
    service = TestBed.inject(AdminFarmaciaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('crear servicio Farmacia', () => {
    expect(service).toBeTruthy();
  });


  it('consultar notificaciones farmacia', () => {
    service.getNotificacionesFarmacia().subscribe(resp => {
      expect(resp).toBeDefined();
    })
    expect(service).toBeTruthy();
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/tratamientosFarmacia`
      , "consultar notificaciones farmacia")
    expect(req.request.method).toBe('GET');
  })


  it('consultar notificaciones farmacia por fecha, regional y turno', () => {
    service.getNotificacionesFarmaciaWithFilter(fechaTurno, idHorarioTurno, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    expect(service).toBeTruthy();
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/tratamientosFarmaciaWithFilter?fechaTurno=${fechaTurno}&idHorarioTurno=${idHorarioTurno}&idRegional=${idRegional}`
      , "consultar notificaciones farmacia por fecha, regional y turno")
    expect(req.request.method).toBe('GET');
  })


  it('notificar farmacia', () => {
    service.notificarMedicamentosToFarmacia(notificaciones).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    expect(service).toBeTruthy();
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/notificarFarmacia`
      , "notificar farmacia")
    expect(req.request.method).toBe('POST');
  })


});
