import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatearSegundosPipe } from './conversiones/formatear-segundos.pipe';
import { ObtenerSiglasIdentificacionPipe } from './conversiones/obtener-siglas-identificacion.pipe';
import { FormatCifrasPipe } from './conversiones/format-cifras.pipe';



@NgModule({
  declarations: [
    FormatearSegundosPipe,
    ObtenerSiglasIdentificacionPipe,
    FormatCifrasPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatearSegundosPipe,
    ObtenerSiglasIdentificacionPipe,
    FormatCifrasPipe
  ]
})
export class PipesModule { }
