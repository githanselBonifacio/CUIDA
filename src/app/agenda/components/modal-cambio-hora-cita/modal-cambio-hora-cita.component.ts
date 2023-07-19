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

  horaCita = "";
  constructor(
    public dialogRef: MatDialogRef<ModalCambioHoraCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public citaSeleccionada: Cita,
    private agendaService: AgendaService,
  ) {}

  ngOnInit() {
    this.horaCita = this.getHoraFecha();
    console.log(this.horaCita)
  }
  getHoraFecha():string{
  const [fechaCompleta, horaCompleta] = String(this.citaSeleccionada.fechaInicio).split('T');
  const hora = horaCompleta.substring(0, 5);

  return hora;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onConfirm():void{
    const fecha = new Date(this.citaSeleccionada.fechaInicio);
    
    const year = fecha.getFullYear();
    const month = fecha.getMonth()+1;
    const day = fecha.getDate();

    this.agendaService.reprogramarCita(
      this.citaSeleccionada.idCita,
      `${year}-${month}-${day}`,
      this.horaCita
    ).subscribe(resp =>{
      this.agendaService.calcularDesplazamientosTurno(
        this.citaSeleccionada
      ).subscribe(resp =>{
        this.dialogRef.close(true)
        location.reload();
         
      })
    });
    
   
  }
}
