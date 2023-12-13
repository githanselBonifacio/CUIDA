import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalHorarioConsolidadoPageComponent } from './admin-personal-horario-consolidado-page.component';
import { Observable, of } from 'rxjs';
import { AdminPersonalService } from 'src/app/admin/services/admin-personal.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PlaceholderHorarioTurnosComponent } from 'src/app/shared/components/placeholder-horario-turnos/placeholder-horario-turnos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Dia } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import { diasFebrero, profesionalesDataTest } from 'src/assets/files/test/personal';
import { horarioTurnoTest, regionalesTest } from 'src/assets/files/test/maestros';
import { DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { ModalAsignarTurnoIndividualComponent } from 'src/app/admin/components/modal-asignar-turno-individual/modal-asignar-turno-individual.component';
import { MatFormFieldModule } from '@angular/material/form-field';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of('string')
    };
  }
}

describe('AdminPersonalHorarioConsolidadoPageComponent', () => {
  let component: AdminPersonalHorarioConsolidadoPageComponent;
  let fixture: ComponentFixture<AdminPersonalHorarioConsolidadoPageComponent>;

  const mesFiltro = '2023-02';
  const idRegional = '427';
  const diasMesFebrero: Dia[] = diasFebrero;
  const filtroTextoPofesionalNombre = "Alicia Paula Rod";
  const filtroTextoPofesionalIdentificacion = "1248946452";

  const adminPersonalServiceMock = {
    getProfesionalesWithTurno: () => of({
      status: 200,
      result: profesionalesDataTest
    }),
    actualizarTurnoProfesional: () => of({ status: 200 })
  }
  const adminMaestrosServiceMock = {
    getProfesiones: jasmine.createSpy('getProfesiones').and
      .returnValue([]),

    getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
      .returnValue([]),

    getRegionalesObservable: () => of({
      status: 200,
      result: regionalesTest
    })
  }
  const toastServiceMock = {
    mostrarToast: (): Observable<any> => of(),
  };
  const spinnerService = {
    show: () => of(),
    hide: () => of()
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminPersonalHorarioConsolidadoPageComponent,
        PlaceholderHorarioTurnosComponent,
        ModalAsignarTurnoIndividualComponent
      ],
      imports: [
        MatDialogModule,
        NgxPaginationModule,
        FormsModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
        { provide: MaestrosService, useValue: adminMaestrosServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: SpinnerService, useValue: spinnerService },
        DatePipe
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

  it('guardar local store', () => {
    component.mesFiltro = mesFiltro;
    component.opcionIdRegional = idRegional;
    component.guardarLocalStorage();
    component.numerosPaginaSeleccionada = 2;
    component.onPaginateChange();
    fixture.detectChanges();
    expect(localStorage.getItem("fechaTurnoHorarioConsolidado")).toEqual(mesFiltro);
    expect(localStorage.getItem("idRegionalHorarioConsolidadoFiltro")).toEqual(idRegional);
    expect(localStorage.getItem("paginasTablaConsolidado")).toEqual(`${2}`);
    component.actualizarRegionalFilter("xxx");
    fixture.detectChanges();
    expect(component.opcionIdRegional).toEqual("xxx")
  })

  it('buscar turno', () => {
    component.buscarTurno();
    expect(component.profesionales).toEqual(profesionalesDataTest)
  })
  it("abrir dialogo asignar turno", () => {
    component.openDialogAsignarTurno("1", profesionalesDataTest[0]);
    expect(component).toBeTruthy();
  })

});
