import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormulirPesan {
  id?: string;
  nama_lengkap: string;
  perusahaan_instansi: string;
  email: string;
  nohp_whatsapp: string;
  produk_solusi: string;
  pesan: string; // Ganti Text menjadi string
}

@Injectable({
  providedIn: 'root'
})
export class TableHubungikamiService {
  private apiUrl = 'http://localhost:3000/formulir_pesan'; // URL menuju endpoint back-end

  constructor(private http: HttpClient) {}

  kirimPesan(formulirPesan: FormulirPesan): Observable<FormulirPesan> {
    return this.http.post<FormulirPesan>(this.apiUrl, formulirPesan);
  }

  getPesan(): Observable<FormulirPesan[]> {
    return this.http.get<FormulirPesan[]>(this.apiUrl);
  }
  deletePesan(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
