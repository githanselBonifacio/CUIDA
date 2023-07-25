import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './shared/pages/inicio/inicio.component';
import { AdminComponent } from './shared/pages/admin/admin.component';

const routes: Routes = [
  {
    path:'',
    component:InicioComponent
  },

  {
    path:'agenda',
    loadChildren:() => import('./agenda/agenda.module').then(m =>m.AgendaModule)
  },
  {
    path:'moviles',
    loadChildren:() => import('./moviles/moviles.module').then(m =>m.MovilesModule)
  },
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m =>m.AdminModule)
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
