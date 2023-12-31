import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from 'src/app/shared/interfaces/maestros/response.interfaces';
import { environment } from '../../../environments/environments';
import { Conductor } from 'src/app/shared/interfaces/agenda/conductores.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminRemisionService {
  private urlRecurso = 'remision'
  public conductores: Conductor[] = []
  constructor(private http: HttpClient) { }

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

  //remisiones pacientes
  getPacienteByRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/pacienteRemision/${idRemision}`)

  }


  getDatosAtencionByRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/datosAtencionPaciente/${idRemision}`)

  }
}
