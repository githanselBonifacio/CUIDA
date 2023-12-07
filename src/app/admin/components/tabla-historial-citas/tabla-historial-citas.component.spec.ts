import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHistorialCitasComponent } from './tabla-historial-citas.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

describe('TablaHistorialCitasComponent', () => {
  let component: TablaHistorialCitasComponent;
  let fixture: ComponentFixture<TablaHistorialCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaHistorialCitasComponent],
      providers: [
        { provide: MatDialog, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TablaHistorialCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
