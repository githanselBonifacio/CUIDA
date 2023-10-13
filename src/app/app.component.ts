import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'CUIDA';
  ngOnInit(): void {
    registerLocaleData("es");
  }
}