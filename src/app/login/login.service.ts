// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definisikan interface untuk User
export interface User {
  nama: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // URL backend
  private loggedIn: boolean = false; // Status login pengguna

  constructor(private http: HttpClient) {}

  login(credentials: { nama: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, credentials);
  }

  logout(): void {
    this.loggedIn = false; // Set status login ke false saat logout
  }

  isLoggedIn(): boolean {
    return this.loggedIn; // Kembalikan status login
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn = status; // Set status login
  }
}
