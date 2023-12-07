import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalPageComponent } from './admin-personal-page.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('AdminPersonalPageComponent', () => {
  let component: AdminPersonalPageComponent;
  let fixture: ComponentFixture<AdminPersonalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalPageComponent],
      imports: [
        RouterModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminPersonalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
