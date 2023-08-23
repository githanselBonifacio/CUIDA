import { Component,OnInit,HostListener  } from '@angular/core';
import { AdminRemisionService } from '../../services/admin-remision.service';
import {Remision} from '../../interfaces/remision.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-remisiones-page',
  templateUrl: './admin-remisiones-page.component.html',
  styleUrls: ['./admin-remisiones-page.component.css']
})
export class AdminRemisionesPageComponent implements OnInit {
   
  constructor (
    private adminService:AdminRemisionService,
    private router: Router,
    ){}
    itemsPerPage : number     = 6;
    currentPage  : number     = 1;
    totalItems   : number     = 0;
    remisiones   : Remision[] = [];

  ngOnInit() {
    this.calcularItemsPerPage()
    this.adminService.consultarRemisiones()
      .subscribe(resp =>{
        this.remisiones = resp;
      })
  }

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.calcularItemsPerPage()
}
calcularItemsPerPage(){
  const screenHeight = window.innerHeight;
    if (screenHeight < 800) {
      this.itemsPerPage = 6;
    } else if (screenHeight < 1200) {
      this.itemsPerPage = 10;
    } else {
      this.itemsPerPage = 15;
    }
  }

  verHistorialRemision(idRemision:string){
    this.router.navigate(['admin/remisiones',idRemision]);
  }
}
