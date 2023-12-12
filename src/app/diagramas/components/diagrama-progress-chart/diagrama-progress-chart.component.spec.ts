import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaProgressChartComponent } from './diagrama-progress-chart.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DecimalPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DiagramaProgressChartComponent', () => {
  let component: DiagramaProgressChartComponent;
  let fixture: ComponentFixture<DiagramaProgressChartComponent>;
  const title = "porcentaje";
  const value = 80;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramaProgressChartComponent],
      imports: [
        PipesModule,
        BrowserAnimationsModule
      ],
      providers: [
        DecimalPipe
      ]
    });
    fixture = TestBed.createComponent(DiagramaProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('crear chart', () => {
    component.title = title;
    component.value = value;
    fixture.detectChanges();
    component.buildChart();
    expect(component).toBeTruthy();
  });
});
