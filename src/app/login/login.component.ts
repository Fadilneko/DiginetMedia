// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../login/login.service'; // Mengimpor interface User

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nama: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = { nama: this.nama, password: this.password };

    console.log('Credentials yang dikirim:', credentials);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login berhasil:', response);
        
        this.authService.setLoggedIn(true); // Set status login ke true
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Error saat login:', error);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
