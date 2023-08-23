import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistorialRemisionPageComponent } from './admin-historial-remision-page.component';

describe('AdminHistorialRemisionPageComponent', () => {
  let component: AdminHistorialRemisionPageComponent;
  let fixture: ComponentFixture<AdminHistorialRemisionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHistorialRemisionPageComponent]
    });
    fixture = TestBed.createComponent(AdminHistorialRemisionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
