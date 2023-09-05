import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActualizacionDatosRemisionComponent } from './tabla-actualizacion-datos-remision.component';

describe('TablaActualizacionDatosRemisionComponent', () => {
  let component: TablaActualizacionDatosRemisionComponent;
  let fixture: ComponentFixture<TablaActualizacionDatosRemisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaActualizacionDatosRemisionComponent]
    });
    fixture = TestBed.createComponent(TablaActualizacionDatosRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
