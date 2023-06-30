import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './shared/pages/citas/citas.component';
import { AgendaComponent } from './shared/pages/agenda/agenda.component';
import { MovilesComponent } from './shared/pages/moviles/moviles.component';
import { InicioComponent } from './shared/pages/inicio/inicio.component';

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
    component:MovilesComponent
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
