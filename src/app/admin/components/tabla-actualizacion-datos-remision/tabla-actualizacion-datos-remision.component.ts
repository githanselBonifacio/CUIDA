import { Component, Input } from '@angular/core';
import { HistorialRemision } from '../../interfaces/historialRemison.interface';

@Component({
  selector: 'app-tabla-actualizacion-datos-remision',
  templateUrl: './tabla-actualizacion-datos-remision.component.html',
  styleUrls: ['./tabla-actualizacion-datos-remision.component.css']
})
export class TablaActualizacionDatosRemisionComponent {
  @Input() public registroNuevo: HistorialRemision | any;
  @Input() public registroAnterior: HistorialRemision | any;

}
