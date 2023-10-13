import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-placeholder-horario-turnos',
  templateUrl: './placeholder-horario-turnos.component.html',
  styleUrls: ['./placeholder-horario-turnos.component.css']
})
export class PlaceholderHorarioTurnosComponent implements OnInit {

  @Input() numeroDias: number = 0;
  @Input() visible: boolean = true;
  @Input() repeticiones: number = 0;
  repeticionesArray: number[] = [];
  numeroDiasArray: number[] = [];

  ngOnInit(): void {
    this.repeticionesArray = Array.from({ length: this.repeticiones }, (_, i) => i);
    this.numeroDiasArray = Array.from({ length: this.numeroDias }, (_, i) => i);
  }




}
