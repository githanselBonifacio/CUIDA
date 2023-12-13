import { Component, Input } from '@angular/core';
import { Procedimientos, Tratamiento } from 'src/app/shared/interfaces/agenda/remision.interface';


@Component({
  selector: 'app-agenda-items-cita',
  templateUrl: './items-cita.component.html',
  styleUrls: ['./items-cita.component.css']
})
export class ItemsCitaComponent {

  @Input() procedimientos: Procedimientos = {
    canalizaciones: [],
    fototerapias: [],
    sondajes: [],
    soporteNutricionales: [],
    tomaMuestras: [],
    curaciones: [],
    secreciones: []

  };
  @Input() tratamientos: Tratamiento[] = [];

  contieneProcedimientos() {

    return this.procedimientos?.curaciones?.length == 0 &&
      this.procedimientos?.canalizaciones?.length == 0 &&
      this.procedimientos?.secreciones?.length == 0 &&
      this.procedimientos?.fototerapias?.length == 0 &&
      this.procedimientos?.tomaMuestras?.length == 0 &&
      this.procedimientos?.sondajes?.length == 0 &&
      this.procedimientos?.soporteNutricionales?.length == 0
  }
}
