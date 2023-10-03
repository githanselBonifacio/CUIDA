import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profesional } from '../interfaces/profesional.interface'
import { Cita } from '../interfaces/remision.interface'
import { Actividad } from '../../diagramas/interfaces/tarea-gantt.interface'
import { environment } from '../../../environments/environments';
import { formatoFecha } from '../../shared/interfaces/maestros.interfaces'
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';
import { Conductor, Movil } from '../interfaces/conductores.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private serviceUrl: string = 'http://localhost:9090';
  private urlRecurso = 'agenda'

  public profesionales: Profesional[] = [];
  public moviles: Movil[] = [];
  public conductores: Conductor[] = []
  public citas: Cita[] = [];
  public agendaGantt: Actividad[] = [];

  constructor(private http: HttpClient) { };

  //profesionales
  getAllProfesionales() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionales`)
  }
  async getProfesionalesCiudad(idRegional: string) {
    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionales/${idRegional}`)
      .subscribe(resp => {
        this.profesionales = resp.result;

      });
  }
  crearProfesional(profesional: Profesional) {

    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/crearProfesional`, profesional);
  }
  actualizarProfesional(profesional: Profesional) {

    return this.http.put<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/actualizarProfesional`, profesional);
  }
  getProfesionalDisponibleByturnoCiudad(fechaTurno: string, idRegional: string) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idRegional', idRegional)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/profesionalesByTurnoCiudad`, { params });
  }

  getProfesionaFromTurnoCiudad(fechaTurno: string, idRegional: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idRegional', idRegional)
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
  getMovilesByIdRegional(idRegional: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/moviles/${idRegional}`)
  }
  async getAllMoviles() {
    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/moviles`)
      .subscribe(resp => {
        this.moviles = resp.result;
      })
  }
  getAllMovilesSinConductor() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/movilesSinConductor`);
  }
  //citas
  async getCitas(fechaTurno: string, idRegional: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

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
  async getActividadesAgendaGantt(fechaTurno: string, idRegional: string, idHorarioTurno: number) {
    const params = new HttpParams()
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/actividadesByprofesionalesCiudadHorario`, { params })

      .subscribe(resp => {
        this.agendaGantt = resp.result
      });

  }

  //admin agenda
  async filtrarCitasByIdRemision(criterioBusqueda: string) {
    const criterioNombrePaciente = criterioBusqueda.toLowerCase();
    this.citas = this.citas.filter(cita => {
      return cita.idRemision.includes(criterioBusqueda) ||
        cita.idProfesional?.includes(criterioBusqueda) ||
        cita.paciente.toLowerCase().includes(criterioNombrePaciente) ||
        cita.numeroIdentificacionPaciente.includes(criterioBusqueda);

    });
  }

  asignarProfesionaByIdCita(idCita: string, numeoIdentificacion: string, fechaTurno: string, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
      .set('idProfesional', numeoIdentificacion)
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/asignarProfesionalCita`, { params })
  }

  retirarProfesional(idCita: string, numeoIdentificacion: string, fechaTurno: string, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
      .set('idProfesional', numeoIdentificacion)
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/desasignarProfesionalCita`, { params })
  }
  reprogramarCita(idCita: string, fechaProgramada: string, nuevaHora: string, fechaTurno: string, idHorarioTurno: number, idRegional: string, idProfesional: string) {
    const params = new HttpParams()
      .set('idCita', idCita)
      .set('fechaProgramada', fechaProgramada)
      .set('nuevaHora', nuevaHora)
      .set('fechaTurno', fechaTurno)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)
      .set('idProfesional', idProfesional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/reprogramarCita`, { params })
  }

  calcularDesplazamientoTurnoCompleto(turno: Cita[]) {
    return this.http.post(`${this.serviceUrl}/citas/calcularDesplazamiento`, turno)
  }

  desagendarTurnoCompleto(fechaTurno: Date, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('fechaTurno', `${formatoFecha(fechaTurno)}`)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)

    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/desagendarTurnoCompleto`, { params })
  }
  autoagendar(fechaTurno: Date, idHorarioTurno: number, idRegional: string) {
    const params = new HttpParams()
      .set('fechaTurno', `${formatoFecha(fechaTurno)}`)
      .set('idHorarioTurno', idHorarioTurno)
      .set('idRegional', idRegional)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/autoagendarTurnoCompleto`, { params })
  }
}
