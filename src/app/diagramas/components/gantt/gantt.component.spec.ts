import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttComponent } from './gantt.component';
import { MatDialogModule } from '@angular/material/dialog';
import { actividadesTest, horas } from 'src/assets/files/test/actividades';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ElementRef } from '@angular/core';

describe('GanttComponent', () => {
  let component: GanttComponent;
  let fixture: ComponentFixture<GanttComponent>;

  const widthContainer = 100;
  const divisioncontainerHora = 12.5;
  const postMediaContainer = 50;
  const widthDuracionUnaHora = 12.5;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GanttComponent],
      imports: [
        MatDialogModule,
        PipesModule
      ]
    });
    fixture = TestBed.createComponent(GanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('calcular division hora', () => {
    component.actividades = actividadesTest;
    component.horas = horas;
    component.widthContainer = widthContainer;
    fixture.detectChanges();
    const division = component.divisionHora;
    expect(division).toEqual(divisioncontainerHora)
  })
  it('calcular posicion barra tiempo gantt', () => {
    component.actividades = actividadesTest;
    component.horas = horas;
    component.onResize({});
    component.widthContainer = widthContainer;
    fixture.detectChanges();
    const fechaTareaMedio = actividadesTest[0].tareas[1].fechaProgramada;
    const leftMedio = component.calcularLeft(fechaTareaMedio);
    expect(leftMedio).toEqual(postMediaContainer);

  })
  it('calcular duracion  barra tiempo gantt', () => {
    component.actividades = actividadesTest;
    component.horas = horas;
    component.widthContainer = widthContainer;
    fixture.detectChanges();
    const widtMedio = component.calcularWidth(actividadesTest[0].tareas[1].duracion);
    expect(widtMedio).toEqual(widthDuracionUnaHora);

  })
  it('emitir profesional turno', () => {
    let actividadEmitida = actividadesTest[0];
    component.idprofesionalEvent.asObservable().subscribe(actividad => {
      expect(actividad).toEqual(actividadEmitida);
    })
    component.emitirProfesionalTurno(actividadesTest[0])
    fixture.detectChanges();

  })

  it('emitir desagentar  tarea', () => {
    let tareaRecibida: string = "";
    const tareaEmitida = actividadesTest[0].tareas[0].id;

    component.retirarTareaEvent.asObservable().subscribe((tarea: string) => {
      tareaRecibida = tarea;
      expect(tareaRecibida).toEqual(tareaEmitida)
    });
    component.emitirDesagendarTarea(tareaEmitida);
    fixture.detectChanges();
  })

  it('emitir reprogramar tarea', () => {
    let tareaRecibida: string = "";
    const tareaEmitida = actividadesTest[0].tareas[0].id;

    component.reprogramarTareaEvent.asObservable().subscribe((tarea: string) => {
      tareaRecibida = tarea;
      expect(tareaRecibida).toEqual(tareaEmitida)
    });
    component.emitirReprogramarTarea(tareaEmitida);
    fixture.detectChanges();
  })
});
