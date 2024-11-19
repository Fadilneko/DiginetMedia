import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  subMenuOpen = {
    layanan: false,
    produk: false,
    lainLain: false,
  };

  constructor() {}

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  toggleSubMenu(menu: keyof typeof this.subMenuOpen) {
    this.subMenuOpen[menu] = !this.subMenuOpen[menu];
  }

  isSubMenuOpen(menu: keyof typeof this.subMenuOpen): boolean {
    return this.subMenuOpen[menu];
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
