
import { Actividad } from '../../interfaces/tarea-gantt.interface';
import { Component, Input, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { Tarea } from '../../interfaces/tarea-gantt.interface'
import { MatDialog } from '@angular/material/dialog'
import { MapRutaComponent } from 'src/app/maps/components/map-ruta/map-ruta.component';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-diagramas-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
  animations: [
    trigger('cambioColor', [
      state('inicial', style({
        backgroundColor: 'red'
      })),
      state('final', style({
        backgroundColor: 'blue'
      })),
      transition('inicial <=> final', animate('1000ms ease-in-out'))
    ])
  ]
})

export class GanttComponent implements OnInit {

  @Output() idprofesionalEvent = new EventEmitter<string>();

  constructor(
    private modalMapRuta: MatDialog,
    private router: Router,
  ) { }

  @Input() public actividades: Actividad[] = [];
  @Input() public horas: string[] = [];

  currentUrl: string = '';
  simpleHoras: number[] = [];
  intervalo: number = 0;
  segundosInHoras = 3600;
  segundosInMinutos = 60;
  idHeaderHora = "header-hora";
  //estilos
  colorTareaAtencion: string = "#00AEC7";
  colorHolgura: string = "#f9e4478f"
  colorFondoTexto: string = "#0033A0"
  colorDesplazamiento: string = "#f5b120";
  colorGris: string = '#53565A'

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.simpleHoras = this.horas.map(hora => parseInt(hora.substring(0, 2)));
    this.intervalo = (this.horas.length - 1) * 3600

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.limpiaLineaTiempo();
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
  crearLineaTiempoTarea(idElement: string, tarea: Tarea) {
    // Crear  divs
    let fechaProgramada = new Date(tarea.fechaProgramada);
    let fechaNominal = new Date(tarea.fechaInicio);
    const div = document.createElement('div');
    const text = document.createElement('div');
    const holgura = document.createElement('div');

    // Asignar estilos al div tarea
    div.style.position = 'absolute';
    div.style.margin = "0px auto";
    div.style.height = '4rem';
    div.className = `tarea-${tarea.tipo}`;
    div.style.border = `2px solid ${this.colorFondoTexto}`;

    //color por estado
    if (tarea.tipo === 'visita') {
      div.style.backgroundColor = this.colorTareaAtencion;
    } else {
      div.style.backgroundColor = this.colorDesplazamiento;
    }
    const idNuevoDiv = `tarea-${tarea.tipo}-${tarea.id}`;
    div.style.borderRadius = "0.4rem";
    div.id = idNuevoDiv;
    div.style.fontSize = '0rem';


    // Asignar estilos al p
    if (tarea.tipo == 'visita') {
      text.textContent = tarea.id;
    } else {
      text.textContent = "desplazamiento"
    }

    text.style.position = 'absolute';
    text.className = 'vignette';
    text.style.top = '50%';
    text.style.left = '50%';
    text.style.transform = 'translate(-50%, 120%)';
    text.style.backgroundColor = this.colorFondoTexto;
    text.style.color = "#ffffff";
    text.style.fontWeight = "lighter";
    text.style.zIndex = "9999";

    // asignar estilos holgura
    holgura.style.position = 'absolute';
    holgura.style.margin = "0px auto";
    holgura.style.height = '4rem';
    holgura.className = `holgura`;
    holgura.id = `holgura-${tarea.tipo}`;
    holgura.style.backgroundColor = this.colorHolgura;
    holgura.style.display = 'none';
    holgura.style.borderRadius = "0.3rem";
    holgura.style.zIndex = "9999";
    div.style.fontSize = '0rem;'
    //eventos de visualizacion
    div.addEventListener('mouseover', () => {
      div.style.fontSize = '1rem';
      holgura.style.display = 'block';
      text.style.padding = "0.3rem 0.6rem 0.3rem 0.6rem";
      text.style.borderRadius = "5px";
    });

    div.addEventListener('mouseout', () => {
      text.style.padding = "0px";
      div.style.fontSize = '0rem';
      holgura.style.display = 'none';
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
    div.style.borderLeft = "1px dotted #C7C9C7";
    div.style.margin = "0px auto";
    div.style.height = '200%';
    div.style.position = 'absolute';
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
}
