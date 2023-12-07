import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormMovilesComponent } from './admin-form-moviles.component';
import { of } from 'rxjs';
import { AdminPersonalService } from '../../services/admin-personal.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AdminFormMovilesComponent', () => {
    let component: AdminFormMovilesComponent;
    let fixture: ComponentFixture<AdminFormMovilesComponent>;

    const movilData = {
        matricula: 'SDF-845',
        marca: 'Mazda',
        modelo: '2023-12-01',
        idRegional: '427',
        activo: true

    };

    const adminPersonalServiceMock = {
        getAllMoviles: () => of({ result: [] })
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AdminFormMovilesComponent],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
                { provide: ToastService, useValue: {} },
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

        component.formMovil.controls['matricula'].setValue(movilData.matricula);
        component.formMovil.controls['marca'].setValue(movilData.marca);
        component.formMovil.controls['modelo'].setValue(movilData.modelo);
        component.formMovil.controls['idRegional'].setValue(movilData.idRegional);

        const movil = component.buildMovil();
        fixture.detectChanges()
        expect(component.formMovil.valid).toBeTruthy();
        expect(movil).toEqual(movilData);
    })
});
