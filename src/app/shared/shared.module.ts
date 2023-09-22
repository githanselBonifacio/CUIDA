import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { MovilesComponent } from './pages/moviles/moviles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DiagramasModule } from '../diagramas/diagramas.module';
import { AgendaModule } from '../agenda/agenda.module';
import { VentanaConfirmacionComponent } from './components/ventana-confirmacion/ventana-confirmacion.component';
import { MovilesModule } from '../moviles/moviles.module';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminModule } from '../admin/admin.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './services/spinner/spinner.service.service';
import { ToastComponent } from './components/toast/toast.component';


@NgModule({
  declarations: [
    InicioComponent,
    AgendaComponent,
    MovilesComponent,
    SidebarComponent,
    VentanaConfirmacionComponent,
    AdminComponent,
    SpinnerComponent,
    ToastComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    DiagramasModule,
    AgendaModule,
    MovilesModule,
    AdminModule
  ],
  exports: [
    InicioComponent,
    SidebarComponent,
    SpinnerComponent,
    ToastComponent
  ],
  providers: [
    SpinnerService
  ]
})

export class SharedModule { }
