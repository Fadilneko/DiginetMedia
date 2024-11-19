import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { IdentitasKantorService, IdentitasKantor } from './identitaskantor.service';
import { FormIdentitaskantorComponent } from '../form-identitaskantor/form-identitaskantor.component';
import { PopupKonfirmasiComponent } from '../popup-konfirmasi/popup-konfirmasi.component';

@Component({
  selector: 'app-identitaskantor',
  templateUrl: './identitaskantor.component.html',
  styleUrls: ['./identitaskantor.component.css']
})
export class IdentitaskantorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'kantor', 'deskripsi', 'alamat', 'foto_kantor', 'logo_kantor', 'gmaps', 'kategori', 'aksi'];
  dataSource = new MatTableDataSource<IdentitasKantor>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private identitasKantorService: IdentitasKantorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getIdentitasKantor();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getIdentitasKantor() {
    this.identitasKantorService.getIdentitasKantor().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error retrieving data:', err);
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

  openDialog(isEdit: boolean, element?: IdentitasKantor) {
    const dialogRef = this.dialog.open(FormIdentitaskantorComponent, {
      width: '500px',
      height: '600px',
      data: {
        isEditMode: isEdit,
        element: element || { kantor: '', deskripsi: '', alamat: '', foto_kantor: '', logo_kantor: '', gmaps: '', kategori: '' }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          this.updateIdentitasKantor(result);
        } else {
          this.getIdentitasKantor();
        }
      }
    });
  }

  updateIdentitasKantor(data: IdentitasKantor) {
    this.identitasKantorService.updateIdentitasKantor(data.id, data).subscribe({
      next: () => {
        this.getIdentitasKantor(); 
      },
      error: (err) => {
        console.error('Error updating data:', err);
      }
    });
  }

  confirmDelete(element: IdentitasKantor): void {
    const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
      width: '420px',
      height: '165px',
      data: { isDelete: true }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Tambahkan log untuk melihat ID
        console.log('ID to delete:', element.id);
        
        // Pastikan ID tidak undefined atau null
        if (element.id) {
          this.identitasKantorService.deleteIdentitasKantor(element.id).subscribe(() => {
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