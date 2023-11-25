import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { MainAdminPageComponent } from './pages/main-admin-page/main-admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ServicioFarmaceuticoPageComponent } from './pages/servicio-farmaceutico-page/servicio-farmaceutico-page.component';
import { AdminRemisionesPageComponent } from './pages/admin-remisiones-page/admin-remisiones-page.component';
import { AdminHistorialRemisionPageComponent } from './pages/admin-historial-remision-page/admin-historial-remision-page.component';
import { TablaHistorialCitasComponent } from './components/tabla-historial-citas/tabla-historial-citas.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalDetalleCitasHistorialComponent } from './components/modal-detalle-citas-historial/modal-detalle-citas-historial.component';
import { TablaActualizacionDatosRemisionComponent } from './components/tabla-actualizacion-datos-remision/tabla-actualizacion-datos-remision.component';

import { AgendaModule } from '../agenda/agenda.module';
import { AdminPersonalPageComponent } from './pages/personal/admin-personal-page/admin-personal-page.component';
import { AdminPersonalProfesionalesPageComponent } from './pages/personal/admin-personal-profesionales-page/admin-personal-profesionales-page.component';
import { AdminPersonalConductoresPageComponent } from './pages/personal/admin-personal-conductores-page/admin-personal-conductores-page.component';
import { AdminPersonalHorarioPageComponent } from './pages/personal/admin-personal-horario-page/admin-personal-horario-page.component';
import { AdminFormProfesionalesComponent } from './forms/admin-form-profesionales/admin-form-profesionales.component';

import { NgxPaginationModule } from 'ngx-pagination';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminFormConductoresComponent } from './forms/admin-form-conductores/admin-form-conductores.component';
import { AdminPersonalVehiculosPageComponent } from './pages/personal/admin-personal-vehiculos-page/admin-personal-vehiculos-page.component';
import { AdminFromMovilesComponent } from './forms/admin-from-moviles/admin-from-moviles.component';
import { AdminPersonalHorarioConsolidadoPageComponent } from './pages/personal/admin-personal-horario-consolidado-page/admin-personal-horario-consolidado-page.component';
import { ModalAsignarTurnoIndividualComponent } from './components/modal-asignar-turno-individual/modal-asignar-turno-individual.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlaceholderHorarioTurnosComponent } from '../shared/components/placeholder-horario-turnos/placeholder-horario-turnos.component';
import { AdminPersonalHorarioSecuenciasPageComponent } from './pages/personal/admin-personal-horario-secuencias-page/admin-personal-horario-secuencias-page.component';
import { ModalConfiguracionSecuenciaComponent } from './components/modal-configuracion-secuencia/modal-configuracion-secuencia.component';
import { ModalAccionLimpiarHorarioComponent } from './components/modal-accion-limpiar-horario/modal-accion-limpiar-horario.component';
import { ModalAccionAgregarSecuenciaComponent } from './components/modal-accion-agregar-secuencia/modal-accion-agregar-secuencia.component';
import { ModalInfoResultadosAccionMasivaHorarioComponent } from './components/modal-info-resultados-accion-masiva-horario/modal-info-resultados-accion-masiva-horario.component';
import { AdminReportesPageComponent } from './pages/admin-reportes-page/admin-reportes-page.component';
import { DiagramasModule } from '../diagramas/diagramas.module';


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
    AdminFormProfesionalesComponent,
    AdminFormConductoresComponent,
    AdminPersonalVehiculosPageComponent,
    AdminFromMovilesComponent,
    AdminPersonalHorarioConsolidadoPageComponent,
    AdminPersonalHorarioSecuenciasPageComponent,
    ModalAsignarTurnoIndividualComponent,
    PlaceholderHorarioTurnosComponent,
    ModalConfiguracionSecuenciaComponent,
    ModalAccionLimpiarHorarioComponent,
    ModalAccionAgregarSecuenciaComponent,
    ModalInfoResultadosAccionMasivaHorarioComponent,
    AdminReportesPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgendaModule,
    PipesModule,
    NgxPaginationModule,
    FormsModule,
    DiagramasModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  providers: [DecimalPipe],
  exports: [
    MainAdminPageComponent,
  ],

})
export class AdminModule { }
