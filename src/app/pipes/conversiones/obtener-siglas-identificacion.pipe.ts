import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerSiglasIdentificacion'
})
export class ObtenerSiglasIdentificacionPipe implements PipeTransform {

  transform(palabra: string): string {
    const palabrasIgnoradas = ["DE"];
    const palabras = palabra.split(" ");
    const siglas = palabras
      .filter((palabra) => !palabrasIgnoradas.includes(palabra.toUpperCase()))
      .map((palabra) => palabra.charAt(0).toUpperCase())
      .join("");
    return siglas;
  }

}
