import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRutaComponent } from './map-ruta.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('MapRutaComponent', () => {
  let component: MapRutaComponent;
  let fixture: ComponentFixture<MapRutaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapRutaComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MapRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
