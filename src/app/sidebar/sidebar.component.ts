import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  darkMode: boolean = true;

  toggleMode() {
    this.darkMode = !this.darkMode;
  }
}
