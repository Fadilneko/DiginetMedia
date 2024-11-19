// src/app/services/jwt.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private TOKEN_KEY = 'jwtToken';

  constructor() { }

  // Simpan token di localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Ambil token dari localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Hapus token dari localStorage
  destroyToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
