import { Component, OnInit } from '@angular/core';
import { TableDetailProdukService, DetailProduk } from '../tabel-detailproduk/table-detailproduk.sevice';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.component.html',
  styleUrls: ['./produk.component.css']
})
export class ProdukComponent implements OnInit {
  produkLainnya: DetailProduk[] = [];

  constructor(private detailprodukservice: TableDetailProdukService) {}

  ngOnInit(): void {
    this.detailprodukservice.getDetailProduk().subscribe((data) => {
     
      this.produkLainnya = data.filter(produk => produk.kategori === 'produk');
    });
  }
}
