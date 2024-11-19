import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BlogService, BlogPost } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  searchQuery: string = '';
  blogPosts: BlogPost[] = []; // Semua blog dengan kategori 'blog'
  blogpopuler: BlogPost[] = [];
  paginatedBlogPosts: BlogPost[] = []; // Blog yang ditampilkan di halaman saat ini
  pageSize = 4;
  currentPageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogPosts().subscribe((data) => {
      // Pisahkan berdasarkan kategori
      this.blogPosts = data.filter(blog => blog.kategori === 'blog');
      this.blogpopuler = data.filter(blog => blog.kategori === 'blog populer');
      
      // Update paginasi untuk blogPosts
      this.updatePaginatedBlogPosts();
    });
  }

  get filteredBlogPosts(): BlogPost[] {
    // Filter berdasarkan search query
    return this.blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  updatePaginatedBlogPosts() {
    // Set data yang akan ditampilkan di halaman berdasarkan pagination
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBlogPosts = this.filteredBlogPosts.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedBlogPosts();
  }

  onSearchChange() {
    // Reset ke halaman pertama saat melakukan pencarian
    this.currentPageIndex = 0;
    this.updatePaginatedBlogPosts();
  }
}
