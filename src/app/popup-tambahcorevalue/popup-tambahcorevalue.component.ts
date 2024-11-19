import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';

@Component({
  selector: 'app-popup-tambahcorevalue',
  templateUrl: './popup-tambahcorevalue.component.html',
  styleUrls: ['./popup-tambahcorevalue.component.css']
})
export class PopupTambahcorevalueComponent {
  icon1: File | null = null;
  isEditMode: boolean;
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

 
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupTambahcorevalueComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any // Menggunakan MAT_DIALOG_DATA untuk menerima data dari openDialog
  ) {

    this.form = this.fb.group({
      id_corevalue: [data?.id_corevalue || '', ],
      deskripsi: [data?.deskripsi || '', ],
      icon1: [data?.icon1 || ''],
      kategori: [data?.kategori || '', ],

    })

    this.isEditMode = data.isEditMode || false;

    if (data.coreValue) {
      this.form.patchValue({
        deskripsi: data.coreValue.deskripsi,
        icon1: data.coreValue.icon1,
        kategori:data.coreValue.kategori
      });
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.icon1 = file; // Menyimpan file yang dipilih
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // Menampilkan pratinjau gambar di UI
      };
      reader.readAsDataURL(file); // Membaca file sebagai URL data untuk pratinjau
    }
  }

  onSave() {
    if (this.form) { // Memeriksa validitas form
      const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
        width: '500px',
        height: '165px',
        data: { isEditMode: this.isEditMode }
        
      });

     

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const formData = {
            ...this.form.value,  // Deskripsi dan data lainnya
            icon1: this.icon1     // Gambar yang dipilih
          };

          console.log('Data yang akan dikirim:', formData); // Memeriksa data yang akan dikirim
          this.dialogRef.close(formData);  // Mengirim data kembali ke komponen pemanggil
        }
      });
    } else {
      console.log('Form tidak valid'); // Log jika form tidak valid
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
