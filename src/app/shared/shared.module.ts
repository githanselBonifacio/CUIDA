import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CitasComponent } from './pages/citas/citas.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { MovilesComponent } from './pages/moviles/moviles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DiagramasModule } from '../diagramas/diagramas.module';
import { AgendaModule } from '../agenda/agenda.module';
import { VentanaConfirmacionComponent } from './components/ventana-confirmacion/ventana-confirmacion.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
  
    InicioComponent,
       CitasComponent,
       AgendaComponent,
       MovilesComponent,
       SidebarComponent,
       VentanaConfirmacionComponent
       

  ],
  imports: [
    CommonModule,
    RouterModule,
    DiagramasModule,
    AgendaModule,
    
  ],
  exports:[
    InicioComponent,
    SidebarComponent
  ]
})

export class SharedModule { }
