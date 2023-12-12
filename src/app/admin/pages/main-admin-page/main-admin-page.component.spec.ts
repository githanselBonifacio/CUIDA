import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminPageComponent } from './main-admin-page.component';
import { ActivatedRoute, RouterModule } from '@angular/router';


describe('MainAdminPageComponent', () => {
  let component: MainAdminPageComponent;
  let fixture: ComponentFixture<MainAdminPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAdminPageComponent],
      imports: [
        RouterModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(MainAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
