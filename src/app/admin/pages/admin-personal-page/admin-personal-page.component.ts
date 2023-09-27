import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-personal-page',
  templateUrl: './admin-personal-page.component.html',
  styleUrls: ['./admin-personal-page.component.css']
})
export class AdminPersonalPageComponent {

  estadoMenu: string = "activate";
  ocultarVerticalNavbar() {
    const button = document.getElementById("vertical-nav-bar");
    const spans = document.getElementsByClassName('titulo-menu');
    let displaySpan = 'true';
    if (button?.getAttribute('close') == "true") {
      this.estadoMenu = "activate";
      button?.setAttribute("close", 'false')
      displaySpan = 'false';
    } else {
      this.estadoMenu = "";
      button?.setAttribute("close", 'true');
      displaySpan = 'true';
    }
    for (let i = 0; i < spans.length; i++) {
      const element = spans[i];
      element.setAttribute("show", displaySpan);
    }
  }
}
