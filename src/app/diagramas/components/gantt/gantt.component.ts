
import { Actividad } from '../../interfaces/tarea-gantt.interface';
import { Component, Input, EventEmitter, Output, HostListener, ViewChild, ElementRef, ViewChildren, AfterViewChecked, AfterContentInit, AfterContentChecked, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Tarea } from '../../interfaces/tarea-gantt.interface'
import { MatDialog } from '@angular/material/dialog'
import { Observable, delay, of } from 'rxjs';


@Component({
  selector: 'app-diagramas-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
})

export class GanttComponent implements AfterViewInit {

  constructor(
    private modalMapRuta: MatDialog,
  ) { }


  @ViewChild('containerActividad') containerGeneric: ElementRef | undefined;
  @Input() public actividades: Actividad[] = [];
  @Input() public horas: string[] = [];
  @Input() public tituloActorResponsable = "";

  @Output() idprofesionalEvent = new EventEmitter<Actividad>();
  @Output() retirarTareaEvent = new EventEmitter<string>();
  @Output() reprogramarTareaEvent = new EventEmitter<string>();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) { this.sizeScreen() }

  @Input() widthContainer = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.sizeScreen();
    }, 800);
  }

  sizeScreen() {
    this.widthContainer = this.containerGeneric?.nativeElement.offsetWidth;
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

  calcularWidth(duracion: number) {
    return (duracion * this.widthContainer) / this.intervaloPx;
  }

  calcularLeft(fechaTarea: string) {
    const fechaIso = new Date(fechaTarea).getTime() / 1000;
    const m = (this.widthContainer / (this.fechaFinTurnoUnix - this.fechaInicioTurnoUnix));
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
