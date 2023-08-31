import { Component, OnInit, Inject } from '@angular/core';
import {DatosAtencionRemision,Paciente,Cita, Curacion, Tratamiento,Sondaje,TomaMuestra, SoporteNutricional, Canalizacion,Fototerapia, Secrecion} from '../../interfaces/turno.interface'
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AgendaService } from 'src/app/agenda/services/agenda.service';

@Component({
  selector: 'app-modal-detalle-remision',
  templateUrl: './modal-detalle-remision.component.html',
  styleUrls: ['./modal-detalle-remision.component.css']
})
export class ModalDetalleRemisionComponent implements OnInit{
  paciente             : Paciente|any              = {};
  datosAtencionRemision: DatosAtencionRemision|any = {};       
  tratamientos         : Tratamiento            [] = [];
  curaciones           : Curacion               [] = [];
  sondajes             : Sondaje                [] = [];
  tomaMuestras         : TomaMuestra            [] = [];
  soporteNutricionales : SoporteNutricional     [] = [];
  canalizaciones       : Canalizacion           [] = [];
  fototerapias         : Fototerapia            [] = [];
  secreciones          : Secrecion              [] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalDetalleRemisionComponent>,
    @Inject(MAT_DIALOG_DATA) public citaSeleccionada: Cita,
    private agendaService: AgendaService,
  
  ) {
  
  }

  ngOnInit(): void {
    this.agendaService.getPacienteByRemision(this.citaSeleccionada.idRemision)
    .subscribe(resp =>{
      this.paciente = resp;
    })

    this.agendaService.getDatosAtencionByRemision(this.citaSeleccionada.idRemision)
    .subscribe(resp=>{
      this.datosAtencionRemision = resp;
    })

    this.agendaService.getTratamientoByCita(this.citaSeleccionada.idCita)
    .subscribe(resp =>{
      this.tratamientos = resp
    });

    this.agendaService.getCuracionByCita(this.citaSeleccionada.idCita)
    .subscribe(resp =>{
      this.curaciones = resp
    });

    this.agendaService.getSondajeByCita(this.citaSeleccionada.idCita)
    .subscribe(resp =>{
      this.sondajes = resp
    });

    this.agendaService.getTomaMuestraByCita(this.citaSeleccionada.idCita)
    .subscribe(resp =>{
      this.tomaMuestras = resp
    });

    this.agendaService.getSoporteNutricionalByCita(this.citaSeleccionada.idCita)
    .subscribe(resp =>{
      this.soporteNutricionales = resp
    });

    this.agendaService.getCanalizacionesByCita(this.citaSeleccionada.idCita)
    .subscribe(resp =>{
      this.canalizaciones = resp
    });

    this.agendaService.getFototerapiaByCita(this.citaSeleccionada.idCita)
    .subscribe(resp =>{
      this.fototerapias = resp
    });
    
    this.agendaService.getSecrecionByCita(this.citaSeleccionada.idCita)
    .subscribe(resp =>{
      this.secreciones = resp
    });
  }
  onClose(): void {
    this.dialogRef.close(false);
  }

}
