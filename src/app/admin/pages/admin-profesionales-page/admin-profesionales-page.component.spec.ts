import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfesionalesPageComponent } from './admin-profesionales-page.component';

describe('AdminProfesionalesPageComponent', () => {
  let component: AdminProfesionalesPageComponent;
  let fixture: ComponentFixture<AdminProfesionalesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProfesionalesPageComponent]
    });
    fixture = TestBed.createComponent(AdminProfesionalesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
