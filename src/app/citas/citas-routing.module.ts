import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CrearCitaComponent } from './pages/crear-cita/crear-cita.component';
import { ListarCitaComponent } from './pages/listar-cita/listar-cita.component';


export const routes: Routes = [
    {
        path:"",
        component:ListarCitaComponent
    },
    {
        path:"crear",
        component:CrearCitaComponent

    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
    providers: [],
})
export class CitasRoutingModule { }
