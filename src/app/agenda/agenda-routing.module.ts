import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponentAgendaComponent } from './pages/main-agenda-page/main-agenda.page';


export const routes: Routes = [
  {
    path:'',
    component:MainComponentAgendaComponent,
  },
  {
      path:":id_turno/:id_regional/:id_horario_turno",
      component:MainComponentAgendaComponent,
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
export class AgendaRoutingModule { }
