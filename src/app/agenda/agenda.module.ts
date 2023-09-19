import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponentAgendaComponent } from './pages/main-agenda-page/main-agenda.page';
import { DiagramasModule } from '../diagramas/diagramas.module';
import { CardCitaComponent } from './components/card-cita/card-cita.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalSeleccionProfesionalComponent } from './components/modal-seleccion-profesional/modal-seleccion-profesional.component';
import { AgendaRoutingModule } from './agenda-routing.module';
import { ModalCambioHoraCitaComponent } from './components/modal-cambio-hora-cita/modal-cambio-hora-cita.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { ModalDetalleRemisionComponent } from './components/modal-detalle-remision/modal-detalle-remision.component';
import { MapsModule } from '../maps/maps.module';
import { MatSelectModule } from '@angular/material/select';
import { PipesModule } from '../pipes/pipes.module';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemsCitaComponent } from './components/items-cita/items-cita.component';
import { PlaceholderTableComponent } from '../shared/components/placeholder-table/placeholder-table.component';

@NgModule({
  declarations: [
    MainComponentAgendaComponent,
    CardCitaComponent,
    ModalSeleccionProfesionalComponent,
    ModalCambioHoraCitaComponent,
    // SpinnerComponent,
    ModalDetalleRemisionComponent,
    ToastComponent,
    ItemsCitaComponent,
    PlaceholderTableComponent
  ],
  imports: [
    CommonModule,
    DiagramasModule,
    AgendaRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MapsModule,
    PipesModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    MainComponentAgendaComponent,
    ItemsCitaComponent

  ]
})
export class AgendaModule { }
