import { Component, Input, OnInit } from '@angular/core';
import { Cita } from '../../interfaces/historialRemison.interface';
import { EstadoCita, getNombreEstadoCitaById } from 'src/app/shared/interfaces/maestros.interfaces';
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
  @Input() public citas: Cita[] = [];
  @Input() public estadosCita: EstadoCita[] = [];
  @Input() public isHistorial: boolean = false;

  ngOnInit() {
    this.tableId = uuidv4().substr(0, 7);
  }

  getNombreEstadoCita(id: string) {
    return getNombreEstadoCitaById(id, this.estadosCita);
  }

  mostrarModalDetalleCita(citaSeleccionada: Cita): void {
    const modalCita = this.dialogoDetalleCita.open(ModalDetalleCitasHistorialComponent, {
      data: citaSeleccionada
    })

  }
}
