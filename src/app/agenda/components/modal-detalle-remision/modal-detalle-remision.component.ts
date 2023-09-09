import { Component, OnInit, Inject } from '@angular/core';
import { DatosAtencionRemision, Paciente, Cita, Tratamiento } from '../../interfaces/remision.interface'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { Procedimientos } from '../../interfaces/remision.interface';
@Component({
  selector: 'app-modal-detalle-remision',
  templateUrl: './modal-detalle-remision.component.html',
  styleUrls: ['./modal-detalle-remision.component.css']
})
export class ModalDetalleRemisionComponent implements OnInit {
  paciente: Paciente | any = {};
  datosAtencionRemision: DatosAtencionRemision | any = {};
  tratamientos: Tratamiento[] = [];
  procedimientos: Procedimientos | any;


  constructor(
    public dialogRef: MatDialogRef<ModalDetalleRemisionComponent>,
    @Inject(MAT_DIALOG_DATA) public citaSeleccionada: Cita,
    private agendaService: AgendaService,

  ) {

  }

  ngOnInit(): void {
    this.agendaService.getPacienteByRemision(this.citaSeleccionada.idRemision)
      .subscribe(resp => {
        this.paciente = resp.result;
      })

    this.agendaService.getDatosAtencionByRemision(this.citaSeleccionada.idRemision)
      .subscribe(resp => {
        this.datosAtencionRemision = resp.result;
      })

    this.agendaService.getTratamientoByCita(this.citaSeleccionada.idCita)
      .subscribe(resp => {
        this.tratamientos = resp.result
      });

    this.agendaService.getProcedimientosByCita(this.citaSeleccionada.idCita)
      .subscribe(resp => {
        this.procedimientos = resp.result
      })



  }
  onClose(): void {
    this.dialogRef.close(false);
  }

}
