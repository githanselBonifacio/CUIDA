import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Profesional } from 'src/app/agenda/interfaces/profesional.interface';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { TitleToast, ToastType } from 'src/app/shared/components/toast/toast.component';
import { Profesion, Regional, tipoIdentificacion } from 'src/app/shared/interfaces/maestros.interfaces';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-admin-form-profesionales',
  templateUrl: './admin-form-profesionales.component.html',
  styleUrls: ['./admin-form-profesionales.component.css']
})
export class AdminFormProfesionalesComponent implements OnInit {

  @Output() enviado = new EventEmitter<void>();

  @Input()
  tiposIdentificacion: tipoIdentificacion[] = []

  @Input()
  regionales: Regional[] = []

  @Input()
  profesiones: Profesion[] = []

  profesional?: Profesional;

  constructor(
    private formBuilder: FormBuilder,
    private toastservice: ToastService,
    private spinnerService: SpinnerService,
    private agendaService: AgendaService) { }

  ngOnInit(): void {

  }

  expresionRegularText = "^[a-zA-Z áéíóúñ]+$";
  expresionRegularCelular = "^3.*[123456890]+$";
  expresionRegularSoloNumeros = "^[ 123456890]+$";
  expresionRegularEmail = ".*@sura\.com\.co$";


  formProfesional = this.formBuilder.group({
    tipoIdentificacion: [null, [Validators.required]],
    numeroIdentificacion: [null, [Validators.required, Validators.pattern(this.expresionRegularSoloNumeros)]],
    nombres: [null, [Validators.required, Validators.pattern(this.expresionRegularText), Validators.maxLength(35)]],
    apellidos: [null, [Validators.required, Validators.pattern(this.expresionRegularText), Validators.maxLength(35)]],
    email: [null, [Validators.required, Validators.pattern(this.expresionRegularEmail), Validators.email]],
    telefono: [null, [Validators.pattern(this.expresionRegularSoloNumeros)]],
    celular: [null, [Validators.required, Validators.pattern(this.expresionRegularCelular), Validators.maxLength(10), Validators.minLength(10)]],
    direccion: [null, [Validators.required]],
    fechaNacimiento: [null, [Validators.required]],
    idRegional: [null, [Validators.required]],
    genero: [null, [Validators.required]],
    profesion: [null, [Validators.required]],
  })


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
      const profesional: Profesional = {
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
        activo: true
      };
      this.agendaService.CrearProfesional(profesional)
        .subscribe(resp => {
          if (resp.status == 200) {
            this.toastservice.mostrarToast(ToastType.Success, TitleToast.Success, "Se guardo nuevo profesional", 5);
          } else {
            this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
          }
          this.formProfesional.reset();
          this.enviado.emit();
          this.spinnerService.hide();
        })

    } else {
      this.spinnerService.hide()
      this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, "Error en campos del formulario", 5);
    }
  }

}
