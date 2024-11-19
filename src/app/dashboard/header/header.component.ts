import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (){
    
  }

 


  activeMenu: string = '';

  toggleSubmenu(event: Event, menu: string) {
    event.stopPropagation(); // Hentikan event agar tidak mempengaruhi elemen lain

    if (this.activeMenu === menu) {
      this.activeMenu = ''; // Tutup submenu jika sudah aktif
    } else {
      this.activeMenu = menu; // Buka submenu
    }
  }

  closeSubmenu() {
    this.activeMenu = ''; // Tutup submenu ketika item dipilih
  }

  disableMainMenuClick(event: Event) {
    event.preventDefault(); // Mencegah default behavior dari klik pada main menu
  }
  }
  

