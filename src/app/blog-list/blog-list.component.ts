import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService, BlogPost } from '../blog.service';
import { Router } from '@angular/router';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BlogFormComponent } from '../blog-form/blog-form.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  displayedColumns: string[] = ['no', 'title', 'content', 'image_url','kategori', 'detail_deskripsi', 'tanggal', 'aksi'];
  dataSource = new MatTableDataSource<BlogPost>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private blogservice: BlogService
  ) {}

  ngOnInit() {
    this.blogservice.getBlogPosts().subscribe(data => {
      this.dataSource.data = data.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(isEditMode: boolean, element?: BlogPost): void {
    const dialogRef = this.dialog.open(BlogFormComponent, {
      panelClass: 'submenupopup',
      data: { isEditMode, element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = new FormData();
        formData.append('title', result.title);
        formData.append('content', result.content);
        formData.append('kategori', result.kategori);
        formData.append('detail_deskripsi', result.detail_deskripsi);
        formData.append('tanggal', result.tanggal);
        if (result.image_url && typeof result.image_url !== 'string') {
          formData.append('image', result.image_url);
        }

        if (isEditMode) {
          this.blogservice.updateBlogPost(result.id, formData).subscribe(updatedItem => {
            const index = this.dataSource.data.findIndex(item => item.id === updatedItem.id);
            this.dataSource.data[index] = { ...updatedItem };
            this.dataSource._updateChangeSubscription();
          });
        } else {
          this.blogservice.createBlogPost(formData).subscribe(newItem => {
            this.dataSource.data.push({ ...newItem, no: this.dataSource.data.length + 1 });
            this.dataSource._updateChangeSubscription();
          });
        }
      }
    });
  }

  openDeleteDialog(element: BlogPost): void {
    const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
      width: '420px',
      height: '165px',
      data: { isDelete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogservice.deleteBlogPost(element.id as string).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
          this.dataSource._updateChangeSubscription();
        }, error => {
          console.error('Failed to delete data:', error);
        });
      }
    });
  }
}