import { Injectable } from '@angular/core';
import {Regional,HorarioTurno} from '../../interfaces/maestros.interfaces'
import { HttpClient } from '@angular/common/http';
import { crearHorario } from "../../interfaces/maestros.interfaces"

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {
  private serviceUrl: string = 'http://localhost:5000'

  public regionales : Regional[] = []
  public horariosTurno : HorarioTurno[] = []
  public horarioTurnoSeleccionado : HorarioTurno = crearHorario() 

  constructor (private http: HttpClient){}

  async getRegionales (){
    this.http.get<Regional[]>(`${this.serviceUrl}/regions`)
      .subscribe(resp =>{
        this.regionales = resp
      });
  }

  async getHorarioTurno (){
    this.http.get<HorarioTurno[]>(`${this.serviceUrl}/horario_turno`)
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
}
