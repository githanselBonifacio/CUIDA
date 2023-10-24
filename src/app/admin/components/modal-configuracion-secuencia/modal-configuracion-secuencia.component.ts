import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { ItemDiaTurno, Secuencia } from 'src/app/agenda/interfaces/profesional.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccionFormulario } from '../../interfaces/enum';
import { HorarioTurno } from 'src/app/shared/interfaces/maestros.interfaces';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-modal-configuracion-secuencia',
  templateUrl: './modal-configuracion-secuencia.component.html',
  styleUrls: ['./modal-configuracion-secuencia.component.css']
})
export class ModalConfiguracionSecuenciaComponent implements OnInit, OnChanges {

  dias: string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
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

  getDuracionTotal(horariosTurno: HorarioTurno[]): number {
    let duracionTotal = 0;
    for (const horario of horariosTurno) {
      duracionTotal += horario.duracionHoras;
    }
    return duracionTotal;
  }
  get horariosturno() {
    return this.maestrosService.horariosTurno;
  }
  get secuencia(): Secuencia {
    return this.data['secuencia']
  }
  get accion() {
    return this.data['accion']
  }

  calcularHorasTotales() {
    this.sumaTotalHoras = this.secuenciaEditable?.itemsDiaTurno.reduce((tot, item) => tot + item.horariosTurno.reduce((acc, curr) => acc + curr.duracionHoras, 0), 0) ?? 0
  }
  onCancel() {
    this.dialogRef.close(null);
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
      this.toastService.mostrarToast(ToastType.Error, TitleToast.Error, "Datos faltantes verifique datos", 5);
    }

  }
  mostrarOpciones(id: string) {
    const selectorHorario = document.getElementsByName("selector-horario");
    const selectorHorarioButtoms = document.getElementsByName("selector-horario-buttom");

    for (let i = 0; i < selectorHorario.length; i++) {
      if (selectorHorario[i].getAttribute("id") != id && selectorHorarioButtoms[i].getAttribute("id") != `${id}-body`) {
        selectorHorario[i].setAttribute("deployed", "false");
        selectorHorarioButtoms[i].setAttribute("deployed", "false");
      }

    }
    const btnOpcion = document.getElementById(id)
    const btnOpcionBody = document.getElementById(`${id}-body`)
    if (btnOpcion?.getAttribute("deployed") == "true") {
      btnOpcion.setAttribute("deployed", "false");
      btnOpcionBody?.setAttribute("deployed", "false");
    } else {
      btnOpcion?.setAttribute("deployed", "true");
      btnOpcionBody?.setAttribute("deployed", "true");
    }

  }

}
