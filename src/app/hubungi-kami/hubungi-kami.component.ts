import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentitasKantorService, IdentitasKantor } from '../identitaskantor/identitaskantor.service';
import { HubungiKamiService, FormulirPesan } from './hubungi-kami.service';

@Component({
  selector: 'app-hubungi-kami',
  templateUrl: './hubungi-kami.component.html',
  styleUrls: ['./hubungi-kami.component.css']
})
export class HubungiKamiComponent implements OnInit {
  form: FormGroup;
  identitasKantorPusat: IdentitasKantor | undefined;
  identitasKantorSupporting1: IdentitasKantor | undefined;
  identitasKantorSupporting2: IdentitasKantor | undefined;
  notelpon: IdentitasKantor | undefined;
  emailkantor: IdentitasKantor | undefined;
  noperson1: IdentitasKantor | undefined;
  emailperson1: IdentitasKantor | undefined;
  noperson2: IdentitasKantor | undefined;
  emailperson2: IdentitasKantor | undefined;

  constructor(
    private identitasKantorService: IdentitasKantorService,
    private hubungiKamiService: HubungiKamiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nama_lengkap: ['', ],
      perusahaan_instansi: ['', ],
      email: ['',],
      nohp_whatsapp: ['', ],
      produk_solusi: ['', ],
      pesan: ['', ]
    });
  }

  ngOnInit(): void {
    this.getIdentitasKantor();
  }

  getIdentitasKantor(): void {
    this.identitasKantorService.getIdentitasKantor().subscribe(
      (data: IdentitasKantor[]) => {
        this.identitasKantorPusat = data.find(kantor => kantor.kategori === 'Kantor Pusat');
        this.identitasKantorSupporting1 = data.find(kantor => kantor.kategori === 'Supporting Kantor1');
        this.identitasKantorSupporting2 = data.find(kantor => kantor.kategori === 'Supporting Kantor2');
        this.notelpon = data.find(kantor => kantor.kategori === 'no telpon');
        this.emailkantor = data.find(kantor => kantor.kategori === 'email kantor');
        this.noperson1 = data.find(kantor => kantor.kategori === 'no person1');
        this.emailperson1 = data.find(kantor => kantor.kategori === 'email person1');
        this.noperson2 = data.find(kantor => kantor.kategori === 'no person2');
        this.emailperson2 = data.find(kantor => kantor.kategori === 'email person2');
      },
      (error) => {
        console.error('Error fetching identitas kantor', error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData: FormulirPesan = this.form.value;
      this.hubungiKamiService.kirimPesan(formData).subscribe(
        (response) => {
          console.log('Pesan berhasil dikirim', response);
          this.form.reset(); // Reset form setelah berhasil dikirim
        },
        (error) => {
          console.error('Gagal mengirim pesan', error);
        }
      );
    } else {
      console.log('Form tidak valid');
    }
  }
}
