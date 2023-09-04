import { Component , OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {HistorialRemision} from '../../interfaces/historialRemison.interface';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { MaestrosService } from '../../../shared/services/maestros/maestros.service';
import { EstadoCita,getNombreEstadoCitaById } from 'src/app/shared/interfaces/maestros.interfaces';


@Component({
  selector: 'app-admin-historial-remision-page',
  templateUrl: './admin-historial-remision-page.component.html',
  styleUrls: ['./admin-historial-remision-page.component.css']
})
export class AdminHistorialRemisionPageComponent implements OnInit{

  idRemision: string = "";

  currentPageRegistro : number  = 1;

  currentPageHistorico : number  = 1;
  maxCeldadRegistros = 3;

  remisionDataActual  : HistorialRemision|any={};
  historialRemisiones : HistorialRemision[] = [];
  estados:EstadoCita[]=[];
  constructor (
    private adminService:AdminRemisionService,
    private maestroService: MaestrosService,
    private activateRoute : ActivatedRoute,
    private router: Router
    ){}

  ngOnInit() {
    this.maestroService.getEstadosCita()
    .subscribe(resp=>{
      this.estados=resp
    });

    this.activateRoute.params.subscribe(
      params => {
        this.idRemision = params ['idRemision'];
      }
    )
    this.adminService.consultarHistorialRemision(this.idRemision)
    .subscribe(resp =>{
      this.historialRemisiones = resp
    })
    this.adminService.consultarDataActualRemision(this.idRemision)
    .subscribe(resp =>{
      this.remisionDataActual = resp
    })
  }

  getNombreEstadoCita(id:string){
    return getNombreEstadoCitaById(id,this.estados);
  }
  backRemisionesTabla(){
    this.router.navigate(['admin/remisiones']);
  }
}
