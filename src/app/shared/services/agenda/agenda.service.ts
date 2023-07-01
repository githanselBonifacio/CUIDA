import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Profesional} from '../../../agenda/interfaces/profesional.interface'
import {Turno} from '../../../agenda/interfaces/turno.interface'
import {Actividad} from '../../../diagramas/interfaces/tarea-gantt.interface'
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
    private serviceUrl: string = 'http://localhost:5000';

    public profesionales : Profesional[] = [];
    public citas : Turno[] = [];
    public agendaGantt : Actividad[] = [];

    constructor (private http: HttpClient){};

    async getProfesionalesRegion (id_region:number){
      this.http.get<Profesional[]>(`${this.serviceUrl}/proffesionales/${id_region}`)
      .subscribe(resp =>{
        this.profesionales = resp;
      });
    }

    getTurno (date:string, id_region:number, id_schedule_shift:number){
      const params = new HttpParams()
      .set('date',date)
      .set('id_region',id_region)
      .set('id_schedule_shift',id_schedule_shift)

      this.http.get<Turno[]>(`${this.serviceUrl}/shift`, {params})
      .subscribe(resp =>{
        this.citas = resp
      });
      
    }

    async getActividadesAgendaGantt (date:string, id_region:number, id_schedule_shift:number){
      const params = new HttpParams()
      .set('date',date)
      .set('id_region',id_region)
      .set('id_schedule_shift',id_schedule_shift)

      this.http.get<Actividad[]>(`${this.serviceUrl}/citas`, {params})
     
      .subscribe(resp =>{
        this.agendaGantt = resp
      });
      
    }

    async filtrarCitasByIdRemision(id_remision:string){
       this.citas = this.citas.filter(cita => cita.id_remision.includes(id_remision))
    }

    asignarProfesionaByIdCita(id_cita:string,numero_identificacion:string,id_region:number): Observable <string>{
      const params = new HttpParams()
      .set('id_cita',id_cita)
      .set('numero_identificacion',numero_identificacion)
      .set('id_region',id_region)

      return this.http.get<string>(`${this.serviceUrl}/estado_cita/agendar`, {params})
    }
    retirarProfesional(id_cita:string,id_region:number){
      const params = new HttpParams()
      .set('id_cita',id_cita)
      .set('id_region',id_region)

      return this.http.get<string>(`${this.serviceUrl}/estado_cita/retirarProfesional`, {params})
    }
    reprogramarCita(id_cita:string,fecha_programada:string,nueva_hora:string){
      const params = new HttpParams()
      .set('id_cita',id_cita)
      .set('fecha_programada',fecha_programada)
      .set('nueva_hora',nueva_hora)

      return this.http.get<string>(`${this.serviceUrl}/citas/reprogramar`, {params})
    }
    calcularDesplazamientosTurno(turno: Turno){
        return this.http.post(`${this.serviceUrl}/citas/calcularDesplazamiento`,[turno])
    }
    calcularDesplazamientoTurnoCompleto(turno: Turno[]){
      return this.http.post(`${this.serviceUrl}/citas/calcularDesplazamiento`,turno)
    }

    desagendarTurnoCompleto(fecha_turno:string){
      const params = new HttpParams()
      .set('fecha_turno',fecha_turno)

      return this.http.get(`${this.serviceUrl}/estado_cita/desagendarTurno`, {params})    
    }
    autoagendar(turno:  Turno []){
      return this.http.post(`${this.serviceUrl}/citas/autoagendar`,turno)
  }
}
