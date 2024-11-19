import { Component, OnInit } from '@angular/core';
import { IdentitasKantorService, IdentitasKantor } from 'src/app/identitaskantor/identitaskantor.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  identitasKantor: IdentitasKantor | undefined; 
  footerDescription: string | undefined; 
  supportingKantor1: IdentitasKantor | undefined; 
  supportingKantor2: IdentitasKantor | undefined; 
  notelpon: IdentitasKantor | undefined; 
  

  constructor(private identitaskantorService: IdentitasKantorService) {}

  ngOnInit(): void {
    this.getIdentitasKantor();
  }

  getIdentitasKantor(): void {
    this.identitaskantorService.getIdentitasKantor().subscribe(
      (data: IdentitasKantor[]) => {
 
        const kantorPusatData = data.find(kantor => kantor.kategori === 'Kantor Pusat');
        if (kantorPusatData) {
          this.identitasKantor = kantorPusatData;
        }
        const footerData = data.find(item => item.kategori === 'Footer');
        if (footerData) {
          this.footerDescription = footerData.deskripsi; // Ambil deskripsi
        }
        const supportingKantorData1 = data.find(item => item.kategori === 'Supporting Kantor1');
        if (supportingKantorData1) {
          this.supportingKantor1 = supportingKantorData1; // Simpan data Supporting Kantor1
        }
        const supportingKantorData2 = data.find(item => item.kategori === 'Supporting Kantor2');
        if (supportingKantorData2) {
          this.supportingKantor2 = supportingKantorData2; // Simpan data Supporting Kantor2
        }
        const notelpon = data.find(item => item.kategori === 'no telpon');
        if (notelpon) {
          this.notelpon = notelpon; // Simpan data Supporting Kantor2
        }
      },
      (error) => {
        console.error('Error fetching office identity:', error);
      }
    );
  }
}
