import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMovilesPageComponent } from './pages/main-moviles-page/main-moviles-page.component';
import { CardDesplazamientoComponent } from './components/card-desplazamiento/card-desplazamiento.component';
import { FormsModule } from '@angular/forms'; 
import { MovilesRoutingModule } from './moviles-routing.module';
import { DiagramasModule } from '../diagramas/diagramas.module';
import { ModalAsignarMovilComponent } from './components/modal-asignar-movil/modal-asignar-movil.component';

@NgModule({
  declarations: [
    MainMovilesPageComponent,
    CardDesplazamientoComponent,
    ModalAsignarMovilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MovilesRoutingModule,
    DiagramasModule,
  ],
  exports:[
    MainMovilesPageComponent,
  ]
})
export class MovilesModule { }
