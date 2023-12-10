import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioFarmaceuticoPageComponent } from './servicio-farmaceutico-page.component';
import { of } from 'rxjs';
import { AdminFarmaciaService } from '../../services/admin-farmacia.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { notificacionesFarmaciaTest } from 'src/assets/files/test/farmacia';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { Router } from '@angular/router';

describe('ServicioFarmaceuticoPageComponent', () => {
    let component: ServicioFarmaceuticoPageComponent;
    let fixture: ComponentFixture<ServicioFarmaceuticoPageComponent>;

    const filtroBusquedaNombre = "Carla Ca";
    const filtroBusquedaCedula = "9898";
    const filtroBusquedaRemision = "4ps585";

    const fecha = "2023-07-07";
    const idRegional = '427';
    const idHorario = 1;

    const adminFarmaciaServiceMock = {
        getNotificacionesFarmacia: () => of({
            result: notificacionesFarmaciaTest,
            status: 200
        }),
        getNotificacionesFarmaciaWithFilter: () => of({ result: [] }),
        notificarMedicamentosToFarmacia: () => of({ status: 200 })
    }
    const maestrosServiceMock = {
        getTiposIdentificacion: jasmine.createSpy('getTiposIdentificacion').and
            .returnValue([]),

        getRegionales: jasmine.createSpy('getRegionales').and
            .returnValue([]),

        getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
            .returnValue([])
    }
    const toastServiceMock = {
        mostrarToast: () => of({ result: true }),
    }
    const routerspy: any = {
        navigate: (url: string[]) => of(url)
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ServicioFarmaceuticoPageComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatPaginatorModule,
                MatTableModule,
                MatCheckboxModule,
                BrowserAnimationsModule,
                PipesModule
            ],
            providers: [
                { provide: AdminFarmaciaService, useValue: adminFarmaciaServiceMock },
                { provide: MaestrosService, useValue: maestrosServiceMock },
                { provide: Router, useValue: routerspy },
                { provide: ToastService, useValue: toastServiceMock },
            ],
        });
        fixture = TestBed.createComponent(ServicioFarmaceuticoPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });

    it('filtrar notificaciones nombre paciente', () => {
        component.notificacionesCompleta = notificacionesFarmaciaTest;
        component.filtroBusqueda = filtroBusquedaNombre;
        component.filtrarNotificaciones();

        fixture.detectChanges();
        expect(component.dataSource.data.length).toEqual(1);
    });

    it('filtrar notificaciones cedula paciente', () => {
        component.notificacionesCompleta = notificacionesFarmaciaTest;
        component.filtroBusqueda = filtroBusquedaCedula;
        component.filtrarNotificaciones();

        fixture.detectChanges();
        expect(component.dataSource.data.length).toEqual(1);
    });

    it('filtrar notificaciones id remision', () => {
        component.notificacionesCompleta = notificacionesFarmaciaTest;
        component.filtroBusqueda = filtroBusquedaRemision;
        component.filtrarNotificaciones();

        fixture.detectChanges();
        expect(component.dataSource.data.length).toEqual(1);
    });

    it('filtrar notificaciones sin resultados', () => {
        component.notificacionesCompleta = notificacionesFarmaciaTest;
        component.filtroBusqueda = "cc55cc48d8";
        component.filtrarNotificaciones();

        fixture.detectChanges();
        expect(component.dataSource.data.length).toEqual(0);
    });
    it('filtrar notificaciones lista vacia', () => {
        component.filtrarNotificaciones();
        expect(component).toBeTruthy();
    })
    it("recuperar variables del filtro", () => {

        component.formfiltro.controls['fecha'].setValue(fecha);
        component.formfiltro.controls['idHorario'].setValue(idHorario);
        component.formfiltro.controls['idRegional'].setValue(idRegional);

        fixture.detectChanges();
        expect(component.fecha).toEqual(fecha);
        expect(component.idHorario).toEqual(idHorario);
        expect(component.idRegional).toEqual(idRegional);
    })

    it("seleccionar todas las filas", () => {
        component.ngOnInit();
        component.dataSource.data = notificacionesFarmaciaTest;

        component.seleccionarTodoFilas();
        fixture.detectChanges();
        expect(component.selection.selected.length).toEqual(2);
    })
    it("consulta avanzada", () => {
        component.ngOnInit();
        component.dataSource.data = notificacionesFarmaciaTest;
        component.formfiltro.controls['fecha'].setValue(fecha);
        component.formfiltro.controls['idHorario'].setValue(idHorario);
        component.formfiltro.controls['idRegional'].setValue(idRegional);
        component.consultaAvanzada()
        fixture.detectChanges();
        expect(component).toBeTruthy();
    })

    it("desactivar filtro", () => {

        component.filtroAvanzadoActivado = "activate";
        component.activarFiltro();
        fixture.detectChanges();
        expect(component.filtroAvanzadoActivado).toEqual("");
    })
    it("activar filtro", () => {

        component.activarFiltro();
        fixture.detectChanges();
        expect(component.filtroAvanzadoActivado).toEqual("activate");
    })
    it("notificar seleccion", () => {
        component.ngOnInit();
        component.dataSource.data = notificacionesFarmaciaTest;

        component.seleccionarTodoFilas();
        component.notificarSeleccion();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    })

    it("on check notificado", () => {
        component.ngOnInit();
        component.dataSource.data = notificacionesFarmaciaTest;
        const checkNotificado = document.getElementById("check-notificado");
        checkNotificado?.setAttribute("checked", "true")
        fixture.detectChanges();
        expect(document.getElementById("check-notificado")?.getAttribute("checked")).toBeTruthy();

        const event = { target: { checked: true } };
        spyOn(component, 'deshabilitarCheckbox');
        component.onCheckboxChangeNotificado(event);
        expect(component.checkedNotificado).toBe(true);
        expect(component.checkedSinNotificado).toBe(false);
        expect(component.notificacionesSeleccionadas).toEqual([]);

    })
    it("on check sin notificar", () => {
        component.ngOnInit();
        component.dataSource.data = notificacionesFarmaciaTest;
        const checkSinNotificado = document.getElementById("check-sin-notificar");
        checkSinNotificado?.setAttribute("checked", "true")
        fixture.detectChanges();
        expect(document.getElementById("check-sin-notificar")?.getAttribute("checked")).toBeTruthy();
        const event = { target: { checked: true } };
        spyOn(component, 'deshabilitarCheckbox');
        component.onCheckboxChangeSinNotificado(event);
        expect(component.checkedSinNotificado).toBe(true);
        expect(component.checkedNotificado).toBe(false);
        expect(component.notificacionesSeleccionadas).toEqual([]);
    })

    it("deshabilitar  checkbox", () => {

        component.ngOnInit();
        component.dataSource.data = notificacionesFarmaciaTest;
        component.notificacionesCompleta = notificacionesFarmaciaTest;
        component.deshabilitarCheckbox("check-notificado");
        fixture.detectChanges();
        expect(component).toBeTruthy();
    })
});