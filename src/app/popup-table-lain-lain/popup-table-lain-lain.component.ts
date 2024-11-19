import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';

@Component({
  selector: 'app-popup-table-lain-lain',
  templateUrl: './popup-table-lain-lain.component.html',
  styleUrls: ['./popup-table-lain-lain.component.css']
})
export class PopupTableLainLainComponent {

  form!: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<PopupTableLainLainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  // Data dari komponen pemanggil
    private fb: FormBuilder,
    public dialog: MatDialog 
  ) {
    this.isEditMode = data.isEditMode;   // Tentukan mode (Tambah/Edit) dari data

    // Inisialisasi form
    this.form = this.fb.group({
      id: [data?.element?.id || null], // Pastikan ID disertakan jika ada
      judul: [data?.element?.judul || '', Validators.required],
      deskripsi: [data?.element?.deskripsi || '', Validators.required],
      kategori: [data?.element?.kategori || '', Validators.required],
    });
  }

  onSave() {
    if (this.form.valid) {
      console.log('Form yang valid:', this.form.value); // Debugging

      // Buka dialog konfirmasi
      const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
        width: '500px',
        height: '165px',
        data: { isEditMode: this.isEditMode }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Kirim data kembali, pastikan ID juga dikirim jika dalam mode edit
          this.dialogRef.close(this.form.value);
        }
      });
    } else {
      alert('Form tidak valid. Pastikan semua field terisi dengan benar.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
