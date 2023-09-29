import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFromConductoresComponent } from './admin-form-conductores.component';

describe('AdminFromConductoresComponent', () => {
  let component: AdminFromConductoresComponent;
  let fixture: ComponentFixture<AdminFromConductoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFromConductoresComponent]
    });
    fixture = TestBed.createComponent(AdminFromConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
