import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from 'src/app/shared/interfaces/maestros/response.interfaces';
import { environment } from 'src/environments/environments';
import { NotificacionFarmacia } from '../../shared/interfaces/admin/servicioFarmaceutico.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminFarmaciaService {
  private urlRecurso = 'farmacia'
  constructor(private http: HttpClient) { }

  //farmacia
  getNotificacionesFarmacia() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/tratamientosFarmacia`)

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

}
