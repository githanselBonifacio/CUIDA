import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCitaComponent } from './pages/crear-cita/crear-cita.component';
import { ListarCitaComponent } from './pages/listar-cita/listar-cita.component';
import { CitasRoutingModule } from './citas-routing.module';



@NgModule({
  declarations: [
    CrearCitaComponent,
    ListarCitaComponent,
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
  ]
})
export class CitasModule { }
