import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalConductoresPageComponent } from './admin-personal-conductores-page.component';

describe('AdminPersonalConductoresPageComponent', () => {
  let component: AdminPersonalConductoresPageComponent;
  let fixture: ComponentFixture<AdminPersonalConductoresPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalConductoresPageComponent]
    });
    fixture = TestBed.createComponent(AdminPersonalConductoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
