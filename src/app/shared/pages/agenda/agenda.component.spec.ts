import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaComponent } from './agenda.component';
import { MainComponentAgendaComponent } from 'src/app/agenda/pages/main-agenda-page/main-agenda.page';
import { AgendaService } from 'src/app/agenda/services/agenda.service';
import { MaestrosService } from '../../services/maestros/maestros.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastService } from '../../services/toast/toast.service';
import { GanttComponent } from 'src/app/diagramas/components/gantt/gantt.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;

  const maestrosServiceMock = {
    getRegionalesObservable: () => of({ result: [] }),
    getHorarioTurnoObservable: () => of({ result: [] }),
    getEstadosCita: () => of({ result: [] })
  }
  const activateRouteSpy = {
    params: of({ idRemision: 'yourMockIdRemision' })
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AgendaComponent,
        MainComponentAgendaComponent,
        GanttComponent]
      ,
      imports: [
        MatDialogModule,
        FormsModule
      ],
      providers: [
        { provide: AgendaService, useValue: {} },
        { provide: MaestrosService, useValue: maestrosServiceMock },
        { provide: ActivatedRoute, useValue: activateRouteSpy },
        { provide: ToastService, useValue: {} },

      ]
    });
    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
