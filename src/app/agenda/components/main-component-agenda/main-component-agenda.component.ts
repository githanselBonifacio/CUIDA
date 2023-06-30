import { Component,OnInit,Input,Pipe } from '@angular/core';
import { AgendaService } from 'src/app/shared/services/agenda/agenda.service';
import {Turno} from "../../interfaces/turno.interface"
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { HorarioTurno, Regional } from 'src/app/shared/interfaces/maestros.interfaces';
import { Actividad } from 'src/app/diagramas/interfaces/tarea-gantt.interface';
import { ActivatedRoute,Router } from '@angular/router';
import { generarHorario} from '../../../shared/interfaces/maestros.interfaces'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main-component-agenda',
  templateUrl: './main-component-agenda.component.html',
  styleUrls: ['./main-component-agenda.component.css']
})
export class MainComponentAgendaComponent implements OnInit{

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
        private agendaService: AgendaService,
        private maestroService: MaestrosService,
        private activateRoute : ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService
        ){}
       
        ngOnInit() {
          this.maestroService.getRegionales();

          this.maestroService.getHorarioTurno();
            
          this.activateRoute.params.subscribe(
            params =>{
              this.fechaFiltroTurno = params ['id_turno'];
              this.opcioRegional = params ['id_regional'];
              this.opcionHorariosTurno = params ['id_horario_turno'];

              this.agendaService.getTurno(
                params ['id_turno'],
                params ['id_regional'],
                params ['id_horario_turno']
              );

              this.agendaService.getActividadesAgendaGantt(
                params ['id_turno'],
                params ['id_regional'],
                params ['id_horario_turno']
              );

              this.horasTurnoString = generarHorario(this.opcionHorariosTurno)
            }
            
          )
        }

      get regionales(): Regional[]{
        return this.maestroService.regionales;
      }

      get horarioTurno(): HorarioTurno[]{
        return this.maestroService.horariosTurno;
      }

      get citas(): Turno [] {
        return this.agendaService.citas;
      }
      set citas(value:Turno[]) {
         this.citas = value;
      }
      
      get actividades(): Actividad[]{
        return this.agendaService.agendaGantt;
      }
      get horaTurno():HorarioTurno{
        return this.maestroService.horarioTurnoSeleccionado;
      }

     consultarCitas():void{
        this.agendaService.getTurno(this.fechaFiltroTurno,this.opcioRegional,this.opcionHorariosTurno);
        this.agendaService.getActividadesAgendaGantt(this.fechaFiltroTurno,this.opcioRegional,this.opcionHorariosTurno);
        this.router.navigate(['agenda',this.fechaFiltroTurno,this.opcioRegional,this.opcionHorariosTurno]);
        this.horasTurnoString = generarHorario(this.opcionHorariosTurno);
     }

     filtrarCitasByIdRemision():void{
      if(this.id_remision.length === 0){
        this.consultarCitas()
      }
      this.agendaService.filtrarCitasByIdRemision(this.id_remision);
     }

    
     autoagendar():void{
      this.agendaService.desagendarTurnoCompleto(
        this.citas[0].fecha_programada
      )
      .subscribe(
          resp => {
            this.agendaService.autoagendar(this.agendaService.citas)
            .subscribe(resp =>{
                  this.agendaService.calcularDesplazamientoTurnoCompleto(
                    this.agendaService.citas
                  ).subscribe(resp => {
                    location.reload()
                  })
          })
        }
      )
     }
  }