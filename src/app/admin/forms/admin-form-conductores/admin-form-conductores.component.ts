import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { TipoIdentificacion, Regional } from 'src/app/shared/interfaces/maestros.interfaces';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AccionFormulario } from '../../interfaces/enum';
import { ExpresionesRegulares } from '../../../shared/forms/expresiones-regulares.validaciones';
import { Conductor } from 'src/app/agenda/interfaces/conductores.interface';
@Component({
  selector: 'app-admin-from-conductores',
  templateUrl: './admin-form-conductores.component.html',
  styleUrls: ['./admin-form-conductores.component.css']
})
export class AdminFormConductoresComponent {

  @Output() enviado = new EventEmitter<void>();

  @Input()
  tiposIdentificacion: TipoIdentificacion[] = []

  @Input()
  regionales: Regional[] = []


  @Input()
  accionFormulario: AccionFormulario = AccionFormulario.CREAR;

  @Input()
  conductor?: Conductor;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accionFormulario'] || changes['profesional']) {
      this.tituloFormulario = (this.accionFormulario === AccionFormulario.CREAR) ? "Crear profesional" : "Actualizar profesional";
      this.formConductor.patchValue({
        tipoIdentificacion: this.conductor?.idTipoIdentificacion,
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
  constructor(
    private formBuilder: FormBuilder,
    private toastservice: ToastService,
    private spinnerService: SpinnerService,
    private agendaService: AgendaService) {
  }

  tituloFormulario?: string;

  formConductor = this.formBuilder.group({
    tipoIdentificacion: [this.conductor?.idTipoIdentificacion, [Validators.required]],
    numeroIdentificacion: [this.conductor?.numeroIdentificacion, [Validators.required, Validators.pattern(ExpresionesRegulares.EXPRESION_REGULAR_SOLO_NUMEROS)]],
    nombres: [this.conductor?.nombres, [Validators.required, Validators.pattern(ExpresionesRegulares.EXPRESION_REGULAR_TEXT), Validators.maxLength(35)]],
    apellidos: [this.conductor?.apellidos, [Validators.required, Validators.pattern(ExpresionesRegulares.EXPRESION_REGULAR_TEXT), Validators.maxLength(35)]],
    email: [this.conductor?.email, [Validators.required, Validators.pattern(ExpresionesRegulares.EXPRESION_REGULAR_EMAIL_SURA), Validators.email]],
    telefono: [this.conductor?.telefono, [Validators.pattern(ExpresionesRegulares.EXPRESION_REGULAR_SOLO_NUMEROS)]],
    celular: [this.conductor?.celular, [Validators.required, Validators.pattern(ExpresionesRegulares.EXPRESION_REGULAR_CELULAR), Validators.maxLength(10), Validators.minLength(10)]],
    direccion: [this.conductor?.direccion, [Validators.required]],
    fechaNacimiento: [this.conductor?.fechaNacimiento, [Validators.required]],
    idRegional: [this.conductor?.idRegional, [Validators.required]],
    genero: [this.conductor?.genero, [Validators.required]],
  })


  get campoTipoIdentificacion() {
    return this.formConductor.get("tipoIdentificacion")
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

  enviarFormulario() {
    this.formConductor.markAllAsTouched();
  }

}
