import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ItemDiaTurno, Secuencia } from 'src/app/shared/interfaces/agenda/profesional.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccionFormulario } from '../../../shared/interfaces/general/enum';
import { HorarioTurno } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ToastType } from 'src/app/shared/components/toast/toast.component';
import { datosFaltantesFormMsg } from 'src/app/shared/interfaces/general/mensajes.data';

@Component({
  selector: 'app-modal-configuracion-secuencia',
  templateUrl: './modal-configuracion-secuencia.component.html',
  styleUrls: ['./modal-configuracion-secuencia.component.css']
})
export class ModalConfiguracionSecuenciaComponent implements OnInit, OnChanges {

  dias: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  nombreSecuencia!: string;
  descripcionSecuencia!: string;
  secuenciaEditable?: Secuencia;
  editoSecuencia: boolean = false;
  habilitarNombreSecuencia = true;
  sumaTotalHoras: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalConfiguracionSecuenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private maestrosService: MaestrosService,
    private toastService: ToastService
  ) { }



  ngOnInit(): void {
    this.maestrosService.getHorarioTurno();
    if (this.accion == AccionFormulario.ACTUALIZAR) {
      this.habilitarNombreSecuencia = false;
      this.secuenciaEditable = this.secuencia;
      this.nombreSecuencia = this.secuencia.nombre;
      this.descripcionSecuencia = this.secuencia.descripcion;
    } else {

      let itemsDiaTurnos: ItemDiaTurno[] = [];
      this.dias.forEach((dia, index) => {
        itemsDiaTurnos.push({
          numeroDia: index,
          nombreDia: dia,
          horariosTurno: []
        })
      })
      this.secuenciaEditable = {
        nombre: "",
        descripcion: "",
        itemsDiaTurno: itemsDiaTurnos
      }
    }
    this.calcularHorasTotales();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['descripcionSecuencia']) {
      this.editoSecuencia = true;

    }
  }

  get horariosTurno() {
    return this.maestrosService.horariosTurno;
  }
  get secuencia(): Secuencia {
    return this.data['secuencia']
  }
  get accion() {
    return this.data['accion']
  }

  calcularDuracionTotal(horariosTurno: HorarioTurno[]): number {
    let duracionTotal = 0;
    for (const horario of horariosTurno) {
      duracionTotal += horario.duracionHoras;
    }
    return duracionTotal;
  }
  calcularHorasTotales() {
    this.sumaTotalHoras = this.secuenciaEditable?.itemsDiaTurno.reduce((tot, item) => tot + item.horariosTurno.reduce((acc, curr) => acc + curr.duracionHoras, 0), 0)!
  }


  gethorariosSeleccionadosDiaTurno(numeroDia: number) {
    let itemTurnoDiaSeleccionado = this.secuenciaEditable?.itemsDiaTurno.find(itemTurno => itemTurno.numeroDia == numeroDia);
    return itemTurnoDiaSeleccionado?.horariosTurno;
  }
  validarTurnoDescanso(numeroDia: number) {
    let horariosTurnoSeleccionado = this.gethorariosSeleccionadosDiaTurno(numeroDia);
    return horariosTurnoSeleccionado?.find(h => h.nombre == "D") != undefined;

  }
  validarturnoSeleccionado(horarioTurno: HorarioTurno, numeroDia: number) {
    let horariosTurnoSeleccionado = this.gethorariosSeleccionadosDiaTurno(numeroDia);
    const turnoDescanso = horariosTurnoSeleccionado?.find(h => h.nombre == "D") != undefined;

    if (turnoDescanso) {
      return true;
    } else if (horariosTurnoSeleccionado?.length == 0) {
      return horariosTurnoSeleccionado?.find(h => h.id == horarioTurno.id) != undefined;
    } else {
      return horariosTurnoSeleccionado?.find(h => h.id == horarioTurno.id) != undefined || horarioTurno.nombre == "D";
    }


  }

  agregarHorarioTurno(horarioTurno: HorarioTurno, numeroDia: number) {
    this.editoSecuencia = true;
    let itemTurnoDiaSeleccionado = this.secuenciaEditable?.itemsDiaTurno.find(itemTurno => itemTurno.numeroDia == numeroDia);
    let horariosTurnoSeleccionado = itemTurnoDiaSeleccionado?.horariosTurno;

    if (horariosTurnoSeleccionado != undefined) {
      horariosTurnoSeleccionado?.push(horarioTurno);
    }
    this.calcularHorasTotales();
  }


  eliminarHorarioTurno(horarioTurno: HorarioTurno, numeroDia: number) {
    this.editoSecuencia = true;
    let itemTurnoDiaSeleccionado = this.secuenciaEditable?.itemsDiaTurno.find(itemTurno => itemTurno.numeroDia == numeroDia);
    let horariosTurnoSeleccionado = itemTurnoDiaSeleccionado?.horariosTurno.filter(h => h.id != horarioTurno.id);

    if (horariosTurnoSeleccionado != undefined) {
      var itemsDiaTurnoActualizados: any = this.secuenciaEditable?.itemsDiaTurno.map(item => {
        if (item.numeroDia == numeroDia) {
          return {
            ...item,
            horariosTurno: horariosTurnoSeleccionado
          }
        } else {
          return item;
        }
      })
    }
    if (this.secuenciaEditable != undefined) {
      this.secuenciaEditable = {
        ...this.secuenciaEditable,
        itemsDiaTurno: itemsDiaTurnoActualizados
      };
    }
    this.calcularHorasTotales();
  }


  guardarSecuencia() {
    if (this.secuenciaEditable && this.nombreSecuencia != null && !(/^\s*$/g.test(this.nombreSecuencia))) {
      this.secuenciaEditable.nombre = this.nombreSecuencia;
      this.secuenciaEditable.descripcion = this.descripcionSecuencia;
      this.dialogRef.close(this.secuenciaEditable);
    } else {
      this.toastService.mostrarToast({ status: null, menssage: datosFaltantesFormMsg }, 5, ToastType.Error);
    }

  }

  onCancel() {
    this.dialogRef.close(null);
  }



}
