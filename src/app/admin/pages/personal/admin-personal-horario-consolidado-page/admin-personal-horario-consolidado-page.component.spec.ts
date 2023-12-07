import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalHorarioConsolidadoPageComponent } from './admin-personal-horario-consolidado-page.component';
import { of } from 'rxjs';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { MatDialogModule } from '@angular/material/dialog';
import { PlaceholderHorarioTurnosComponent } from 'src/app/shared/components/placeholder-horario-turnos/placeholder-horario-turnos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Dia } from 'src/app/shared/interfaces/maestros.interfaces';
import { diasFebrero, profesionalesDataTest } from 'src/assets/files/test/personal';

describe('AdminPersonalHorarioConsolidadoPageComponent', () => {
  let component: AdminPersonalHorarioConsolidadoPageComponent;
  let fixture: ComponentFixture<AdminPersonalHorarioConsolidadoPageComponent>;

  const mesFiltro = '2023-02';
  const diasMesFebrero: Dia[] = diasFebrero;
  const filtroTextoPofesionalNombre = "Alicia Paula Rod";
  const filtroTextoPofesionalIdentificacion = "1248946452";

  const adminPersonalServiceMock = {
    getAllConductores: () => of({ result: [] })
  }
  const adminMaestrosServiceMock = {
    getProfesiones: jasmine.createSpy('getProfesiones').and
      .returnValue([]),

    getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
      .returnValue([]),

    getRegionalesObservable: () => of({ result: [] })
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminPersonalHorarioConsolidadoPageComponent,
        PlaceholderHorarioTurnosComponent
      ],
      imports: [
        MatDialogModule,
        NgxPaginationModule,
        FormsModule
      ],
      providers: [
        { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
        { provide: MaestrosService, useValue: adminMaestrosServiceMock },
        { provide: ToastService, useValue: {} },
        { provide: SpinnerService, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(AdminPersonalHorarioConsolidadoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('calcular lista de días', () => {
    component.mesFiltro = mesFiltro;
    component.getDiasMes();

    fixture.detectChanges();
    expect(component.dias).toEqual(diasMesFebrero);

  })

  it('filtrar profesionales nombre', () => {
    component.profesionales = profesionalesDataTest;
    component.inputTextPersonal = filtroTextoPofesionalNombre;
    component.filtrarPersonal();
    fixture.detectChanges();

    expect(component.profesionalesMostrados.length).toEqual(1);
  })

  it('filtrar profesionales número identificación', () => {
    component.profesionales = profesionalesDataTest;
    component.inputTextPersonal = filtroTextoPofesionalIdentificacion;
    component.filtrarPersonal();
    fixture.detectChanges();

    expect(component.profesionalesMostrados.length).toEqual(1);
  })
});
