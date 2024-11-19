import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';

@Component({
  selector: 'app-form-identitaskantor',
  templateUrl: './form-identitaskantor.component.html',
  styleUrls: ['./form-identitaskantor.component.css']
})
export class FormIdentitaskantorComponent {
  isEditMode: boolean;
  form: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  fotoKantorPreview: string | ArrayBuffer | null = null;
  gmapsPreview: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<FormIdentitaskantorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.isEditMode = data.isEditMode;
    this.form = this.fb.group({
      kantor: [data.element?.kantor || ''],
      alamat: [data.element?.alamat || ''],
      deskripsi: [data.element?.deskripsi || ''],
      kategori: [data.element?.kategori || ''],
      logo: [null],
      fotoKantor: [null],
      gmapsImage: [null]
    });

    // Jika dalam mode edit, tampilkan preview
    if (this.isEditMode) {
      this.logoPreview = data.element?.logo_kantor ? `http://localhost:3000/images/${data.element.logo_kantor}` : null;
      this.fotoKantorPreview = data.element?.foto_kantor ? `http://localhost:3000/images/${data.element.foto_kantor}` : null;
      this.gmapsPreview = data.element?.gmaps ? `http://localhost:3000/images/${data.element.gmaps}` : null;
    }
  }

  onSave() {
    // Tampilkan dialog konfirmasi
    const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
      width: '250px',
      data: { message: 'Apakah Anda yakin ingin menyimpan perubahan ini?' }
    });

    // Setelah dialog konfirmasi ditutup, periksa apakah pengguna menekan "Yes"
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Jika pengguna menekan "Yes", lanjutkan dengan menyimpan data
        if (this.form.valid) {
          const formData = new FormData();
          formData.append('kantor', this.form.get('kantor')?.value);
          formData.append('alamat', this.form.get('alamat')?.value);
          formData.append('deskripsi', this.form.get('deskripsi')?.value);
          formData.append('kategori', this.form.get('kategori')?.value);

          const logoFile = this.form.get('logo')?.value;
          if (logoFile) {
            formData.append('logo_kantor', logoFile);
          }

          const fotoKantorFile = this.form.get('fotoKantor')?.value;
          if (fotoKantorFile) {
            formData.append('foto_kantor', fotoKantorFile);
          }

          const gmapsFile = this.form.get('gmapsImage')?.value;
          if (gmapsFile) {
            formData.append('gmaps', gmapsFile);
          }

          const requestMethod = this.isEditMode ? 'put' : 'post';
          const endpoint = this.isEditMode ? `http://localhost:3000/identitas-kantor/${this.data.element.id}` : 'http://localhost:3000/identitas-kantor';

          this.http[requestMethod](endpoint, formData)
            .subscribe({
              next: (response) => {
                console.log('Identitas kantor berhasil disimpan:', response);
                this.dialogRef.close();
              },
              error: (error) => {
                console.error('Error saving identitas kantor:', error);
              }
            });
        }
      } else {
        // Jika pengguna menekan "No", batalkan penyimpanan
        console.log('Penyimpanan dibatalkan');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({ logo: file });
      this.form.get('logo')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onFotoKantorSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({ fotoKantor: file });
      this.form.get('fotoKantor')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoKantorPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onGmapsSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({ gmapsImage: file });
      this.form.get('gmapsImage')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.gmapsPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
