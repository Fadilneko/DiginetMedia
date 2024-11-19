import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/login.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // Set status login ke false
    this.router.navigate(['/login']); // Arahkan ke halaman login
  }

  activeMenu: string = '';

  toggleSubmenu(event: Event, menu: string) {
    event.stopPropagation(); 

    if (this.activeMenu === menu) {
      this.activeMenu = ''; 
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


