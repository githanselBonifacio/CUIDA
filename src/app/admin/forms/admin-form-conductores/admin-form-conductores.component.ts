import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoIdentificacion, Regional } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AccionFormulario } from '../../../shared/interfaces/general/enum';
import { expresionesRegulares, mesajeExpresionRegular } from '../../../shared/forms/expresiones-regulares.validaciones';
import { Conductor } from 'src/app/shared/interfaces/agenda/conductores.interface';
import { ToastType } from 'src/app/shared/components/toast/toast.component';
import { validatorMayorEdad } from 'src/app/shared/forms/validadors.validaciones';
import { AdminPersonalService } from '../../services/admin-personal.service';
import { errorCamposFormMsg } from 'src/app/shared/interfaces/general/mensajes.data';

@Component({
  selector: 'app-admin-from-conductores',
  templateUrl: './admin-form-conductores.component.html',
  styleUrls: ['./admin-form-conductores.component.css'],
})
export class AdminFormConductoresComponent implements OnChanges {
  constructor(
    private formBuilder: FormBuilder,
    private toastservice: ToastService,
    private spinnerService: SpinnerService,
    private adminPersonalService: AdminPersonalService) {

    this.formConductor = this.formBuilder.group({
      IdTipoIdentificacion: [this.conductor?.idTipoIdentificacion, [Validators.required]],
      numeroIdentificacion: [this.conductor?.numeroIdentificacion, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_SOLO_NUMEROS)]],
      nombres: [this.conductor?.nombres, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_TEXT), Validators.maxLength(35)]],
      apellidos: [this.conductor?.apellidos, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_TEXT), Validators.maxLength(35)]],
      email: [this.conductor?.email, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_EMAIL_SURA), Validators.email]],
      telefono: [this.conductor?.telefono, [Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_SOLO_NUMEROS)]],
      celular: [this.conductor?.celular, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_CELULAR)]],
      direccion: [this.conductor?.direccion, [Validators.required]],
      fechaNacimiento: [this.conductor?.fechaNacimiento, [Validators.required, validatorMayorEdad]],
      idRegional: [this.conductor?.idRegional, [Validators.required]],
      genero: [this.conductor?.genero, [Validators.required]],
    })

  }
  @Output() enviado = new EventEmitter<void>();

  @Input()
  tiposIdentificacion: TipoIdentificacion[] = []

  @Input()
  regionales: Regional[] = []

  @Input()
  accionFormulario: AccionFormulario = AccionFormulario.CREAR;

  @Input()
  conductor?: Conductor;

  validacionDisabled: boolean = false;
  formConductor: FormGroup;
  tituloFormulario?: string;
  mensageValidadores = mesajeExpresionRegular;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accionFormulario'] || changes['conductor']) {
      this.tituloFormulario = (this.accionFormulario === AccionFormulario.CREAR) ? "Crear conductor" : "Actualizar conductor";

      this.validacionDisabled = this.accionFormulario === AccionFormulario.ACTUALIZAR;

      this.formConductor.patchValue({
        IdTipoIdentificacion: this.conductor?.idTipoIdentificacion,
        numeroIdentificacion: this.conductor?.numeroIdentificacion,
        nombres: this.conductor?.nombres,
        apellidos: this.conductor?.apellidos,
        email: this.conductor?.email,
        telefono: this.conductor?.telefono,
        celular: this.conductor?.celular,
        direccion: this.conductor?.direccion,
        fechaNacimiento: this.conductor?.fechaNacimiento,
        idRegional: this.conductor?.idRegional,
        genero: this.conductor?.genero,
      })
    }
  }


  get campoTipoIdentificacion() {
    return this.formConductor.get("IdTipoIdentificacion")
  }

  get campoNumeroIdentificacion() {
    return this.formConductor.get("numeroIdentificacion")
  }
  get campoNombres() {
    return this.formConductor.get("nombres")
  }

  get campoApellidos() {
    return this.formConductor.get("apellidos")
  }

  get campoEmail() {
    return this.formConductor.get("email")
  }

  get campoTelefono() {
    return this.formConductor.get("telefono")
  }

  get campoCelular() {
    return this.formConductor.get("celular")
  }
  get campoDireccion() {
    return this.formConductor.get("direccion")
  }
  get campoFechaNacimiento() {
    return this.formConductor.get("fechaNacimiento")
  }
  get campoRegional() {
    return this.formConductor.get("idRegional")
  }
  get campoGenero() {
    return this.formConductor.get("genero")
  }

  buildConductor() {
    return {
      idTipoIdentificacion: this.campoTipoIdentificacion?.value,
      numeroIdentificacion: this.campoNumeroIdentificacion?.value,
      nombres: this.campoNombres?.value,
      apellidos: this.campoApellidos?.value,
      email: this.campoEmail?.value,
      telefono: this.campoTelefono?.value,
      celular: this.campoCelular?.value,
      direccion: this.campoDireccion?.value,
      genero: this.campoGenero?.value,
      fechaNacimiento: this.campoFechaNacimiento?.value,
      idRegional: this.campoRegional?.value,
      activo: true,
    }
  }

  enviarFormulario() {
    this.formConductor.markAllAsTouched();
    this.spinnerService.show()
    if (this.formConductor.valid) {
      this.conductor = this.buildConductor();
      if (this.accionFormulario == AccionFormulario.CREAR) {
        this.adminPersonalService.crearConductor(this.conductor)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.enviado.emit();
              this.formConductor.reset();
            }
            this.toastservice.mostrarToast({ status: resp.status, menssage: resp.message });
          })
      } else if (this.accionFormulario == AccionFormulario.ACTUALIZAR) {

        this.adminPersonalService.actualizarConductor(this.conductor).subscribe(resp => {
          if (resp.status == 200) {
            this.enviado.emit();
            this.formConductor.reset();
          }
          this.toastservice.mostrarToast({ status: resp.status, menssage: resp.message });
        })

      }

    } else {

      this.toastservice.mostrarToast({ status: null, menssage: errorCamposFormMsg }, 5, ToastType.Error);
    }

    this.spinnerService.hide()
  }

}
