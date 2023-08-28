import { Injectable } from '@angular/core';
import {Ciudad,HorarioTurno} from '../../interfaces/maestros.interfaces'
import { HttpClient } from '@angular/common/http';
import { crearHorario,EstadoCita } from "../../interfaces/maestros.interfaces"
import { environment } from '../../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class MaestrosService {
  private resourceUrl: string = 'maestros'

  public ciudades : Ciudad[] = [];
  public horariosTurno : HorarioTurno[] = [];
  public estadosCita : EstadoCita[] = [];
 public horarioTurnoSeleccionado : HorarioTurno = crearHorario() 

  constructor (private http: HttpClient){}

  async getCiudades (){
    this.http.get<Ciudad[]>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/ciudades`)
      .subscribe(resp =>{
        this.ciudades = resp
      });
  }

  async getHorarioTurno (){
    this.http.get<HorarioTurno[]>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/horarioTurno`)
      .subscribe(resp =>{
        this.horariosTurno = resp
      });
      
  }
  getHorarioTurnoById(idHorario :number){
      let horarioTurnoBuscado = this.horariosTurno.find(h => h.id == idHorario);
      if (horarioTurnoBuscado){
       this.horarioTurnoSeleccionado = horarioTurnoBuscado;
      }
  }

   getEstadosCita(){
    return this.http.get<EstadoCita[]>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/estadosCita`)
  }
}
