import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalHorarioPageComponent } from './admin-personal-horario-page.component';

describe('AdminPersonalHorarioPageComponent', () => {
  let component: AdminPersonalHorarioPageComponent;
  let fixture: ComponentFixture<AdminPersonalHorarioPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalHorarioPageComponent]
    });
    fixture = TestBed.createComponent(AdminPersonalHorarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
