import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaPiechartComponent } from './diagrama-piechart.component';

describe('DiagramaPiechartComponent', () => {
  let component: DiagramaPiechartComponent;
  let fixture: ComponentFixture<DiagramaPiechartComponent>;

  const data = [
    { name: "categoria 1", value: 25 },
    { name: "categoria 2", value: 25 },
    { name: "categoria 3", value: 25 },
    { name: "categoria 4", value: 25 }
  ]
  const dataMayor50 = [
    { name: "categoria 1", value: 25 },
    { name: "categoria 2", value: 200 },
    { name: "categoria 3", value: 25 },
    { name: "categoria 4", value: 25 }
  ]
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

  it(' crear por defecto', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.isStable).toBeTruthy();
  })

  it(' crear grafico', () => {
    component.data = data;
    component.isMonoColor = false;
    component.setValues();
    component.buildChart();
    fixture.detectChanges();
    const diameter = component.diameterPie;
    expect(fixture.isStable).toBeTruthy();
    expect(`${diameter}px`).toEqual(component.diameterPiePx);
  })
  it(' crear grafico porcentage mayor de 50', () => {
    component.data = dataMayor50;
    component.isMonoColor = true;
    component.setValues();
    component.buildChart();
    fixture.detectChanges();
    expect(fixture.isStable).toBeTruthy();
  })
});
