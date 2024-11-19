import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { HttpClient } from '@angular/common/http';
import { TableDetailProdukService, DetailProduk } from '../tabel-detailproduk/table-detailproduk.sevice';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { PopupTambahfiturprodukComponent } from '../popup-tambahfiturproduk/popup-tambahfiturproduk.component';

@Component({
  selector: 'app-table-fitur',
  templateUrl: './table-fitur.component.html',
  styleUrls: ['./table-fitur.component.css']
})
export class TableFiturComponent {

  // isEditMode: boolean;
  // form!: FormGroup;

  // displayedColumns: string[] = ['no','judul', 'deskripsi', 'aksi']; // Columns for feature table
  // dataSource = new MatTableDataSource<Fitur>();
  // searchQuery: string = '';
  // pageSize: number = 5; // Default page size
  // pageIndex: number = 0; // Default page index

  
  // constructor(
  //   public dialogRef: MatDialogRef<TableFiturComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  //   private fb: FormBuilder,
  //   private http: HttpClient,
  //   private dialog: MatDialog,
  //   private detailProdukService: TableDetailProdukService // Inject service
  // ) {
  //   this.isEditMode = data.isEditMode;
  
  // }

  // ngOnInit(): void {
  //   if (this.isEditMode) {
  //     this.loadFitur();
  //   }
  // }

  // get fiturArray(): FormArray {
  //   return this.form.get('fitur') as FormArray;
  // }

  // loadFitur(): void {
  //   const detailProdukId = this.data.element.id; // ID produk
  //   this.detailProdukService.getFiturByDetailProdukId(detailProdukId).subscribe(
  //     (fitur: Fitur[]) => {
  //       fitur.forEach(f => this.addFitur(f));
  //       this.dataSource.data = fitur; // Set data to dataSource
  //     },
  //     (error) => {
  //       console.error('Error loading features:', error);
  //     }
  //   );
  // }

  // addFitur(fitur?: Fitur): void {
  //   const fiturGroup = this.fb.group({
  //     id: [fitur?.id || null],
  //     judul: [fitur?.judul || '', Validators.required],
  //     deskripsi: [fitur?.deskripsi || '', Validators.required]
  //   });
  //   this.fiturArray.push(fiturGroup);
  // }

  // removeFitur(index: number): void {
  //   const fiturId = this.fiturArray.at(index).get('id')?.value;
  //   if (fiturId) {
  //     this.detailProdukService.deleteFitur(fiturId).subscribe(() => {
  //       this.fiturArray.removeAt(index);
  //       this.dataSource.data = this.fiturArray.controls.map(control => control.value);
  //     }, error => {
  //       console.error('Error deleting feature:', error);
  //     });
  //   } else {
  //     this.fiturArray.removeAt(index);
  //   }
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // onPageChange(event: PageEvent) {
  //   this.pageIndex = event.pageIndex;
  //   this.pageSize = event.pageSize;
  // }


  // openDialog(isEditMode: boolean, element?: Fitur): void {
  //   const dialogRef = this.dialog.open(PopupTambahfiturprodukComponent, {
  //     panelClass: 'submenupopup',
  //     data: { isEditMode, element }
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('Dialog Result:', result); // Log hasil dialog setelah ditutup
  //     if (result) {
  //       // Membangun data JSON
  //       const jsonData = {
  //         judul: result.judul,
  //         deskripsi: result.deskripsi,

  //       };
  
  //       console.log('Data JSON sebelum dikirim:', jsonData); // Log data yang akan dikirim
  
  //       if (isEditMode) {
  //         console.log('Mengupdate fitur dengan ID:', result.id); // Log ID fitur yang akan diupdate
  //         this.detailProdukService.updateFitur(result.id, jsonData).subscribe(
  //           updatedItem => {
  //             console.log('Fitur berhasil diupdate:', updatedItem); // Log item yang berhasil diupdate
  //             const index = this.dataSource.data.findIndex(item => item.id === updatedItem.id);
  //             this.dataSource.data[index] = { ...updatedItem };
  //             this.dataSource._updateChangeSubscription();
  //           },
  //           error => {
  //             console.error('Error saat mengupdate fitur:', error); // Log kesalahan saat update
  //           }
  //         );
  //       } else {
  //         console.log('Menambahkan fitur baru'); // Log ketika menambahkan fitur baru
  //         this.detailProdukService.createFitur(jsonData).subscribe(
  //           newItem => {
  //             console.log('Fitur baru berhasil ditambahkan:', newItem); // Log item yang baru ditambahkan
  //             this.dataSource.data.push({ ...newItem, no: this.dataSource.data.length + 1 });
  //             this.dataSource._updateChangeSubscription();
  //           },
  //           error => {
  //             console.error('Error saat menambahkan fitur baru:', error); // Log kesalahan saat menambahkan
  //           }
  //         );
  //       }
  //     }
  //   });
  // }
  

}
