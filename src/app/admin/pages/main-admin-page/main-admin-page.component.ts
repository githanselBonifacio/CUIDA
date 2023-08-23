import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-admin-page',
  templateUrl: './main-admin-page.component.html',
  styleUrls: ['./main-admin-page.component.css']
})
export class MainAdminPageComponent {
  constructor(private router: Router) { }


  navigateToServicioFarmaceutico() {
    this.router.navigate(['admin/servicioFarmaceutico']);
  }
  navigateToRemisiones() {
    this.router.navigate(['admin/remisiones']);
  }
}
