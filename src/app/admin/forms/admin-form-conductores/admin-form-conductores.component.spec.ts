import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormConductoresComponent } from './admin-form-conductores.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AdminPersonalService } from '../../services/admin-personal.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AccionFormulario } from '../../interfaces/enum';
import { Respuesta } from 'src/app/shared/interfaces/response.interfaces';
import { Conductor } from 'src/app/agenda/interfaces/conductores.interface';
import { SimpleChange } from '@angular/core';


describe('AdminFormConductoresComponent', () => {
    let component: AdminFormConductoresComponent;
    let fixture: ComponentFixture<AdminFormConductoresComponent>;

    const conductorData: Conductor = {
        idTipoIdentificacion: 1,
        numeroIdentificacion: "959595",
        nombres: 'Juan Andres',
        apellidos: 'Camargo Rodriguez',
        email: 'correo@sura.com.co',
        telefono: null,
        celular: "3054859741",
        direccion: 'direccion #$20++**',
        genero: 'Masculino',
        fechaNacimiento: "1996-07-07",
        idRegional: '427',
        activo: true,
    }

    const adminPersonalServiceMock = {
        getAllConductores: () => of({ result: [] }),
        crearConductor: () => of({ status: 200 }),
        actualizarConductor: () => of({ status: 200 }),

    }
    const toastServiceMock = {
        mostrarToast: () => of({ result: true }),
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AdminFormConductoresComponent],
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
                { provide: ToastService, useValue: toastServiceMock },
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AdminFormConductoresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });

    it('estado inválido cuando los campos estan vacíos', () => {
        expect(component.formConductor.valid).toBeFalsy()
    })

    it('validar campo tipo identificacion', () => {
        expect(component.campoTipoIdentificacion?.valid).toBeFalsy();

        component.formConductor.controls['IdTipoIdentificacion'].setValue(1);
        fixture.detectChanges();
        expect(component.campoTipoIdentificacion?.valid).toBeTruthy();
        expect(component.campoTipoIdentificacion?.value).toEqual(1);
    })

    it('validar campo numero identificacion', () => {
        expect(component.campoNumeroIdentificacion?.valid).toBeFalsy();

        component.formConductor.controls['numeroIdentificacion'].setValue("44s85s4");
        fixture.detectChanges();

        expect(component.campoNumeroIdentificacion?.valid).toBeFalsy();

        component.formConductor.controls['numeroIdentificacion'].setValue(959595);
        fixture.detectChanges();
        expect(component.campoNumeroIdentificacion?.valid).toBeTruthy();
        expect(component.campoNumeroIdentificacion?.value).toEqual(959595);
    })

    it('validar campo nombres', () => {
        expect(component.campoNombres?.valid).toBeFalsy();

        component.formConductor.controls['nombres'].setValue("44s85s4");
        fixture.detectChanges();

        expect(component.campoNombres?.valid).toBeFalsy();

        component.formConductor.controls['nombres'].setValue("Juan Andres");
        fixture.detectChanges();
        expect(component.campoNombres?.valid).toBeTruthy();
        expect(component.campoNombres?.value).toEqual("Juan Andres");
    })

    it('validar campo apellidos', () => {
        expect(component.campoApellidos?.valid).toBeFalsy();

        component.formConductor.controls['apellidos'].setValue("44s85s4");
        fixture.detectChanges();

        expect(component.campoApellidos?.valid).toBeFalsy();

        component.formConductor.controls['apellidos'].setValue("Camargo Rodriguez");
        fixture.detectChanges();
        expect(component.campoApellidos?.valid).toBeTruthy();
        expect(component.campoApellidos?.value).toEqual("Camargo Rodriguez");
    })

    it('validar campo email', () => {
        expect(component.campoEmail?.valid).toBeFalsy();

        component.formConductor.controls['email'].setValue("44s85s4");
        fixture.detectChanges();

        expect(component.campoEmail?.valid).toBeFalsy();

        component.formConductor.controls['email'].setValue("alggo@gmail.com");
        fixture.detectChanges();

        expect(component.campoEmail?.valid).toBeFalsy();

        component.formConductor.controls['email'].setValue("correo@sura.com.co");
        fixture.detectChanges();
        expect(component.campoEmail?.valid).toBeTruthy();
        expect(component.campoEmail?.value).toEqual("correo@sura.com.co");
    })

    it('validar campo telefono', () => {
        expect(component.campoTelefono?.valid).toBeTruthy();

        component.formConductor.controls['telefono'].setValue("44s85s4");
        fixture.detectChanges();

        expect(component.campoTelefono?.valid).toBeFalsy();

        component.formConductor.controls['telefono'].setValue(305878945);
        fixture.detectChanges();

        expect(component.campoTelefono?.valid).toBeTruthy();
        expect(component.campoTelefono?.value).toEqual(305878945);
    })

    it('validar campo celular', () => {
        expect(component.campoCelular?.valid).toBeFalsy();

        component.formConductor.controls['celular'].setValue("44s85s4");
        fixture.detectChanges();
        expect(component.campoCelular?.valid).toBeFalsy();

        component.formConductor.controls['celular'].setValue(5878);
        fixture.detectChanges();
        expect(component.campoCelular?.valid).toBeFalsy();

        component.formConductor.controls['celular'].setValue(3054859741);
        fixture.detectChanges();
        expect(component.campoCelular?.valid).toBeTruthy();
        expect(component.campoCelular?.value).toEqual(3054859741);
    })


    it('validar campo direccion', () => {
        expect(component.campoDireccion?.valid).toBeFalsy();

        component.formConductor.controls['direccion'].setValue("direccion #$20++**");
        fixture.detectChanges();
        expect(component.campoDireccion?.valid).toBeTruthy();
        expect(component.campoDireccion?.value).toEqual("direccion #$20++**");
    })
    it('validar campo idRegional', () => {
        expect(component.campoRegional?.valid).toBeFalsy();

        component.formConductor.controls['idRegional'].setValue("427");
        fixture.detectChanges();
        expect(component.campoRegional?.valid).toBeTruthy();
        expect(component.campoRegional?.value).toEqual("427");
    })

    it('validar campo genero', () => {
        expect(component.campoGenero?.valid).toBeFalsy();

        component.formConductor.controls['genero'].setValue("Masculino");
        fixture.detectChanges();
        expect(component.campoGenero?.valid).toBeTruthy();
        expect(component.campoGenero?.value).toEqual("Masculino");
    })

    it('validar campo fecha nacimiento', () => {
        expect(component.campoFechaNacimiento?.valid).toBeFalsy();

        component.formConductor.controls['fechaNacimiento'].setValue("2023-07-07");
        fixture.detectChanges();
        expect(component.campoRegional?.valid).toBeFalsy();

        component.formConductor.controls['fechaNacimiento'].setValue("1996-07-07");
        fixture.detectChanges();
        expect(component.campoFechaNacimiento?.valid).toBeTruthy();
        expect(component.campoFechaNacimiento?.value).toEqual("1996-07-07");
    })

    it('validar formulario y crear conductor', () => {
        expect(component.formConductor?.valid).toBeFalsy();

        component.formConductor.controls['IdTipoIdentificacion'].setValue(conductorData.idTipoIdentificacion);
        component.formConductor.controls['numeroIdentificacion'].setValue(conductorData.numeroIdentificacion);
        component.formConductor.controls['nombres'].setValue(conductorData.nombres);
        component.formConductor.controls['apellidos'].setValue(conductorData.apellidos);
        component.formConductor.controls['email'].setValue(conductorData.email);

        component.formConductor.controls['celular'].setValue(conductorData.celular);
        component.formConductor.controls['direccion'].setValue(conductorData.direccion);
        component.formConductor.controls['idRegional'].setValue(conductorData.idRegional);
        component.formConductor.controls['genero'].setValue(conductorData.genero);
        component.formConductor.controls['fechaNacimiento'].setValue(conductorData.fechaNacimiento);

        const conductor = component.buildConductor();
        fixture.detectChanges();

        expect(component.formConductor.valid).toBeTruthy();
        expect(conductor).toEqual(conductorData);
        component.enviarFormulario();
        fixture.detectChanges();
    })

    it('validar formulario y actualizar conductor', () => {
        expect(component.formConductor?.valid).toBeFalsy();

        component.formConductor.controls['IdTipoIdentificacion'].setValue(conductorData.idTipoIdentificacion);
        component.formConductor.controls['numeroIdentificacion'].setValue(conductorData.numeroIdentificacion);
        component.formConductor.controls['nombres'].setValue(conductorData.nombres);
        component.formConductor.controls['apellidos'].setValue(conductorData.apellidos);
        component.formConductor.controls['email'].setValue(conductorData.email);

        component.formConductor.controls['celular'].setValue(conductorData.celular);
        component.formConductor.controls['direccion'].setValue(conductorData.direccion);
        component.formConductor.controls['idRegional'].setValue(conductorData.idRegional);
        component.formConductor.controls['genero'].setValue(conductorData.genero);
        component.formConductor.controls['fechaNacimiento'].setValue(conductorData.fechaNacimiento);

        const conductor = component.buildConductor();
        fixture.detectChanges();

        expect(component.formConductor.valid).toBeTruthy();
        expect(conductor).toEqual(conductorData);
        component.accionFormulario = AccionFormulario.ACTUALIZAR;
        component.enviarFormulario();
        fixture.detectChanges();
    })

    it("cambio en acción formulario", () => {
        component.accionFormulario = AccionFormulario.ACTUALIZAR;
        component.conductor = conductorData;
        component.ngOnChanges({
            accionFormulario: new SimpleChange(null, component.accionFormulario, true),
            conductor: new SimpleChange(undefined, component.conductor, true),
        });
        fixture.detectChanges();
        expect(component.tituloFormulario).toBe('Actualizar conductor');
        expect(component.validacionDisabled).toBe(true);
        expect(component.conductor).toBe(conductorData);

    })
    it("cambio en conductor", () => {
        component.conductor = conductorData;
        fixture.detectChanges();
        component.ngOnChanges({
            conductor: new SimpleChange(undefined, component.conductor, true),
        });

        fixture.detectChanges();
        expect(component.conductor).toBe(conductorData);

    })
});