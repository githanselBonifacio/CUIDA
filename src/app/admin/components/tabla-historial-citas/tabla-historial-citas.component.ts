import { Component, Input, OnInit } from '@angular/core';
import { CitaHitorial } from '../../../shared/interfaces/admin/historialRemison.interface';
import { EstadoCita, funtionGetNombreEstadoCitaById } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog'
import { ModalDetalleCitasHistorialComponent } from '../modal-detalle-citas-historial/modal-detalle-citas-historial.component';

@Component({
  selector: 'app-tabla-historial-citas',
  templateUrl: './tabla-historial-citas.component.html',
  styleUrls: ['./tabla-historial-citas.component.css']
})
export class TablaHistorialCitasComponent implements OnInit {
  currentPage = 1;
  tableId: string = "";


  constructor(
    private dialogoDetalleCita: MatDialog,
  ) { }
  @Input() public citas: CitaHitorial[] = [];
  @Input() public nuevasCitas: CitaHitorial[] = [];
  @Input() public estadosCita: EstadoCita[] = [];
  @Input() public isHistorial: boolean = false;

  //citasCompletas: CitaHitorial[] = [];
  convertEstados = funtionGetNombreEstadoCitaById;

  ngOnInit() {
    this.tableId = uuidv4().substr(0, 7);
    this.nuevasCitas = this.nuevasCitas.map(cita => {
      return {
        ...cita,
        idEstado: 0
      }
    });

  }
  get citasCompletas() {
    return this.citas?.concat(this.nuevasCitas);
  }

  mostrarModalDetalleCita(citaSeleccionada: CitaHitorial): void {
    const modalCita = this.dialogoDetalleCita.open(ModalDetalleCitasHistorialComponent, {
      data: citaSeleccionada
    })

  }
  getTituloEstados() {
    if (this.isHistorial) {
      return "Acción realizada"
    } else {
      return "Estado"
    }
  }
}
