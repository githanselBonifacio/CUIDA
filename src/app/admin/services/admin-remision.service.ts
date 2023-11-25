import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificacionFarmacia } from '../interfaces/servicioFarmaceutico.interface';
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';
import { environment } from '../../../environments/environments';
import { Conductor, Movil } from 'src/app/agenda/interfaces/conductores.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminRemisionService {
  private urlRecurso = 'admin'
  public conductores: Conductor[] = []
  constructor(private http: HttpClient) { }

  //farmacia
  getNotificacionesFarmacia() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/tratamientosFarmacia/`)

  }
  getNotificacionesFarmaciaWithFilter(fechaTurno: string, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/tratamientosFarmaciaWithFilter`, { params });
  }
  notificarMedicamentosToFarmacia(notificaciones: NotificacionFarmacia[]) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/notificarFarmacia`, notificaciones);
  }

  //remisiones

  consultarRemisiones() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}`);
  }
  consultarDataActualRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/remision/${idRemision}`)
  }

  consultarHistorialRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/historial/${idRemision}`)
  }

  //remisiones pacientes
  getPacienteByRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/pacienteFromRemision/${idRemision}`)

  }


  getDatosAtencionByRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/datosAtencionPaciente/${idRemision}`)

  }
}
