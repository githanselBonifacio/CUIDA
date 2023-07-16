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
    path:"citas",
    loadChildren:() => import('./citas/citas.module').then(m =>m.CitasModule)
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
    component: AdminComponent
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
