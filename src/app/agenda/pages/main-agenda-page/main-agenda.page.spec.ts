import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponentAgendaComponent } from './main-agenda.page';
import { AgendaService } from '../../services/agenda.service';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MaestrosService } from 'src/app/shared/services/maestros/maestros.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { GanttComponent } from 'src/app/diagramas/components/gantt/gantt.component';
import { FormsModule } from '@angular/forms';

describe('MainComponentAgendaComponent', () => {
  let component: MainComponentAgendaComponent;
  let fixture: ComponentFixture<MainComponentAgendaComponent>;

  const agendaServiceMock = {

  };
  const maestrosServiceMock = {
    getRegionalesObservable: () => of({ result: [] }),
    getHorarioTurnoObservable: () => of({ result: [] }),
    getEstadosCita: () => of({ result: [] })
  };

  const activateRouteSpy = {
    params: of({ idRemision: 'yourMockIdRemision' })
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponentAgendaComponent, GanttComponent],
      imports: [
        FormsModule,
        RouterModule,
        MatDialogModule
      ],
      providers: [
        { provide: AgendaService, useValue: agendaServiceMock },
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: ActivatedRoute, useValue: activateRouteSpy },
        { provide: ToastService, useValue: {} },
        DatePipe
      ]
    });
    fixture = TestBed.createComponent(MainComponentAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
