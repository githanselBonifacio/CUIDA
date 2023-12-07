import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { MainAdminPageComponent } from 'src/app/admin/pages/main-admin-page/main-admin-page.component';
import { ToastService } from '../../services/toast/toast.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent, MainAdminPageComponent],
      imports: [
        RouterModule
      ],
      providers: [
        { provide: ToastService, useValue: {} },
        { provide: ActivatedRoute, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
