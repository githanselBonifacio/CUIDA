import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { ModalConfiguracionSecuenciaComponent } from './modal-configuracion-secuencia.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { HorarioTurno } from 'src/app/shared/interfaces/maestros.interfaces';
import { Secuencia } from 'src/app/agenda/interfaces/profesional.interface';

describe('ModalConfiguracionSecuenciaComponent', () => {
  let component: ModalConfiguracionSecuenciaComponent;
  let fixture: ComponentFixture<ModalConfiguracionSecuenciaComponent>;

  const HorariosTurno: HorarioTurno[] = [{
    "id": 1,
    "nombre": "T1",
    "horaInicio": new Date("06:00:00"),
    "horaFin": new Date("13:59:00"),
    "colorHexReferencia": "#7FD9E1",
    "esHorarioBase": true,
    "descripcion": "mañana",
    "duracionHoras": 8
  },
  {
    "id": 2,
    "nombre": "T2",
    "horaInicio": new Date("14:00:00"),
    "horaFin": new Date("21:59:00"),
    "colorHexReferencia": "#FADBA5",
    "esHorarioBase": true,
    "descripcion": "tarde",
    "duracionHoras": 8
  },]

  const secuencia: Secuencia = {
    "nombre": "S-001",
    "descripcion": "secuencia 001",
    "itemsDiaTurno": [
      {
        "numeroDia": 0,
        "nombreDia": "Domingo",
        "horariosTurno": HorariosTurno
      },
      {
        "numeroDia": 1,
        "nombreDia": "Lunes",
        "horariosTurno": HorariosTurno
      }
    ]
  }
  const sumaHoraHorariosList = 16;
  const sumaHorasTotalesSecuencia = 32;

  const maestrosServiceMock = {
    getHorarioTurno: jasmine.createSpy('getHorarioTurno').and
      .returnValue(HorariosTurno)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfiguracionSecuenciaComponent],
      imports: [FormsModule],
      providers: [
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ToastService, useValue: {} },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalConfiguracionSecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();

  });

  it('calcular duracion total', () => {
    const duracionTotal = component.calcularDuracionTotal(HorariosTurno);
    expect(duracionTotal).toEqual(sumaHoraHorariosList);
  })

  it('calcular duracion total secuencia', () => {
    component.secuenciaEditable = secuencia;
    component.calcularHorasTotales()
    fixture.detectChanges()

    expect(component.sumaTotalHoras).toEqual(sumaHorasTotalesSecuencia);
  })


});
