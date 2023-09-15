import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttComponent } from './components/gantt/gantt.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    GanttComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    GanttComponent
  ]
})
export class DiagramasModule { }
