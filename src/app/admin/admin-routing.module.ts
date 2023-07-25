import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainAdminPageComponent } from './pages/main-admin-page/main-admin-page.component';
import { ServicioFarmaceuticoPageComponent } from './pages/servicio-farmaceutico-page/servicio-farmaceutico-page.component';


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