import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TableDetailProdukService, DetailProduk } from '../tabel-detailproduk/table-detailproduk.sevice';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { FormDetailProdukComponent } from '../form-detailproduk/form-detailproduk.component';

@Component({
  selector: 'app-tabel-detailproduk',
  templateUrl: './tabel-detailproduk.component.html',
  styleUrls: ['./tabel-detailproduk.component.css']
})
export class TabelDetailProdukComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'no', 'judul', 'judul_slide', 'deskripsi', 'fitur', 'keunggulan',
    'gambar_kiri', 'gambar_tengah', 'gambar_kanan', 'gambar', 'kategori', 'aksi'
  ];
  dataSource = new MatTableDataSource<DetailProduk>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private detailProdukService: TableDetailProdukService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getDetailProduk();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDetailProduk() {
    this.detailProdukService.getDetailProduk().subscribe({
      next: (data) => {
        this.dataSource.data = data.map((item, index) => ({
          ...item,
          no: index + 1 // Assign a number for each item
        }));
      },
      error: (error) => {
        console.error('Error retrieving data:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(isEditMode: boolean, element?: DetailProduk): void {
    const dialogRef = this.dialog.open(FormDetailProdukComponent, {
      panelClass: 'submenupopup',
      data: { isEditMode, element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = new FormData();
        formData.append('judul', result.judul);
        formData.append('judul_slide', result.judul_slide);
        formData.append('fitur', JSON.stringify(result.fitur));
        formData.append('keunggulan', JSON.stringify(result.keunggulan));
        formData.append('deskripsi', result.deskripsi);
        formData.append('kategori', result.kategori);

        if (result.gambar_kiri && typeof result.gambar_kiri !== 'string') {
          formData.append('gambar_kiri', result.gambar_kiri);
        }
        if (result.gambar_tengah && typeof result.gambar_tengah !== 'string') {
          formData.append('gambar_tengah', result.gambar_tengah);
        }
        if (result.gambar_kanan && typeof result.gambar_kanan !== 'string') {
          formData.append('gambar_kanan', result.gambar_kanan);
        }
        if (result.gambar && typeof result.gambar !== 'string') {
          formData.append('gambar', result.gambar);
        }

        if (isEditMode) {
          this.detailProdukService.updateDetailProduk(result.id, formData).subscribe(updatedItem => {
            const index = this.dataSource.data.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
              this.dataSource.data[index] = { ...updatedItem, no: index + 1 };
              this.dataSource._updateChangeSubscription();
            }
          }, error => {
            console.error('Error updating data:', error);
          });
        } else {
          this.detailProdukService.createDetailProduk(formData).subscribe(newItem => {
            this.dataSource.data.push({ ...newItem, no: this.dataSource.data.length + 1 });
            this.dataSource._updateChangeSubscription();
          }, error => {
            console.error('Error creating data:', error);
          });
        }
      }
    });
  }

  confirmDelete(element: DetailProduk): void {
    const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
      width: '420px',
      height: '165px',
      data: { isDelete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (element.id) {
          this.detailProdukService.deleteDetailProduk(element.id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
            this.dataSource._updateChangeSubscription();
          }, error => {
            console.error('Failed to delete data:', error);
          });
        } else {
          console.error('ID is undefined or null');
        }
      }
    });
  }
}
