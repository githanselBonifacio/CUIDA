import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleToast, ToastType } from '../../components/toast/toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        MatSnackBar
      ]
    });
    service = TestBed.inject(ToastService);
  });

  it('crear servicio', () => {
    expect(service).toBeTruthy();
  });

  it('mostrar toast info', () => {
    service.mostrarToast({ status: null, menssage: "menssage" }, 5, ToastType.Info);
    expect(service).toBeTruthy();
  })
  it('mostrar toast error', () => {
    service.mostrarToast({ status: 500, menssage: "menssage" }, 5);
    expect(service).toBeTruthy();
  })
  it('mostrar toast success', () => {
    service.mostrarToast({ status: 200, menssage: "menssage" });
    expect(service).toBeTruthy();
  })
});
