import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRutaComponent } from './map-ruta.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Tarea } from 'src/app/diagramas/interfaces/tarea-gantt.interface';

describe('MapRutaComponent', () => {
  let component: MapRutaComponent;
  let fixture: ComponentFixture<MapRutaComponent>;

  let tareas: Tarea[] = [
    {
      id: "id",
      fechaInicio: "2023-07-07 00:00:00",
      fechaProgramada: "2023-07-07 00:00:00",
      duracion: 600,
      holgura: 600,
      latitud: 11.465465,
      longitud: -7.415415,
      idEstado: 1,
      tipo: "VISITA"
    }
  ]
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapRutaComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            tareas: tareas,
            origen: { longitud: 11.2, latitud: -7.5 }
          }
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MapRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
