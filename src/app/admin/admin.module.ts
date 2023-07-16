import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAdminPageComponent } from './pages/main-admin-page/main-admin-page.component';



@NgModule({
  declarations: [
    MainAdminPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MainAdminPageComponent,
  ]
})
export class AdminModule { }
