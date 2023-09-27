import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainAdminPageComponent } from './pages/main-admin-page/main-admin-page.component';
import { ServicioFarmaceuticoPageComponent } from './pages/servicio-farmaceutico-page/servicio-farmaceutico-page.component';
import { AdminRemisionesPageComponent } from './pages/admin-remisiones-page/admin-remisiones-page.component';
import { AdminHistorialRemisionPageComponent } from './pages/admin-historial-remision-page/admin-historial-remision-page.component';
import { AdminPersonalPageComponent } from './pages/admin-personal-page/admin-personal-page.component';
import { AdminProfesionalesPageComponent } from './pages/admin-profesionales-page/admin-profesionales-page.component';
import { AdminPersonalConductoresPageComponent } from './pages/admin-personal-conductores-page/admin-personal-conductores-page.component';
import { AdminPersonalHorarioPageComponent } from './pages/admin-personal-horario-page/admin-personal-horario-page.component';


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
        component: AdminProfesionalesPageComponent,
      },
      {
        path: "conductores",
        component: AdminPersonalConductoresPageComponent,
      },
      {
        path: "horario",
        component: AdminPersonalHorarioPageComponent,
      },
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