import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { HttpClient } from '@angular/common/http';
import { TableDetailProdukService } from '../tabel-detailproduk/table-detailproduk.sevice';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { PopupTambahfiturprodukComponent } from '../popup-tambahfiturproduk/popup-tambahfiturproduk.component';
import { PopupTambahkeunggulanprodukComponent } from '../popup-tambahkeunggulanproduk/popup-tambahkeunggulanproduk.component';

@Component({
  selector: 'app-form-detailproduk',
  templateUrl: './form-detailproduk.component.html',
  styleUrls: ['./form-detailproduk.component.css']
})
export class FormDetailProdukComponent  {
  isEditMode: boolean;
  form: FormGroup;
  gambarkiriPreview: string | ArrayBuffer | null = null;
  gambartengahPreview: string | ArrayBuffer | null = null;
  gambarkananPreview: string | ArrayBuffer | null = null;
  gambarPreview: string | ArrayBuffer | null = null;


  fiturList: any[] = [];
  keunggulanList: any[] = [];
  displayedFitur: string[] = ['judul_fitur', 'deskripsi_fitur', 'aksi'];
  displayedKeunggulan: string[] = ['judul_keunggulan', 'deskripsi_keunggulan', 'aksi'];

  pageSize: number = 5; // Default page size
  pageIndex: number = 0; // Default page index
  dataFitur = new MatTableDataSource<any>(this.fiturList);
  dataKeunggulan = new MatTableDataSource<any>(this.keunggulanList);


  constructor(
    public dialogRef: MatDialogRef<FormDetailProdukComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private detailProdukService: TableDetailProdukService // Inject service
  ) {
    this.isEditMode = data.isEditMode;
    this.form = this.fb.group({
      id: [data.element?.id || ''],
      judul: [data.element?.judul || '', ],
      judul_slide: [data.element?.judul_slide || '', ],
      fitur: this.fb.array([]),
      keunggulan: this.fb.array([]),
      kategori: [data.element?.kategori || '', ],
      deskripsi: [data.element?.deskripsi || '', ],
      gambar_kiri: [null],
      gambar_tengah: [null],
      gambar_kanan: [null],
      gambar: [null],
  
    });
  }

  get fitur(): FormArray {
    return this.form.get('fitur') as FormArray;
  }
  


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataFitur.filter = filterValue.trim().toLowerCase();

  if (this.dataFitur.paginator) {
    this.dataFitur.paginator.firstPage();
  }
}

openAddFeatureDialog(isEditMode = false, fiturData?: any, index?: number): void {
  const dialogRef = this.dialog.open(PopupTambahfiturprodukComponent, {
    width: '400px',
    data: isEditMode ? fiturData : { judul_fitur: '', deskripsi_fitur: '' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (isEditMode && index !== undefined) {
        // Update fitur yang sudah ada di fiturList
        this.fiturList[index] = result;

        // Perbarui data di FormArray juga
        this.fitur.at(index).patchValue({
          judul_fitur: result.judul_fitur,
          deskripsi_fitur: result.deskripsi_fitur
        });
      } else {
        // Tambahkan fitur baru ke fiturList dan FormArray
        this.fiturList.push(result);
        this.fitur.push(this.fb.group({
          judul_fitur: [result.judul_fitur, Validators.required],
          deskripsi_fitur: [result.deskripsi_fitur, Validators.required],
        }));
      }

      // Update dataSource agar tabel merender ulang
      this.dataFitur.data = this.fiturList;
    }
  });
}

removeFitur(index: number) {
  console.log('Hapus fitur di indeks:', index); // Log untuk debugging
  this.fiturList.splice(index, 1);
  this.dataFitur.data = this.fiturList;
}


get keunggulan(): FormArray {
  return this.form.get('keunggulan') as FormArray;
}

openAddKeunggulan(isEditMode = false, keunggulanData?: any, index?: number): void {
  const dialogRef = this.dialog.open(PopupTambahkeunggulanprodukComponent, {
    width: '400px',
    data: isEditMode ? keunggulanData : { judul_keunggulan: '', deskripsi_keunggulan: '' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (isEditMode && index !== undefined) {
        // Update keunggulan yang sudah ada di keunggulanList
        this.keunggulanList[index] = result;

        // Perbarui data di FormArray juga
        this.keunggulan.at(index).patchValue({
          judul_keunggulan: result.judul_keunggulan,
          deskripsi_keunggulan: result.deskripsi_keunggulan
        });
      } else {
        // Tambahkan keunggulan baru ke keunggulanList dan FormArray
        this.keunggulanList.push(result);
        this.keunggulan.push(this.fb.group({
          judul_keunggulan: [result.judul_keunggulan, Validators.required],
          deskripsi_keunggulan: [result.deskripsi_keunggulan, Validators.required],
        }));
      }

      // Update dataSource agar tabel merender ulang
      this.dataKeunggulan.data = this.keunggulanList;
    }
  });
}


removeKeunggulan(index: number) {
  console.log('Hapus fitur di indeks:', index); // Log untuk debugging
  this.keunggulanList.splice(index, 1);
  this.dataKeunggulan.data = this.keunggulanList;
}


  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onSave() {
    if (this.form.valid) {
      const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
        width: '500px',
        height: '165px',
        data: { isEditMode: this.isEditMode }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Pastikan form data 'fitur' sudah ter-update dengan fiturList yang terbaru
          this.form.patchValue({ fitur: this.fiturList });
          this.form.patchValue({ keunggulan: this.keunggulanList });
  
          console.log('Form data before submitting:', this.form.value); 
  
          // Tutup dialog dan kirim form data yang bersih dari duplikasi
          this.dialogRef.close(this.form.value);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onGambarKiri(event: Event): void {
    this.handleImageInput(event, 'gambar_kiri', 'gambarkiriPreview');
  }

  onGambarTengah(event: Event): void {
    this.handleImageInput(event, 'gambar_tengah', 'gambartengahPreview');
  }

  onGambarKanan(event: Event): void {
    this.handleImageInput(event, 'gambar_kanan', 'gambarkananPreview');
  }

  onGambar(event: Event): void {
    this.handleImageInput(event, 'gambar', 'gambarPreview');
  }

  private handleImageInput(event: Event, formControlName: string, previewProperty: 'gambarkiriPreview' | 'gambartengahPreview' | 'gambarkananPreview' | 'gambarPreview'): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({ [formControlName]: file });
      this.form.get(formControlName)?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this[previewProperty] = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
  }

  
 
}
