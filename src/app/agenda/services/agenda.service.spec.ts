import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AgendaService } from '../services/agenda.service';
import { environment } from 'src/environments/environments';
import { TurnoProfesional } from '../../shared/interfaces/agenda/profesional.interface';
import { Cita } from '../../shared/interfaces/agenda/remision.interface';

describe('AgendaService', () => {
  let service: AgendaService;
  let httpMock: HttpTestingController
  const urlRecurso = 'agenda';
  const idCita = 'ashkdsd6_1';
  const idProfesional = '989898989';
  const idRegional = '427';
  const fechaTurno = '2023-07-07';
  const fechaCita = '2023-07-07 08:00';
  const nuevaHora = "09:30";
  const idHorarioTurno = 1;
  const turnoProfesional: TurnoProfesional = {
    fechaTurno: new Date(), // O un string
    idHorarioTurno: 1,
    idProfesional: 'ID del profesional',
    idRegional: 'ID del regional',
  };
  const citas: Cita[] = []
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgendaService]
    });
    service = TestBed.inject(AgendaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('crear servicio agenda', () => {
    expect(service).toBeTruthy();
  });

  it('consultar profesionales disponibles en turno en regional', () => {
    service.getProfesionalDisponibleByturnoRegional(fechaTurno, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    expect(service).toBeTruthy();
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/profesionalesByTurnoRegional?fechaTurno=${fechaTurno}&idRegional=${idRegional}`
      , "consultar profesionales disponibles en turno en regional")
    expect(req.request.method).toBe('GET');
  })



  it('consultar todos los profesionales en turno en regional', () => {
    service.getProfesionaTurnoRegional(fechaTurno, idRegional, idHorarioTurno).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/profesionalesFromTurnoRegional?fechaTurno=${fechaTurno}&idRegional=${idRegional}&idHorarioTurno=${idHorarioTurno}`
      , "consultar todos los profesionales en turno en regional")
    expect(req.request.method).toBe('GET');
  })



  it('asignar profesional a turno', () => {
    service.asignarProfesionalTurno(turnoProfesional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/asignarProfesionalTurno`
      , "asignar profesional a turno")
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(turnoProfesional);
  })



  it('desasignar profesional a turno', () => {
    service.desasignarProfesionalTurno(turnoProfesional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/desasignarProfesionalTurno`
      , "desasignar profesional a turno")
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(turnoProfesional);
  })



  it('consultar citas por fecha turno , regional y turno de enfermería ', () => {
    service.getCitas(fechaTurno, idRegional, idHorarioTurno).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/citas?fechaTurno=${fechaTurno}&idHorarioTurno=${idHorarioTurno}&idRegional=${idRegional}`
      , "consultar citas por fecha turno , regional y turno de enfermería")
    expect(req.request.method).toBe('GET');
  });

  it('consultar tratamientos de cita por id', () => {
    service.getTratamientoByCita(idCita).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/tratamientos?idCita=${idCita}`
      , "consultar tratamientos de cita por id")
    expect(req.request.method).toBe('GET');
  });


  it('consultar procedimientos de cita por id', () => {
    service.getProcedimientosByCita(idCita).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/procedimientos?idCita=${idCita}`
      , "consultar procedimientos de cita por id")
    expect(req.request.method).toBe('GET');
  });


  it('consultar actividades de visita por profesional en turno por regional y horario', () => {
    service.getActividadesAgendaGantt(fechaTurno, idRegional, idHorarioTurno).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/actividadesByprofesionalesRegionalHorario?fechaTurno=${fechaTurno}&idHorarioTurno=${idHorarioTurno}&idRegional=${idRegional}`
      , "consultar actividades de visita por profesional en turno por regional y horario")
    expect(req.request.method).toBe('GET');
  });


  it('asignar  profesional a cita por id cita', () => {
    service.asignarProfesionaByIdCita(idCita, idProfesional, fechaTurno, idHorarioTurno, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/asignarProfesionalCita`
      , "asignar  profesional a cita por id cita")
    expect(req.request.method).toBe('PUT');
  });


  it('desasignar  profesional a cita por id cita', () => {
    service.retirarProfesional(idCita, idProfesional, fechaTurno, idHorarioTurno, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/desasignarProfesionalCita`
      , "desasignar  profesional a cita por id cita")
    expect(req.request.method).toBe('PUT');
  });

  it('reprogramar cita mismo turno y profesional', () => {
    service.reprogramarCita(idCita, fechaCita, nuevaHora, idHorarioTurno, idRegional, idProfesional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/reprogramarCita`
      , "reprogramar cita turno y profesional")
    expect(req.request.method).toBe('PUT');
  });

  it('desagendar turno completo', () => {
    service.desagendarTurnoCompleto(fechaTurno, idHorarioTurno, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })

    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/desagendarTurnoCompleto`
      , "desagendar turno completo")
    expect(req.request.method).toBe('PUT');
  });

  it('agendar turno completo', () => {
    service.autoagendar(fechaTurno, idHorarioTurno, idRegional).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    expect(service).toBeTruthy();
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/autoagendarTurnoCompleto`
      , "agendar turno completo")
    expect(req.request.method).toBe('PUT');
  });
});
