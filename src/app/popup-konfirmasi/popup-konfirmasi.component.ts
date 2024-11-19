import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-konfirmasi',
  templateUrl: './popup-konfirmasi.component.html',
  styleUrls: ['./popup-konfirmasi.component.css']
})
export class PopupKonfirmasiComponent {

  isDelete: boolean;

  constructor(
    public dialogRef: MatDialogRef<PopupKonfirmasiComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ isEditMode?: boolean, isDelete?: boolean }
  ) {
    this.isDelete = data.isDelete || false;
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Mengirimkan nilai 'true' jika dikonfirmasi
  }

  onCancel(): void {
    this.dialogRef.close(false); // Mengirimkan nilai 'false' jika dibatalkan
  }

}
