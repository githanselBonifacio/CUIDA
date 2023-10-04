import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalPageComponent } from './admin-personal-page.component';

describe('AdminPersonalPageComponent', () => {
  let component: AdminPersonalPageComponent;
  let fixture: ComponentFixture<AdminPersonalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalPageComponent]
    });
    fixture = TestBed.createComponent(AdminPersonalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
