import { Component, Input } from '@angular/core';

import { Cita,crearCita } from '../../interfaces/turno.interface';

import {MatDialog} from '@angular/material/dialog'
import { ModalSeleccionProfesionalComponent } from '../modal-seleccion-profesional/modal-seleccion-profesional.component';
import {VentanaConfirmacionComponent} from '../../../shared/components/ventana-confirmacion/ventana-confirmacion.component'
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { ModalCambioHoraCitaComponent } from '../modal-cambio-hora-cita/modal-cambio-hora-cita.component';
import { ModalDetalleRemisionComponent } from '../modal-detalle-remision/modal-detalle-remision.component';
import { switchMap ,filter,tap } from 'rxjs/operators';

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


    asignarProfesionalCita(citaSeleccionada: Cita): void {
      let opcionProfesional:string='';
      this.agendaService.getProfesionaFromTurnoCiudad(this.fechaTurno, this.idCiudad, this.idHorarioTurno)
        .pipe(
          tap(profesionales => {
            this.citaSeleccionada = citaSeleccionada;
            const dialogRef = this.dialogoSeleccionProfesional.open(ModalSeleccionProfesionalComponent, {
              data: {
                profesionales: profesionales
              },
            });
            dialogRef.afterClosed()
              .pipe(
                filter(opcionProfesional => opcionProfesional !== ''),
                switchMap(opcionProfesionalResp => {
                  opcionProfesional =opcionProfesionalResp
                  return this.agendaService.asignarProfesionaByIdCita(
                    this.citaSeleccionada.idCita,
                    opcionProfesional,
                  );
                }),
                switchMap(resp => {
                  return this.agendaService.calcularDesplazamientosCitasProfesional(
                    this.fechaTurno,
                    this.idHorarioTurno,
                    this.idCiudad,
                    opcionProfesional
                  );
                }),
              )
              .subscribe(resp => {
                location.reload();
              });
          }),
        )
        .subscribe();
    }
   desagendarProfesionalCita(citaSeleccionada:Cita, mensaje:string):void{
    this.citaSeleccionada = citaSeleccionada;
    
    const dialogRef = this.dialogoSeleccionProfesional.open(VentanaConfirmacionComponent, {
      data: {
              mensaje:mensaje
            }
      });
      dialogRef.afterClosed().pipe(
        filter(result => result),
        switchMap(() => this.agendaService.retirarProfesional(this.citaSeleccionada.idCita)),
        switchMap(() => this.agendaService.calcularDesplazamientosCitasProfesional(
                            this.fechaTurno,
                            this.idHorarioTurno,
                            this.idCiudad,
                            this.citaSeleccionada.idProfesional
                        )
        )
      ).subscribe(() => {
        location.reload();
      });
     
   }

   reprogramarHoraCita(citaSeleccionada:Cita):void{
    const fecha = new Date(citaSeleccionada.fechaProgramada);
    
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}`
    const horaActual =`${hours}:${minutes}`

    const dialogRef = this.dialogoRepogramarCita.open(ModalCambioHoraCitaComponent,{
        data : horaActual
    })
    dialogRef.afterClosed().pipe(
      switchMap(nuevaHora =>{
        if (nuevaHora !== ''){
          return  this.agendaService.reprogramarCita(
            citaSeleccionada.idCita,
            fechaFormateada,
            nuevaHora
          )
        }else{
          throw Error('No se ha seleccionado una hora');
          }
        }
      ),
      switchMap(resp => this.agendaService.calcularDesplazamientosCitasProfesional(
            this.fechaTurno,
            this.idHorarioTurno,
            this.idCiudad,
            citaSeleccionada.idProfesional
           )
       
      )
    ).subscribe(resp =>{
      location.reload()
   });
   }
   
   mostrarDetalleCita(citaSeleccionada:Cita):void{
      this.citaSeleccionada = citaSeleccionada;
      const modalCita = this.modalMapPuntoUnico.open(ModalDetalleRemisionComponent, {
        data : this.citaSeleccionada
      })

      
   }
}
