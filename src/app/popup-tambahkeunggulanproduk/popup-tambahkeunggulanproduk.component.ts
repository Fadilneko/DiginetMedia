import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';

@Component({
  selector: 'app-popup-tambahkeunggulanproduk',
  templateUrl: './popup-tambahkeunggulanproduk.component.html',
  styleUrls: ['./popup-tambahkeunggulanproduk.component.css']
})
export class PopupTambahkeunggulanprodukComponent {

  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<PopupTambahkeunggulanprodukComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { this.isEditMode = !!data.judul_keunggulan; // Jika judul ada, berarti edit mode
  }

  // Fungsi ini akan dipanggil ketika tombol Tambah/Simpan ditekan
  onAddFeature(form: any): void {
    if (form.valid) {
      this.dialogRef.close({
        judul_keunggulan: this.data.judul_keunggulan,
        deskripsi_keunggulan: this.data.deskripsi_keunggulan,
        isEditMode: this.isEditMode
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

