import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-tambahfiturproduk',
  templateUrl: './popup-tambahfiturproduk.component.html',
  styleUrls: ['./popup-tambahfiturproduk.component.css']
})
export class PopupTambahfiturprodukComponent {
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<PopupTambahfiturprodukComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Tentukan apakah ini mode edit atau tambah
    this.isEditMode = !!data.judul_fitur; // Jika judul ada, berarti edit mode
  }

  // Fungsi ini akan dipanggil ketika tombol Tambah/Simpan ditekan
  onAddFeature(form: any): void {
    if (form.valid) {
      this.dialogRef.close({
        judul_fitur: this.data.judul_fitur,
        deskripsi_fitur: this.data.deskripsi_fitur,
        isEditMode: this.isEditMode
      });
    }
  }

  // Fungsi untuk batal
  onCancel(): void {
    this.dialogRef.close();
  }
}
