import { Component, OnInit } from '@angular/core';
import { SubmenuDanLayananService, SubmenuDanLayanan } from '../submenu-dan-layanan/submenu-dan-layanan.service';


@Component({
  selector: 'app-layanan-kami',
  templateUrl: './layanan-kami.component.html',
  styleUrls: ['./layanan-kami.component.css']
})
export class LayananKamiComponent {

  submenuData :SubmenuDanLayanan [] = []; 
  headerLayanan: SubmenuDanLayanan | undefined;
  isilayanan1: SubmenuDanLayanan | undefined;
  isilayanan2: SubmenuDanLayanan | undefined; 
  isilayanan3: SubmenuDanLayanan | undefined; 
  isilayanan4: SubmenuDanLayanan | undefined; 
  isilayanan5: SubmenuDanLayanan | undefined;
  judulisilayanan: SubmenuDanLayanan | undefined; 
  isijudullayanan1: SubmenuDanLayanan | undefined;
  isijudullayanan2: SubmenuDanLayanan | undefined; 
  isijudullayanan3: SubmenuDanLayanan | undefined;  
  isijudullayanan4: SubmenuDanLayanan | undefined; 
  isilayananterakhir: SubmenuDanLayanan | undefined; 
  isilayananterakhir1: SubmenuDanLayanan | undefined;  
  isilayananterakhir2: SubmenuDanLayanan | undefined;  
  isilayananterakhir3: SubmenuDanLayanan | undefined;   
  isilayananterakhir4: SubmenuDanLayanan | undefined;  
  isilayananterakhir5: SubmenuDanLayanan | undefined;  
   
   
    
  

  constructor(private submenuDanLayananService: SubmenuDanLayananService) {}

  ngOnInit(): void {
    this.getsSubmenuDanLayananData(); // Panggil metode untuk mengambil data saat komponen diinisialisasi
  }

  getsSubmenuDanLayananData(): void {
    this.submenuDanLayananService.getsSubmenuDanLayanan().subscribe(
      (data: SubmenuDanLayanan[]) => {
       
        const headerLayanan = data.filter(item => item.kategori === 'header layanan');
        const isilayanan1 = data.filter(item => item.kategori === 'isi layanan1');
        const isilayanan2 = data.filter(item => item.kategori === 'isi layanan2');
        const isilayanan3 = data.filter(item => item.kategori === 'isi layanan3'); 
        const isilayanan4 = data.filter(item => item.kategori === 'isi layanan4'); 
        const isilayanan5 = data.filter(item => item.kategori === 'isi layanan5'); 
        const judulisilayanan = data.filter(item => item.kategori === 'judul isi layanan');
        const isijudullayanan1 = data.filter(item => item.kategori === 'isi judul layanan1');
        const isijudullayanan2 = data.filter(item => item.kategori === 'isi judul layanan2'); 
        const isijudullayanan3 = data.filter(item => item.kategori === 'isi judul layanan3'); 
        const isijudullayanan4 = data.filter(item => item.kategori === 'isi judul layanan4'); 
        const isilayananterakhir = data.filter(item => item.kategori === 'isi layanan terakhir');
        const isilayananterakhir1 = data.filter(item => item.kategori === 'isi layanan terakhir1');
        const isilayananterakhir2= data.filter(item => item.kategori === 'isi layanan terakhir2');
        const isilayananterakhir3 = data.filter(item => item.kategori === 'isi layanan terakhir3');
        const isilayananterakhir4 = data.filter(item => item.kategori === 'isi layanan terakhir4');
        const isilayananterakhir5 = data.filter(item => item.kategori === 'isi layanan terakhir5');   

        if (headerLayanan.length > 0) {
          this.headerLayanan = headerLayanan[0]; 
        }

       
        if (isilayanan1.length > 0) {
          this.isilayanan1 = isilayanan1[0]; 
        }

       
        if (isilayanan2.length > 0) {
          this.isilayanan2 = isilayanan2[0]; 
        }

        // Mengambil data kategori Technology jika ada
        if (isilayanan3.length > 0) {
          this.isilayanan3 = isilayanan3[0]; // Simpan data Technology
        }

        // Mengambil data kategori Demo jika ada
        if (isilayanan4.length > 0) {
          this.isilayanan4 = isilayanan4[0]; // Simpan data Demo
        }


        if (isilayanan5.length > 0) {
          this.isilayanan5 = isilayanan5[0]; 
        }

        
        if (judulisilayanan.length > 0) {
          this.judulisilayanan = judulisilayanan[0]; 
        }

        
        if (isijudullayanan1.length > 0) {
          this.isijudullayanan1 = isijudullayanan1[0]; 
        }

        if (isijudullayanan2.length > 0) {
          this.isijudullayanan2 = isijudullayanan2[0]; 
        }

        if (isijudullayanan3.length > 0) {
          this.isijudullayanan3 = isijudullayanan3[0]; 
        }

        if (isijudullayanan4.length > 0) {
          this.isijudullayanan4 = isijudullayanan4[0]; 
        }

        if (isilayananterakhir.length > 0) {
          this.isilayananterakhir = isilayananterakhir[0]; 
        }

        if (isilayananterakhir1.length > 0) {
          this.isilayananterakhir1 = isilayananterakhir1[0]; 
        }

        if (isilayananterakhir2.length > 0) {
          this.isilayananterakhir2 = isilayananterakhir2[0]; 
        }

        if (isilayananterakhir3.length > 0) {
          this.isilayananterakhir3 = isilayananterakhir3[0]; 
        }

        if (isilayananterakhir4.length > 0) {
          this.isilayananterakhir4 = isilayananterakhir4[0]; 
        }

        if (isilayananterakhir5.length > 0) {
          this.isilayananterakhir5 = isilayananterakhir5[0]; 
        }

      },
      (error) => {
        console.error('Error fetching lain-lain data:', error);
      }
    );
  }

}
