import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';

@Component({
  selector: 'app-popup-profil-admin',
  templateUrl: './popup-profil-admin.component.html',
  styleUrls: ['./popup-profil-admin.component.css'],
})
export class PopupProfilAdminComponent {
  form!: FormGroup;
  isEditMode: boolean;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<PopupProfilAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Data dari komponen pemanggil
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.isEditMode = data.isEditMode; // Tentukan mode (Tambah/Edit) dari data

    // Inisialisasi form
    this.form = this.fb.group({
      no: [data?.element?.no || '', Validators.required],
      judul: [data?.element?.judul || '', Validators.required],
      deskripsi: [data?.element?.deskripsi || '', Validators.required],
      image: [data?.element?.image || '', Validators.required],
      id_corevalue: [data?.element?.id_corevalue || '', ],
      id_client: [data?.element?.id_client || '', ],
      id_kelebihan: [data?.element?.id_kelebihan|| '', ],
      kategori: [data?.element?.kategori || '', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Menyimpan pratinjau gambar ke variabel
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    if (this.form.valid) {
      // Buka dialog konfirmasi
      const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
        width: '500px',
        height: '165px',
        data: { isEditMode: this.isEditMode },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Jika pengguna menekan "Ya", data dikirim kembali
          this.dialogRef.close(this.form.value); // Kirim data kembali ke komponen pemanggil
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
