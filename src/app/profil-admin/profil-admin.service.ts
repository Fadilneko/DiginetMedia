import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profil {
  id?: string;
  judul: string;
  deskripsi: string;
  gambar: string;
  kategori: string;
  no?:number;
}

@Injectable({
  providedIn: 'root',
})
export class ProfilAdminService {
  private apiUrl = 'http://localhost:3000/profil';

  constructor(private http: HttpClient) {}

  // CRUD untuk Profil
  getsProfil(): Observable<Profil[]> {
    return this.http.get<Profil[]>(this.apiUrl);
  }

  getProfil(id: string): Observable<Profil> {
    return this.http.get<Profil>(`${this.apiUrl}/${id}`);
  }

  createProfil(formData: FormData): Observable<Profil> {
    return this.http.post<Profil>(this.apiUrl, formData);
  }

  updateProfil(id: string, formData: FormData): Observable<Profil> {
    return this.http.put<Profil>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProfil(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}