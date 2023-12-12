import { TestBed } from '@angular/core/testing';

import { AdminRemisionService } from './admin-remision.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environments';

describe('AdminRemisionService', () => {
  let service: AdminRemisionService;
  let httpMock: HttpTestingController;

  const urlRecurso = "remision";
  const idRemision = "ds78sd66";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminRemisionService]
    });
    service = TestBed.inject(AdminRemisionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('crear servicio remisión', () => {
    expect(service).toBeTruthy();
  });

  it('consultar todas las remisiones', () => {
    service.consultarRemisiones().subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}`)
    expect(req.request.method).toBe('GET')
  })

  it('consultar estado actual remisión por id', () => {
    service.consultarDataActualRemision(idRemision).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/remision/${idRemision}`)
    expect(req.request.method).toBe('GET')
  })

  it('consultar historico de cambios de remisión por id', () => {
    service.consultarHistorialRemision(idRemision).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/historial/${idRemision}`)
    expect(req.request.method).toBe('GET')
  })

  it('consultar paciente de remisión', () => {
    service.getPacienteByRemision(idRemision).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/pacienteRemision/${idRemision}`)
    expect(req.request.method).toBe('GET')
  })

  it('consultar datos de atención de remisión', () => {
    service.getDatosAtencionByRemision(idRemision).subscribe(resp => {
      expect(resp).toBeDefined();
    })
    const req = httpMock.expectOne(`${environment.URL_API_CUIDA}/${urlRecurso}/datosAtencionPaciente/${idRemision}`)
    expect(req.request.method).toBe('GET')
  })

});
