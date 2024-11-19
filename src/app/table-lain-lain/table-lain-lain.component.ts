import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { PopupTableLainLainComponent } from '../popup-table-lain-lain/popup-table-lain-lain.component';
import { TableLainLainService, LainLain } from './table-lain-lain.service';



@Component({
  selector: 'app-table-lain-lain',
  templateUrl: './table-lain-lain.component.html',
  styleUrls: ['./table-lain-lain.component.css']
})
export class TableLainLainComponent implements AfterViewInit {

  displayedColumns: string[] = ['no', 'judul', 'deskripsi', 'kategori', 'aksi'];
  dataSource = new MatTableDataSource<LainLain>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog,
    private tableLainLainService: TableLainLainService
  ) {}

  ngOnInit() {
    this.tableLainLainService.getsLainLain().subscribe(data => {
      this.dataSource.data = data.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(isEditMode: boolean, element?: LainLain): void {
    const dialogRef = this.dialog.open(PopupTableLainLainComponent, {
      panelClass: 'submenupopup',
      data: { isEditMode, element }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Buat objek LainLain tanpa FormData
        const lainLainData: LainLain = {
          judul: result.judul,
          deskripsi: result.deskripsi,
          kategori: result.kategori
        };
  
        if (isEditMode && result.id) { 
          // Untuk update, kirim data objek LainLain
          this.tableLainLainService.updateLainLain(result.id, lainLainData).subscribe(updatedItem => {
            const index = this.dataSource.data.findIndex(item => item.id === updatedItem.id);
            this.dataSource.data[index] = { ...updatedItem };
            this.dataSource.data = this.dataSource.data.map((item, index) => ({
              ...item,
              no: index + 1,  
            }));
            this.dataSource._updateChangeSubscription();
          });
        } else {
          // Untuk create, kirim data objek LainLain
          this.tableLainLainService.createLainLain(lainLainData).subscribe(newItem => {
            this.dataSource.data.push({ ...newItem, no: this.dataSource.data.length + 1 });
            this.dataSource._updateChangeSubscription();
          });
        }
      }
    });
  }
  
  


  openDeleteDialog(element: LainLain): void {
    const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
      width: '420px',
      height: '165px',
      data: { isDelete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableLainLainService.deleteLainLain(element.id as string).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
          this.dataSource._updateChangeSubscription();
        }, error => {
          console.error('Failed to delete data:', error);
        });
      }
    });
  }

}
