import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {NotificacionFarmacia} from '../interfaces/servicioFarmaceutico.interface';
import { environment } from '../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class AdminRemisionService {
  private urlRecurso = 'remision'
  constructor(private http: HttpClient) { }

   getNotificacionesFarmacia(){
  return  this.http.get<NotificacionFarmacia[]>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/tratamientosFarmacia/`)
    
  }
  notificarMedicamentosToFarmacia(notificaciones:NotificacionFarmacia[]){
    return this.http.post(`${environment.URL_API_CUIDA}/${this.urlRecurso}/notificarFarmacia`,notificaciones);
  }
 
}
