import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAdminPageComponent } from './pages/main-admin-page/main-admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ServicioFarmaceuticoPageComponent } from './pages/servicio-farmaceutico-page/servicio-farmaceutico-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRemisionesPageComponent } from './pages/admin-remisiones-page/admin-remisiones-page.component';
import { AdminHistorialRemisionPageComponent } from './pages/admin-historial-remision-page/admin-historial-remision-page.component';
import { TablaHistorialCitasComponent } from './components/tabla-historial-citas/tabla-historial-citas.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalDetalleCitasHistorialComponent } from './components/modal-detalle-citas-historial/modal-detalle-citas-historial.component';
import { TablaActualizacionDatosRemisionComponent } from './components/tabla-actualizacion-datos-remision/tabla-actualizacion-datos-remision.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AgendaModule } from '../agenda/agenda.module';
import { MatTableModule } from '@angular/material/table';
import { AdminPersonalPageComponent } from './pages/admin-personal-page/admin-personal-page.component';
import { AdminPersonalProfesionalesPageComponent } from './pages/admin-personal-profesionales-page/admin-personal-profesionales-page.component';
import { AdminPersonalConductoresPageComponent } from './pages/admin-personal-conductores-page/admin-personal-conductores-page.component';
import { AdminPersonalHorarioPageComponent } from './pages/admin-personal-horario-page/admin-personal-horario-page.component';
import { AdminFormProfesionalesComponent } from './forms/admin-form-profesionales/admin-form-profesionales.component';


@NgModule({
  declarations: [
    MainAdminPageComponent,
    ServicioFarmaceuticoPageComponent,
    AdminRemisionesPageComponent,
    AdminHistorialRemisionPageComponent,
    TablaHistorialCitasComponent,
    ModalDetalleCitasHistorialComponent,
    TablaActualizacionDatosRemisionComponent,
    AdminPersonalProfesionalesPageComponent,
    AdminPersonalPageComponent,
    AdminPersonalConductoresPageComponent,
    AdminPersonalHorarioPageComponent,
    AdminFormProfesionalesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgendaModule,
    NgxPaginationModule,
    FormsModule,
    PipesModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  exports: [
    MainAdminPageComponent,
  ]
})
export class AdminModule { }
