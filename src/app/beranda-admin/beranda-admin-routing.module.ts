import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BerandaAdminComponent } from './beranda-admin.component';
import { SubmenuDanLayananComponent } from '../submenu-dan-layanan/submenu-dan-layanan.component';

const routes: Routes = [

   
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BerandaAdminRoutingModule { }
  