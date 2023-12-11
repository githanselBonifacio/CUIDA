import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalConductoresPageComponent } from './admin-personal-conductores-page.component';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { AdminFormConductoresComponent } from 'src/app/admin/forms/admin-form-conductores/admin-form-conductores.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccionFormulario } from 'src/app/admin/interfaces/enum';
import { conductoresDataTest } from 'src/assets/files/test/personal';
import { regionalesTest, tipoIdentificacionTest } from 'src/assets/files/test/maestros';

describe('AdminPersonalConductoresPageComponent', () => {
  let component: AdminPersonalConductoresPageComponent;
  let fixture: ComponentFixture<AdminPersonalConductoresPageComponent>;

  const adminPersonalServiceMock = {
    getAllConductores: () => of(
      {
        status: 200,
        result: conductoresDataTest
      }
    )
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
      })
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

  it('actualizar datos', () => {
    component.actualizarDatos();
    component.actualizarPage();
    component.estadoVisualFormCrear = 'activate';
    component.mostrarFormularioCrearConductor();
    component.estadoVisualFormCrear = '';
    component.mostrarFormularioCrearConductor();
    component.getIconActivar(true);
    component.getIconActivar(false);
    component.volverCrear();
    component.accionFormulario = AccionFormulario.ACTUALIZAR;
    fixture.detectChanges();
    component.volverCrear();
    component.abrirFormEditarProfesional(conductoresDataTest[0])
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.conductorSeleccionado).toEqual(conductoresDataTest[0])
  })
});
