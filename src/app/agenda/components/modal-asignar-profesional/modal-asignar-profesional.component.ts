import { Component,Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AgendaService } from 'src/app/shared/services/agenda/agenda.service';
import {Turno} from '../../interfaces/turno.interface'
import { Profesional } from '../../interfaces/profesional.interface';

@Component({
  selector: 'app-modal-asignar-profesional',
  templateUrl: './modal-asignar-profesional.component.html',
  styleUrls: ['./modal-asignar-profesional.component.css']
})
export class ModalAsignarProfesionalComponent implements OnInit{
  
  opcionProfesional: string ="";

  constructor(
    public dialogRef: MatDialogRef<ModalAsignarProfesionalComponent>,
    @Inject(MAT_DIALOG_DATA) public citaSeleccionada: Turno,
    private agendaService: AgendaService,
  ) {}

  ngOnInit() {
    console.log(this.citaSeleccionada)
    this.agendaService.getProfesionalesRegion(
      this.citaSeleccionada.id_regional
    )
  }
 
  get profesionales():Profesional[]{
        return this.agendaService.profesionales;
  }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onConfirm():void{
    this.citaSeleccionada.id_profesional=this.opcionProfesional;
    this.agendaService.asignarProfesionaByIdCita(
      this.citaSeleccionada.id_cita,
      this.opcionProfesional,
      this.citaSeleccionada.id_regional
    ).subscribe(
        resp =>{
          location.reload();
                this.agendaService.calcularDesplazamientosTurno(this.citaSeleccionada)
                .subscribe(resp=>{
                    location.reload();
                });
        }
    );
    this.dialogRef.close(true)
    
  }
}
