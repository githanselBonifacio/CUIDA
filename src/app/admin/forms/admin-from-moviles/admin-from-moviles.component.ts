import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movil } from 'src/app/agenda/interfaces/conductores.interface';
import { mesajeExpresionRegular } from 'src/app/shared/forms/expresiones-regulares.validaciones';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { AccionFormulario } from '../../interfaces/enum';
import { Regional } from 'src/app/shared/interfaces/maestros.interfaces';
import { ToastType, TitleToast } from 'src/app/shared/components/toast/toast.component';
import { AdminPersonalService } from '../../services/admin-personal.service';

@Component({
  selector: 'app-admin-from-moviles',
  templateUrl: './admin-from-moviles.component.html',
  styleUrls: ['./admin-from-moviles.component.css']
})
export class AdminFromMovilesComponent implements OnChanges {
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
  enviarFormulario() {
    this.formMovil.markAllAsTouched();
    console.log(this.accionFormulario)
    this.spinnerService.show()
    if (this.formMovil.valid) {
      this.movil = {
        matricula: this.campoMatricula?.value ?? '',
        marca: this.campoMarca?.value ?? '',
        modelo: this.campoModelo?.value ?? '',
        idRegional: this.campoIdRegional?.value ?? '',
        activo: true

      };
      if (this.accionFormulario == AccionFormulario.CREAR) {
        this.adminPersonalService.crearMovil(this.movil)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.enviado.emit();
              this.toastservice.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
            } else {
              this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
            }

          })
      } else if (this.accionFormulario == AccionFormulario.ACTUALIZAR) {
        console.log("Entro a actualizar")
        this.adminPersonalService.actualizarMovil(this.movil).subscribe(resp => {
          if (resp.status == 200) {
            this.enviado.emit();
            this.toastservice.mostrarToast(ToastType.Success, TitleToast.Success, resp.message, 5);
          } else {
            this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, resp.message, 5);
          }
        })

      }
      this.formMovil.reset();
    } else {

      this.toastservice.mostrarToast(ToastType.Error, TitleToast.Error, "Error en campos del formulario", 5);
    }

    this.spinnerService.hide()
  }

}
