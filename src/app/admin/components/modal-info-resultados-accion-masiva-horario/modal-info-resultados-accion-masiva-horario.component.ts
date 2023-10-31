import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';

@Component({
  selector: 'app-modal-info-resultados-accion-masiva-horario',
  templateUrl: './modal-info-resultados-accion-masiva-horario.component.html',
  styleUrls: ['./modal-info-resultados-accion-masiva-horario.component.css']
})
export class ModalInfoResultadosAccionMasivaHorarioComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalInfoResultadosAccionMasivaHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  informacionMostrada: any[] = [];

  ngOnInit(): void {
    this.informacionMostrada = this.turnos.map((t: any) => {
      return {
        "profesional": this.profesionales.find(p => p.numeroIdentificacion == t.idProfesional),
        "fechaTurno": t.fechaTurno
      }
    });

  }

  onConfirm() {
    this.dialogRef.close()
  }
  get turnos() {
    return this.data['turnos']
  }
  get profesionales(): Profesional[] {
    return this.data['profesionales']
  }
}
