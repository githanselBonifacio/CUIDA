import { Component, Input } from '@angular/core';
import { ProcedimientosHistorial, TratamientoHistorial } from 'src/app/admin/interfaces/historialRemison.interface';


@Component({
  selector: 'app-agenda-items-cita',
  templateUrl: './items-cita.component.html',
  styleUrls: ['./items-cita.component.css']
})
export class ItemsCitaComponent {

  @Input() procedimientos!: ProcedimientosHistorial;
  @Input() tratamientos!: TratamientoHistorial[];

  contieneProcedimientos() {
    return this.procedimientos?.curaciones == null &&
      this.procedimientos?.canalizaciones == null &&
      this.procedimientos?.secreciones == null &&
      this.procedimientos?.fototerapias == null &&
      this.procedimientos?.tomaMuestras == null &&
      this.procedimientos?.sondajes == null &&
      this.procedimientos?.soporteNutricionales == null
  }
}
