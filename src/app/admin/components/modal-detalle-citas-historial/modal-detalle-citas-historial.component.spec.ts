import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleCitasHistorialComponent } from './modal-detalle-citas-historial.component';

describe('ModalDetalleCitasHistorialComponent', () => {
  let component: ModalDetalleCitasHistorialComponent;
  let fixture: ComponentFixture<ModalDetalleCitasHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetalleCitasHistorialComponent]
    });
    fixture = TestBed.createComponent(ModalDetalleCitasHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
