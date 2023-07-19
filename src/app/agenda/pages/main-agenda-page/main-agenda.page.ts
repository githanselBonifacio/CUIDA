import { Component,OnInit,Input,Pipe } from '@angular/core';
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

      id_remision: string = "";
      fechaFiltroTurno: string =this.fechaHoy;

      opcioCiudad: string = "427"
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
                  this.opcioCiudad = params ['idCiudad'];
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
   
        this.agendaService.getCitas(this.fechaFiltroTurno,this.opcioCiudad,this.opcionHorariosTurno);
        this.agendaService.getActividadesAgendaGantt(this.fechaFiltroTurno,this.opcioCiudad,this.opcionHorariosTurno);
        this.horasTurnoString = generarHorario(this.opcionHorariosTurno);
        this.router.navigate(['agenda',this.fechaFiltroTurno,this.opcioCiudad,this.opcionHorariosTurno]);
     }

     filtrarCitasByIdRemision():void{
      if(this.id_remision.length === 0){
        this.consultarCitas()
      }
      this.agendaService.filtrarCitasByIdRemision(this.id_remision);
     }

    
     autoagendar():void{
      this.loadingPage = false
      this.agendaService.desagendarTurnoCompleto(
        this.citas[0].fechaProgramada, this.opcionHorariosTurno
      )
      .subscribe(
          resp => {
            this.agendaService.autoagendar(this.agendaService.citas)
            .subscribe(resp =>{
              this.agendaService.getCitasObservable(
                this.fechaFiltroTurno,
                this.opcioCiudad,
                this.opcionHorariosTurno
              ).subscribe(citasTurno =>{
                this.agendaService.calcularDesplazamientoTurnoCompleto(
                    citasTurno
                  ).subscribe(resp => {
                      this.loadingPage = true
                      this.ngOnInit();
                  })
              });
                  
          })
        }
      )
     }

     desagendarTurnoCompleto():void{
        this.loadingPage = false
        this.agendaService.desagendarTurnoCompleto(this.citas[0].fechaProgramada,this.opcionHorariosTurno)
        .subscribe(res =>{
          this.loadingPage = true
          this.ngOnInit();
        })
     }
     agregarProfesionalTurno():void{
      this.agendaService
            .getProfesionalDisponibleByturnoCiudad(this.fechaFiltroTurno, this.opcioCiudad)
            .subscribe(profesionales =>{
              const dialogRef = this.dialogoSeleccionProfesional.open(ModalSeleccionProfesionalComponent, {
                data: {
                  profesionales    : profesionales
                }
              })
              dialogRef.afterClosed()
              .subscribe(opcionProfesional =>{
                      this.agendaService.asignarProfesionalTurno(
                        this.fechaFiltroTurno,
                        this.opcionHorariosTurno,
                        opcionProfesional
                      ).subscribe(
                        res=>{
                          this.ngOnInit();
                        }
                      )
              })
            })
     }

     desasignarProfesionalTurno(idprofesional: string):void{
          const dialogRef = this.dialogoSeleccionProfesional.open(VentanaConfirmacionComponent,{
            data: {
              mensaje     :"Desea desasignar este profesional?"
            },
          });
          dialogRef.afterClosed()
              .subscribe(resp =>{
                if(resp){
                  this.agendaService.desasignarProfesionalTurno(
                    this.fechaFiltroTurno,
                    this.opcionHorariosTurno,
                    idprofesional
                  ).subscribe(resp =>{
                    this.ngOnInit();
                  })
                }
              })

     }
  }