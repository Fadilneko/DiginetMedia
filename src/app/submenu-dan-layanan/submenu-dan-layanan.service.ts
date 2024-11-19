import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SubmenuDanLayanan { 
  id?: string;
  judul: string;
  deskripsi: string;
  gambar: string;
  kategori:string;
  no?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubmenuDanLayananService {
  private apiUrl = 'http://localhost:3000/submenu-dan-layanan';

  constructor(private http: HttpClient) { }

  // Mendapatkan semua blog posts
  getsSubmenuDanLayanan(): Observable<SubmenuDanLayanan[]> {
    return this.http.get<SubmenuDanLayanan[]>(this.apiUrl);
  }

  // Mendapatkan satu blog post berdasarkan ID
  getSubmenuDanLayanan(id: string): Observable<SubmenuDanLayanan> {
    return this.http.get<SubmenuDanLayanan>(`${this.apiUrl}/${id}`);
  }

  // Menambahkan blog post baru dengan gambar (menggunakan FormData)
  createSubmenuDanLayanan(formData: FormData): Observable<SubmenuDanLayanan> {
    return this.http.post<SubmenuDanLayanan>(this.apiUrl, formData);
  }

  // Mengupdate blog post yang ada dengan gambar (menggunakan FormData)
  updateSubmenuDanLayanan(id: string, formData: FormData): Observable<SubmenuDanLayanan> {
    return this.http.put<SubmenuDanLayanan>(`${this.apiUrl}/${id}`, formData);
  }

  // Menghapus blog post
  deleteSubmenuDanLayanan(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
