import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistorialRemisionPageComponent } from './admin-historial-remision-page.component';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TablaHistorialCitasComponent } from '../../components/tabla-historial-citas/tabla-historial-citas.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { dataActualRemision, historialRemision } from 'src/assets/files/test/remisiones';
import { TablaActualizacionDatosRemisionComponent } from '../../components/tabla-actualizacion-datos-remision/tabla-actualizacion-datos-remision.component';

describe('AdminHistorialRemisionPageComponent', () => {
  let component: AdminHistorialRemisionPageComponent;
  let fixture: ComponentFixture<AdminHistorialRemisionPageComponent>;


  const maestrosServiceMock = {
    getEstadosCita: jasmine.createSpy('getEstadosCita').and
      .returnValue([]),

  };
  const adminRemisionServiceMock = {
    getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
      .returnValue([]),

    resp: of({ resp: {} }),

    consultarHistorialRemision: () => of({ result: historialRemision }),

    consultarDataActualRemision: () => of({ result: dataActualRemision })
  };

  const activateRouteSpy = {
    params: of({ idRemision: 'yourMockIdRemision' })
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:
        [
          AdminHistorialRemisionPageComponent,
          TablaHistorialCitasComponent,
          TablaActualizacionDatosRemisionComponent
        ],
      imports: [NgxPaginationModule, RouterTestingModule, PipesModule],
      providers: [
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: AdminRemisionService, useValue: adminRemisionServiceMock },
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: activateRouteSpy },
        { provide: MatDialog, useValue: {} },

      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminHistorialRemisionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('consultar historial', () => {
    adminRemisionServiceMock.consultarHistorialRemision().subscribe(resp => {
      expect(resp.result).toEqual(historialRemision);
    });
  });

  it('consultar datos actuales', () => {
    adminRemisionServiceMock.consultarDataActualRemision().subscribe(resp => {
      expect(resp.result).toEqual(dataActualRemision);
    });
  });

});
