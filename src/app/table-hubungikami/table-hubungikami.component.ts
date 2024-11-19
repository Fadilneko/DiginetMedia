  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatTableDataSource } from '@angular/material/table';
  import { TableHubungikamiService, FormulirPesan } from './table-hubungi-kami.service'; // Ganti path jika perlu
  import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';
import { MatDialog } from '@angular/material/dialog';

  @Component({
    selector: 'app-table-hubungikami',
    templateUrl: './table-hubungikami.component.html',
    styleUrls: ['./table-hubungikami.component.css']
  })
  export class TableHubungikamiComponent implements OnInit {
    displayedColumns: string[] = ['no', 'nama_lengkap', 'perusahaan_instansi', 'email', 'nohp_whatsapp', 'produk_solusi', 'pesan', 'aksi'];
    dataSource = new MatTableDataSource<FormulirPesan>([]);
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
   
    constructor(public dialog: MatDialog,private hubungiKamiService: TableHubungikamiService) {}

    ngOnInit(): void {
      this.loadData();
    }

    loadData(): void {
      this.hubungiKamiService.getPesan().subscribe(
        (data: FormulirPesan[]) => {
          this.dataSource.data = data.map((item, index) => ({
            ...item,
            no: index + 1 // Menambahkan nomor urut
          }));
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
    }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openDeleteDialog(element: FormulirPesan): void {
      console.log('Delete button clicked for:', element); // Tambahkan log
      const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
        width: '420px',
        height: '165px',
        data: { isDelete: true }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result); // Tambahkan log
        if (result) {
          this.hubungiKamiService.deletePesan(element.id as string).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
            this.dataSource._updateChangeSubscription();
          }, error => {
            console.error('Failed to delete data:', error);
          });
        }
      });
    }
    
  }
