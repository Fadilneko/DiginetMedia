import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LainLain { 
  id?: string;
  judul: string;
  deskripsi: string;
  kategori:string;
  no?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TableLainLainService {
  private apiUrl = 'http://localhost:3000/lain-lain';

  constructor(private http: HttpClient) { }


  getsLainLain(): Observable<LainLain[]> {
    return this.http.get<LainLain[]>(this.apiUrl);
  }

  getLainLain(id: string): Observable<LainLain> {
    return this.http.get<LainLain>(`${this.apiUrl}/${id}`);
  }

  
  createLainLain(lainLainData: LainLain): Observable<LainLain> {
    return this.http.post<LainLain>(this.apiUrl, lainLainData);
  }
  

  updateLainLain(id: string, lainLainData: LainLain): Observable<LainLain> {
    return this.http.put<LainLain>(`${this.apiUrl}/${id}`, lainLainData);
  }
  


  deleteLainLain(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
