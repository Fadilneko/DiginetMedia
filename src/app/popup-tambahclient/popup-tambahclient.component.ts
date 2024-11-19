import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';


@Component({
  selector: 'app-popup-tambahclient',
  templateUrl: './popup-tambahclient.component.html',
  styleUrls: ['./popup-tambahclient.component.css']
})
export class PopuptambahClientComponent {
  form!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode:boolean;
  logo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopuptambahClientComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any // Menggunakan MAT_DIALOG_DATA untuk menerima data dari openDialog
  ) {

    this.form = this.fb.group({
      id_client: [data?.id_client || ''],
      nama: [data?.nama || '', ],
      logo: [data?.logo || '']

    })

    this.isEditMode = data.isEditMode || false;

    if (data.client) {
      this.form.patchValue({
        nama: data.client.nama,
        logo: data.client.logo
      });
    }

  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.logo = file; // Menyimpan file yang dipilih
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
            logo: this.logo     // Gambar yang dipilih
          };

          console.log('Data yang akan dikirim:', formData);
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

