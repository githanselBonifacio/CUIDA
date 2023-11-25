import { Component, OnInit, Inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DatosAtencionRemision, Paciente, Cita, Tratamiento } from '../../interfaces/remision.interface'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { Procedimientos } from '../../interfaces/remision.interface';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { AdminRemisionService } from 'src/app/admin/services/admin-remision.service';

@Component({
  selector: 'app-modal-detalle-remision',
  templateUrl: './modal-detalle-remision.component.html',
  styleUrls: ['./modal-detalle-remision.component.css']
})
export class ModalDetalleRemisionComponent implements OnInit {


  pageLoaded: boolean = false;
  paciente: Paciente | any = {};
  datosAtencionRemision: DatosAtencionRemision | any = {};
  tratamientos: Tratamiento[] = [];
  procedimientos: Procedimientos | any;


  constructor(
    public dialogRef: MatDialogRef<ModalDetalleRemisionComponent>,
    @Inject(MAT_DIALOG_DATA) public citaSeleccionada: Cita,
    private agendaService: AgendaService,
    private adminPersonalService: AdminPersonalService,
    private adminRemisionService: AdminRemisionService

  ) {

  }

  ngOnInit(): void {
    forkJoin([
      this.adminRemisionService.getPacienteByRemision(this.citaSeleccionada.idRemision),
      this.adminRemisionService.getDatosAtencionByRemision(this.citaSeleccionada.idRemision),
      this.agendaService.getTratamientoByCita(this.citaSeleccionada.idCita),
      this.agendaService.getProcedimientosByCita(this.citaSeleccionada.idCita)
    ]).subscribe(results => {
      this.paciente = results[0].result;
      this.datosAtencionRemision = results[1].result;
      this.tratamientos = results[2].result;
      this.procedimientos = results[3].result;
      this.pageLoaded = true;
    });


  }
  onClose(): void {
    this.dialogRef.close(false);
  }

}
