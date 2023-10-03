import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFromMovilesComponent } from './admin-from-moviles.component';

describe('AdminFromMovilesComponent', () => {
  let component: AdminFromMovilesComponent;
  let fixture: ComponentFixture<AdminFromMovilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFromMovilesComponent]
    });
    fixture = TestBed.createComponent(AdminFromMovilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
