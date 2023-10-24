import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfiguracionSecuenciaComponent } from './modal-configuracion-secuencia.component';

describe('ModalConfiguracionSecuenciaComponent', () => {
  let component: ModalConfiguracionSecuenciaComponent;
  let fixture: ComponentFixture<ModalConfiguracionSecuenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfiguracionSecuenciaComponent]
    });
    fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
