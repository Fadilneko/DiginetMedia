import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PopupSubmenuDanLayananComponent } from '../popup-submenu-dan-layanan/popup-submenu-dan-layanan.component'; 
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { SubmenuDanLayananService, SubmenuDanLayanan } from './submenu-dan-layanan.service';

@Component({
  selector: 'app-submenu-dan-layanan',
  templateUrl: './submenu-dan-layanan.component.html',
  styleUrls: ['./submenu-dan-layanan.component.css']
})
export class SubmenuDanLayananComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'judul', 'deskripsi', 'gambar', 'kategori', 'aksi'];
  dataSource = new MatTableDataSource<SubmenuDanLayanan>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private submenuDanLayananService: SubmenuDanLayananService
  ) {}

  ngOnInit() {
    this.submenuDanLayananService.getsSubmenuDanLayanan().subscribe(data => {
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

  openDialog(isEditMode: boolean, element?: SubmenuDanLayanan): void {
    const dialogRef = this.dialog.open(PopupSubmenuDanLayananComponent, {
      panelClass: 'submenupopup',
      data: { isEditMode, element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = new FormData();
        formData.append('judul', result.judul);
        formData.append('deskripsi', result.deskripsi);
        formData.append('kategori', result.kategori);
        if (result.gambar && typeof result.gambar !== 'string') {
          formData.append('image', result.gambar);
        }

        if (isEditMode) {
          this.submenuDanLayananService.updateSubmenuDanLayanan(result.id, formData).subscribe(updatedItem => {
            const index = this.dataSource.data.findIndex(item => item.id === updatedItem.id);
            this.dataSource.data[index] = { ...updatedItem };
            this.dataSource._updateChangeSubscription();
          });
        } else {
          this.submenuDanLayananService.createSubmenuDanLayanan(formData).subscribe(newItem => {
            this.dataSource.data.push({ ...newItem, no: this.dataSource.data.length + 1 });
            this.dataSource._updateChangeSubscription();
          });
        }
      }
    });
  }

  openDeleteDialog(element: SubmenuDanLayanan): void {
    const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
      width: '420px',
      height: '165px',
      data: { isDelete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submenuDanLayananService.deleteSubmenuDanLayanan(element.id as string).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
          this.dataSource._updateChangeSubscription();
        }, error => {
          console.error('Failed to delete data:', error);
        });
      }
    });
  }
}
