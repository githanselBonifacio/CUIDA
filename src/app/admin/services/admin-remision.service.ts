import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificacionFarmacia } from '../interfaces/servicioFarmaceutico.interface';
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';
import { environment } from '../../../environments/environments';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';
import { Conductor, Movil } from 'src/app/agenda/interfaces/conductores.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminRemisionService {
  private urlRecurso = 'admin'
  public profesionales: Profesional[] = [];
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
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/${idRemision}`)
  }

  consultarHistorialRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/historial/${idRemision}`)
  }

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
  getPacienteByRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/pacienteFromRemision/${idRemision}`)

  }

  getDatosAtencionByRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/datosAtencionPaciente/${idRemision}`)

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
}
