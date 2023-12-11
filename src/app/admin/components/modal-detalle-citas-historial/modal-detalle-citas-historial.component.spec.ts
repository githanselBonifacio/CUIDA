import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleCitasHistorialComponent } from './modal-detalle-citas-historial.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsCitaComponent } from 'src/app/agenda/components/items-cita/items-cita.component';
import { citaHistorialTest, citasTest } from 'src/assets/files/test/citas';

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

  it('contiene procedimientos', () => {
    component.citaSeleccionada = citaHistorialTest[0]
    fixture.detectChanges();
    const validar = component.contieneProcedimientos();

    expect(validar).toBeFalsy();
  })
  it('no contiene procedimientos', () => {
    const validar = component.contieneProcedimientos();
    fixture.detectChanges();
    expect(validar).toBeTruthy();
  })
});
