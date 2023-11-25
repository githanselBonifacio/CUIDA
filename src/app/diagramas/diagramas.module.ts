import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { GanttComponent } from './components/gantt/gantt.component';
import { DiagramaVarchartComponent } from './components/diagrama-varchart/diagrama-varchart.component';
import { PipesModule } from '../pipes/pipes.module';
import { DiagramaPiechartComponent } from './components/diagrama-piechart/diagrama-piechart.component';
import { DiagramaProgressChartComponent } from './components/diagrama-progress-chart/diagrama-progress-chart.component';



@NgModule({
  declarations: [
    GanttComponent,
    DiagramaVarchartComponent,
    DiagramaPiechartComponent,
    DiagramaProgressChartComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    GanttComponent,
    DiagramaVarchartComponent,
    DiagramaPiechartComponent,
    DiagramaProgressChartComponent
  ]
})
export class DiagramasModule { }
