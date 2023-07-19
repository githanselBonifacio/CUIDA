import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ActivatedRoute,Router } from '@angular/router';
import { MovilesService } from 'src/app/shared/services/moviles/moviles.service';
import { generarHorario} from '../../../shared/interfaces/maestros.interfaces'
import {Desplazamiento} from '../../interfaces/desplazamiento.interface'
import { HorarioTurno, Ciudad } from 'src/app/shared/interfaces/maestros.interfaces';
import { Actividad } from 'src/app/diagramas/interfaces/tarea-gantt.interface';


@Component({
  selector: 'app-main-moviles-page',
  templateUrl: './main-moviles-page.component.html',
  styleUrls: ['./main-moviles-page.component.css']
})
export class MainMovilesPageComponent implements OnInit{
  loadingPage = false;
  today = new Date();
  year = this.today.getFullYear();
  month = (this.today.getMonth() + 1).toString().padStart(2, '0');
  day = this.today.getDate().toString().padStart(2, '0');
  fechaHoy = `${this.year}-${this.month}-${this.day}`;

  horasTurnoString: string[] = [] 

  public id_remision: string = "";
  fechaFiltroTurno: string =this.fechaHoy;

  opcioRegional: number = 1
  opcionHorariosTurno:number = 1

  constructor (
    private maestroService: MaestrosService,
    private movilesService : MovilesService,
    private activateRoute : ActivatedRoute,
    private router: Router,
    ){}

  ngOnInit() {
    this.maestroService.getCiudades();
    this.maestroService.getHorarioTurno();

    this.activateRoute.params.subscribe(

      params =>{
        if(params['id_turno'] != null){
          
          this.fechaFiltroTurno = params ['id_turno'];
          this.opcioRegional = params ['id_regional'];
          this.opcionHorariosTurno = params ['id_horario_turno'];
         }

        this.movilesService.getDesplazamientos(
          params ['id_turno'],
          params ['id_regional'],
          params ['id_horario_turno']
        );
        this.movilesService.getDesplazamientosByMoviles(
          params ['id_turno'],
          params ['id_regional'],
          params ['id_horario_turno']
        );
        this.horasTurnoString = generarHorario(this.opcionHorariosTurno)
        this.loadingPage = true
      }

    )
  }

  get  desplazamientos (): Desplazamiento []{
    return this.movilesService.desplazamientos
  }
  get regionales(): Ciudad[]{
    return this.maestroService.ciudades;
  }

  get horarioTurno(): HorarioTurno[]{
    return this.maestroService.horariosTurno;
  }
  get actividades(): Actividad[]{
    return this.movilesService.desplazamientosMoviles;
    
  }

  consultarDesplazamientos():void{
   this.movilesService.getDesplazamientos(this.fechaFiltroTurno,this.opcioRegional,this.opcionHorariosTurno);
   this.movilesService.getDesplazamientosByMoviles(this.fechaFiltroTurno,this.opcioRegional,this.opcionHorariosTurno);
   this.router.navigate(['moviles',this.fechaFiltroTurno,this.opcioRegional,this.opcionHorariosTurno]);
    this.horasTurnoString = generarHorario(this.opcionHorariosTurno);
 }
}
