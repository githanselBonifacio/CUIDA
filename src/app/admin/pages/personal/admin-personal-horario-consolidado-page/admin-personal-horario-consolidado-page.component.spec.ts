import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalHorarioConsolidadoPageComponent } from './admin-personal-horario-consolidado-page.component';

describe('AdminPersonalHorarioConsolidadoPageComponent', () => {
  let component: AdminPersonalHorarioConsolidadoPageComponent;
  let fixture: ComponentFixture<AdminPersonalHorarioConsolidadoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalHorarioConsolidadoPageComponent]
    });
    fixture = TestBed.createComponent(AdminPersonalHorarioConsolidadoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
