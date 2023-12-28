import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttComponent } from './gantt.component';
import { MatDialogModule } from '@angular/material/dialog';
import { actividadesTest, horas } from 'src/assets/files/test/actividades';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { EstadosCita } from 'src/app/shared/interfaces/agenda/remision.interface';

describe('GanttComponent', () => {
  let component: GanttComponent;
  let fixture: ComponentFixture<GanttComponent>;

  const widthContainer = 100;
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

  it('calcular posicion barra tiempo gantt', () => {
    component.actividades = actividadesTest;
    component.horas = horas;
    component.fechaTurno = new Date(actividadesTest[0].tareas[0].fechaProgramada);
    component.onResize({});
    const fechaTareaMedio = actividadesTest[0].tareas[1].fechaProgramada;
    const leftMedio = component.calcularLeft(fechaTareaMedio, widthContainer);
    expect(leftMedio).toEqual(postMediaContainer);

  })
  it('validar state', () => {
    expect(component.validState(EstadosCita.agendada)).toBeTruthy();
  })
  it('calcular duracion  barra tiempo gantt', () => {
    component.actividades = actividadesTest;
    component.horas = horas;
    component.fechaTurno = new Date();
    const widtMedio = component.calcularWidth(actividadesTest[0].tareas[1].duracion, widthContainer);
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


  it('emitir confirmar tarea', () => {
    let tareaRecibida: string = "";
    const tareaEmitida = actividadesTest[0].tareas[0].id;

    component.confirmarTareaEvent.asObservable().subscribe((tarea: string) => {
      tareaRecibida = tarea;
      expect(tareaRecibida).toEqual(tareaEmitida)
    });
    component.emitirConfirmarTarea(tareaEmitida);
    fixture.detectChanges();
  })
});
