import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionProfesionalComponent } from './modal-seleccion-profesional.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalSeleccionProfesionalComponent', () => {
  let component: ModalSeleccionProfesionalComponent;
  let fixture: ComponentFixture<ModalSeleccionProfesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSeleccionProfesionalComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalSeleccionProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
