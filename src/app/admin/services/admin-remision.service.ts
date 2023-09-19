import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificacionFarmacia } from '../interfaces/servicioFarmaceutico.interface';
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';
import { environment } from '../../../environments/environments';
import { AdminModule } from '../admin.module';

@Injectable({
  providedIn: 'root'
})
export class AdminRemisionService {
  private urlRecursoRemision = 'remision'
  constructor(private http: HttpClient) { }

  getNotificacionesFarmacia() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}/tratamientosFarmacia/`)

  }
  notificarMedicamentosToFarmacia(notificaciones: NotificacionFarmacia[]) {
    return this.http.post<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}/notificarFarmacia`, notificaciones);
  }

  consultarRemisiones() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}`);
  }
  consultarDataActualRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}/${idRemision}`)
  }

  consultarHistorialRemision(idRemision: string) {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}/historial/${idRemision}`)
  }

}
