import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCitaComponent } from './listar-cita.component';

describe('ListarCitaComponent', () => {
  let component: ListarCitaComponent;
  let fixture: ComponentFixture<ListarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarCitaComponent]
    });
    fixture = TestBed.createComponent(ListarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
