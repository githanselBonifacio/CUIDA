import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaConfirmacionComponent } from './ventana-confirmacion.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('VentanaConfirmacionComponent', () => {
  let component: VentanaConfirmacionComponent;
  let fixture: ComponentFixture<VentanaConfirmacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaConfirmacionComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(VentanaConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('confirmar', () => {
    component.onConfirm()
    expect(component.dialogRef.close).toHaveBeenCalledWith(true)
  })
  it('cerrar', () => {
    component.onNoClick()
    expect(component.dialogRef.close).toHaveBeenCalledWith(false)
  })
});
