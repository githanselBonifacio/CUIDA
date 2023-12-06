import { TestBed } from '@angular/core/testing';

import { AdminPersonalService } from './admin-personal.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environments';
import { Profesional, Secuencia, Turno } from 'src/app/agenda/interfaces/profesional.interface';
import { Conductor, Movil } from 'src/app/agenda/interfaces/conductores.interface';

describe('AdminPersonalService', () => {
  let service: AdminPersonalService;
  let httpMock: HttpTestingController;
  const urlRecurso = 'personal';
  const idRegional = '427';
  const fechaTurno = '2023-07-07';
  let profesional: Profesional;
  let conductor: Conductor;
  let movil: Movil;
  let turnos: Turno[];
  let secuencia: Secuencia;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminPersonalService]
    });
    service = TestBed.inject(AdminPersonalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('crear servicio admin personal', () => {
    expect(service).toBeTruthy();
  });

  //profesionales
  it('consultar todos los profesionales', () => {
    service.getAllProfesionales().subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/profesionales`
      , "consultar todos los profesionales")
    expect(req.request.method).toBe('GET');
  })

  it('consultar  profesionales por regional', () => {
    service.getProfesionalesRegional(idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/profesionales/${idRegional}`
      , "consultar profesionales por regional")
    expect(req.request.method).toBe('GET');
  })


  it('crear profesional', () => {
    service.crearProfesional(profesional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/crearProfesional`
      , "crear profesional")
    expect(req.request.method).toBe('POST');
  })

  it('actualizar profesional', () => {
    service.actualizarProfesional(profesional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/actualizarProfesional`
      , "actualizar profesional")
    expect(req.request.method).toBe('PUT');
  })

  //conductores
  it('consultar todos los conductores', () => {
    service.getAllConductores().subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/conductores`
      , "consultar todos los conductores")
    expect(req.request.method).toBe('GET');
  })

  it('crear conductores', () => {
    service.crearConductor(conductor).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/crearConductor`
      , "crear conductores")
    expect(req.request.method).toBe('POST');
  })

  it('actualizar conductores', () => {
    service.actualizarConductor(conductor).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/actualizarConductor`
      , "actualizar conductores")
    expect(req.request.method).toBe('PUT');
  })

  //moviles

  it('consultar todos los moviles', () => {
    service.getAllMoviles().subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/moviles`
      , "consultar todos los moviles")
    expect(req.request.method).toBe('GET');
  })

  it('consultar  moviles por regional', () => {
    service.getMovilesByIdRegional(idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/moviles/${idRegional}`
      , "consultar moviles por regional")
    expect(req.request.method).toBe('GET');
  })

  it('consultar  moviles sin conductor asignado', () => {
    service.getAllMovilesSinConductor().subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/movilesSinConductor`
      , "consultar moviles sin conductor asignado")
    expect(req.request.method).toBe('GET');
  })

  it('crear moviles', () => {
    service.crearMovil(movil).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/crearMovil`
      , "crear moviles")
    expect(req.request.method).toBe('POST');
  })

  it('actualizar moviles', () => {
    service.actualizarMovil(movil).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/actualizarMovil`
      , "actualizar moviles")
    expect(req.request.method).toBe('PUT');
  })

  //horarios
  it('profesionales con turno', () => {
    service.getProfesionalesWithTurno(fechaTurno, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/horarioTurno?fechaTurno=${fechaTurno}&idRegional=${idRegional}`
      , "profesionales con turno")
    expect(req.request.method).toBe('GET');
  })

  it('actualizar turno profesional', () => {
    service.actualizarTurnoProfesional(turnos).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/actualizarTurnoProfesional`
      , "actualizar turno profesional")
    expect(req.request.method).toBe('PUT');
  })

  it('eliminar turno profesional accion masiva', () => {
    service.eliminarTurnoProfesionalAccionMasiva(turnos).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/eliminarTurnosProfesionalesAccionMasiva`
      , "eliminar turno profesional accion masiva")
    expect(req.request.method).toBe('POST');
  })

  it('asignar turno profesional accion masiva', () => {
    service.asignarTurnoProfesionalAccionMasiva(turnos).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/asignarTurnosProfesionalesAccionMasiva`
      , "asignar turno profesional accion masiva")
    expect(req.request.method).toBe('POST');
  })

  //secuencias
  it('consultar secuencias', () => {
    service.getSecuenciasTurno().subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/secuenciasTurno`
      , "consultar secuencias")
    expect(req.request.method).toBe('GET');
  })

  it('crear secuencia turno', () => {
    service.crearSecuenciaTurno(secuencia).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/secuenciasTurno`
      , "crear secuencia turno")
    expect(req.request.method).toBe('POST');
  })
});
