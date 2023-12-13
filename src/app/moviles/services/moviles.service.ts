import { Injectable } from '@angular/core';
import { Desplazamiento } from 'src/app/shared/interfaces/moviles/desplazamiento.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actividad } from 'src/app/diagramas/interfaces/tarea-gantt.interface';
import { Movil } from '../../shared/interfaces/moviles/movil.interface'
import { environment } from '../../../environments/environments';
import { Respuesta } from 'src/app/shared/interfaces/maestros/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovilesService {
  private serviceUrl: string = 'http://localhost:5000';
  private resourceUrl: string = 'moviles'
  public desplazamientos: Desplazamiento[] = [];
  public desplazamientosMoviles: Actividad[] = [];
  public moviles: Movil[] = []

  constructor(private http: HttpClient) { }

  getMovilesByRegiones(id_regional: number) {
    const params = new HttpParams()
      .set("id_regional", id_regional)

    this.http.get<Movil[]>(`${this.serviceUrl}/movilesByRegional`, { params })
      .subscribe(resp => {
        this.moviles = resp
      })
  }

  async getDesplazamientos(fechaTurno: string, idRegional: number, idHorarioTurno: number) {
    const params = new HttpParams()
      .set("fechaTurno", fechaTurno)
      .set("idRegional", idRegional)
      .set("idHorarioTurno", idHorarioTurno)

    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/desplazamientoVisita`, { params })
      .subscribe(resp => {
        this.desplazamientos = resp.result;
      });
  }

  async getDesplazamientosByMoviles(fecha_turno: string, id_regional: number, id_horario_turno: number) {
    const params = new HttpParams()
      .set("date", fecha_turno)
      .set("id_region", id_regional)
      .set("id_schedule_shift", id_horario_turno)

    this.http.get<Respuesta>(`${this.serviceUrl}/${this.resourceUrl}`, { params })
      .subscribe(resp => {
        this.desplazamientosMoviles = resp.result;
      });
  }

  asignarMovilDesplazamiento(id_cita_inicio: string, id_cita_destino: string, id_movil: string) {
    const params = new HttpParams()
      .set("id_cita_inicio", id_cita_inicio)
      .set("id_cita_destino", id_cita_destino)
      .set("id_movil", id_movil)

    return this.http.get<string>(`${this.serviceUrl}/moviles/asignar`, { params })

  }
  desasignarMovil(id_cita_inicio: string, id_cita_destino: string) {
    const params = new HttpParams()
      .set("id_cita_inicio", id_cita_inicio)
      .set("id_cita_destino", id_cita_destino)

    return this.http.get<string>(`${this.serviceUrl}/moviles/desasignar`, { params })

  }
}
