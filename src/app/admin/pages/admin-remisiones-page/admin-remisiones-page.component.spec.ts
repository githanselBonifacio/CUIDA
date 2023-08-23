import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemisionesPageComponent } from './admin-remisiones-page.component';

describe('AdminRemisionesPageComponent', () => {
  let component: AdminRemisionesPageComponent;
  let fixture: ComponentFixture<AdminRemisionesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRemisionesPageComponent]
    });
    fixture = TestBed.createComponent(AdminRemisionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
