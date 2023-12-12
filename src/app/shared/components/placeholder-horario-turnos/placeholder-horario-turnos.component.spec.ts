import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderHorarioTurnosComponent } from './placeholder-horario-turnos.component';

describe('PlaceholderHorarioTurnosComponent', () => {
  let component: PlaceholderHorarioTurnosComponent;
  let fixture: ComponentFixture<PlaceholderHorarioTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceholderHorarioTurnosComponent]
    });
    fixture = TestBed.createComponent(PlaceholderHorarioTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
