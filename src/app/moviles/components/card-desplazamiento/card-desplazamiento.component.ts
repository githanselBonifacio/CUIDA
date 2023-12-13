import { Component, Input } from '@angular/core';
import { Desplazamiento } from '../../../shared/interfaces/moviles/desplazamiento.interface';
import { MovilesService } from 'src/app/moviles/services/moviles.service';
import { MatDialog } from '@angular/material/dialog'
import { VentanaConfirmacionComponent } from 'src/app/shared/components/ventana-confirmacion/ventana-confirmacion.component';
import { ModalAsignarMovilComponent } from '../modal-asignar-movil/modal-asignar-movil.component';

@Component({
  selector: 'app-moviles-card-desplazamiento',
  templateUrl: './card-desplazamiento.component.html',
  styleUrls: ['./card-desplazamiento.component.css']
})
export class CardDesplazamientoComponent {
  @Input()
  public desplazamientos: Desplazamiento[] = [];

  mensajeDesagendar = "Desea desagendar movil?"

  constructor(
    private movilService: MovilesService,
    private dialogoDesasignarMovil: MatDialog,
    private dialogoAsignarMovil: MatDialog
  ) {

  }

  formatDateTime(dateTime: Date): string {
    return dateTime.toLocaleString('es-ES').replace('T', ' ');
  }

  convertSecondsToMinutesOrHours(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours == 0) {
      return `${minutes} min`
    } else {
      if (minutes == 0) {
        return `${hours} hr(s)`;
      } else {
        return `${hours} hr(s) ${minutes} min`;
      }

    }

  }

  asignarDesplazamiento(desplazamiento: Desplazamiento): void {
    const dialogRef = this.dialogoAsignarMovil.open(ModalAsignarMovilComponent, {
      data: desplazamiento
    });

  }
  desasignarDesplazamiento(desplazamiento: Desplazamiento): void {
    const dialogRef = this.dialogoDesasignarMovil.open(VentanaConfirmacionComponent, {
      data: {
        mensaje: this.mensajeDesagendar
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.movilService.desasignarMovil(
          desplazamiento.idCitaPartida,
          desplazamiento.idCitaDestino,
        ).subscribe(resp => {
          location.reload();

        });

      }
    })
  }

}
