import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profesional } from '../interfaces/profesional.interface'
import { DatosAtencionRemision, Paciente, Cita, Curacion, Sondaje, Tratamiento, TomaMuestra, SoporteNutricional, Canalizacion, Fototerapia, Secrecion } from '../interfaces/remision.interface'
import { Actividad } from '../../diagramas/interfaces/tarea-gantt.interface'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AgendaModule } from '../agenda.module';
import { formatoFecha } from '../../shared/interfaces/maestros.interfaces'
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';

@Injectable({
  providedIn: AgendaModule
})
export class AgendaService {
  private serviceUrl: string = 'http://localhost:9090';
  private urlRecurso = 'agenda'

  public profesionales: Profesional[] = [];
  public citas: Cita[] = [];
  public agendaGantt: Actividad[] = [];

  constructor(private http: HttpClient) { };

  //profesionales
  async getProfesionalesCiudad(idCiudad: string) {
    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionales/${idCiudad}`)
      .subscribe(resp => {
        this.profesionales = resp.result;
      });
  }
  getProfesionalDisponibleByturnoCiudad(fechaTurno: string, idCiudad: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idCiudad', idCiudad)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionalesByTurnoCiudad`, { params });
  }

  getProfesionaFromTurnoCiudad(fechaTurno: string, idCiudad: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idCiudad', idCiudad)
      .set('idHorarioTurno', idHorarioTurno)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionalesFromTurnoCiudad`, { params });
  }
  asignarProfesionalTurno(fechaTurno: string, idHorarioTurno: number, idProfesional: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idProfesional', idProfesional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/asignarProfesionalTurno`, { params });
  }

  desasignarProfesionalTurno(fechaTurno: string, idHorarioTurno: number, idProfesional: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idProfesional', idProfesional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/desasignarProfesionalTurno`, { params });
  }

  //citas
  async getCitas(fechaTurno: string, idCiudad: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idCiudad', idCiudad)

    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/citas`, { params })
      .subscribe(resp => {
        this.citas = resp.result
      });

  }

  //agregados de la remision para detalle

  getPacienteByRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/remision/pacienteFromRemision/${idRemision}`)

  }

  getDatosAtencionByRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/remision/datosAtencionPaciente/${idRemision}`)

  }
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
  async getActividadesAgendaGantt(fechaTurno: string, idCiudad: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idCiudad', idCiudad)

    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/actividadesByprofesionalesCiudadHorario`, { params })

      .subscribe(resp => {
        this.agendaGantt = resp.result
      });

  }

  //admin agenda
  async filtrarCitasByIdRemision(id_remision: string) {
    this.citas = this.citas.filter(cita => cita.idRemision.includes(id_remision))
  }

  asignarProfesionaByIdCita(idCita: string, numeoIdentificacion: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
      .set('idProfesional', numeoIdentificacion)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/asignarProfesionalCita`, { params })
  }

  retirarProfesional(idCita: string) {
    const params = new HttpParams()
      .set('idCita', idCita)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/desasignarProfesionalCita`, { params })
  }
  reprogramarCita(idCita: string, fechaProgramada: string, nuevaHora: string) {
    console.log(idCita)
    console.log(fechaProgramada)
    console.log(nuevaHora)
    const params = new HttpParams()
      .set('idCita', idCita)
      .set('fechaProgramada', fechaProgramada)
      .set('nuevaHora', nuevaHora)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/reprogramarCita`, { params })
  }
  calcularDesplazamientosCitasProfesional(fechaTurno: string, idHorarioTurno: number, idCiudad: string, idProfesional: string | null) {
    if (idProfesional != null) {
      const params = new HttpParams()
        .set('fechaTurno', fechaTurno)
        .set('idHorarioTurno', idHorarioTurno)
        .set('idCiudad', idCiudad)
        .set('idProfesional', idProfesional)
      return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/calcularDesplazamientoCitasByprofesional`, { params })
    } else {
      throw new Error('Invalid input: idProfesional is null');
    }

  }
  calcularDesplazamientoTurnoCompleto(turno: Cita[]) {
    return this.http.post(`${this.serviceUrl}/citas/calcularDesplazamiento`, turno)
  }

  desagendarTurnoCompleto(fechaTurno: Date, idHorarioTurno: number, idCiudad: string) {
    const params = new HttpParams()
      .set('fechaTurno', `${formatoFecha(fechaTurno)}`)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idCiudad', idCiudad)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/desagendarTurnoCompleto`, { params })
  }
  autoagendar(fechaTurno: Date, idHorarioTurno: number, idCiudad: string) {
    const params = new HttpParams()
      .set('fechaTurno', `${formatoFecha(fechaTurno)}`)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idCiudad', idCiudad)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/autoagendarTurnoCompleto`, { params })
  }
}
