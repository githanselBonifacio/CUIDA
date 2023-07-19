import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarProfesionalComponent } from './modal-seleccion-profesional.component';

describe('ModalAsignarProfesionalComponent', () => {
  let component: ModalAsignarProfesionalComponent;
  let fixture: ComponentFixture<ModalAsignarProfesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAsignarProfesionalComponent]
    });
    fixture = TestBed.createComponent(ModalAsignarProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
