import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalConductoresPageComponent } from './admin-personal-conductores-page.component';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { AdminFormConductoresComponent } from 'src/app/admin/forms/admin-form-conductores/admin-form-conductores.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminPersonalConductoresPageComponent', () => {
  let component: AdminPersonalConductoresPageComponent;
  let fixture: ComponentFixture<AdminPersonalConductoresPageComponent>;

  const adminPersonalServiceMock = {
    getAllConductores: () => of({ result: [] })
  }
  const adminMaestrosServiceMock = {
    getTiposIdentificacion: jasmine.createSpy('getTiposIdentificacion').and
      .returnValue([]),

    getRegionales: jasmine.createSpy('getRegionales').and
      .returnValue([])
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalConductoresPageComponent, AdminFormConductoresComponent],
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
    fixture = TestBed.createComponent(AdminPersonalConductoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
