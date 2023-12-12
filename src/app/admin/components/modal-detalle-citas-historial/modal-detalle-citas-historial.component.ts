import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CitaHitorial } from '../../interfaces/historialRemison.interface';
@Component({
  selector: 'app-modal-detalle-citas-historial',
  templateUrl: './modal-detalle-citas-historial.component.html',
  styleUrls: ['./modal-detalle-citas-historial.component.css']
})
export class ModalDetalleCitasHistorialComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleCitasHistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public citaSeleccionada: CitaHitorial,
  ) {

  }

  onClose(): void {
    this.dialogRef.close(false);
  }
  contieneProcedimientos() {
    return this.citaSeleccionada.procedimientos?.curaciones == null &&
      this.citaSeleccionada.procedimientos?.canalizaciones == null &&
      this.citaSeleccionada.procedimientos?.secreciones == null &&
      this.citaSeleccionada.procedimientos?.fototerapias == null &&
      this.citaSeleccionada.procedimientos?.tomaMuestras == null &&
      this.citaSeleccionada.procedimientos?.sondajes == null &&
      this.citaSeleccionada.procedimientos?.soporteNutricionales == null
  }
}
