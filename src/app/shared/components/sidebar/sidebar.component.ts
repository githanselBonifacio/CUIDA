import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  today = new Date();
  year = this.today.getFullYear();
  month = (this.today.getMonth() + 1).toString().padStart(2, '0');
  day = this.today.getDate().toString().padStart(2, '0');
  
  fechaHoy = `${this.year}-${this.month}-${this.day}`;
}
