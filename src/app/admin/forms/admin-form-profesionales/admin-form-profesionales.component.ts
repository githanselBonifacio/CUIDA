import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Regional } from 'src/app/shared/interfaces/maestros.interfaces';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';

@Component({
  selector: 'app-admin-form-profesionales',
  templateUrl: './admin-form-profesionales.component.html',
  styleUrls: ['./admin-form-profesionales.component.css']
})
export class AdminFormProfesionalesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private maestrosService: MaestrosService) { }

  ngOnInit(): void {
    this.maestrosService.getRegionales();
  }

  get regionales(): Regional[] {
    return this.maestrosService.regionales;
  }
  formProfesional = this.formBuilder.group({
    nombres: ['', [Validators.required, Validators.maxLength(25)]],
    apellidos: ['', [Validators.required, Validators.maxLength(25)]],
    fechaNacimiento: ['', [Validators.required]],
    idRegional: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    profesion: ['', [Validators.required]],
  })

  enviarFormulario() {
    const profesional = this.formProfesional.value;
    console.log(profesional)
  }

}
