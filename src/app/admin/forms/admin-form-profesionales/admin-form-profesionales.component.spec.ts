import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormProfesionalesComponent } from './admin-form-profesionales.component';

describe('AdminFormProfesionalesComponent', () => {
  let component: AdminFormProfesionalesComponent;
  let fixture: ComponentFixture<AdminFormProfesionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFormProfesionalesComponent]
    });
    fixture = TestBed.createComponent(AdminFormProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
