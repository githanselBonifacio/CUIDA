import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormConductoresComponent } from './admin-form-conductores.component';

describe('AdminFromConductoresComponent', () => {
  let component: AdminFormConductoresComponent;
  let fixture: ComponentFixture<AdminFormConductoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFormConductoresComponent]
    });
    fixture = TestBed.createComponent(AdminFormConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
