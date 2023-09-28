import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalProfesionalesPageComponent } from './admin-personal-profesionales-page.component';

describe('AdminProfesionalesPageComponent', () => {
  let component: AdminPersonalProfesionalesPageComponent;
  let fixture: ComponentFixture<AdminPersonalProfesionalesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalProfesionalesPageComponent]
    });
    fixture = TestBed.createComponent(AdminPersonalProfesionalesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
