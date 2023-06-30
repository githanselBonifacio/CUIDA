import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttComponent } from './components/gantt/gantt.component';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';


@NgModule({
  declarations: [
    GanttComponent,
    
  ],
  imports: [
    CommonModule,
    GanttModule,
  ],
  exports: [
    GanttComponent
  ]
})
export class DiagramasModule { }
