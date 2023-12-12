import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaVarchartComponent } from './diagrama-varchart.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DecimalPipe } from '@angular/common';

describe('DiagramaVarchartComponent', () => {
  let component: DiagramaVarchartComponent;
  let fixture: ComponentFixture<DiagramaVarchartComponent>;

  const data = [
    { name: "cartegoria 1", value: 100 },
    { name: "cartegoria 2", value: 150 },
    { name: "cartegoria 3", value: 200 },
  ]
  const dataPorcentaje = [
    { name: "cartegoria 1", value: 45 },
    { name: "cartegoria 2", value: 90 },
    { name: "cartegoria 3", value: 20 },
  ]
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

  /**
   * validar que el numero sea multiplo de 10 para normalizar el eje  y
   */
  it('multiplo de 10', () => {
    expect(component.getMultiploTen(201)).toEqual(200);
    expect(component.getMultiploTen(5)).toEqual(10);
  });

  it('crear varchart por defecto', () => {
    component.normalizarEjeY();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
  it('crear varchart por porcentajes', () => {
    component.data = dataPorcentaje;
    component.isPercentageEjeY = true;
    component.normalizarEjeY();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('crear varchart', () => {
    component.data = data;
    component.normalizarEjeY();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
