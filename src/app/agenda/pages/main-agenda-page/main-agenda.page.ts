import { Component,OnInit } from '@angular/core';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import {Cita} from "../../interfaces/turno.interface"
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { HorarioTurno, Ciudad } from 'src/app/shared/interfaces/maestros.interfaces';
import { Actividad } from 'src/app/diagramas/interfaces/tarea-gantt.interface';
import { ActivatedRoute,Router } from '@angular/router';
import { generarHorario} from '../../../shared/interfaces/maestros.interfaces'
import {MatDialog} from '@angular/material/dialog'
import { ModalSeleccionProfesionalComponent } from '../../../agenda/components/modal-seleccion-profesional/modal-seleccion-profesional.component';
import { VentanaConfirmacionComponent } from 'src/app/shared/components/ventana-confirmacion/ventana-confirmacion.component';
import { switchMap ,filter,tap} from 'rxjs/operators';

@Component({
  selector: 'app-main-component-agenda',
  templateUrl: './main-agenda.page.html',
  styleUrls: ['./main-agenda.page.css']
})
export class MainComponentAgendaComponent implements OnInit{
      loadingPage = false;
      today = new Date();
      year = this.today.getFullYear();
      month = (this.today.getMonth() + 1).toString().padStart(2, '0');
      day = this.today.getDate().toString().padStart(2, '0');
      fechaHoy = `${this.year}-${this.month}-${this.day}`;
  
      horasTurnoString: string[] = [] 

      idRemision: string = "";
      fechaFiltroTurno: string =this.fechaHoy;

      opcionCiudad: string = "427"
      opcionHorariosTurno:number = 1

      constructor (
        private agendaService: AgendaService,
        private maestroService: MaestrosService,
        private activateRoute : ActivatedRoute,
        private router: Router,
        private dialogoSeleccionProfesional : MatDialog,
        ){}
       
        ngOnInit() {
          this.maestroService.getCiudades();

          this.maestroService.getHorarioTurno();
            
          this.activateRoute.params.subscribe(
            params =>{
              if(params['idTurno'] != null){
          
                  this.fechaFiltroTurno = params ['idTurno'];
                  this.opcionCiudad = params ['idCiudad'];
                  this.opcionHorariosTurno = params ['idHorarioTurno'];
             }
              this.agendaService.getCitas(
                params ['idTurno'],
                params ['idCiudad'],
                params ['idHorarioTurno'],
              );

              this.agendaService.getActividadesAgendaGantt(
                params ['idTurno'],
                params ['idCiudad'],
                params ['idHorarioTurno']
              );

              this.horasTurnoString = generarHorario(this.opcionHorariosTurno)
              this.loadingPage = true
            }
            
          )
        }

      get regionales(): Ciudad[]{
        return this.maestroService.ciudades;
      }

      get horarioTurno(): HorarioTurno[]{
        return this.maestroService.horariosTurno;
      }

      get citas(): Cita [] {
        return this.agendaService.citas;
      }
      set citas(value:Cita[]) {
         this.citas = value;
      }
      
      get actividades(): Actividad[]{
        return this.agendaService.agendaGantt;
      }
      get horaTurno():HorarioTurno{
        return this.maestroService.horarioTurnoSeleccionado;
      }

     consultarCitas():void{
   
        this.agendaService.getCitas(this.fechaFiltroTurno,this.opcionCiudad,this.opcionHorariosTurno);
        this.agendaService.getActividadesAgendaGantt(this.fechaFiltroTurno,this.opcionCiudad,this.opcionHorariosTurno);
        this.horasTurnoString = generarHorario(this.opcionHorariosTurno);
        this.router.navigate(['agenda',this.fechaFiltroTurno,this.opcionCiudad,this.opcionHorariosTurno]);
     }
     actualizarHorarioHeader(){
      this.horasTurnoString = generarHorario(this.opcionHorariosTurno);
     }

     filtrarCitasByIdRemision():void{
      if(this.idRemision.length === 0){
        this.consultarCitas()
      }
      this.agendaService.filtrarCitasByIdRemision(this.idRemision);
     }

     autoagendar():void{
      this.loadingPage = false
      this.agendaService.desagendarTurnoCompleto(this.citas[0].fechaProgramada,this.opcionHorariosTurno,this.opcionCiudad)
      .subscribe(res =>{
          this.agendaService.autoagendar(
            this.citas[0].fechaInicio,
            this.opcionHorariosTurno,
            this.opcionCiudad
          ).subscribe(resp =>{
            this.loadingPage = true
            location.reload()
          });
      })
      
     }
    

     desagendarTurnoCompleto():void{
        this.loadingPage = false
        this.agendaService.desagendarTurnoCompleto(this.citas[0].fechaProgramada,this.opcionHorariosTurno,this.opcionCiudad)
        .subscribe(res =>{
          this.loadingPage = true;
          location.reload();
          //this.ngOnInit();
        })
     }
     agregarProfesionalTurno(): void {
      this.agendaService
        .getProfesionalDisponibleByturnoCiudad(this.fechaFiltroTurno, this.opcionCiudad)
        .pipe(
          switchMap(profesionales => {
            const dialogRef = this.dialogoSeleccionProfesional.open(ModalSeleccionProfesionalComponent, {
              data: {
                profesionales: profesionales
              }
            });
            return dialogRef.afterClosed();
          }),
          switchMap(opcionProfesional => {
            return this.agendaService.asignarProfesionalTurno(
              this.fechaFiltroTurno,
              this.opcionHorariosTurno,
              opcionProfesional
            );
          })
        )
        .subscribe(res => {
          location.reload();
          //this.ngOnInit();
        });
    }
    desasignarProfesionalTurno(idprofesional: string): void {
      const dialogRef = this.dialogoSeleccionProfesional.open(VentanaConfirmacionComponent, {
        data: {
          mensaje: "Desea desasignar este profesional?",
          nota : "Las citas asociadas serán desagendadas"
        },
      });
    
      dialogRef.afterClosed().pipe(
        filter(resp => !!resp),
        switchMap(() => this.agendaService.desasignarProfesionalTurno(
          this.fechaFiltroTurno,
          this.opcionHorariosTurno,
          idprofesional
        )),
        tap(() => location.reload())
      ).subscribe();
    }
  }