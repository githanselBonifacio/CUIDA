import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambioHoraCitaComponent } from './modal-cambio-hora-cita.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ModalCambioHoraCitaComponent', () => {
  let component: ModalCambioHoraCitaComponent;
  let fixture: ComponentFixture<ModalCambioHoraCitaComponent>;

  const matDialogRefMock = {
    close: () => of("resp"),
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCambioHoraCitaComponent],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalCambioHoraCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
  it('no seleccionar', () => {
    component.onNoClick();
    expect(component).toBeTruthy();
  })
  it(' seleccionar profesional', () => {
    component.onConfirm();
    expect(component).toBeTruthy();
  })
});

