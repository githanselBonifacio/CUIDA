import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-personal-horario-page',
  templateUrl: './admin-personal-horario-page.component.html',
  styleUrls: ['./admin-personal-horario-page.component.css']
})
export class AdminPersonalHorarioPageComponent implements OnInit {
  constructor(
    private router: Router) {
  }

  opcionesMenu: string[] = ["consolidado", "secuencias"];

  actualizaUltimaSeleccion(numberOpcion: number) {
    localStorage.setItem("menuHorario", `${numberOpcion}`)
  }
  ngOnInit(): void {
    const menuOpcionAlmacenada = localStorage.getItem("menuHorario");
    const opcion: number = menuOpcionAlmacenada != null ? parseInt(menuOpcionAlmacenada) : 0
    this.router.navigate([`admin/personal/horario/${this.opcionesMenu[opcion]}`]);
  }
}
