import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalProfesionalesPageComponent } from './admin-personal-profesionales-page.component';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminFormProfesionalesComponent } from 'src/app/admin/forms/admin-form-profesionales/admin-form-profesionales.component';

describe('AdminProfesionalesPageComponent', () => {
  let component: AdminPersonalProfesionalesPageComponent;
  let fixture: ComponentFixture<AdminPersonalProfesionalesPageComponent>;

  const adminPersonalServiceMock = {
    getAllProfesionales: () => of({ result: [] })
  }
  const adminMaestrosServiceMock = {
    getTiposIdentificacion: jasmine.createSpy('getTiposIdentificacion').and
      .returnValue([]),

    getRegionales: jasmine.createSpy('getRegionales').and
      .returnValue([]),

    getProfesiones: jasmine.createSpy('getProfesiones').and
      .returnValue([])
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalProfesionalesPageComponent, AdminFormProfesionalesComponent],
      imports: [
        MatPaginatorModule,
        MatTableModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
        { provide: MaestrosService, useValue: adminMaestrosServiceMock },
        { provide: ToastService, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminPersonalProfesionalesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
