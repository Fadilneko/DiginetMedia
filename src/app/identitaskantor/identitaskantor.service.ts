import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IdentitasKantor {
  id: string;
  kantor: string;
  deskripsi: string;
  alamat: string;
  logo_kantor: string;
  foto_kantor: string;
  gmaps: string;
  kategori: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdentitasKantorService {
  private baseUrl = 'http://localhost:3000/identitas-kantor';

  constructor(private http: HttpClient) {}

  getIdentitasKantor(): Observable<IdentitasKantor[]> {
    return this.http.get<IdentitasKantor[]>(this.baseUrl);
  }

  updateIdentitasKantor(id: string, data: IdentitasKantor): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteIdentitasKantor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
