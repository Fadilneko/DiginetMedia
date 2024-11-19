import { Component, OnInit } from '@angular/core';
import { TableLainLainService, LainLain } from '../table-lain-lain/table-lain-lain.service'; // Import service

@Component({
  selector: 'app-lain-lain',
  templateUrl: './lain-lain.component.html',
  styleUrls: ['./lain-lain.component.css']
})
export class LainLainComponent implements OnInit {
  lainLainData: LainLain[] = []; // Variabel untuk menyimpan data
  judul: LainLain | undefined; // Variabel untuk menyimpan data Judul
  training: LainLain | undefined; // Variabel untuk menyimpan data Training
  hubungikami: LainLain | undefined; // Variabel untuk menyimpan data Hubungi Kami
  technology: LainLain | undefined; // Variabel untuk menyimpan data Technology
  demo: LainLain | undefined; // Variabel untuk menyimpan data Demo
  artikel: LainLain | undefined; // Variabel untuk menyimpan data Artikel

  constructor(private tableLainLainService: TableLainLainService) {}

  ngOnInit(): void {
    this.getLainLainData(); // Panggil metode untuk mengambil data saat komponen diinisialisasi
  }

  getLainLainData(): void {
    this.tableLainLainService.getsLainLain().subscribe(
      (data: LainLain[]) => {
        // Filter untuk kategori Judul
        const judulData = data.filter(item => item.kategori === 'Judul');
        const trainingData = data.filter(item => item.kategori === 'Training');
        const hubungikamiData = data.filter(item => item.kategori === 'Hubungi Kami');
        const technologyData = data.filter(item => item.kategori === 'Technology'); // Tambahkan filter untuk Technology
        const demoData = data.filter(item => item.kategori === 'Demo'); // Tambahkan filter untuk Demo
        const artikelData = data.filter(item => item.kategori === 'Artikel'); // Tambahkan filter untuk Artikel

        if (judulData.length > 0) {
          this.judul = judulData[0]; // Simpan data Judul
        }

        // Mengambil data kategori Training jika ada
        if (trainingData.length > 0) {
          this.training = trainingData[0]; // Simpan data Training
        }

        // Mengambil data kategori Hubungi Kami jika ada
        if (hubungikamiData.length > 0) {
          this.hubungikami = hubungikamiData[0]; // Simpan data Hubungi Kami
        }

        // Mengambil data kategori Technology jika ada
        if (technologyData.length > 0) {
          this.technology = technologyData[0]; // Simpan data Technology
        }

        // Mengambil data kategori Demo jika ada
        if (demoData.length > 0) {
          this.demo = demoData[0]; // Simpan data Demo
        }

        // Mengambil data kategori Artikel jika ada
        if (artikelData.length > 0) {
          this.artikel = artikelData[0]; // Simpan data Artikel
        }
      },
      (error) => {
        console.error('Error fetching lain-lain data:', error);
      }
    );
  }
}
