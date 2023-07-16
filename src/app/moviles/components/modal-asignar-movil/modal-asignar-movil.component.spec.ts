import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarMovilComponent } from './modal-asignar-movil.component';

describe('ModalAsignarMovilComponent', () => {
  let component: ModalAsignarMovilComponent;
  let fixture: ComponentFixture<ModalAsignarMovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAsignarMovilComponent]
    });
    fixture = TestBed.createComponent(ModalAsignarMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
