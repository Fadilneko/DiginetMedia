import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';

@Component({
  selector: 'app-popup-tambahproduklainnya',
  templateUrl: './popup-tambahproduklainnya.component.html',
  styleUrls: ['./popup-tambahproduklainnya.component.css']
})
export class PopupTambahproduklainnyaComponent {
  form!: FormGroup;
  isEditMode: boolean = false;
  imagePreviews: { [key: string]: string | ArrayBuffer | null } = {}; // Object to hold image previews

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PopupTambahproduklainnyaComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode || false;
  }

  ngOnInit(): void {
    // Inisialisasi form dengan validasi
    this.form = this.fb.group({
      produkLain1: [null, Validators.required],
      produkLain2: [null, Validators.required],
      produkLain3: [null, Validators.required],
    });
  }

  // Fungsi untuk menangani file yang diunggah
  onFileSelect(event: Event, fieldName: string): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreviews[fieldName] = reader.result; // Store the image preview
      };

      reader.readAsDataURL(file); // Read file as data URL
      this.form.patchValue({
        [fieldName]: file // Menyimpan file ke form
      });
    }
  }

  onSave() {
    if (this.form.valid) {
      // Buka dialog konfirmasi
      const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
        width: '500px',
        height: '165px',
        data: { isEditMode: this.isEditMode }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Jika pengguna menekan "Ya", data dikirim kembali
          this.dialogRef.close(this.form.value);  // Kirim data kembali ke komponen pemanggil
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
