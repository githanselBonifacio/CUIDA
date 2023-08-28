import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatearSegundosPipe } from './conversiones/formatear-segundos.pipe';



@NgModule({
  declarations: [
    FormatearSegundosPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormatearSegundosPipe
  ]
})
export class PipesModule { }
