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
import { AccionFormulario } from 'src/app/shared/interfaces/general/enum';
import { conductoresDataTest, profesionalesDataTest } from 'src/assets/files/test/personal';

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
  it('actualizar datos', () => {
    component.actualizarDatos();
    component.actualizarPage();
    component.estadoVisualFormCrearProfesional = 'activate';
    component.mostrarFormularioCrearProfesional();
    component.estadoVisualFormCrearProfesional = '';
    component.mostrarFormularioCrearProfesional();
    component.getIconActivar(true);
    component.getIconActivar(false);
    component.volverCrear();
    component.accionFormulario = AccionFormulario.ACTUALIZAR;
    fixture.detectChanges();
    component.volverCrear();
    component.abrirFormEditarProfesional(profesionalesDataTest[0])
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.profesionalSeleccionado).toEqual(profesionalesDataTest[0])
  })
});
