
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemDiaTurno, Profesional, Secuencia, Turno } from 'src/app/shared/interfaces/agenda/profesional.interface';
import { ToastType } from 'src/app/shared/components/toast/toast.component';
import { formatoFecha } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { semanaAgregadaMsg } from 'src/app/shared/interfaces/general/mensajes.data';


@Component({
  selector: 'app-modal-accion-agregar-secuencia',
  templateUrl: './modal-accion-agregar-secuencia.component.html',
  styleUrls: ['./modal-accion-agregar-secuencia.component.css'],
})
export class ModalAccionAgregarSecuenciaComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalAccionAgregarSecuenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService,

  ) { }

  get profesionalesSeleccionados(): Profesional[] {
    return this.data['profesionales'];
  }
  get secuencias(): Secuencia[] {
    return this.data['secuencias'];
  }
  semanaInput: any;
  secuenciasSemana: any[] = [];


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
    const fechasBuscadas = this.secuenciasSemana.find(sc => JSON.stringify(sc.semana) === JSON.stringify(days));
    return fechasBuscadas === undefined;
  }

  agregarFechaSecuencia() {
    let days: Date[] = this.extraerSemanaSecuencia();
    const validarInsercionSemana = this.validarInsercionSemanaSecuencia(days);

    if (validarInsercionSemana) {
      this.secuenciasSemana.push({ "secuencia": {}, "semana": days });

    } else {

      this.toastService.mostrarToast({ status: null, menssage: semanaAgregadaMsg }, 5, ToastType.Info)
    }
  }


  eliminarSemana(fechasEliminar: Date[]) {
    this.secuenciasSemana = this.secuenciasSemana.filter(sc => JSON.stringify(sc.semana) != JSON.stringify(fechasEliminar));
  }

  agregarSecuenciaSemana(secuencia: Secuencia, index: number) {
    this.secuenciasSemana[index]!.secuencia = secuencia;
  }
  enviar() {
    const turnos: Turno[] = this.profesionalesSeleccionados
      .map(profesional => {
        return {
          "idProfesional": profesional.numeroIdentificacion,
          "idRegional": profesional.idRegional,
          "fechasTurno": this.secuenciasSemana.map(s => s.semana).flat(),
          "secuencia": this.secuenciasSemana.map(s => s.secuencia)
        }
      }).flatMap(ts => {
        return ts.fechasTurno.map(fecha => {
          return {
            idTurno: null,
            fechaTurno: fecha,
            idProfesional: ts.idProfesional,
            idRegional: ts.idRegional,
            idHorarioTurno: this.buscarHorariosDiaSecuencia(ts.secuencia[0].itemsDiaTurno, fecha)
          }
        })
      }).flatMap(ts => {
        return ts.idHorarioTurno.map(idHorarioTurno => {
          return {
            idTurno: null,
            fechaTurno: formatoFecha(ts.fechaTurno),
            idProfesional: ts.idProfesional,
            idRegional: ts.idRegional,
            idHorarioTurno: idHorarioTurno
          }
        })
      })

    this.dialogRef.close(turnos);
  }
  buscarHorariosDiaSecuencia(itemsDia: ItemDiaTurno[], fechaTurno: Date) {
    return itemsDia.filter(itemDia => {
      return (itemDia.numeroDia) == fechaTurno.getDay()
    })
      .map(itemsDia => itemsDia.horariosTurno.map(horarioItem => horarioItem.id))
      .flat();
  }

  validarSecuencias() {
    const todosConSecuencia = this.secuenciasSemana.map(s => Object.keys(s.secuencia).length > 0)
      .reduce((accumulator, currentValue) => accumulator && currentValue, true);

    return this.secuenciasSemana.length > 0
      && todosConSecuencia;
  }
  cancel() {
    this.dialogRef.close(null);
  }
}
