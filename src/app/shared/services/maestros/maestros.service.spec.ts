import { TestBed } from '@angular/core/testing';

import { MaestrosService } from './maestros.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environments';
import { horarioTurnoTest, regionalesTest } from 'src/assets/files/test/maestros';

describe('MaestrosService', () => {
  let service: MaestrosService;
  let httpMock: HttpTestingController;
  const urlRecurso = "maestros";
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaestrosService]
    });
    service = TestBed.inject(MaestrosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('crear servicio', () => {
    expect(service).toBeTruthy();
  });



  it('consultar regionales observable', async () => {
    service.getRegionalesObservable().subscribe(resp => {
      expect(resp.result).toBeDefined()
    });
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/regionales`)
    expect(req.request.method).toBe('GET');
  })

  it('consultar horario turno observable', async () => {
    service.getHorarioTurnoObservable().subscribe(resp => {
      expect(resp.result).toBeDefined()
    });
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/horarioTurno`)
    expect(req.request.method).toBe('GET');
  })

  it('consultar  regionales', () => {
    service.getRegionales().then(() => {
      expect(service.regionales).toEqual(regionalesTest);
    });
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/regionales`);
    expect(req.request.method).toBe('GET');
    req.flush({ result: regionalesTest });
  });

  it('consultar  horarios', () => {
    service.getHorarioTurno().then(() => {
      expect(service.horariosTurno).toEqual(horarioTurnoTest);
    });
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/horarioTurno`);
    expect(req.request.method).toBe('GET');
    req.flush({ result: horarioTurnoTest });
  });

  it('consultar tiposIdentificacion', () => {

    service.getTiposIdentificacion().then(() => {
      expect(service.tiposIdentificacion).toEqual([]);
    });
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/tipoIdentificacion`);
    expect(req.request.method).toBe('GET');
    req.flush({ result: [] });
  });

  it('consultar estadosCita', () => {
    const mockEstadosCita = [{ id: 1, nombre: 'EstadoCita 1' }, { id: 2, nombre: 'EstadoCita 2' }];
    service.getEstadosCita().then(() => {
      expect(service.estadosCita).toEqual(mockEstadosCita);
    });
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/estadosCita`);
    expect(req.request.method).toBe('GET');
    req.flush({ result: mockEstadosCita });
  });

  it('consultar profesiones', () => {

    service.getProfesiones().then(() => {
      expect(service.profesiones).toEqual([]);
    });
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/profesiones`);
    expect(req.request.method).toBe('GET');
    req.flush({ result: [] });

  });

  it('consultar horarioTurno by id', () => {
    const mockHorarioTurno = horarioTurnoTest[0];
    service.horariosTurno = horarioTurnoTest;
    service.getHorarioTurnoById(mockHorarioTurno.id);
    expect(service.horarioTurnoSeleccionado).toEqual(mockHorarioTurno)
  });
});
