import { Component, Input } from '@angular/core';

import { Cita,crearCita } from '../../interfaces/turno.interface';

import {MatDialog} from '@angular/material/dialog'
import { ModalSeleccionProfesionalComponent } from '../modal-seleccion-profesional/modal-seleccion-profesional.component';
import {VentanaConfirmacionComponent} from '../../../shared/components/ventana-confirmacion/ventana-confirmacion.component'
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { ModalCambioHoraCitaComponent } from '../modal-cambio-hora-cita/modal-cambio-hora-cita.component';
import { ModalDetalleRemisionComponent } from '../modal-detalle-remision/modal-detalle-remision.component';

@Component({
  selector: 'app-agenda-card-cita',
  templateUrl: './card-cita.component.html',
  styleUrls: ['./card-cita.component.css'],
})
export class CardCitaComponent {
    @Input()
    public citas:Cita[] = [];

    citaSeleccionada :Cita = crearCita();
    
    @Input()
    public idCiudad: string = '';
    @Input()
    public fechaTurno: string = new Date().toISOString().slice(0, 10);
    @Input()
    public idHorarioTurno: number = 0

    constructor(
      private dialogoSeleccionProfesional : MatDialog,
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

   asignarProfesionalCita(citaSeleccionada:Cita):void{
       
        this.agendaService
              .getProfesionaFromTurnoCiudad(this.fechaTurno, this.idCiudad,this.idHorarioTurno)
              .subscribe(profesionales =>{
                this.citaSeleccionada = citaSeleccionada;
                const dialogRef = this.dialogoSeleccionProfesional.open(ModalSeleccionProfesionalComponent, {
                  data: {
                    profesionales     :profesionales
                  },
                });
                  dialogRef.afterClosed()
                      .subscribe(opcionProfesional => {
                       if(opcionProfesional != ''){
                         this.agendaService.asignarProfesionaByIdCita(
                            this.citaSeleccionada.idCita,
                            opcionProfesional,
                          ).subscribe(resp =>{
                              location.reload()
                            })
                         }
                         
                        });

        

      
        });

   }

   desagendarProfesionalCita(citaSeleccionada:Cita, mensaje:string):void{
    this.citaSeleccionada = citaSeleccionada;
    const dialogRef = this.dialogoSeleccionProfesional.open(VentanaConfirmacionComponent, {
      data: {
        mensaje:mensaje
       }

      });
      dialogRef.afterClosed()
          .subscribe(result =>{
              if(result){
                    this.agendaService.retirarProfesional(this.citaSeleccionada.idCita)
                       .subscribe(resp =>{
                           location.reload();  
                  });

        }
      })
     
   }

   reprogramarHoraCita(citaSeleccionada:Cita):void{
    this.citaSeleccionada = citaSeleccionada;
    const dialogRef = this.dialogoRepogramarCita.open(ModalCambioHoraCitaComponent,{
        data : this.citaSeleccionada
    })
    
   }
   
   mostrarDetalleCita(citaSeleccionada:Cita):void{
      this.citaSeleccionada = citaSeleccionada;
      const modalMap = this.modalMapPuntoUnico.open(ModalDetalleRemisionComponent, {
        data : this.citaSeleccionada
      })

      
   }
}
