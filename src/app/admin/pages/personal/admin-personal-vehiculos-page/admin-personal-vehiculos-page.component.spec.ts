import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalVehiculosPageComponent } from './admin-personal-vehiculos-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { of } from 'rxjs';
import { AdminFormMovilesComponent } from 'src/app/admin/forms/admin-form-moviles/admin-form-moviles.component';

describe('AdminPersonalVehiculosPageComponent', () => {
  let component: AdminPersonalVehiculosPageComponent;
  let fixture: ComponentFixture<AdminPersonalVehiculosPageComponent>;

  const adminPersonalServiceMock = {
    getAllMoviles: () => of({ result: [] })
  }
  const adminMaestrosServiceMock = {
    getTiposIdentificacion: jasmine.createSpy('getTiposIdentificacion').and
      .returnValue([]),

    getRegionales: jasmine.createSpy('getRegionales').and
      .returnValue([]),

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalVehiculosPageComponent, AdminFormMovilesComponent],
      imports: [
        MatPaginatorModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
        { provide: MaestrosService, useValue: adminMaestrosServiceMock },
        { provide: ToastService, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminPersonalVehiculosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
