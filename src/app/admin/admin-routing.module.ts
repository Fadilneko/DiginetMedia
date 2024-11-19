import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from '../blog-list/blog-list.component';

import { BlogFormComponent } from '../blog-form/blog-form.component';
import { AdminComponent } from './admin.component';
import { BerandaAdminComponent } from '../beranda-admin/beranda-admin.component';
import { SubmenuDanLayananComponent } from '../submenu-dan-layanan/submenu-dan-layanan.component';
import { TableLainLainComponent } from '../table-lain-lain/table-lain-lain.component';
import { ProfilAdminComponent } from '../profil-admin/profil-admin.component';
import { TabelDetailProdukComponent } from '../tabel-detailproduk/tabel-detailproduk.component';
import { IdentitaskantorComponent } from '../identitaskantor/identitaskantor.component';
import { AuthGuard } from '../auth.guard';
import { TableFiturComponent } from '../table-fitur/table-fitur.component';
import { TableHubungikamiComponent } from '../table-hubungikami/table-hubungikami.component';


const routes: Routes = [

  {
    path: '',
    component: AdminComponent,
    children: [
  {path:'', component:BerandaAdminComponent,  canActivate: [AuthGuard]},
  {path: 'bloglist',component:BlogListComponent},
  {path: 'submenu-dan-layanan', component:SubmenuDanLayananComponent, },
  {path: 'table-lain-lain', component:TableLainLainComponent, },
  {path: 'profil-admin', component:ProfilAdminComponent,},
  {path: 'table-detail-produk', component:TabelDetailProdukComponent},
  {path: 'identitas-kantor', component:IdentitaskantorComponent,},
  {path: 'table-fitur', component:TableFiturComponent},
  {path: 'table-hubungikami', component:TableHubungikamiComponent},
  
    ],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
