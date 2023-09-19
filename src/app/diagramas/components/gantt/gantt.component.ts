
import { Actividad } from '../../interfaces/tarea-gantt.interface';
import { Component, ChangeDetectorRef, Input, EventEmitter, Output, HostListener, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef, ViewChildren, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Tarea } from '../../interfaces/tarea-gantt.interface'
import { MatDialog } from '@angular/material/dialog'
import { MapRutaComponent } from 'src/app/maps/components/map-ruta/map-ruta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagramas-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
})

export class GanttComponent implements AfterViewInit, AfterViewChecked, OnChanges {

  @Output() idprofesionalEvent = new EventEmitter<string>();
  @ViewChild('containerActividad') containerGeneric: ElementRef | undefined;

  constructor(
    private modalMapRuta: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  @Input() public actividades: Actividad[] = [];
  @Input() public horas: string[] = [];
  @Input() public tituloActorResponsable = "";


  currentUrl: string = '';
  simpleHoras: number[] = [];
  intervalo: number = 0;
  segundosInHoras = 3600;
  segundosInMinutos = 60;
  idHeaderHora = "header-hora";

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();

    this.construirDiagrama();
  }
  ngAfterViewInit(): void {

    this.currentUrl = this.router.url;
    this.simpleHoras = this.horas.map(hora => parseInt(hora.substring(0, 2)));
    this.intervalo = (this.horas.length - 1) * 3600;


  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.limpiaLineaTiempo();
    this.construirDiagrama();

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.limpiaLineaTiempo();
    this.construirDiagrama();

  }

  limpiaLineaTiempo() {

    const visitas = document.querySelectorAll(".tarea-visita");
    const holguras = document.querySelectorAll(".tarea-dvisita");
    const gridTime = document.querySelectorAll(".grid-time");
    const holguraGrid = document.querySelectorAll(".holgura");
    visitas.forEach(elemento => elemento.remove());
    holguras.forEach(elemento => elemento.remove());
    gridTime.forEach(elemento => elemento.remove());
    holguraGrid.forEach(elemento => elemento.remove());

  }
  construirDiagrama() {
    for (let actividad of this.actividades) {
      for (let tarea of actividad.tareas) {
        this.crearLineaTiempoTarea(actividad.numeroIdentificacion, tarea)
      }

    }

  }
  crearLineaTiempoTarea(idElement: string, tarea: Tarea) {
    // Crear  divs
    let fechaProgramada = new Date(tarea.fechaProgramada);
    let fechaNominal = new Date(tarea.fechaInicio);
    const div = document.createElement('div');
    const vignette = document.createElement('div');
    const holgura = document.createElement('div');

    // Asignar estilos al div tarea
    div.className = `tarea-${tarea.tipo}`;
    div.setAttribute("estado", tarea.idEstado)
    const idNuevoDiv = `tarea-${tarea.tipo}-${tarea.id}`;
    div.id = idNuevoDiv;
    div.style.fontSize = '0rem';


    // Asignar estilos al div text
    vignette.className = 'vignette';
    vignette.setAttribute("showv", "false")
    vignette.textContent = tarea.id;

    holgura.className = `holgura`;
    holgura.id = `holgura-${tarea.tipo}`;
    holgura.style.display = 'none';

    div.style.fontSize = '0rem;'
    //eventos de visualizacion
    div.addEventListener('click', () => {
      const showv = vignette.getAttribute("showv");
      if (showv == 'true') {
        vignette.style.padding = "0px";
        div.style.fontSize = '0rem';
        holgura.style.display = 'none';
        vignette.setAttribute("showv", "false")
      } else {
        div.style.fontSize = '1rem';
        holgura.style.display = 'block';
        vignette.style.padding = "0.3rem 0.6rem 0.3rem 0.6rem";
        vignette.style.borderRadius = "5px";
        vignette.setAttribute("showv", "true")
      }

    });

    div.appendChild(vignette);
    let longitudContainer = 0;
    let container = document.getElementById(idElement);

    if (container != null) {

      longitudContainer = container.offsetWidth


      //calculo para la fecha programada
      const horaFechaProgramada = Number(fechaProgramada.getHours());
      const minutosFechaProgramada = Number(fechaProgramada.getMinutes());

      const ubicacionEnIntervaloTiempoFechaProgramada = horaFechaProgramada * this.segundosInHoras + minutosFechaProgramada * this.segundosInMinutos;
      const primeraHora = Number(this.horas[0].split(':')[0]) * this.segundosInHoras;

      //calculo para la fecha de inicio o nominal
      const horaFechaNominal = Number(fechaNominal.getHours());
      const minutosFechaNominal = Number(fechaNominal.getMinutes());

      const ubicacionEnIntervaloTiempoFechaNominal = horaFechaNominal * this.segundosInHoras + minutosFechaNominal * this.segundosInMinutos;


      //calculo de posiciones fecha programada
      const posisionInicialTarea = this.calcularPosicionContainerPx(longitudContainer, ubicacionEnIntervaloTiempoFechaProgramada, primeraHora);
      const widthDivTarea = this.calcularLongitud(longitudContainer, tarea.duracion);


      //calculo posiciones holgura
      let ubicacionEnIntervaloTiempoHolgura = ubicacionEnIntervaloTiempoFechaNominal - tarea.holgura;

      let posisionInicialHolgura = this.calcularPosicionContainerPx(
        longitudContainer, ubicacionEnIntervaloTiempoHolgura, primeraHora);

      let widthDivHolgura = this.calcularLongitud(longitudContainer, 2 * tarea.holgura + tarea.duracion);

      //asignacion de posiciones tarea
      div.style.left = `${posisionInicialTarea}px`;
      div.style.width = `${widthDivTarea}px`;

      //posiciones holgura
      if (posisionInicialHolgura < 0) {
        posisionInicialHolgura = 0;
        holgura.style.left = `${posisionInicialHolgura}px`;
        holgura.style.width = `${widthDivHolgura}px`;
        if (posisionInicialHolgura + widthDivHolgura > longitudContainer) {
          holgura.style.width = `${longitudContainer}px`;
        }
      } else {
        holgura.style.left = `${posisionInicialHolgura}px`;
        holgura.style.width = `${widthDivHolgura}px`;
        if (posisionInicialHolgura + widthDivHolgura > longitudContainer) {
          holgura.style.width = `${longitudContainer - posisionInicialHolgura}px`;
        }

      }
      for (let hora in this.simpleHoras) {

        const horaSegundosGrid = this.simpleHoras[hora] * this.segundosInHoras;
        const pos = (longitudContainer * (horaSegundosGrid - this.simpleHoras[0] * this.segundosInHoras)) / this.intervalo;

        this.crearGridVertical(idElement, this.simpleHoras[hora], String((pos)));
      }

      container.appendChild(holgura);
      container.appendChild(div);


    }
  }

  calcularPosicionContainerPx(
    longitudContainer: number,
    ubicacionEnIntervaloTiempo: number,
    ubicacionTiempoInicial: number,
  ): number {
    return (longitudContainer * (ubicacionEnIntervaloTiempo - ubicacionTiempoInicial)) / this.intervalo;

  }

  calcularLongitud(longitudContainer: number, duracionSegundos: number): number {
    return (longitudContainer * duracionSegundos / this.intervalo);
  }

  crearGridVertical(idElement: string, hora: number, pos: string) {
    const div = document.createElement('div');
    const idNuevoDiv = 'div-line-' + idElement + '-' + hora;

    //estilo para el div de la tarea
    div.id = idNuevoDiv;
    div.className = 'grid-time';

    let container = document.getElementById(idElement);


    if (container != null && document.getElementById(idNuevoDiv) == null) {
      div.style.left = `${pos}px`;
      container.appendChild(div);
    }
  }



  obtenerElementoConEspera = (id: string, tiempoEspera: number): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const elemento = document.getElementById(id);
        if (elemento) {
          resolve(elemento);
        } else {
          reject(`No se encontró ningún elemento con id ${id}`);
        }
      }, tiempoEspera);
    });
  };

  mostrarRutaMapa(tareas: Tarea[]): void {
    console.log(tareas)
    const dialogRef = this.modalMapRuta.open(MapRutaComponent, {
      data: tareas
    })

  }

  emitirProfesionalTurno(idProfesional: string): void {
    this.idprofesionalEvent.emit(idProfesional);
  }

}
