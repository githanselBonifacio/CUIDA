import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponentAgendaComponent } from './pages/main-agenda-page/main-agenda.page';
import { DiagramasModule } from '../diagramas/diagramas.module';
import { CardCitaComponent } from './components/card-cita/card-cita.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field';
import { ModalAsignarProfesionalComponent } from './components/modal-asignar-profesional/modal-asignar-profesional.component';
import {AgendaRoutingModule} from './agenda-routing.module';
import { ModalCambioHoraCitaComponent } from './components/modal-cambio-hora-cita/modal-cambio-hora-cita.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

@NgModule({
  declarations: [
    MainComponentAgendaComponent,
    CardCitaComponent,
    ModalAsignarProfesionalComponent,
    ModalCambioHoraCitaComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    DiagramasModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
    AgendaRoutingModule,
    MatProgressSpinnerModule, 
  ],
  exports:[
    MainComponentAgendaComponent
  ]
})
export class AgendaModule { }
