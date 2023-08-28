import { Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Cita} from '../../interfaces/historialRemison.interface';
@Component({
  selector: 'app-modal-detalle-citas-historial',
  templateUrl: './modal-detalle-citas-historial.component.html',
  styleUrls: ['./modal-detalle-citas-historial.component.css']
})
export class ModalDetalleCitasHistorialComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleCitasHistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public citaSeleccionada: Cita,
  ) {
  
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
  contieneProcedimientos(){
    console.log(this.citaSeleccionada.procedimientos.curaciones)
    console.log(this.citaSeleccionada.procedimientos.canalizaciones)
    console.log(this.citaSeleccionada.procedimientos.secreciones)
    console.log(this.citaSeleccionada.procedimientos.fototerapias)
    console.log(this.citaSeleccionada.procedimientos.toma_muestra)
    console.log(this.citaSeleccionada.procedimientos.sondajes)
    console.log(this.citaSeleccionada.procedimientos.soporte_nutricionales)
    return this.citaSeleccionada.procedimientos.curaciones==null &&
           this.citaSeleccionada.procedimientos.canalizaciones==null &&
           this.citaSeleccionada.procedimientos.secreciones==null &&
           this.citaSeleccionada.procedimientos.fototerapias==null &&
           this.citaSeleccionada.procedimientos.toma_muestra==null &&
           this.citaSeleccionada.procedimientos.sondajes==null &&
           this.citaSeleccionada.procedimientos.soporte_nutricionales==null
  }
}
