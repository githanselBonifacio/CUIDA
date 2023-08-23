import { Component,OnInit} from '@angular/core';
import { AdminRemisionService } from '../../services/admin-remision.service';
import {NotificacionFarmacia} from '../../interfaces/servicioFarmaceutico.interface';
import {MatDialog} from '@angular/material/dialog'
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-servicio-farmaceutico-page',
  templateUrl: './servicio-farmaceutico-page.component.html',
  styleUrls: ['./servicio-farmaceutico-page.component.css']
})
export class ServicioFarmaceuticoPageComponent implements OnInit{

  constructor (
    private adminService:AdminRemisionService,
    private dialogoConfirmacion : MatDialog
    ){}

  currentPage:             number  = 1;
  totalItems:              number  = 0;
  filtroBusqueda:          string  = "";
  checkedNotificado:       boolean = false;
  checkedSinNotificado:    boolean = false;
  notificacionesCompleta:  NotificacionFarmacia[]=[];
  notificacionesMostradas: NotificacionFarmacia[]=[];
  notificacionesSeleccionadas :NotificacionFarmacia[]=[];

  ngOnInit() {
      this.adminService.getNotificacionesFarmacia()
      .subscribe(resp =>{
          this.notificacionesCompleta = resp;
            this.totalItems = this.notificacionesCompleta.length;
             this.notificacionesMostradas = this.notificacionesCompleta;
      });
    
     
  }
  
  filtrarNotificaciones(): void {
    const textoBuscado = this.filtroBusqueda.toLowerCase();
   
    if(this.filtroBusqueda.length == 0){
       
      this.notificacionesMostradas = this.notificacionesCompleta;
      this.filtrarByEstadoNotificacion();  
    }else{
          this.notificacionesMostradas =  this.notificacionesMostradas.filter(notificacion => {
          const nombreCompleto = `${notificacion.nombre.toLowerCase()} ${notificacion.apellido.toLowerCase()}`;
          const numeroIdentificacion = notificacion.numeroIdentificacion.toLowerCase();
          return  nombreCompleto.includes(textoBuscado) || numeroIdentificacion.includes(textoBuscado);
   
        });
          this.totalItems = this.notificacionesMostradas.length;
    }
  }

  filtrarByEstadoNotificacion(){
    this.notificacionesMostradas = this.notificacionesCompleta;
    if(this.checkedNotificado === true && this.checkedSinNotificado===false){
      this.notificacionesMostradas =  this.notificacionesMostradas.filter(notificacion => {
        const notificado = notificacion.notificado
        return notificado === true;
      });
    }
    if(this.checkedNotificado === false && this.checkedSinNotificado===true){
      this.notificacionesMostradas =  this.notificacionesMostradas.filter(notificacion => {
        const notificado = notificacion.notificado
        return notificado === false;
      });
    }


    this.totalItems = this.notificacionesMostradas.length;
  }

  onCheckboxChangeNotificado(event: any) {
    this.checkedNotificado = event.target.checked;
    this.filtrarByEstadoNotificacion();  
    this.quitarSeleccionCompleta();
  }
  onCheckboxChangeSinNotificado(event: any) {
    this.checkedSinNotificado = event.target.checked;
    this.filtrarByEstadoNotificacion(); 
    this.quitarSeleccionCompleta();
  } 

  agregarListaSeleccionada(notificacionSeleccionada :NotificacionFarmacia,event: any):void{
    this.quitarSeleccionCompleta();
    if(event.target.checked){
      this.notificacionesSeleccionadas.push(notificacionSeleccionada);
    
    }else{
      this.notificacionesSeleccionadas =  this.notificacionesSeleccionadas.filter(notificacion => {
        const idTratamiento = notificacionSeleccionada.idTratamiento;
        const idSoporteNutricional = notificacionSeleccionada.idSoporteNutricional;
        if(idTratamiento !=null && notificacion.idTratamiento!=null){
        
           return notificacion.idTratamiento != idTratamiento;
        }else if (idSoporteNutricional !=null && notificacion.idSoporteNutricional!=null){
         
          return  notificacion.idSoporteNutricional !=idSoporteNutricional;
        }else{
          return true;
        }
       
      });
    }
    this.checkedMasterListaCompleta();
   
  }
  handlePageChange(event: any):void{
    this.notificacionesSeleccionadas = [];
  }

  quitarSeleccionCompleta():void{
    const checkboxMaster = document.getElementById('master-check') as HTMLInputElement;
     checkboxMaster.checked = false;
    
  }
  checkedMasterListaCompleta():void{
    if(this.notificacionesSeleccionadas.length === this.notificacionesMostradas.length ){
      const checkboxMaster = document.getElementById('master-check') as HTMLInputElement;
      checkboxMaster.checked = true;
     
    }
  }
  agregarTodasNotificacionesMostradas(event:any):void{
    
      const checkboxes = document.getElementsByName('individual-check');
      for (var i = 0; i < checkboxes.length; i++) {
        const check = checkboxes[i] as HTMLInputElement;
        if(check.type === 'checkbox'){
            check.checked = event.target.checked;
        }
      }
      if(event.target.checked){
        this.notificacionesSeleccionadas = this.notificacionesMostradas; 
      }else{
        this.notificacionesSeleccionadas = [];
      }
    
  }
  notificarSeleccion():void{
   
     this.adminService.notificarMedicamentosToFarmacia(this.notificacionesSeleccionadas)
      .subscribe(resp => {
        const dialogRef = this.dialogoConfirmacion.open(ToastComponent,{
          data:{
            mensaje:"Se envío correctamente a servicio farmaceutico"
          }
        })
        dialogRef.afterClosed()
        .subscribe(resp =>{
          this.ngOnInit()
        })
      })
  }

}
