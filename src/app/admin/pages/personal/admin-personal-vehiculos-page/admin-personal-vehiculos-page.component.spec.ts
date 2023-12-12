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
import { regionalesTest, tipoIdentificacionTest } from 'src/assets/files/test/maestros';
import { movilesTest } from 'src/assets/files/test/personal';
import { AccionFormulario } from 'src/app/admin/interfaces/enum';

describe('AdminPersonalVehiculosPageComponent', () => {
  let component: AdminPersonalVehiculosPageComponent;
  let fixture: ComponentFixture<AdminPersonalVehiculosPageComponent>;

  const adminPersonalServiceMock = {
    getAllMoviles: () => of({
      status: 200,
      result: movilesTest
    })
  }
  const adminMaestrosServiceMock = {
    getTiposIdentificacion: jasmine.createSpy('getTiposIdentificacion').and
      .returnValue({
        status: 200,
        result: tipoIdentificacionTest
      }),

    getRegionales: jasmine.createSpy('getRegionales').and
      .returnValue({
        status: 200,
        result: regionalesTest
      }),

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

  it('actualizar datos', () => {
    component.actualizarDatos();
    component.actualizarPage();
    component.estadoVisualFormCrear = 'activate';
    component.mostrarFormularioCrearMovil();
    component.estadoVisualFormCrear = '';
    component.mostrarFormularioCrearMovil();
    component.getIconActivar(true);
    component.getIconActivar(false);
    component.volverCrear();
    component.accionFormulario = AccionFormulario.ACTUALIZAR;
    fixture.detectChanges();
    component.volverCrear();
    component.abrirFormEditarMovil(movilesTest[0])
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.movilSeleccionado).toEqual(movilesTest[0])
  })

});
