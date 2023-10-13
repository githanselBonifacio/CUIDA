import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarTurnoIndividualComponent } from './modal-asignar-turno-individual.component';

describe('ModalAsignarTurnoIndividualComponent', () => {
  let component: ModalAsignarTurnoIndividualComponent;
  let fixture: ComponentFixture<ModalAsignarTurnoIndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAsignarTurnoIndividualComponent]
    });
    fixture = TestBed.createComponent(ModalAsignarTurnoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
