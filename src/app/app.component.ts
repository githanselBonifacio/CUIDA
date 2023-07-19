import { Component } from '@angular/core';
import {AgendaService} from './agenda/services/agenda.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CUIDA';
  constructor( agendaService:AgendaService){}
}