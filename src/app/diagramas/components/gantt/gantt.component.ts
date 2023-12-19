
import { Actividad, Tarea } from '../../interfaces/tarea-gantt.interface';
import { Component, Input, EventEmitter, Output, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { EstadosCita } from 'src/app/shared/interfaces/agenda/remision.interface';


@Component({
  selector: 'app-diagramas-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
})

export class GanttComponent {

  constructor(
    private modalMapRuta: MatDialog
  ) { }




  @ViewChild('containerActividad') containerGeneric: ElementRef | undefined;
  @Input() public actividades: Actividad[] = [];
  @Input() public horas: string[] = [];
  @Input() public tituloActorResponsable = "";

  @Output() idprofesionalEvent = new EventEmitter<Actividad>();
  @Output() retirarTareaEvent = new EventEmitter<string>();
  @Output() reprogramarTareaEvent = new EventEmitter<string>();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) { }


  validState(estado: number): boolean {
    return estado == EstadosCita.agendada
  }
  get widthContainer() {
    return this.containerGeneric?.nativeElement.offsetWidth;
  }
  get intervaloPx() {
    return (this.fechaFinTurnoUnix - this.fechaInicioTurnoUnix);
  }
  get fechaInicioTurnoUnix() {
    return new Date(this.actividades[0].tareas[0].fechaProgramada).setHours(parseInt(this.horas[0])) / 1000;
  }
  get fechaFinTurnoUnix() {

    return new Date(this.actividades[0].tareas[0].fechaProgramada).setHours(parseInt(this.horas[this.horas.length - 1])) / 1000;
  }
  get divisionHora() {
    return this.widthContainer / (this.horas.length - 1);
  }

  mostrarRutaMapa(tareas: Tarea[]): void {
    /*const dialogRef = this.modalMapRuta.open(MapRutaComponent, {
      data: tareas
    })*/

  }

  calcularWidth(duracion: number, width: number) {
    return (duracion * width) / this.intervaloPx;
  }

  calcularLeft(fechaTarea: string, width: number) {
    const fechaIso = new Date(fechaTarea).getTime() / 1000;
    const m = (width / (this.fechaFinTurnoUnix - this.fechaInicioTurnoUnix));
    return Math.round((fechaIso * m - this.fechaInicioTurnoUnix * m) * 100) / 100;

  }

  emitirProfesionalTurno(actividadProfesional: Actividad): void {
    this.idprofesionalEvent.emit(actividadProfesional);
  }

  emitirDesagendarTarea(idTarea: string) {
    this.retirarTareaEvent.emit(idTarea);
  }
  emitirReprogramarTarea(idTarea: string) {
    this.reprogramarTareaEvent.emit(idTarea);
  }
}
