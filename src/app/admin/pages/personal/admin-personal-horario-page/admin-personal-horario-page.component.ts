import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';

@Component({
  selector: 'app-admin-personal-horario-page',
  templateUrl: './admin-personal-horario-page.component.html',
  styleUrls: ['./admin-personal-horario-page.component.css']
})
export class AdminPersonalHorarioPageComponent implements OnInit {
  constructor(
    private router: Router) {
  }
  ngOnInit(): void {
    this.router.navigate(['admin/personal/horario/secuencias']);
  }
}
