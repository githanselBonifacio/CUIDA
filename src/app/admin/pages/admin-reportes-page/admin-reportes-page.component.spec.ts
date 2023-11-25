import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportesPageComponent } from './admin-reportes-page.component';

describe('AdminReportesPageComponent', () => {
  let component: AdminReportesPageComponent;
  let fixture: ComponentFixture<AdminReportesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportesPageComponent]
    });
    fixture = TestBed.createComponent(AdminReportesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
