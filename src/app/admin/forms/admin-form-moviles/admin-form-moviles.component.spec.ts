import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormMovilesComponent } from './admin-form-moviles.component';
import { of } from 'rxjs';
import { AdminPersonalService } from '../../services/admin-personal.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';
import { AccionFormulario } from '../../../shared/interfaces/general/enum';
import { Movil } from 'src/app/shared/interfaces/agenda/conductores.interface';

describe('AdminFormMovilesComponent', () => {
    let component: AdminFormMovilesComponent;
    let fixture: ComponentFixture<AdminFormMovilesComponent>;

    const movilData: Movil = {
        matricula: 'SDF-845',
        marca: 'Mazda',
        modelo: new Date('2023-12-01'),
        idRegional: '427',
        activo: true

    };
    const movilDataVacio = {
        matricula: null,
        marca: null,
        modelo: null,
        idRegional: null,
        activo: true
    }
    const adminPersonalServiceMock = {
        getAllMoviles: () => of({ result: [] }),
        crearMovil: () => of({ status: 200 }),
        actualizarMovil: () => of({ status: 200 }),

    }
    const toastServiceMock = {
        mostrarToast: () => of({ result: true }),
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AdminFormMovilesComponent],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
                { provide: ToastService, useValue: toastServiceMock },
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AdminFormMovilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });

    it('estado inválido cuando los campos estan vacíos', () => {
        expect(component.formMovil.valid).toBeFalsy()
    })

    it('validar campo matricula', () => {
        expect(component.campoMatricula?.valid).toBeFalsy();

        component.formMovil.controls['matricula'].setValue("S88-4554");
        fixture.detectChanges();
        expect(component.campoMatricula?.valid).toBeTruthy();
        expect(component.campoMatricula?.value).toEqual("S88-4554");
    })

    it('validar campo marca', () => {
        expect(component.campoMarca?.valid).toBeFalsy();

        component.formMovil.controls['marca'].setValue("MAZDA");

        fixture.detectChanges();
        expect(component.campoMarca?.valid).toBeTruthy();
        expect(component.campoMarca?.value).toEqual("MAZDA");
    })

    it('validar campo modelo', () => {
        expect(component.campoModelo?.valid).toBeFalsy();

        component.formMovil.controls['modelo'].setValue("2013-08-12");

        fixture.detectChanges();
        expect(component.campoModelo?.valid).toBeTruthy();
        expect(component.campoModelo?.value).toEqual("2013-08-12");
    })

    it('validar campo idRegional', () => {
        expect(component.campoIdRegional?.valid).toBeFalsy();

        component.formMovil.controls['idRegional'].setValue("427");

        fixture.detectChanges();
        expect(component.campoIdRegional?.valid).toBeTruthy();
        expect(component.campoIdRegional?.value).toEqual("427");
    })

    it('validar formulario', () => {
        expect(component.formMovil?.valid).toBeFalsy();

        const profesionalVacio = component.buildMovil();
        fixture.detectChanges();
        expect(profesionalVacio).toEqual(movilDataVacio);
        expect(component.formMovil.valid).toBeFalsy();

        component.formMovil.controls['matricula'].setValue(movilData.matricula);
        component.formMovil.controls['marca'].setValue(movilData.marca);
        component.formMovil.controls['modelo'].setValue(movilData.modelo);
        component.formMovil.controls['idRegional'].setValue(movilData.idRegional);

        const movil = component.buildMovil();
        fixture.detectChanges()
        expect(component.formMovil.valid).toBeTruthy();
        expect(movil).toEqual(movilData);
    })

    it('validar formulario y crear movil', () => {
        expect(component.formMovil?.valid).toBeFalsy();

        component.formMovil.controls['matricula'].setValue(movilData.matricula);
        component.formMovil.controls['marca'].setValue(movilData.marca);
        component.formMovil.controls['modelo'].setValue(movilData.modelo);
        component.formMovil.controls['idRegional'].setValue(movilData.idRegional);

        const movil = component.buildMovil();
        fixture.detectChanges()
        expect(component.formMovil.valid).toBeTruthy();
        expect(movil).toEqual(movilData);
        component.enviarFormulario();
        fixture.detectChanges();
    })

    it('validar formulario  actualizar movil', () => {
        expect(component.formMovil?.valid).toBeFalsy();

        component.formMovil.controls['matricula'].setValue(movilData.matricula);
        component.formMovil.controls['marca'].setValue(movilData.marca);
        component.formMovil.controls['modelo'].setValue(movilData.modelo);
        component.formMovil.controls['idRegional'].setValue(movilData.idRegional);

        const movil = component.buildMovil();
        fixture.detectChanges()
        expect(component.formMovil.valid).toBeTruthy();
        expect(movil).toEqual(movilData);
        component.accionFormulario = AccionFormulario.ACTUALIZAR;
        component.enviarFormulario();
        fixture.detectChanges();
    })

    it("cambio en acción formulario", () => {
        component.accionFormulario = AccionFormulario.ACTUALIZAR;
        component.movil = movilData;
        component.ngOnChanges({
            accionFormulario: new SimpleChange(null, component.accionFormulario, true),
            conductor: new SimpleChange(undefined, component.movil, true),
        });
        fixture.detectChanges();
        expect(component.tituloFormulario).toBe('Actualizar vehículo');
        expect(component.validacionDisabled).toBe(true);
        expect(component.movil).toBe(movilData);

    })
    it("cambio en movil", () => {
        component.movil = movilData;
        fixture.detectChanges();
        component.ngOnChanges({
            conductor: new SimpleChange(undefined, component.movil, true),
        });

        fixture.detectChanges();
        expect(component.movil).toBe(movilData);

    })
});
