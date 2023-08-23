import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainAdminPageComponent } from './pages/main-admin-page/main-admin-page.component';
import { ServicioFarmaceuticoPageComponent } from './pages/servicio-farmaceutico-page/servicio-farmaceutico-page.component';
import { AdminRemisionesPageComponent } from './pages/admin-remisiones-page/admin-remisiones-page.component';
import { AdminHistorialRemisionPageComponent } from './pages/admin-historial-remision-page/admin-historial-remision-page.component';


export const routes: Routes = [
  {
      path:"",
      component:MainAdminPageComponent,
  },
  {
    path:"servicioFarmaceutico",
    component:ServicioFarmaceuticoPageComponent
  },
  {
    path:"remisiones",
    component:AdminRemisionesPageComponent
  },
  {
    path:"remisiones/:idRemision",
    component:AdminHistorialRemisionPageComponent
  },
  {
    path:'**',
    redirectTo:''
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }