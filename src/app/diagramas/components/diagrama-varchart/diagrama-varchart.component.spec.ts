import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaVarchartComponent } from './diagrama-varchart.component';

describe('DiagramaVarchartComponent', () => {
  let component: DiagramaVarchartComponent;
  let fixture: ComponentFixture<DiagramaVarchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramaVarchartComponent]
    });
    fixture = TestBed.createComponent(DiagramaVarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
