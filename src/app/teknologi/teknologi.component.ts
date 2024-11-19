import { Component, OnInit } from '@angular/core';
import { SubmenuDanLayanan, SubmenuDanLayananService } from '../submenu-dan-layanan/submenu-dan-layanan.service';

@Component({
  selector: 'app-teknologi',
  templateUrl: './teknologi.component.html',
  styleUrls: ['./teknologi.component.css']
})
export class TeknologiComponent implements OnInit {
  submenuDanLayanan: SubmenuDanLayanan[] = []; // Array untuk menyimpan data submenu dan layanan
  headerTeknologi: SubmenuDanLayanan | undefined; // Menyimpan item header teknologi
  apiServiceItem: SubmenuDanLayanan | undefined; // Menyimpan item untuk API Service
  mobileApplicationItem: SubmenuDanLayanan | undefined; // Menyimpan item untuk Mobile Application
  artificialIntelligenceItem: SubmenuDanLayanan | undefined; // Menyimpan item untuk Artificial Intelligence
  dynamicDatabaseItem: SubmenuDanLayanan | undefined; // Menyimpan item untuk Dynamic Database
  systemIntegrationItem: SubmenuDanLayanan | undefined; // Menyimpan item untuk System Integration

  constructor(private submenuDanLayananService: SubmenuDanLayananService) {}

  ngOnInit(): void {
    this.getSubmenuDanLayananData(); // Panggil data saat komponen diinisialisasi
  }

  // Metode untuk mendapatkan data dari service
  getSubmenuDanLayananData(): void {
    this.submenuDanLayananService.getsSubmenuDanLayanan().subscribe(
      (data: SubmenuDanLayanan[]) => {
        console.log('Data received:', data); // Debug: Periksa data yang diterima
        this.submenuDanLayanan = data; // Simpan data yang diterima
        this.headerTeknologi = this.submenuDanLayanan.find(item => item.kategori === 'header teknologi'); // Cari item dengan kategori 'header teknologi'
        this.apiServiceItem = this.submenuDanLayanan.find(item => item.kategori === 'API Service'); // Cari item dengan kategori 'API Service'
        this.mobileApplicationItem = this.submenuDanLayanan.find(item => item.kategori === 'Mobile Application'); // Cari item dengan kategori 'Mobile Application'
        this.artificialIntelligenceItem = this.submenuDanLayanan.find(item => item.kategori === 'Artificial Inteligence'); // Cari item dengan kategori 'Artificial Intelligence'
        this.dynamicDatabaseItem = this.submenuDanLayanan.find(item => item.kategori === 'Dynamic Database'); // Cari item dengan kategori 'Dynamic Database'
        this.systemIntegrationItem = this.submenuDanLayanan.find(item => item.kategori === 'System Integration'); // Cari item dengan kategori 'System Integration'
      },
      (error) => {
        console.error('Error fetching submenu and layanan data:', error);
      }
    );
  }
}