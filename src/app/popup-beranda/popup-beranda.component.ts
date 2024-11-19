import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { PopupAlertberandaComponent } from '../popup-alertberanda/popup-alertberanda.component';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { FormulirPesan, HubungiKamiService } from '../hubungi-kami/hubungi-kami.service';

@Component({
  selector: 'app-popup-beranda',
  templateUrl: './popup-beranda.component.html',
  styleUrls: ['./popup-beranda.component.css']
})
export class PopupBerandaComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<PopupBerandaComponent>,
    public dialog: MatDialog,
    private hubungiKamiService: HubungiKamiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nama_lengkap: ['', Validators.required],
      perusahaan_instansi: ['', Validators.required ],
      email: ['',Validators.required ],
      nohp_whatsapp: ['', Validators.required  ],
      produk_solusi: ['',  ],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  openDialog(): void {

   
    if (this.form.valid) {

      this.dialogRef.close();
      
      const dialogRef = this.dialog.open(PopupAlertberandaComponent, {
        
      });

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
      
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog ditutup');
    
    });
     
    } else {
      console.log('Form tidak valid');
    }


   
  }  

  ngOnInit(): void {
   
  }


  onSubmit(): void {
   
  }

}


