import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambioHoraCitaComponent } from './modal-cambio-hora-cita.component';

describe('ModalCambioHoraCitaComponent', () => {
  let component: ModalCambioHoraCitaComponent;
  let fixture: ComponentFixture<ModalCambioHoraCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCambioHoraCitaComponent]
    });
    fixture = TestBed.createComponent(ModalCambioHoraCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
