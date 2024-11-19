// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';

import { NgApexchartsModule } from 'ng-apexcharts';

import { FormsModule } from '@angular/forms';  // Import FormsModule

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';
import { BodyComponent } from './body/body.component';
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
import { BerandaComponent } from './beranda/beranda.component';
import { PopupBerandaComponent } from './popup-beranda/popup-beranda.component';
import { InfoSelengkapnyaBerandaComponent } from './info-selengkapnya-beranda/info-selengkapnya-beranda.component';
import { ProdukComponent } from './produk/produk.component';
import { HubungiKamiComponent } from './hubungi-kami/hubungi-kami.component';
import { LainLainComponent } from './lain-lain/lain-lain.component';
import { BlogComponent } from './blog/blog.component';
import { TeknologiComponent } from './teknologi/teknologi.component';
import { LayananKamiComponent } from './layanan-kami/layanan-kami.component';
import { ProfilComponent } from './profil/profil.component';
import { TrainingComponent } from './training/training.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';
import { GisInvestasiComponent } from './gis-investasi/gis-investasi.component';
import { ELayananComponent } from './e-layanan/e-layanan.component';
import { DetailGisComponent } from './detail-gis/detail-gis.component';

import { HttpClientModule } from '@angular/common/http';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { BerandaAdminComponent } from './beranda-admin/beranda-admin.component';
import { SubmenuDanLayananComponent } from './submenu-dan-layanan/submenu-dan-layanan.component';
import { HeaderAdminComponent } from './beranda-admin/header-admin/header-admin.component';
import { PopupSubmenuDanLayananComponent } from './popup-submenu-dan-layanan/popup-submenu-dan-layanan.component';
import { PopupKonfirmasiComponent } from './popup-konfirmasi/popup-konfirmasi.component';
import { TableLainLainComponent } from './table-lain-lain/table-lain-lain.component';
import { PopupTableLainLainComponent } from './popup-table-lain-lain/popup-table-lain-lain.component';
import { LoginComponent } from './login/login.component';
import { FormDetailProdukComponent } from './form-detailproduk/form-detailproduk.component';
import { FormIdentitaskantorComponent } from './form-identitaskantor/form-identitaskantor.component';
import { FormProfilComponent } from './form-profil/form-profil.component';
import { PopuptambahClientComponent } from './popup-tambahclient/popup-tambahclient.component';
import { PopupTambahcorevalueComponent } from './popup-tambahcorevalue/popup-tambahcorevalue.component';
import { PopupTambahkelebihanComponent } from './popup-tambahkelebihan/popup-tambahkelebihan.component';
import { TableFiturComponent } from './table-fitur/table-fitur.component';
import { PopupAlertberandaComponent } from './popup-alertberanda/popup-alertberanda.component';






// swiper


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BodyComponent,

    
    // diginet
    BerandaComponent,
    PopupBerandaComponent,
    InfoSelengkapnyaBerandaComponent,
    ProdukComponent,
    HubungiKamiComponent,
    BlogComponent,
    LainLainComponent,
    LayananKamiComponent,
    ProfilComponent,
    TrainingComponent,
    DetailBlogComponent,
    GisInvestasiComponent,
    ELayananComponent,
    TeknologiComponent,
    DetailGisComponent,
    BlogListComponent,
    BlogFormComponent,
    PopupSubmenuDanLayananComponent,
    PopupKonfirmasiComponent,
    TableLainLainComponent,
    PopupTableLainLainComponent,

    FormDetailProdukComponent,
    FormIdentitaskantorComponent,
    FormProfilComponent,
    PopuptambahClientComponent,
    PopupTambahcorevalueComponent,
    PopupTambahkelebihanComponent,
    PopupAlertberandaComponent,
    
    




 
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
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
  bootstrap: [AppComponent],
  entryComponents: [
   
  ]
})
export class AppModule { }
