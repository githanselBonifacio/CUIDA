import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NotificacionFarmacia} from '../interfaces/servicioFarmaceutico.interface';
import {Remision} from '../interfaces/remision.interface';
import {HistorialRemision} from '../interfaces/historialRemison.interface';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminRemisionService {
  private urlRecursoRemision = 'remision'
  constructor(private http: HttpClient) { }

   getNotificacionesFarmacia(){
  return  this.http.get<NotificacionFarmacia[]>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}/tratamientosFarmacia/`)
    
  }
  notificarMedicamentosToFarmacia(notificaciones:NotificacionFarmacia[]){
    return this.http.post(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}/notificarFarmacia`,notificaciones);
  }
 
  consultarRemisiones(){
    return this.http.get<Remision[]>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}`);
  }
  consultarDataActualRemision(idRemision:string){
    return this.http.get<HistorialRemision>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}/${idRemision}`)
  }

  consultarHistorialRemision(idRemision:string){
    return this.http.get<HistorialRemision[]>(`${environment.URL_API_CUIDA}/${this.urlRecursoRemision}/historial/${idRemision}`)
  }

}
