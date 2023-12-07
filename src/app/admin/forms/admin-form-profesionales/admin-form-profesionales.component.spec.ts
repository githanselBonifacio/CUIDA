import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormProfesionalesComponent } from './admin-form-profesionales.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPersonalService } from '../../services/admin-personal.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

describe('AdminFormProfesionalesComponent', () => {
  let component: AdminFormProfesionalesComponent;
  let fixture: ComponentFixture<AdminFormProfesionalesComponent>;

  const profesionalData = {
    idTipoIdentificacion: 1,
    numeroIdentificacion: "959595",
    nombres: 'Juan Andres',
    apellidos: 'Camargo Rodriguez',
    email: 'correo@sura.com.co',
    telefono: '',
    celular: "3054859741",
    direccion: 'direccion #$20++**',
    genero: 'Masculino',
    idProfesion: 1,
    fechaNacimiento: "1996-07-07",
    idRegional: '427',
    activo: true,
  }


  const adminPersonalServiceMock = {
    getAllProfesionales: () => of({ result: [] })
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFormProfesionalesComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AdminPersonalService, useValue: adminPersonalServiceMock },
        { provide: ToastService, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminFormProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('estado inválido cuando los campos estan vacíos', () => {
    expect(component.formProfesional.valid).toBeFalsy()
  })

  it('validar campo tipo identificacion', () => {
    expect(component.campoTipoIdentificacion?.valid).toBeFalsy();

    component.formProfesional.controls['tipoIdentificacion'].setValue(1);
    fixture.detectChanges();
    expect(component.campoTipoIdentificacion?.valid).toBeTruthy();
    expect(component.campoTipoIdentificacion?.value).toEqual(1);
  })

  it('validar campo numero identificacion', () => {
    expect(component.campoNumeroIdentificacion?.valid).toBeFalsy();

    component.formProfesional.controls['numeroIdentificacion'].setValue("44s85s4");
    fixture.detectChanges();

    expect(component.campoNumeroIdentificacion?.valid).toBeFalsy();

    component.formProfesional.controls['numeroIdentificacion'].setValue("959595");
    fixture.detectChanges();
    expect(component.campoNumeroIdentificacion?.valid).toBeTruthy();
    expect(component.campoNumeroIdentificacion?.value).toEqual("959595");
  })

  it('validar campo nombres', () => {
    expect(component.campoNombres?.valid).toBeFalsy();

    component.formProfesional.controls['nombres'].setValue("44s85s4");
    fixture.detectChanges();

    expect(component.campoNombres?.valid).toBeFalsy();

    component.formProfesional.controls['nombres'].setValue("Juan Andres");
    fixture.detectChanges();
    expect(component.campoNombres?.valid).toBeTruthy();
    expect(component.campoNombres?.value).toEqual("Juan Andres");
  })

  it('validar campo apellidos', () => {
    expect(component.campoApellidos?.valid).toBeFalsy();

    component.formProfesional.controls['apellidos'].setValue("44s85s4");
    fixture.detectChanges();

    expect(component.campoApellidos?.valid).toBeFalsy();

    component.formProfesional.controls['apellidos'].setValue("Camargo Rodriguez");
    fixture.detectChanges();
    expect(component.campoApellidos?.valid).toBeTruthy();
    expect(component.campoApellidos?.value).toEqual("Camargo Rodriguez");
  })

  it('validar campo email', () => {
    expect(component.campoEmail?.valid).toBeFalsy();

    component.formProfesional.controls['email'].setValue("44s85s4");
    fixture.detectChanges();

    expect(component.campoEmail?.valid).toBeFalsy();

    component.formProfesional.controls['email'].setValue("alggo@gmail.com");
    fixture.detectChanges();

    expect(component.campoEmail?.valid).toBeFalsy();

    component.formProfesional.controls['email'].setValue("correo@sura.com.co");
    fixture.detectChanges();
    expect(component.campoEmail?.valid).toBeTruthy();
    expect(component.campoEmail?.value).toEqual("correo@sura.com.co");
  })

  it('validar campo telefono', () => {
    expect(component.campoTelefono?.valid).toBeTruthy();

    component.formProfesional.controls['telefono'].setValue("44s85s4");
    fixture.detectChanges();

    expect(component.campoTelefono?.valid).toBeFalsy();

    component.formProfesional.controls['telefono'].setValue("305878945");
    fixture.detectChanges();

    expect(component.campoTelefono?.valid).toBeTruthy();
    expect(component.campoTelefono?.value).toEqual("305878945");
  })

  it('validar campo celular', () => {
    expect(component.campoCelular?.valid).toBeFalsy();

    component.formProfesional.controls['celular'].setValue("44s85s4");
    fixture.detectChanges();
    expect(component.campoCelular?.valid).toBeFalsy();

    component.formProfesional.controls['celular'].setValue("5878");
    fixture.detectChanges();
    expect(component.campoCelular?.valid).toBeFalsy();

    /*component.formConductor.controls['celular'].setValue(300298);
    fixture.detectChanges();
    expect(component.campoCelular?.valid).toBeFalsy();

    component.formConductor.controls['celular'].setValue(306546546540298);
    fixture.detectChanges();
    expect(component.campoCelular?.valid).toBeFalsy();*/

    component.formProfesional.controls['celular'].setValue("3054859741");
    fixture.detectChanges();
    expect(component.campoCelular?.valid).toBeTruthy();
    expect(component.campoCelular?.value).toEqual("3054859741");
  })


  it('validar campo direccion', () => {
    expect(component.campoDireccion?.valid).toBeFalsy();

    component.formProfesional.controls['direccion'].setValue("direccion #$20++**");
    fixture.detectChanges();
    expect(component.campoDireccion?.valid).toBeTruthy();
    expect(component.campoDireccion?.value).toEqual("direccion #$20++**");
  })
  it('validar campo idRegional', () => {
    expect(component.campoRegional?.valid).toBeFalsy();

    component.formProfesional.controls['idRegional'].setValue("427");
    fixture.detectChanges();
    expect(component.campoRegional?.valid).toBeTruthy();
    expect(component.campoRegional?.value).toEqual("427");
  })

  it('validar campo genero', () => {
    expect(component.campoGenero?.valid).toBeFalsy();

    component.formProfesional.controls['genero'].setValue("Masculino");
    fixture.detectChanges();
    expect(component.campoGenero?.valid).toBeTruthy();
    expect(component.campoGenero?.value).toEqual("Masculino");
  })

  it('validar campo fecha nacimiento', () => {
    expect(component.campoFechaNacimiento?.valid).toBeFalsy();

    component.formProfesional.controls['fechaNacimiento'].setValue("2023-07-07");
    fixture.detectChanges();
    expect(component.campoRegional?.valid).toBeFalsy();

    component.formProfesional.controls['fechaNacimiento'].setValue("1996-07-07");
    fixture.detectChanges();
    expect(component.campoFechaNacimiento?.valid).toBeTruthy();
    expect(component.campoFechaNacimiento?.value).toEqual("1996-07-07");
  })

  it('validar campo profesion', () => {
    expect(component.campoProfesion?.valid).toBeFalsy();

    component.formProfesional.controls['profesion'].setValue(1);
    fixture.detectChanges();
    expect(component.campoProfesion?.valid).toBeTruthy();
    expect(component.campoProfesion?.value).toEqual(1);
  })

  it('validar formulario', () => {
    expect(component.formProfesional?.valid).toBeFalsy();

    component.formProfesional.controls['tipoIdentificacion'].setValue(profesionalData.idTipoIdentificacion);
    component.formProfesional.controls['numeroIdentificacion'].setValue(profesionalData.numeroIdentificacion);
    component.formProfesional.controls['nombres'].setValue(profesionalData.nombres);
    component.formProfesional.controls['apellidos'].setValue(profesionalData.apellidos);
    component.formProfesional.controls['email'].setValue(profesionalData.email);

    component.formProfesional.controls['celular'].setValue(profesionalData.celular);
    component.formProfesional.controls['direccion'].setValue(profesionalData.direccion);
    component.formProfesional.controls['idRegional'].setValue(profesionalData.idRegional);
    component.formProfesional.controls['genero'].setValue(profesionalData.genero);
    component.formProfesional.controls['profesion'].setValue(profesionalData.idProfesion);
    component.formProfesional.controls['fechaNacimiento'].setValue(profesionalData.fechaNacimiento);

    const profesional = component.buildprofesional();
    fixture.detectChanges();
    expect(component.formProfesional.valid).toBeTruthy();
    expect(profesional).toEqual(profesionalData);
  })

});
