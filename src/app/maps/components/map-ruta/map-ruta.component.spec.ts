import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRutaComponent } from './map-ruta.component';

describe('MapRutaComponent', () => {
  let component: MapRutaComponent;
  let fixture: ComponentFixture<MapRutaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapRutaComponent]
    });
    fixture = TestBed.createComponent(MapRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
