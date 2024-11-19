import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-tambahkelebihan',
  templateUrl: './popup-tambahkelebihan.component.html',
  styleUrls: ['./popup-tambahkelebihan.component.css']
})
export class PopupTambahkelebihanComponent {
  kelebihanForm!: FormGroup;
  isEditMode: boolean;
  form!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  icon: File | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PopupTambahkelebihanComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Menginisialisasi form dengan validasi
    this.kelebihanForm = this.fb.group({
      id_kelebihan: [data?.id_kelebihan || '', ],
      deskripsi: [data?.deskripsi || '', ], // Menambahkan validasi
      nama: [data?.nama || '', ],
      icon: [data?.icon || '']
    });

    this.isEditMode = data.isEditMode || false;

    // Patch value jika mode edit
    if (this.isEditMode) {
      this.kelebihanForm.patchValue({
        deskripsi: data.kelebihan.deskripsi,
        nama: data.kelebihan.nama,
        icon: data.kelebihan.icon
      });
    }
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.icon = file; // Menyimpan file yang dipilih
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // Menampilkan pratinjau gambar di UI
      };
      reader.readAsDataURL(file); // Membaca file sebagai URL data untuk pratinjau
    }
  }


  onSave() {
    if (this.kelebihanForm) { // Memeriksa validitas form
      const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
        width: '500px',
        height: '165px',
        data: { isEditMode: this.isEditMode }
        
      });

     

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const formData = {
            ...this.kelebihanForm.value,  // Deskripsi dan data lainnya
            icon: this.icon     // Gambar yang dipilih
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
