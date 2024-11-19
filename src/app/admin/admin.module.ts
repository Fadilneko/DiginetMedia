// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminComponent } from './admin.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';


import { NgApexchartsModule } from 'ng-apexcharts';

import { FormsModule } from '@angular/forms';  // Import FormsModule

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import {matTooltipAnimations, MatTooltipModule} from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';


// Nestable
import { NestableModule } from 'ngx-nestable';

// Popup

// diginet media


import { HttpClientModule } from '@angular/common/http';

import { HeaderAdminComponent } from '../beranda-admin/header-admin/header-admin.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { BerandaAdminComponent } from '../beranda-admin/beranda-admin.component';
import { SidebarComponent } from '../beranda-admin/sidebar/sidebar.component';
import { SubmenuDanLayananComponent } from '../submenu-dan-layanan/submenu-dan-layanan.component';
import { BodyAdminComponent } from '../body-admin/body-admin.component';
import { ProfilAdminComponent } from '../profil-admin/profil-admin.component';
import { PopupProfilAdminComponent } from '../popup-profil-admin/popup-profil-admin.component';
import { TabelDetailProdukComponent } from '../tabel-detailproduk/tabel-detailproduk.component';
import { PopupTambahfiturprodukComponent } from '../popup-tambahfiturproduk/popup-tambahfiturproduk.component';
import { PopupTambahkeunggulanprodukComponent } from '../popup-tambahkeunggulanproduk/popup-tambahkeunggulanproduk.component';
import { PopupTambahproduklainnyaComponent } from '../popup-tambahproduklainnya/popup-tambahproduklainnya.component';
import { IdentitaskantorComponent } from '../identitaskantor/identitaskantor.component';
import { TableFiturComponent } from '../table-fitur/table-fitur.component';
import { TableHubungikamiComponent } from '../table-hubungikami/table-hubungikami.component';






// swiper


@NgModule({
  declarations: [
    AdminComponent,
    HeaderAdminComponent,
    SidebarComponent,
    BerandaAdminComponent,
    SubmenuDanLayananComponent,
    BodyAdminComponent,
    ProfilAdminComponent,
    PopupProfilAdminComponent,
    TabelDetailProdukComponent,
    PopupTambahfiturprodukComponent,
    PopupTambahkeunggulanprodukComponent,
    PopupTambahproduklainnyaComponent,
    IdentitaskantorComponent,
    TableFiturComponent,
    TableHubungikamiComponent
    

    

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
   
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
   
    // angular
    FormsModule,

    NgApexchartsModule,
    FontAwesomeModule,

    // Angular Material
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatBadgeModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,

   
    // http client
    HttpClientModule,

    // swiper
   

    // Nestable
    NestableModule
  ],
  providers: [],
  bootstrap: [AdminComponent],
  entryComponents: [
   
  ]
})
export class AdminModule { }
