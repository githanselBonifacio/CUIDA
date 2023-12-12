import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conductor, Movil } from 'src/app/agenda/interfaces/conductores.interface';
import { Profesional, Turno, Secuencia } from 'src/app/agenda/interfaces/profesional.interface';
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminPersonalService {
  private urlRecurso = 'personal'
  public conductores: Conductor[] = []
  constructor(private http: HttpClient) { }

  //profesionales
  getAllProfesionales() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionales`)
  }
  getProfesionalesRegional(idRegional: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionales/${idRegional}`)
  }
  crearProfesional(profesional: Profesional) {

    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/crearProfesional`, profesional);
  }
  actualizarProfesional(profesional: Profesional) {

    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/actualizarProfesional`, profesional);

  }

  //conductores
  getAllConductores() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/conductores`)
  }
  crearConductor(conductor: Conductor) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/crearConductor`, conductor);
  }
  actualizarConductor(conductor: Conductor) {
    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/actualizarConductor`, conductor);
  }
  //moviles
  crearMovil(movil: Movil) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/crearMovil`, movil)
  }
  actualizarMovil(movil: Movil) {
    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/actualizarMovil`, movil);
  }
  getMovilesByIdRegional(idRegional: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/moviles/${idRegional}`)
  }
  getAllMoviles() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/moviles`)

  }
  getAllMovilesSinConductor() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/movilesSinConductor`);
  }
  //horarios
  getProfesionalesWithTurno(fechaTurno: string, idRegional: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idRegional', idRegional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/horarioTurno`, { params });
  }

  actualizarTurnoProfesional(turnos: Turno[]) {
    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/actualizarTurnoProfesional`, turnos);
  }
  eliminarTurnoProfesionalAccionMasiva(turnos: any[]) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/eliminarTurnosProfesionalesAccionMasiva`, turnos);
  }
  asignarTurnoProfesionalAccionMasiva(turnos: Turno[]) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/asignarTurnosProfesionalesAccionMasiva`, turnos);
  }
  //secuencias
  getSecuenciasTurno() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/secuenciasTurno`);
  }
  crearSecuenciaTurno(secuencia: Secuencia) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/secuenciasTurno`, secuencia);
  }
}
