import { Component , Inject,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Cita} from '../../interfaces/turno.interface'
import { AgendaService } from 'src/app/agenda/services/agenda.service';

@Component({
  selector: 'app-modal-cambio-hora-cita',
  templateUrl: './modal-cambio-hora-cita.component.html',
  styleUrls: ['./modal-cambio-hora-cita.component.css']
})
export class ModalCambioHoraCitaComponent implements OnInit{

  horaCitaNueva = "";
  constructor(
    public dialogRef: MatDialogRef<ModalCambioHoraCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public horaActual: string,
  ) {}

  ngOnInit() {
    this.horaCitaNueva = this.horaActual;
   
  }


  onNoClick(): void {
    this.dialogRef.close('');
  }
  onConfirm():void{
    this.dialogRef.close(this.horaCitaNueva)
  }
}
