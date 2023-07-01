import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntoUnicoComponent } from './components/punto-unico/punto-unico.component';
import { MapRutaComponent } from './components/map-ruta/map-ruta.component';



@NgModule({
  declarations: [
    PuntoUnicoComponent,
    MapRutaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MapsModule { }
