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
import { ObtenerSiglasIdentificacionPipe } from 'src/app/pipes/conversiones/obtener-siglas-identificacion.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';

describe('ServicioFarmaceuticoPageComponent', () => {
    let component: ServicioFarmaceuticoPageComponent;
    let fixture: ComponentFixture<ServicioFarmaceuticoPageComponent>;

    const filtroBusquedaNombre = "Carla Ca";
    const filtroBusquedaCedula = "9898";
    const filtroBusquedaRemision = "4ps585";

    const adminFarmaciaServiceMock = {
        getNotificacionesFarmacia: () => of({ result: [] })
    }
    const maestrosServiceMock = {
        getTiposIdentificacion: jasmine.createSpy('getTiposIdentificacion').and
            .returnValue([]),

        getRegionales: jasmine.createSpy('getRegionales').and
            .returnValue([]),

        getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
            .returnValue([])
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
                { provide: ToastService, useValue: {} },
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
});