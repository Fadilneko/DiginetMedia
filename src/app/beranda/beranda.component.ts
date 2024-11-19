import { Component, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupBerandaComponent } from '../popup-beranda/popup-beranda.component';
import { IdentitasKantorService, IdentitasKantor } from '../identitaskantor/identitaskantor.service'; 
import { SubmenuDanLayananService, SubmenuDanLayanan } from '../submenu-dan-layanan/submenu-dan-layanan.service';
import { DetailProduk, TableDetailProdukService } from '../tabel-detailproduk/table-detailproduk.sevice';
import { TabelDetailProdukComponent } from '../tabel-detailproduk/tabel-detailproduk.component';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.component.html',
  styleUrls: ['./beranda.component.css']
})
export class BerandaComponent implements OnInit {
  identitasKantor: IdentitasKantor[] = [];  
  kantorPusat: IdentitasKantor | undefined;  
  gedung: IdentitasKantor | undefined;

  submenu: SubmenuDanLayanan[] = [];
  produkunggulan: SubmenuDanLayanan[] = [];

  produkLainnya: DetailProduk[] = [];

  produkunggulanjudul:SubmenuDanLayanan | undefined;
  produkunggulan1:SubmenuDanLayanan | undefined;
  produkunggulan2:SubmenuDanLayanan | undefined;
  produkunggulan3:SubmenuDanLayanan | undefined;
  
  produklainnyajudul:SubmenuDanLayanan | undefined;


  judulkomen:SubmenuDanLayanan | undefined;
  isikomen: SubmenuDanLayanan[] = [];

  displayedComments: SubmenuDanLayanan[] = [];
  commentsPerPage = 3;
  currentIndex = 0;

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef,
    private identitasKantorService: IdentitasKantorService,
    private submenudanlayanan: SubmenuDanLayananService,
    private detailprodukservice: TableDetailProdukService 
  ) {}


  ngOnInit(): void {

     this.openDialog();

    this.detailprodukservice.getDetailProduk().subscribe((data) => {
     
      this.produkunggulan = data.filter(produkunggulan => produkunggulan.kategori === 'produk unggulan');
      this.produkLainnya = data.filter(produk => produk.kategori === 'produk');
     

    })

    this.submenudanlayanan.getsSubmenuDanLayanan().subscribe(
      (post) => {
        this.submenu = post;
       
      },
      (error) => {
        console.error('Error fetching blog post', error);
      }
    );

    this.submenudanlayanan.getsSubmenuDanLayanan().subscribe((data) => {
     
      
     
      this.isikomen = data.filter(isikomen => isikomen.kategori === 'isi komen');
      this.updateDisplayedComments();
    });

    this.getIdentitasKantor();
    this.getSubmenuDanLayanan();  
    const scrollToTopButton = this.el.nativeElement.querySelector('.scroll-to-top');
    this.renderer.removeClass(scrollToTopButton, 'show');
  }

  // Metode untuk mendapatkan data dari service
  getIdentitasKantor(): void {
    this.identitasKantorService.getIdentitasKantor().subscribe(
      (data: IdentitasKantor[]) => {
        // Memfilter data yang berkategori Kantor Pusat dan Gedung
        const kantorPusatData = data.filter(kantor => kantor.kategori === 'Kantor Pusat');
        const gedungData = data.filter(kantor => kantor.kategori === 'Gedung');

        // Mengambil data kantor pusat pertama jika ada
        if (kantorPusatData.length > 0) {
          this.kantorPusat = kantorPusatData[0];  // Simpan data kantor pusat
        }

        // Mengambil data gedung pertama jika ada
        if (gedungData.length > 0) {
          this.gedung = gedungData[0];  // Simpan data gedung
        }
      },
      (error) => {
        console.error('Gagal mengambil data kantor', error);
      }
    );
  }

  getSubmenuDanLayanan ():void {
    this.submenudanlayanan.getsSubmenuDanLayanan().subscribe(
      (data:SubmenuDanLayanan[])=> {
        const produkunggulanjudul = data.filter(produkunggulanjudul => produkunggulanjudul.kategori === 'produk unggulan judul' );

        const produklainnyajudul = data.filter(produklainnyajudul => produklainnyajudul.kategori === 'produk lainnya judul' );

        const judulkomen = data.filter(judulkomen => judulkomen.kategori === 'judul komen' );
       

        if(produkunggulanjudul.length > 0){
          this.produkunggulanjudul = produkunggulanjudul[0];
        }

        if(produklainnyajudul.length > 0){
          this.produklainnyajudul = produklainnyajudul[0];
        }
        
        if(judulkomen.length > 0){
          this.judulkomen = judulkomen[0];
        }
       
      }
    )
  }

  updateDisplayedComments() {
    this.displayedComments = this.isikomen.slice(this.currentIndex, this.currentIndex + this.commentsPerPage);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCommentsPerPage();
  }


  updateCommentsPerPage() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 900) {
      this.commentsPerPage = 1; // Display only 1 comment on small screens
    } else {
      this.commentsPerPage = 3; // Display 3 comments on larger screens
    }
    this.updateDisplayedComments();
  }

  // Slide to the previous set of comments
  slideLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.commentsPerPage;
      this.updateDisplayedComments();
    }
  }

  // Slide to the next set of comments
  slideRight() {
    if (this.currentIndex + this.commentsPerPage < this.isikomen.length) {
      this.currentIndex += this.commentsPerPage;
      this.updateDisplayedComments();
    }
  }

  openDialog(): void {
    const isMobile = window.innerHeight <= 800;

    const dialogRef = this.dialog.open(PopupBerandaComponent, {
      width: isMobile ? '39%' : '800',
      maxWidth: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog ditutup');
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const section1 = this.el.nativeElement.querySelector('#section1');
    const section1Position = section1.offsetTop;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollToTopButton = this.el.nativeElement.querySelector('.scroll-to-top');

    if (scrollPosition > section1Position) {
      this.renderer.addClass(scrollToTopButton, 'show');
    } else {
      this.renderer.removeClass(scrollToTopButton, 'show');
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
