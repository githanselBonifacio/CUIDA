import { Component, Input, OnInit } from '@angular/core';
import { HistorialRemision } from '../../../shared/interfaces/admin/historialRemison.interface';

@Component({
  selector: 'app-tabla-actualizacion-datos-remision',
  templateUrl: './tabla-actualizacion-datos-remision.component.html',
  styleUrls: ['./tabla-actualizacion-datos-remision.component.css']
})
export class TablaActualizacionDatosRemisionComponent implements OnInit {
  @Input() public registroNuevo: HistorialRemision | any;
  @Input() public registroAnterior: HistorialRemision | any;


  atributosDatosPaciente: string[] = [];
  atributosDatosAtencion: string[] = [];

  tieneCambiosDatosPaciente: boolean = false;
  tieneCambiosDatosAtencion: boolean = false;

  ngOnInit() {
    this.atributosDatosAtencion = [
      this.registroAnterior?.datosAtencion.nombreCuidador,
      this.registroAnterior?.datosAtencion.nombreResponsable,
      this.registroAnterior?.datosAtencion.telefonoPaciente,
      this.registroAnterior?.datosAtencion.celularPaciente,
      `${this.registroAnterior?.ubicacionPaciente.direccion}${this.registroAnterior?.ubicacionPaciente.municipio}${this.registroAnterior?.ubicacionPaciente.barrio}`,
    ];

    this.atributosDatosPaciente = [
      this.registroAnterior?.paciente.sexo,
      this.registroAnterior?.paciente.edad,
      this.registroAnterior?.paciente.nombreAseguradora,
      this.registroAnterior?.paciente.tipoAfiliacion,

    ]
    this.tieneCambiosDatosPaciente = this.tieneCambiosPaciente();
    this.tieneCambiosDatosAtencion = this.tieneCambiosAtencion();
  }

  existeEnDatosPaciente(valorAtributo: string) {
    return this.atributosDatosPaciente.includes(valorAtributo);
  }
  existeEnDatosAtencion(valorAtributo: string) {
    return this.atributosDatosAtencion.includes(valorAtributo);
  }

  tieneCambiosPaciente(): boolean {
    return !this.existeEnDatosPaciente(this.registroNuevo?.paciente?.sexo) ||
      !this.existeEnDatosPaciente(this.registroNuevo?.paciente?.edad) ||
      !this.existeEnDatosPaciente(this.registroNuevo?.paciente?.nombreAseguradora) ||
      !this.existeEnDatosPaciente(this.registroNuevo?.paciente?.tipoAfiliacion);
  }

  tieneCambiosAtencion(): boolean {
    return !this.existeEnDatosAtencion(this.registroNuevo?.datosAtencion?.nombreCuidador) ||
      !this.existeEnDatosAtencion(this.registroNuevo?.datosAtencion?.nombreResponsable) ||
      !this.existeEnDatosAtencion(this.registroNuevo?.datosAtencion?.telefonoPaciente) ||
      !this.existeEnDatosAtencion(this.registroNuevo?.datosAtencion?.celularPaciente) ||
      !this.existeEnDatosAtencion(`${this.registroAnterior?.ubicacionPaciente?.direccion}${this.registroAnterior?.ubicacionPaciente.municipio}${this.registroAnterior?.ubicacionPaciente.barrio}`)


  }
}
