import { Component } from '@angular/core';
import { BlogPost, BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css']
})
export class DetailBlogComponent {

  blogPost: BlogPost | undefined;
  detail: BlogPost | null = null;
  blogpopuler: BlogPost[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getBlogDetail(id);
    }
  }

  getBlogDetail(id: string): void {
    this.blogService.getBlogPosts().subscribe((data: BlogPost[]) => {
      this.detail = data.find((blog) => blog.id === id) || null;
      console.log('Detail produk:', this.detail); 

      this.blogpopuler = data.filter(blog => blog.kategori === 'blog populer');
    
      }
    )};
  }



