import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PopupKonfirmasiComponent } from 'src/app/popup-konfirmasi/popup-konfirmasi.component';
import { ProfilAdminService, Profil} from './profil-admin.service'
import { FormProfilComponent } from '../form-profil/form-profil.component';



@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css'],
})
export class ProfilAdminComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'no',
    'judul',
    'deskripsi',
 'gambar',
    'kategori',
    'aksi',
  ];
  dataSource = new MatTableDataSource<Profil>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private submenuDanLayananService: ProfilAdminService
  ) {}

  ngOnInit() {
    this.submenuDanLayananService.getsProfil().subscribe(data => {
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

  openDialog(isEditMode: boolean, element?: Profil): void {
    const dialogRef = this.dialog.open(FormProfilComponent, {
      panelClass: 'submenupopup',
      data: { isEditMode, element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = new FormData();
        formData.append('judul', result.judul);
        formData.append('deskripsi', result.deskripsi);
        formData.append('kategori', result.kategori);
        if (result.image && typeof result.image !== 'string') {
          formData.append('image', result.image);
        }

        if (isEditMode) {
          this.submenuDanLayananService.updateProfil(result.id, formData).subscribe(updatedItem => {
            const index = this.dataSource.data.findIndex(item => item.id === updatedItem.id);
            this.dataSource.data[index] = { ...updatedItem };
            this.dataSource._updateChangeSubscription();
          });
        } else {
          this.submenuDanLayananService.createProfil(formData).subscribe(newItem => {
            this.dataSource.data.push({ ...newItem, no: this.dataSource.data.length + 1 });
            this.dataSource._updateChangeSubscription();
          });
        }
      }
    });
  }

  openDeleteDialog(element: Profil): void {
    const dialogRef = this.dialog.open(PopupKonfirmasiComponent, {
      width: '420px',
      height: '165px',
      data: { isDelete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submenuDanLayananService.deleteProfil(element.id as string).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
          this.dataSource._updateChangeSubscription();
        }, error => {
          console.error('Failed to delete data:', error);
        });
      }
    });
  }
}
