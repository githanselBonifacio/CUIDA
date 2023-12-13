import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profesional } from '../../../shared/interfaces/agenda/profesional.interface';


@Component({
  selector: 'app-modal-seleccion-profesional',
  templateUrl: './modal-seleccion-profesional.component.html',
  styleUrls: ['./modal-seleccion-profesional.component.css'],
})
export class ModalSeleccionProfesionalComponent {

  opcionProfesional: string = "";

  constructor(
    public dialogRef: MatDialogRef<ModalSeleccionProfesionalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  get profesionales(): Profesional[] {
    return this.data['profesionales'];
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.dialogRef.close(String(this.opcionProfesional))

  }
}
