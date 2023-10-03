import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { TipoIdentificacion, Regional, getNombreRegionalById } from 'src/app/shared/interfaces/maestros.interfaces';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AccionFormulario } from '../../interfaces/enum';
import { expresionesRegulares, mesajeExpresionRegular } from '../../../shared/forms/expresiones-regulares.validaciones';
import { Conductor, Movil } from 'src/app/agenda/interfaces/conductores.interface';
import { ToastType, TitleToast } from 'src/app/shared/components/toast/toast.component';
import { validatorMayorEdad } from 'src/app/shared/forms/validadors.validaciones';

@Component({
  selector: 'app-admin-from-conductores',
  templateUrl: './admin-form-conductores.component.html',
  styleUrls: ['./admin-form-conductores.component.css'],
})
export class AdminFormConductoresComponent implements OnChanges, OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toastservice: ToastService,
    private spinnerService: SpinnerService,
    private agendaService: AgendaService) {

    this.formConductor = this.formBuilder.group({
      IdTipoIdentificacion: [this.conductor?.idTipoIdentificacion, [Validators.required]],
      numeroIdentificacion: [this.conductor?.numeroIdentificacion, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_SOLO_NUMEROS)]],
      nombres: [this.conductor?.nombres, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_TEXT), Validators.maxLength(35)]],
      apellidos: [this.conductor?.apellidos, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_TEXT), Validators.maxLength(35)]],
      email: [this.conductor?.email, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_EMAIL_SURA), Validators.email]],
      telefono: [this.conductor?.telefono, [Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_SOLO_NUMEROS)]],
      celular: [this.conductor?.celular, [Validators.required, Validators.pattern(expresionesRegulares.EXPRESION_REGULAR_CELULAR), Validators.maxLength(10), Validators.minLength(10)]],
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
  ngOnInit(): void {
    this.agendaService.getAllMoviles();
  }


  get moviles(): Movil[] {
    return this.agendaService.moviles;
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



  enviarFormulario() {
    this.formConductor.markAllAsTouched();
    this.spinnerService.show()
    if (this.formConductor.valid) {
      this.conductor = {
        idTipoIdentificacion: this.campoTipoIdentificacion?.value ?? 0,
        numeroIdentificacion: this.campoNumeroIdentificacion?.value ?? '',
        nombres: this.campoNombres?.value ?? '',
        apellidos: this.campoApellidos?.value ?? '',
        email: this.campoEmail?.value ?? '',
        telefono: this.campoTelefono?.value ?? '',
        celular: this.campoCelular?.value ?? '',
        direccion: this.campoDireccion?.value ?? '',
        genero: this.campoGenero?.value ?? '',
        fechaNacimiento: this.campoFechaNacimiento?.value ?? '',
        idRegional: this.campoRegional?.value ?? '',
        activo: true,
      };
      if (this.accionFormulario == AccionFormulario.CREAR) {
        this.agendaService.crearConductor(this.conductor)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.enviado.emit();
              this.toastservice.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
            } else {
              this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
            }

          })
      } else if (this.accionFormulario == AccionFormulario.ACTUALIZAR) {

        this.agendaService.actualizarConductor(this.conductor).subscribe(resp => {
          if (resp.status == 200) {
            this.enviado.emit();
            this.toastservice.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
          } else {
            this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
          }
        })

      }
      this.formConductor.reset();
    } else {

      this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, "Error en campos del formulario", 5);
    }

    this.spinnerService.hide()
  }

}