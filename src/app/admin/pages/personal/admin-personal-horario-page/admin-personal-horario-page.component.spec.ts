import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalHorarioPageComponent } from './admin-personal-horario-page.component';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

describe('AdminPersonalHorarioPageComponent', () => {
  let component: AdminPersonalHorarioPageComponent;
  let fixture: ComponentFixture<AdminPersonalHorarioPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPersonalHorarioPageComponent],
      imports: [
        RouterModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} },

      ]
    });
    fixture = TestBed.createComponent(AdminPersonalHorarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });


});
