import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoResultadosAccionMasivaHorarioComponent } from './modal-info-resultados-accion-masiva-horario.component';

describe('ModalInfoResultadosAccionMasivaHorarioComponent', () => {
  let component: ModalInfoResultadosAccionMasivaHorarioComponent;
  let fixture: ComponentFixture<ModalInfoResultadosAccionMasivaHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInfoResultadosAccionMasivaHorarioComponent]
    });
    fixture = TestBed.createComponent(ModalInfoResultadosAccionMasivaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
