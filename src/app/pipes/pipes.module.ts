import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatearSegundosPipe } from './conversiones/formatear-segundos.pipe';
import { ObtenerSiglasIdentificacionPipe } from './conversiones/obtener-siglas-identificacion.pipe';



@NgModule({
  declarations: [
    FormatearSegundosPipe,
    ObtenerSiglasIdentificacionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatearSegundosPipe,
    ObtenerSiglasIdentificacionPipe
  ]
})
export class PipesModule { }
