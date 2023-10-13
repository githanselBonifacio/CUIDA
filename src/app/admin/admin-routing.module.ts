import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainAdminPageComponent } from './pages/main-admin-page/main-admin-page.component';
import { ServicioFarmaceuticoPageComponent } from './pages/servicio-farmaceutico-page/servicio-farmaceutico-page.component';
import { AdminRemisionesPageComponent } from './pages/admin-remisiones-page/admin-remisiones-page.component';
import { AdminHistorialRemisionPageComponent } from './pages/admin-historial-remision-page/admin-historial-remision-page.component';
import { AdminPersonalPageComponent } from './pages/personal/admin-personal-page/admin-personal-page.component';
import { AdminPersonalProfesionalesPageComponent } from './pages/personal/admin-personal-profesionales-page/admin-personal-profesionales-page.component';
import { AdminPersonalConductoresPageComponent } from './pages/personal/admin-personal-conductores-page/admin-personal-conductores-page.component';
import { AdminPersonalHorarioPageComponent } from './pages/personal/admin-personal-horario-page/admin-personal-horario-page.component';
import { AdminPersonalVehiculosPageComponent } from './pages/personal/admin-personal-vehiculos-page/admin-personal-vehiculos-page.component';
import { AdminPersonalHorarioConsolidadoPageComponent } from './pages/personal/admin-personal-horario-consolidado-page/admin-personal-horario-consolidado-page.component';
import { AdminPersonalHorarioSecuenciasPageComponent } from './pages/personal/admin-personal-horario-secuencias-page/admin-personal-horario-secuencias-page.component';


export const routes: Routes = [
  {
    path: "",
    component: MainAdminPageComponent,
  },
  {
    path: "servicioFarmaceutico",
    component: ServicioFarmaceuticoPageComponent
  },
  {
    path: "remisiones",
    component: AdminRemisionesPageComponent
  },
  {
    path: "remisiones/:idRemision",
    component: AdminHistorialRemisionPageComponent
  },
  {
    path: "personal",
    component: AdminPersonalPageComponent,
    children: [
      {
        path: "profesionales",
        component: AdminPersonalProfesionalesPageComponent,
      },
      {
        path: "conductores",
        component: AdminPersonalConductoresPageComponent,
      },
      {
        path: "horario",
        component: AdminPersonalHorarioPageComponent,
        children: [
          {
            path: "consolidado",
            component: AdminPersonalHorarioConsolidadoPageComponent,
          },
          {
            path: "secuencias",
            component: AdminPersonalHorarioSecuenciasPageComponent
          }
        ]
      },
      {
        path: "vehiculos",
        component: AdminPersonalVehiculosPageComponent
      }
    ]

  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }