import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurnoProfesional } from '../interfaces/profesional.interface'
import { Cita } from '../interfaces/remision.interface'
import { Actividad } from '../../diagramas/interfaces/tarea-gantt.interface'
import { environment } from '../../../environments/environments';
import { formatoFecha } from '../../shared/interfaces/maestros.interfaces'
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private serviceUrl: string = 'http://localhost:9090';
  private urlRecurso = 'agenda'


  constructor(private http: HttpClient) { };

  //profesionales

  getProfesionalDisponibleByturnoRegional(fechaTurno: string, idRegional: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idRegional', idRegional)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionalesByTurnoRegional`, { params });
  }

  getProfesionaTurnoRegional(fechaTurno: string, idRegional: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idRegional', idRegional)
      .set('idHorarioTurno', idHorarioTurno)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionalesFromTurnoRegional`, { params });
  }
  asignarProfesionalTurno(turnoProfesional: TurnoProfesional) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/asignarProfesionalTurno`, turnoProfesional);
  }

  desasignarProfesionalTurno(turnoProfesional: TurnoProfesional) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/desasignarProfesionalTurno`, turnoProfesional);
  }

  //citas
  getCitas(fechaTurno: string, idRegional: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/citas`, { params });

  }

  //agregados de la remision para detalle
  getTratamientoByCita(idCita: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/tratamientos`, { params })

  }
  getProcedimientosByCita(idCita: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/procedimientos`, { params })

  }

  //actividades gantt
  getActividadesAgendaGantt(fechaTurno: string, idRegional: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/actividadesByprofesionalesRegionalHorario`, { params });

  }


  asignarProfesionaByIdCita(idCita: string, numeroIdentificacion: string, fechaProgramada: string, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
      .set('idProfesional', numeroIdentificacion)
      .set('fechaProgramada', fechaProgramada)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/asignarProfesionalCita`, params)
  }

  retirarProfesional(idCita: string, numeoIdentificacion: string, fechaTurno: string, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
      .set('idProfesional', numeoIdentificacion)
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/desasignarProfesionalCita`, params)
  }
  reprogramarCita(idCita: string, fechaProgramada: string, nuevaHora: string, idHorarioTurno: number, idRegional: string, idProfesional: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
      .set('fechaProgramada', fechaProgramada)
      .set('nuevaHora', nuevaHora)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)
      .set('idProfesional', idProfesional)

    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/reprogramarCita`, params)
  }


  desagendarTurnoCompleto(fechaTurno: string, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/desagendarTurnoCompleto`, params)
  }
  autoagendar(fechaTurno: string, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)
    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/autoagendarTurnoCompleto`, params)
  }
}
