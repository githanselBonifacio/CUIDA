import { Component , OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {HistorialRemision} from '../../interfaces/historialRemison.interface';
import { AdminRemisionService } from '../../services/admin-remision.service';


@Component({
  selector: 'app-admin-historial-remision-page',
  templateUrl: './admin-historial-remision-page.component.html',
  styleUrls: ['./admin-historial-remision-page.component.css']
})
export class AdminHistorialRemisionPageComponent implements OnInit{

  idRemision: string = "";
  remisionDataActual  : HistorialRemision|any={};
  historialRemisiones : HistorialRemision[] = [];

  constructor (
    private adminService:AdminRemisionService,
    private activateRoute : ActivatedRoute
    ){}
  ngOnInit() {
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
}
