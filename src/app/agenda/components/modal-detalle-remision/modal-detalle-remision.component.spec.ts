import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleRemisionComponent } from './modal-detalle-remision.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaService } from '../../services/agenda.service';
import { AdminRemisionService } from 'src/app/admin/services/admin-remision.service';
import { of } from 'rxjs';
import { ItemsCitaComponent } from '../items-cita/items-cita.component';
import { PlaceholderTableComponent } from 'src/app/shared/components/placeholder-table/placeholder-table.component';

describe('ModalDetalleRemisionComponent', () => {
  let component: ModalDetalleRemisionComponent;
  let fixture: ComponentFixture<ModalDetalleRemisionComponent>;

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
      declarations: [ModalDetalleRemisionComponent, ItemsCitaComponent, PlaceholderTableComponent],
      providers: [
        { provide: AgendaService, useValue: agendaServiceMock },
        { provide: AdminRemisionService, useValue: adminRemisionServiceMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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
