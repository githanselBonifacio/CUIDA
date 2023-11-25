import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaProgressChartComponent } from './diagrama-progress-chart.component';

describe('DiagramaProgressChartComponent', () => {
  let component: DiagramaProgressChartComponent;
  let fixture: ComponentFixture<DiagramaProgressChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramaProgressChartComponent]
    });
    fixture = TestBed.createComponent(DiagramaProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
