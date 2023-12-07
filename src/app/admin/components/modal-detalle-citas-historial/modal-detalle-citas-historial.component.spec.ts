import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleCitasHistorialComponent } from './modal-detalle-citas-historial.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsCitaComponent } from 'src/app/agenda/components/items-cita/items-cita.component';

describe('ModalDetalleCitasHistorialComponent', () => {
  let component: ModalDetalleCitasHistorialComponent;
  let fixture: ComponentFixture<ModalDetalleCitasHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetalleCitasHistorialComponent, ItemsCitaComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalDetalleCitasHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

});
