import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost { 
  id?: string;
  title: string;
  content: string;
  image_url?: string;
  kategori:string;
  detail_deskripsi:string;
  tanggal:Date;
  no?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blog-posts';

  constructor(private http: HttpClient) { }


  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  getBlogPost(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }


  createBlogPost(formData: FormData): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, formData);
  }


  updateBlogPost(id: string, formData: FormData): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, formData);
  }

  deleteBlogPost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
