// src/app/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const isAdmin = '';
    if (!isAdmin) {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}