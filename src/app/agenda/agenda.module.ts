import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponentAgendaComponent } from './components/main-component-agenda/main-component-agenda.component';
import { DiagramasModule } from '../diagramas/diagramas.module';
import { CardCitaComponent } from './components/card-cita/card-cita.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field';
import { ModalAsignarProfesionalComponent } from './components/modal-asignar-profesional/modal-asignar-profesional.component';
import {AgendaRoutingModule} from './agenda-routing.module';
import { ModalCambioHoraCitaComponent } from './components/modal-cambio-hora-cita/modal-cambio-hora-cita.component';

@NgModule({
  declarations: [
    MainComponentAgendaComponent,
    CardCitaComponent,
    ModalAsignarProfesionalComponent,
    ModalCambioHoraCitaComponent,
  ],
  imports: [
    CommonModule,
    DiagramasModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
    AgendaRoutingModule
  ],
  exports:[
    MainComponentAgendaComponent
  ]
})
export class AgendaModule { }
