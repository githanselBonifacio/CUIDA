import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapPuntoUnicoComponent } from './map-punto-unico.component';

describe('MapPuntoUnicoComponent', () => {
  let component: MapPuntoUnicoComponent;
  let fixture: ComponentFixture<MapPuntoUnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapPuntoUnicoComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MapPuntoUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });
});
