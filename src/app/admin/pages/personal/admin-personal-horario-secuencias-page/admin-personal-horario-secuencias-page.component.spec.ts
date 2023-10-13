import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalHorarioSecuenciasPageComponent } from './admin-personal-horario-secuencias-page.component';

describe('AdminPersonalHorarioConfiguracionPageComponent', () => {
  let component: AdminPersonalHorarioSecuenciasPageComponent;
  let fixture: ComponentFixture<AdminPersonalHorarioSecuenciasPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalHorarioSecuenciasPageComponent]
    });
    fixture = TestBed.createComponent(AdminPersonalHorarioSecuenciasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
