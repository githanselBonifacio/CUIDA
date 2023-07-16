import { Component, Input } from '@angular/core';

import { Turno } from '../../interfaces/turno.interface';

import {MatDialog} from '@angular/material/dialog'
import { ModalAsignarProfesionalComponent } from '../modal-asignar-profesional/modal-asignar-profesional.component';
import {VentanaConfirmacionComponent} from '../../../shared/components/ventana-confirmacion/ventana-confirmacion.component'
import { AgendaService } from 'src/app/shared/services/agenda/agenda.service';
import { ModalCambioHoraCitaComponent } from '../modal-cambio-hora-cita/modal-cambio-hora-cita.component';
import { PuntoUnicoComponent } from 'src/app/maps/components/punto-unico/punto-unico.component';
@Component({
  selector: 'app-agenda-card-cita',
  templateUrl: './card-cita.component.html',
  styleUrls: ['./card-cita.component.css'],
})
export class CardCitaComponent {
    @Input()
    public citas:Turno[] = [];

    citaSeleccionada :Turno = {
      id_turno:                0,
      fecha_turno:             new Date(),
      id_horario_turno:        0,
      id_cita:                 '',
      id_remision:             '',
      fecha_inicio:            '',
      duracion_seg:            0,
      holgura_seg:             0,
      id_regional:             0,
      latitud:                 0.0,
      longitud:                0.0,
      clasificacion_habilidad: '',
      estado:                  '',
      id_profesional:          '',
      id_movil:                '',
      conductor:               '',
      fecha_programada:        '',
      descripcion:             ''
    };
    

    public nombreRegionalFiltro: string = 'Barranquilla';

    public fechaTurno: string = new Date().toISOString().slice(0, 10);

    public idTurnoFiltro: number = 1

    constructor(
      private dialogoAsignarProfesional : MatDialog,
      private dialogoRepogramarCita : MatDialog,
      private modalMapPuntoUnico: MatDialog,
      private agendaService : AgendaService
    ){

    }

    convertSecondsToMinutesOrHours(seconds: number): string {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      
      if(hours == 0){
        return `${minutes} min`
      }else {
        if(minutes == 0){
          return `${hours} hr(s)`;
        }else{
          return `${hours} hr(s) ${minutes} min`;
        }
        
      }
      
    }

     formatDateTime(dateTimeString: string): string {
      const dateTime = new Date(dateTimeString);
      const day = dateTime.getDate().toString().padStart(2, '0');
      const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
      const year = dateTime.getFullYear().toString();
      const hours = dateTime.getHours().toString().padStart(2, '0');
      const minutes = dateTime.getMinutes().toString().padStart(2, '0');
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

   asignarProfesionalCita(citaSeleccionada:Turno):void{
        this.citaSeleccionada = citaSeleccionada;
        const dialogRef = this.dialogoAsignarProfesional.open(ModalAsignarProfesionalComponent, {
          data: this.citaSeleccionada,
        });

        dialogRef.afterClosed().subscribe(result => {
           //colocar popup de aviso   
        });

   }

   desagendarProfesionalCita(citaSeleccionada:Turno, mensaje:string):void{
    this.citaSeleccionada = citaSeleccionada;
    const dialogRef = this.dialogoAsignarProfesional.open(VentanaConfirmacionComponent, {
      data: {
        mensaje:mensaje
       }

      });
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
            this.agendaService.retirarProfesional(
               this.citaSeleccionada.id_cita,
               this.citaSeleccionada.id_regional
            ).subscribe(resp =>{
              if(resp){
                this.agendaService.calcularDesplazamientosTurno(this.citaSeleccionada).subscribe(resp =>{
                       location.reload();            
                });
              }
            });

        }
      })
     
   }

   reprogramarHoraCita(citaSeleccionada:Turno):void{
    this.citaSeleccionada = citaSeleccionada;
    const dialogRef = this.dialogoRepogramarCita.open(ModalCambioHoraCitaComponent,{
        data : this.citaSeleccionada
    })
    
   }
   
   mostrarMapaUbicacion(citaSeleccionada:Turno):void{
      this.citaSeleccionada = citaSeleccionada;
      const modalMap = this.modalMapPuntoUnico.open(PuntoUnicoComponent, {
        data : this.citaSeleccionada
      })
   }
}
