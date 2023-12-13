import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMovilesPageComponent } from './pages/main-moviles-page/main-moviles-page.component';


export const routes: Routes = [
  {
    path: '',
    component: MainMovilesPageComponent,
  },
  {
    path: ":id_turno/:id_regional/:id_horario_turno",
    component: MainMovilesPageComponent,
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MovilesRoutingModule {
}
