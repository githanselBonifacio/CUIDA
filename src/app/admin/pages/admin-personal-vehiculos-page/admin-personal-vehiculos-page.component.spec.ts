import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalVehiculosPageComponent } from './admin-personal-vehiculos-page.component';

describe('AdminPersonalVehiculosPageComponent', () => {
  let component: AdminPersonalVehiculosPageComponent;
  let fixture: ComponentFixture<AdminPersonalVehiculosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalVehiculosPageComponent]
    });
    fixture = TestBed.createComponent(AdminPersonalVehiculosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
