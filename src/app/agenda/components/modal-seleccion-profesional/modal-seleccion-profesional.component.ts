import { Component,Inject, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-modal-seleccion-profesional',
  templateUrl: './modal-seleccion-profesional.component.html',
  styleUrls: ['./modal-seleccion-profesional.component.css'],
})
export class ModalSeleccionProfesionalComponent  implements OnInit{
  
  opcionProfesional: string ="";

  constructor(
    public dialogRef: MatDialogRef<ModalSeleccionProfesionalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
ngOnInit(): void {
    console.log(this.data)
}
  onNoClick(): void {
    this.dialogRef.close('');
  }
  onConfirm():void{
    console.log(this.data['profesionales'])
    this.dialogRef.close(String(this.opcionProfesional))
    
  }
}
