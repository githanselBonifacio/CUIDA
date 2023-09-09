import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarConfig } from '@angular/material/snack-bar';

export enum ToastType {
  Success = 'success',
  Info = 'info',
  Error = 'error'
}
export enum TitleToast {
  Success = 'Operación exitosa',
  Info = 'Info',
  Error = 'Error'
}
export function crearConfig(tipo: ToastType, titulo: TitleToast, mensaje: string, duracion: number) {

  const config: MatSnackBarConfig = {
    data: {
      type: tipo,
      title: titulo,
      message: mensaje
    },
    duration: duracion * 1000,
    panelClass: ['custom-snackbar'],
    horizontalPosition: 'right',
    politeness: 'polite'
  };
  return config
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }


}
