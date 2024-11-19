import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Keunggulan {
  judul_keunggulan: string;
  deskripsi_keunggulan: string;
}

export interface Fitur {
  judul_fitur: string;
  deskripsi_fitur: string;
}

export interface DetailProduk {
  id?: string;
  judul: string;
  judul_slide: string;
  deskripsi: string;
  gambar: string;
  keunggulan: Keunggulan[]; // Array of Keunggulan
  fitur: Fitur[];
  gambar_kiri: string;
  gambar_tengah: string;
  gambar_kanan: string;
  kategori: string;
  no?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TableDetailProdukService {
  private baseUrl = 'http://localhost:3000/detail-produk';

  constructor(private http: HttpClient) {}


  getDetailProduk(): Observable<DetailProduk[]> {
    return this.http.get<DetailProduk[]>(this.baseUrl);
  }

  createDetailProduk(data: FormData): Observable<DetailProduk> {
    return this.http.post<DetailProduk>(this.baseUrl, data,);
  }

  // Memperbarui detail produk berdasarkan ID
  updateDetailProduk(id: string, data: FormData): Observable<DetailProduk> {
    return this.http.put<DetailProduk>(`${this.baseUrl}/${id}`, data);
  }

  deleteDetailProduk(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
