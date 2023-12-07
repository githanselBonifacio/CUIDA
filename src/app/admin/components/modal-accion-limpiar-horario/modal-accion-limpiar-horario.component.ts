import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesional, Turno } from 'src/app/agenda/interfaces/profesional.interface';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';
import { formatoFecha } from 'src/app/shared/interfaces/maestros.interfaces';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-modal-accion-limpiar-horario',
  templateUrl: './modal-accion-limpiar-horario.component.html',
  styleUrls: ['./modal-accion-limpiar-horario.component.css']
})
export class ModalAccionLimpiarHorarioComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalAccionLimpiarHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService,
  ) { }

  get profesionalesSeleccionados(): Profesional[] {
    return this.data['profesionales'];
  }

  semanaInput: any;
  fechasSemanas: any[] = [];

  extraerSemanaSecuencia() {
    let year = parseInt(this.semanaInput.substring(0, 4));
    let week = parseInt(this.semanaInput.substring(6));
    let date = new Date(year, 0, 1);
    let days: Date[] = [];
    date.setDate(date.getDate() + (week - 1) * 7 - date.getDay() + 1);
    for (let i = 0; i < 7; i++) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  validarInsercionSemanaSecuencia(days: Date[]) {
    const fechasBuscadas = this.fechasSemanas.find(fechas => JSON.stringify(fechas) === JSON.stringify(days));
    return fechasBuscadas === undefined;
  }

  agregarFechasSemanas() {
    let days: Date[] = this.extraerSemanaSecuencia();
    const validarInsercionSemana = this.validarInsercionSemanaSecuencia(days);

    if (validarInsercionSemana) {
      this.fechasSemanas.push(days);

    } else {
      this.toastService.mostrarToast(ToastType.Info, TitleToast.Info, "Ya fue agregado esta semana", 5);
    }
  }

  eliminarSemana(fechasEliminar: any[]) {
    this.fechasSemanas = this.fechasSemanas.filter(fechas => JSON.stringify(fechas) != JSON.stringify(fechasEliminar));
  }
  enviar() {
    this.fechasSemanas = this.fechasSemanas.reduce((acc, l) => acc.concat(l), []);

    let eliminarturnoRequest: any[] = this.profesionalesSeleccionados
      .map(profesional => {
        return {
          "idProfesional": profesional.numeroIdentificacion,
          "fechasTurno": this.fechasSemanas.flat().map(f => formatoFecha(f))
        }
      })
      .flatMap(t => {
        return t.fechasTurno.map(f => {
          return {
            "idProfesional": t.idProfesional,
            "fechaTurno": f
          }
        })
      });

    this.dialogRef.close(eliminarturnoRequest);
  }
  cancel() {
    this.dialogRef.close(null);
  }

}
