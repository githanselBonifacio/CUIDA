import { Injectable } from '@angular/core';
import { Regional, HorarioTurno, TipoIdentificacion, Profesion } from '../../interfaces/maestros/maestros.interfaces'
import { HttpClient } from '@angular/common/http';
import { EstadoCita } from "../../interfaces/maestros/maestros.interfaces"
import { environment } from '../../../../environments/environments';
import { Respuesta } from '../../interfaces/maestros/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {
  private resourceUrl: string = 'maestros'

  public regionales: Regional[] = [];
  public horariosTurno: HorarioTurno[] = [];
  public estadosCita: EstadoCita[] = [];
  public tiposIdentificacion: TipoIdentificacion[] = [];
  public profesiones: Profesion[] = [];
  public horarioTurnoSeleccionado!: HorarioTurno;


  constructor(private http: HttpClient) { }

  async getRegionales() {
    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/regionales`)
      .subscribe(resp => {
        this.regionales = resp.result;
      });
  }
  getRegionalesObservable() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/regionales`);
  }
  async getHorarioTurno() {
    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/horarioTurno`)
      .subscribe(resp => {
        this.horariosTurno = resp.result;
      });

  }
  getHorarioTurnoObservable() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/horarioTurno`);
  }
  async getTiposIdentificacion() {
    this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/tipoIdentificacion`)
      .subscribe(resp => {
        this.tiposIdentificacion = resp.result
      });
  }
  getHorarioTurnoById(idHorario: number) {
    let horarioTurnoBuscado = this.horariosTurno.find(h => h.id == idHorario);
    if (horarioTurnoBuscado) {
      this.horarioTurnoSeleccionado = horarioTurnoBuscado;
    }
  }

  async getEstadosCita() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/estadosCita`)
      .subscribe(resp => {
        this.estadosCita = resp.result;
      })
  }

  async getProfesiones() {
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.resourceUrl}/profesiones`)
      .subscribe(resp => {
        this.profesiones = resp.result;
      })
  }

}
