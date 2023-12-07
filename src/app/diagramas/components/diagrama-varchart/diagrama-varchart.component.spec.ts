import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaVarchartComponent } from './diagrama-varchart.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DecimalPipe } from '@angular/common';

describe('DiagramaVarchartComponent', () => {
  let component: DiagramaVarchartComponent;
  let fixture: ComponentFixture<DiagramaVarchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramaVarchartComponent],
      imports: [
        PipesModule
      ],
      providers: [
        DecimalPipe
      ]
    });
    fixture = TestBed.createComponent(DiagramaVarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
