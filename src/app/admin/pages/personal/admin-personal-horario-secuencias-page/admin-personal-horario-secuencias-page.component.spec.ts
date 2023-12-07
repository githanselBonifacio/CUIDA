import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalHorarioSecuenciasPageComponent } from './admin-personal-horario-secuencias-page.component';
import { of } from 'rxjs';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminPersonalHorarioSecuenciasPageComponent', () => {
  let component: AdminPersonalHorarioSecuenciasPageComponent;
  let fixture: ComponentFixture<AdminPersonalHorarioSecuenciasPageComponent>;

  const adminPersonalServiceMock = {
    getSecuenciasTurno: () => of({ result: [] }),

    getAllProfesionales: () => of({ result: [] }),

  }

  const maestrosServiceMock = {
    getProfesiones: jasmine.createSpy('getProfesiones').and
      .returnValue([]),

    getTiposIdentificacion: jasmine.createSpy('getTiposIdentificacion').and
      .returnValue([]),

    getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
      .returnValue([]),

    getRegionalesObservable: () => of({ result: [] })
  }
  const spinnerService = {
    show: () => of({ result: [] })
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalHorarioSecuenciasPageComponent],
      imports: [
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatCheckboxModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: ToastService, useValue: {} },
        { provide: SpinnerService, useValue: spinnerService },
      ]
    });
    fixture = TestBed.createComponent(AdminPersonalHorarioSecuenciasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
