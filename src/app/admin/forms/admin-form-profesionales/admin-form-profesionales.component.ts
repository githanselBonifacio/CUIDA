import { Component, EventEmitter, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';
import { Profesion, Regional, TipoIdentificacion } from 'src/app/shared/interfaces/maestros.interfaces';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AccionFormulario } from '../../interfaces/enum';
import { expresionesRegulares, mesajeExpresionRegular } from 'src/app/shared/forms/expresiones-regulares.validaciones';
import { validatorMayorEdad } from 'src/app/shared/forms/validadors.validaciones';
import { AdminRemisionService } from '../../services/admin-remision.service';

@Component({
  selector: 'app-admin-form-profesionales',
  templateUrl: './admin-form-profesionales.component.html',
  styleUrls: ['./admin-form-profesionales.component.css']
})

export class AdminFormProfesionalesComponent implements OnChanges {

  constructor(
    private formBuilder: FormBuilder,
    private toastservice: ToastService,
    private spinnerService: SpinnerService,
    private adminService: AdminRemisionService,) {
  }
  @Output() enviado = new EventEmitter<void>();

  @Input()
  tiposIdentificacion: TipoIdentificacion[] = []

  @Input()
  regionales: Regional[] = []

  @Input()
  profesiones: Profesion[] = []

  @Input()
  accionFormulario: AccionFormulario = AccionFormulario.CREAR;

  @Input()
  profesional?: Profesional;

  tituloFormulario?: string;

  validacionDisabled: boolean = false;

  mensageValidadores = mesajeExpresionRegular;

  formProfesional = this.formBuilder.group({
    tipoIdentificacion: [this.profesional?.idTipoIdentificacion, [Validators.required]],
    numeroIdentificacion: [this.profesional?.numeroIdentificacion, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_SOLO_NUMEROS)]],
    nombres: [this.profesional?.nombres, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_TEXT), Validators.maxLength(35)]],
    apellidos: [this.profesional?.apellidos, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_TEXT), Validators.maxLength(35)]],
    email: [this.profesional?.email, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_EMAIL_SURA), Validators.email]],
    telefono: [this.profesional?.telefono, [Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_SOLO_NUMEROS)]],
    celular: [this.profesional?.celular, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_CELULAR), Validators.maxLength(10), Validators.minLength(10)]],
    direccion: [this.profesional?.direccion, [Validators.required]],
    fechaNacimiento: [this.profesional?.fechaNacimiento, [Validators.required, validatorMayorEdad]],
    idRegional: [this.profesional?.idRegional, [Validators.required]],
    genero: [this.profesional?.genero, [Validators.required]],
    profesion: [this.profesional?.idProfesion, [Validators.required]],
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accionFormulario'] || changes['profesional']) {
      this.tituloFormulario = (this.accionFormulario === AccionFormulario.CREAR) ? "Crear profesional" : "Actualizar profesional";
      this.validacionDisabled = this.accionFormulario === AccionFormulario.ACTUALIZAR;
      this.formProfesional.patchValue({
        tipoIdentificacion: this.profesional?.idTipoIdentificacion,
        numeroIdentificacion: this.profesional?.numeroIdentificacion,
        nombres: this.profesional?.nombres,
        apellidos: this.profesional?.apellidos,
        email: this.profesional?.email,
        telefono: this.profesional?.telefono,
        celular: this.profesional?.celular,
        direccion: this.profesional?.direccion,
        fechaNacimiento: this.profesional?.fechaNacimiento,
        idRegional: this.profesional?.idRegional,
        genero: this.profesional?.genero,
        profesion: this.profesional?.idProfesion,
      })
    }
  }



  get campoTipoIdentificacion() {
    return this.formProfesional.get("tipoIdentificacion")
  }

  get campoNumeroIdentificacion() {
    return this.formProfesional.get("numeroIdentificacion")
  }
  get campoNombres() {
    return this.formProfesional.get("nombres")
  }

  get campoApellidos() {
    return this.formProfesional.get("apellidos")
  }

  get campoEmail() {
    return this.formProfesional.get("email")
  }

  get campoTelefono() {
    return this.formProfesional.get("telefono")
  }

  get campoCelular() {
    return this.formProfesional.get("celular")
  }
  get campoDireccion() {
    return this.formProfesional.get("direccion")
  }
  get campoFechaNacimiento() {
    return this.formProfesional.get("fechaNacimiento")
  }
  get campoRegional() {
    return this.formProfesional.get("idRegional")
  }
  get campoGenero() {
    return this.formProfesional.get("genero")
  }
  get campoProfesion() {
    return this.formProfesional.get("profesion")
  }



  enviarFormulario() {
    this.spinnerService.show()
    this.formProfesional.markAllAsTouched();
    if (this.formProfesional.valid) {
      this.profesional = {
        idTipoIdentificacion: this.campoTipoIdentificacion?.value ?? 0,
        numeroIdentificacion: this.campoNumeroIdentificacion?.value ?? '',
        nombres: this.campoNombres?.value ?? '',
        apellidos: this.campoApellidos?.value ?? '',
        email: this.campoEmail?.value ?? '',
        telefono: this.campoTelefono?.value ?? '',
        celular: this.campoCelular?.value ?? '',
        direccion: this.campoDireccion?.value ?? '',
        genero: this.campoGenero?.value ?? '',
        idProfesion: this.campoProfesion?.value ?? '',
        fechaNacimiento: this.campoFechaNacimiento?.value ?? '',
        idRegional: this.campoRegional?.value ?? '',
        activo: true,
      };
      if (this.accionFormulario == AccionFormulario.CREAR) {
        this.adminService.crearProfesional(this.profesional)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.enviado.emit();
              this.toastservice.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
            } else {
              this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
            }

          })
      } else if (this.accionFormulario == AccionFormulario.ACTUALIZAR) {

        this.adminService.actualizarProfesional(this.profesional).subscribe(resp => {
          if (resp.status == 200) {
            this.enviado.emit();
            this.toastservice.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
          } else {
            this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
          }
        })

      }
      this.formProfesional.reset();
    } else {

      this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, "Error en campos del formulario", 5);
    }

    this.spinnerService.hide()
  }

}
