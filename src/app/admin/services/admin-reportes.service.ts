import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminReportesServiceService {
  private urlRecurso = 'reportes';

  constructor(private http: HttpClient) { }

  getReporteTurnoAnual(anio: number, idRegional: string) {
    const params = new HttpParams()
      .set('anio', anio)
      .set('idRegional', idRegional)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/turno/anual`, { params });
  }

  getReporteTurnoMensual(anio: number, numeroMes: number, idRegional: string) {
    const params = new HttpParams()
      .set('anio', anio)
      .set('numeroMes', numeroMes)
      .set('idRegional', idRegional)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/turno/mensual`, { params });
  }


  getReporteCancelacioncitasAnual(anio: number, idRegional: string) {
    const params = new HttpParams()
      .set('anio', anio)
      .set('idRegional', idRegional)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/cancelacionCitas/anual`, { params });
  }

  getReporteCancelacioncitasMensual(anio: number, numeroMes: number, idRegional: string) {
    const params = new HttpParams()
      .set('anio', anio)
      .set('numeroMes', numeroMes)
      .set('idRegional', idRegional)
    return this.http.get<Respuesta>(`${environment.URL_API_CUIDA}/${this.urlRecurso}/cancelacionCitas/mensual`, { params });
  }
}
