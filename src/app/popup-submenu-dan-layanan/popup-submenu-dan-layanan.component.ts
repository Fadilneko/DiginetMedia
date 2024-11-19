import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';

@Component({
  selector: 'app-popup-submenu-dan-layanan',
  templateUrl: './popup-submenu-dan-layanan.component.html',
  styleUrls: ['./popup-submenu-dan-layanan.component.css']
})
export class PopupSubmenuDanLayananComponent {

  form!: FormGroup;
  isEditMode: boolean;
  imagePreview: string | ArrayBuffer | null = null; 
  existingImage: string | null = null;  

  constructor(
    public dialogRef: MatDialogRef<PopupSubmenuDanLayananComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private fb: FormBuilder,
    public dialog: MatDialog 
  ) {
    this.isEditMode = data.isEditMode;   

    this.form = this.fb.group({
      id: [data?.element?.id || '', ],
      judul: [data?.element?.judul || '', ],
      deskripsi: [data?.element?.deskripsi || '', ],
      gambar: [null],  
      kategori: [data?.element?.kategori || '', ],
    });

    if (this.isEditMode && data?.element?.gambar) {
      this.existingImage = data.element.gambar;  
      this.imagePreview = data.element.gambar;  
      console.log('Gambar yang ada:', this.imagePreview);  
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.form.patchValue({ gambar: file });  
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
          if (!formValue.gambar && this.isEditMode) {
            formValue.gambar = this.existingImage;
          }

          console.log('Kategori:', formValue.kategori);
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
