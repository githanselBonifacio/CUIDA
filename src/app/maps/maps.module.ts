import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPuntoUnicoComponent } from './components/map-punto-unico/map-punto-unico.component';
import { MapRutaComponent } from './components/map-ruta/map-ruta.component';



@NgModule({
  declarations: [
    MapPuntoUnicoComponent,
    MapRutaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MapPuntoUnicoComponent
  ]
})
export class MapsModule { }
