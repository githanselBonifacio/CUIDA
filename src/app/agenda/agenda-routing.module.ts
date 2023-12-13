import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponentAgendaComponent } from './pages/main-agenda-page/main-agenda.page';


export const routes: Routes = [
  {
    path: "",
    component: MainComponentAgendaComponent,
  },
  {
    path: ":fechaTurno/:idRegional/:idHorarioTurno",
    component: MainComponentAgendaComponent,
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AgendaRoutingModule { }
