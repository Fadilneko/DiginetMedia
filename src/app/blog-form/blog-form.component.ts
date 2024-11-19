import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BlogService, BlogPost } from '../blog.service';
import { Router } from '@angular/router';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
 
  form!: FormGroup;
  isEditMode: boolean;
  imagePreview: string | ArrayBuffer | null = null; 
  existingImage: string | null = null;  

  constructor(
    public dialogRef: MatDialogRef<BlogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private fb: FormBuilder,
    public dialog: MatDialog 
  ) {
    this.isEditMode = data.isEditMode;   

    this.form = this.fb.group({
      id: [data?.element?.id || '', ],
      title: [data?.element?.title || '', ],
      content: [data?.element?.content || '', ],
      kategori: [data?.element?.kategori || '', ],
      detail_deskripsi: [data?.element?.detail_deskripsi || '', ],
      tanggal: [data?.element?.tanggal || '', ],
      image_url: [null],  
     
    });

    if (this.isEditMode && data?.element?.image_url) {
      this.existingImage = data.element.image_url;  
      this.imagePreview = data.element.image_url;  
      console.log('Gambar yang ada:', this.imagePreview);  
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.form.patchValue({ image_url: file });  
      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    console.log('Form valid:', this.form.valid);
    if (this.form.valid) {
      const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
        width: '500px',
        height: '165px',
        data: { isEditMode: this.isEditMode }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const formValue = this.form.value;
          if (!formValue.image_url && this.isEditMode) {
            formValue.image_url = this.existingImage;
          }

      
          console.log('Data dikirim:', formValue);  
          this.dialogRef.close(formValue);
        }
      });
    } else {
      console.log('Form tidak valid:', this.form.errors);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
