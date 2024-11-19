import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swiper from 'swiper';
import { Autoplay, Scrollbar, Navigation } from 'swiper/modules';
import { TableDetailProdukService, DetailProduk } from '../tabel-detailproduk/table-detailproduk.sevice';

@Component({
  selector: 'app-detail-gis',
  templateUrl: './detail-gis.component.html',
  styleUrls: ['./detail-gis.component.css']
})
export class DetailGisComponent implements OnInit, AfterViewInit {

  detail: DetailProduk | null = null;
  imagesToShow: string[] = [];  // Array untuk menyimpan URL gambar

  constructor(
    private route: ActivatedRoute,
    private detailProdukService: TableDetailProdukService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProductDetail(id);
    }
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  getProductDetail(id: string): void {
    this.detailProdukService.getDetailProduk().subscribe((data: DetailProduk[]) => {
      this.detail = data.find((product) => product.id === id) || null;
      console.log('Detail produk:', this.detail);  // Untuk debugging

      // Setel array imagesToShow dengan gambar yang diperoleh dari detail produk
      if (this.detail) {
        this.imagesToShow = [
          this.detail.gambar_kiri, this.detail.gambar_kiri,   // Dua gambar_kiri
          this.detail.gambar_tengah, this.detail.gambar_tengah, // Dua gambar_tengah
          this.detail.gambar_kanan, this.detail.gambar_kanan  // Dua gambar_kanan
        ].filter(Boolean);  // Mengabaikan gambar yang undefined atau null

       
        this.imagesToShow = [
          this.detail.gambar_kiri,
          this.detail.gambar_tengah,
          this.detail.gambar_kanan,
          this.detail.gambar_kiri,
          this.detail.gambar_tengah,
          this.detail.gambar_kanan,
          
        ].filter(Boolean);
      }
    });
  }

  initializeSwiper(): void {
    console.log('Initializing Swiper...');
    new Swiper('.news-slider', {
      modules: [Autoplay, Scrollbar, Navigation],
      direction: 'horizontal',
      effect: 'coverflow',
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      speed: 800,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      },
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: '.news-slider-next',
        prevEl: '.news-slider-prev'
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      },
    });
  }
}
