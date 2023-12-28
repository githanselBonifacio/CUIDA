import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleRemisionComponent } from './modal-detalle-remision.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaService } from '../../services/agenda.service';
import { AdminRemisionService } from 'src/app/admin/services/admin-remision.service';
import { of } from 'rxjs';
import { ItemsCitaComponent } from '../items-cita/items-cita.component';
import { PlaceholderTableComponent } from 'src/app/shared/components/placeholder-table/placeholder-table.component';
import { MapPuntoUnicoComponent } from 'src/app/maps/components/map-punto-unico/map-punto-unico.component';
import { Cita } from 'src/app/shared/interfaces/agenda/remision.interface';

describe('ModalDetalleRemisionComponent', () => {
  let component: ModalDetalleRemisionComponent;
  let fixture: ComponentFixture<ModalDetalleRemisionComponent>;

  let cita: Cita = {
    idCita: "idcita",
    idRemision: "idRemision",
    duracion: 600,
    holgura: 600,
    fechaInicio: new Date(),
    fechaProgramada: new Date(),
    especialidad: "especialidad",
    latitud: 11.851,
    longitud: -7.65565,
    idRegional: "regional",
    idHorarioTurno: 1,
    idEstado: 1,
    idProfesional: "5f4d",
    idConductor: "4sd5",
    paciente: "paciente",
    tipoIdentificacionPaciente: "4545",
    numeroIdentificacionPaciente: "545",

  }
  const agendaServiceMock = {
    getTratamientoByCita: (idCita: string) => of({ result: [] }),
    getProcedimientosByCita: (idCita: string) => of({ result: [] })
  };
  const adminRemisionServiceMock = {
    getPacienteByRemision: (idRemision: string) => of({ result: [] }),
    getDatosAtencionByRemision: (idRemision: string) => of({ result: [] })
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetalleRemisionComponent, ItemsCitaComponent, PlaceholderTableComponent, MapPuntoUnicoComponent],
      providers: [
        { provide: AgendaService, useValue: agendaServiceMock },
        { provide: AdminRemisionService, useValue: adminRemisionServiceMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: cita },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalDetalleRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {

    expect(component).toBeTruthy();
  });
});
