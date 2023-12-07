import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaPiechartComponent } from './diagrama-piechart.component';

describe('DiagramaPiechartComponent', () => {
  let component: DiagramaPiechartComponent;
  let fixture: ComponentFixture<DiagramaPiechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramaPiechartComponent]
    });
    fixture = TestBed.createComponent(DiagramaPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
