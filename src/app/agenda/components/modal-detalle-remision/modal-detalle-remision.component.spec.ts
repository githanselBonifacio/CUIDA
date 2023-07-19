import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleRemisionComponent } from './modal-detalle-remision.component';

describe('ModalDetalleRemisionComponent', () => {
  let component: ModalDetalleRemisionComponent;
  let fixture: ComponentFixture<ModalDetalleRemisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetalleRemisionComponent]
    });
    fixture = TestBed.createComponent(ModalDetalleRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
