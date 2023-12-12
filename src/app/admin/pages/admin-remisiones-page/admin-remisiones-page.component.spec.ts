import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemisionesPageComponent } from './admin-remisiones-page.component';
import { of } from 'rxjs';
import { AdminRemisionService } from '../../services/admin-remision.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { remisiones } from 'src/assets/files/test/remisiones';

describe('AdminRemisionesPageComponent', () => {
  let component: AdminRemisionesPageComponent;
  let fixture: ComponentFixture<AdminRemisionesPageComponent>;

  const adminRemisionServiceMock = {
    consultarRemisiones: () => of({ result: [] }),

  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRemisionesPageComponent],
      imports: [MatPaginatorModule, FormsModule, MatTableModule, BrowserAnimationsModule],
      providers: [
        { provide: AdminRemisionService, useValue: adminRemisionServiceMock },
      ]
    });
    fixture = TestBed.createComponent(AdminRemisionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('filtrar remisiones criterio de busca', () => {
    component.dataSource.data = remisiones;
    component.filtroBusqueda = "74hjg45"
    component.filtrarRemisiones();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toEqual(1)
  });

  it('filtrar remisiones sin coincidencias', () => {
    component.dataSource.data = remisiones;
    component.filtroBusqueda = "xxxxxxxxxxx"
    component.filtrarRemisiones();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toEqual(0)
  });

});
