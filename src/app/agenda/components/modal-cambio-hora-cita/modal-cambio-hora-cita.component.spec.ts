import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambioHoraCitaComponent } from './modal-cambio-hora-cita.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('ModalCambioHoraCitaComponent', () => {
  let component: ModalCambioHoraCitaComponent;
  let fixture: ComponentFixture<ModalCambioHoraCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCambioHoraCitaComponent],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
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

});
