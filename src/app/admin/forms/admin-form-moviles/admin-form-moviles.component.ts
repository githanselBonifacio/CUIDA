import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movil } from 'src/app/shared/interfaces/agenda/conductores.interface';
import { mesajeExpresionRegular } from 'src/app/shared/forms/expresiones-regulares.validaciones';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AccionFormulario } from '../../../shared/interfaces/general/enum';
import { Regional } from 'src/app/shared/interfaces/maestros/maestros.interfaces';
import { ToastType } from 'src/app/shared/components/toast/toast.component';
import { AdminPersonalService } from '../../services/admin-personal.service';
import { errorCamposFormMsg } from 'src/app/shared/interfaces/general/mensajes.data';

@Component({
  selector: 'app-admin-form-moviles',
  templateUrl: './admin-form-moviles.component.html',
  styleUrls: ['./admin-form-moviles.component.css']
})
export class AdminFormMovilesComponent implements OnChanges {
  constructor(
    private formBuilder: FormBuilder,
    private toastservice: ToastService,
    private spinnerService: SpinnerService,
    private adminPersonalService: AdminPersonalService) {

    this.formMovil = this.formBuilder.group({
      matricula: [this.movil?.matricula, [Validators.required]],
      marca: [this.movil?.marca, [Validators.required]],
      modelo: [this.movil?.modelo, [Validators.required]],
      idRegional: [this.movil?.idRegional, [Validators.required]],
    })

  }


  @Output() enviado = new EventEmitter<void>();

  @Input()

  regionales: Regional[] = []
  @Input()
  accionFormulario: AccionFormulario = AccionFormulario.CREAR;

  @Input()
  movil?: Movil;

  validacionDisabled: boolean = false;
  formMovil: FormGroup;
  tituloFormulario?: string;
  mensageValidadores = mesajeExpresionRegular;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accionFormulario'] || changes['movil']) {
      this.tituloFormulario = (this.accionFormulario === AccionFormulario.CREAR) ? "Crear vehículo" : "Actualizar vehículo";
      this.validacionDisabled = this.accionFormulario === AccionFormulario.ACTUALIZAR;

      this.formMovil.patchValue({
        matricula: this.movil?.matricula,
        marca: this.movil?.marca,
        modelo: this.movil?.modelo,
        idRegional: this.movil?.idRegional,

      })
    }
  }
  get campoMatricula() {
    return this.formMovil.get("matricula")
  }

  get campoMarca() {
    return this.formMovil.get("marca")
  }

  get campoModelo() {
    return this.formMovil.get("modelo")
  }

  get campoIdRegional() {
    return this.formMovil.get("idRegional")
  }

  buildMovil() {
    return {
      matricula: this.campoMatricula?.value,
      marca: this.campoMarca?.value,
      modelo: this.campoModelo?.value,
      idRegional: this.campoIdRegional?.value,
      activo: true

    };
  }

  enviarFormulario() {
    this.formMovil.markAllAsTouched();
    this.spinnerService.show()
    if (this.formMovil.valid) {
      this.movil = this.buildMovil();
      if (this.accionFormulario == AccionFormulario.CREAR) {
        this.adminPersonalService.crearMovil(this.movil)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.enviado.emit();
            }
            this.toastservice.mostrarToast({ status: resp.status, menssage: resp.message });
          })
      } else if (this.accionFormulario == AccionFormulario.ACTUALIZAR) {
        console.log("Entro a actualizar")
        this.adminPersonalService.actualizarMovil(this.movil).subscribe(resp => {
          if (resp.status == 200) {
            this.enviado.emit();
          }
          this.toastservice.mostrarToast({ status: resp.status, menssage: resp.message });
        })

      }
      this.formMovil.reset();
    } else {
      this.toastservice.mostrarToast({ status: null, menssage: errorCamposFormMsg }, 5, ToastType.Error);
    }

    this.spinnerService.hide()
  }

}
