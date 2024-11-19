import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfilAdminService, Profil } from '../profil-admin/profil-admin.service';
import { IdentitasKantorService, IdentitasKantor } from '../identitaskantor/identitaskantor.service';
import Swiper from 'swiper';
import { Autoplay, Scrollbar, Navigation } from 'swiper/modules';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy { 
  
  logos: string[] = [];
  autoSlideInterval: any;  // Interval untuk slide otomatis
  profilList: Profil[] = [];
  headerProfil?: Profil;
  isi1Profil?: Profil;
  isi2Profil?: Profil;
  visiList: Profil[] = [];
  misiList: Profil[] = [];
  judulkelebihanproduk?: Profil;
  identitasKantorList: IdentitasKantor[] = [];
  kantorPusat?: string;
  memilihKami?: Profil;
  listPilihKami: Profil[] = [];
  coreValues?: Profil;
  klienkami?: Profil;

  logoKlienList: Profil[] = [];
  kelebihanProdukList: Profil[] = [];
  produk: any;
  
  industryPartnersImage?: string;
  industryPartnersTitle?: string;

  constructor(
    private profilAdminService: ProfilAdminService,
    private identitasKantorService: IdentitasKantorService
  ) {}

  ngOnInit(): void {
    this.loadProfilData();
    this.loadIdentitasKantorData();

    // Menambahkan interval untuk memutar gambar otomatis
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval); // Menghentikan interval saat komponen dihancurkan
    }
  }

  loadProfilData(): void {
    this.profilAdminService.getsProfil().subscribe(
      (data) => {
        this.profilList = data;
        this.headerProfil = this.profilList.find(item => item.kategori === 'header profil');
        this.isi1Profil = this.profilList.find(item => item.kategori === 'isi1');
        this.isi2Profil = this.profilList.find(item => item.kategori === 'isi2');
        this.visiList = this.profilList.filter(item => item.kategori === 'visi');
        this.misiList = this.profilList.filter(item => item.kategori === 'misi');
        this.memilihKami = this.profilList.find(item => item.kategori === 'judul memilih kami');
        this.listPilihKami = this.profilList.filter(item => item.kategori === 'list pilih kami');
        this.coreValues = this.profilList.find(item => item.kategori === 'Core Values');
        this.judulkelebihanproduk = this.profilList.find(item => item.kategori === 'judul kelebihan produk');
        this.kelebihanProdukList = this.profilList.filter(item => item.kategori === 'kelebihan produk');
        this.logoKlienList = this.profilList.filter(item => item.kategori === 'logo klien');
        
        this.logos = this.profilList
          .filter(item => item.kategori === 'industry partners')
          .map(item => item.gambar);

        const industryPartners = this.profilList.find(item => item.kategori === 'judul industry partners');
        this.industryPartnersImage = industryPartners ? industryPartners.gambar : undefined;
        
        this.industryPartnersTitle = industryPartners ? industryPartners.judul : undefined;
      },
      (error) => console.error('Error loading profile data:', error)
    );
  }

  loadIdentitasKantorData(): void {
    this.identitasKantorService.getIdentitasKantor().subscribe(
      (data) => {
        this.identitasKantorList = data;
        const kantorPusatData = this.identitasKantorList.find(item => item.kategori === 'Kantor Pusat');
        this.kantorPusat = kantorPusatData ? kantorPusatData.kantor : 'Dignet Media';
      },
      (error) => console.error('Error loading office identity data:', error)
    );
  }

  // Fungsi untuk memulai slide otomatis
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      // Memindahkan gambar pertama ke belakang untuk animasi slide
      this.logos.push(this.logos.shift()!);
    }, 3000);  // Setiap 3 detik gambar akan berganti
  }
}
