
import { Actividad } from '../../interfaces/tarea-gantt.interface';
import { Component, Input, OnInit, EventEmitter, Output, HostListener, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Tarea } from '../../interfaces/tarea-gantt.interface'
import { MatDialog } from '@angular/material/dialog'
import { MapRutaComponent } from 'src/app/maps/components/map-ruta/map-ruta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagramas-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
})

export class GanttComponent implements AfterViewInit, OnChanges {

  @Output() idprofesionalEvent = new EventEmitter<string>();

  constructor(
    private modalMapRuta: MatDialog,
    private router: Router,
  ) { }

  @Input() public actividades: Actividad[] = [];
  @Input() public horas: string[] = [];

  loadingPage = false;
  currentUrl: string = '';
  simpleHoras: number[] = [];
  intervalo: number = 0;
  segundosInHoras = 3600;
  segundosInMinutos = 60;
  idHeaderHora = "header-hora";


  ngAfterViewInit(): void {
    this.currentUrl = this.router.url;
    this.simpleHoras = this.horas.map(hora => parseInt(hora.substring(0, 2)));
    this.intervalo = (this.horas.length - 1) * 3600;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.limpiaLineaTiempo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["actividades"]) {
      this.loadingPage = false;
    }

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
  crearLineaTiempoTarea(idElement: string, tarea: Tarea, index: number) {
    // Crear  divs
    let fechaProgramada = new Date(tarea.fechaProgramada);
    let fechaNominal = new Date(tarea.fechaInicio);
    const div = document.createElement('div');
    const text = document.createElement('div');
    const holgura = document.createElement('div');

    // Asignar estilos al div tarea
    div.className = `tarea-${tarea.tipo}`;
    const idNuevoDiv = `tarea-${tarea.tipo}-${tarea.id}`;
    div.id = idNuevoDiv;
    div.style.fontSize = '0rem';


    // Asignar estilos al div text
    text.className = 'vignette';
    text.setAttribute("showv", "false")
    if (tarea.tipo == 'visita') {
      text.textContent = tarea.id;
    } else {
      text.textContent = "desplazamiento"
    }

    holgura.className = `holgura`;
    holgura.id = `holgura-${tarea.tipo}`;
    holgura.style.display = 'none';

    div.style.fontSize = '0rem;'
    //eventos de visualizacion
    div.addEventListener('mouseover', () => {
      div.style.fontSize = '1rem';
      holgura.style.display = 'block';
      text.style.padding = "0.3rem 0.6rem 0.3rem 0.6rem";
      text.style.borderRadius = "5px";
      text.setAttribute("showv", "true")
    });

    div.addEventListener('mouseout', () => {
      text.style.padding = "0px";
      div.style.fontSize = '0rem';
      holgura.style.display = 'none';
      text.setAttribute("showv", "false")
    });

    div.appendChild(text);
    let longitudContainer = 0;
    let container = document.getElementById(idElement);

    if (container != null && document.getElementById(idNuevoDiv) == null) {

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
    if (index == this.actividades.length - 1) {
      this.paginaCargada();
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

  mostrarRutaMapa(tareas: Tarea[]): void {
    console.log(tareas)
    const dialogRef = this.modalMapRuta.open(MapRutaComponent, {
      data: tareas
    })

  }

  emitirProfesionalTurno(idProfesional: string): void {
    this.idprofesionalEvent.emit(idProfesional);
  }
  paginaCargada() {
    this.loadingPage = true;
  }
}
