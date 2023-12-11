import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoResultadosAccionMasivaHorarioComponent } from './modal-info-resultados-accion-masiva-horario.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('ModalInfoResultadosAccionMasivaHorarioComponent', () => {
  let component: ModalInfoResultadosAccionMasivaHorarioComponent;
  let fixture: ComponentFixture<ModalInfoResultadosAccionMasivaHorarioComponent>;
  const matDialogRefMock = {
    close: () => of("resp"),
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInfoResultadosAccionMasivaHorarioComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(ModalInfoResultadosAccionMasivaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it(' on confirm', () => {
    const spyDialog = spyOn(matDialogRefMock, 'close').and.callThrough();
    component.onConfirm();
    fixture.detectChanges();
    expect(spyDialog).toHaveBeenCalled();
  })

});
