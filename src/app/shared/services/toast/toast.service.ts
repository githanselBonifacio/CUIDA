import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast.component';
import { ToastType, TitleToast, crearConfig } from '../../components/toast/toast.component';

export interface ToastData {
  status: number | null;
  menssage: string;
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  mostrarToast(toastData: ToastData, duracion?: number, tipo?: ToastType) {
    let config: MatSnackBarConfig;
    const duracionToast = duracion ?? 5;
    if (tipo == ToastType.Info && toastData.status == null) {
      config = crearConfig(ToastType.Info, TitleToast.Info, toastData.menssage, duracionToast)

    } else if (toastData.status == 200) {
      config = crearConfig(ToastType.Success, TitleToast.Success, toastData.menssage, duracionToast)
    }
    else {
      config = crearConfig(ToastType.Error, TitleToast.Error, toastData.menssage, duracionToast)
    }

    this.snackBar.openFromComponent(ToastComponent, config)
  }
}
