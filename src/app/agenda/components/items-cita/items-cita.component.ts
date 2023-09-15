import { Component, Input } from '@angular/core';
import { Procedimientos, Tratamiento } from '../../interfaces/remision.interface';

@Component({
  selector: 'app-agenda-items-cita',
  templateUrl: './items-cita.component.html',
  styleUrls: ['./items-cita.component.css']
})
export class ItemsCitaComponent {

  @Input() procedimientos: Procedimientos | any;
  @Input() tratamientos: Tratamiento | any;

  contieneProcedimientos() {
    return this.procedimientos.curaciones == null &&
      this.procedimientos.canalizaciones == null &&
      this.procedimientos.secreciones == null &&
      this.procedimientos.fototerapias == null &&
      this.procedimientos.tomaMuestra == null &&
      this.procedimientos.sondajes == null &&
      this.procedimientos.soporteNutricionales == null
  }
}
