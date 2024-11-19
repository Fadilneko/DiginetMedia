import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BerandaComponent } from '../beranda/beranda.component';
import { InfoSelengkapnyaBerandaComponent } from '../info-selengkapnya-beranda/info-selengkapnya-beranda.component';
import { HubungiKamiComponent } from '../hubungi-kami/hubungi-kami.component';
import { ProdukComponent } from '../produk/produk.component';
import { BlogComponent } from '../blog/blog.component';
import { LainLainComponent } from '../lain-lain/lain-lain.component';
import { LayananKamiComponent } from '../layanan-kami/layanan-kami.component';
import { ProfilComponent } from '../profil/profil.component';
import { TrainingComponent } from '../training/training.component';
import { DetailBlogComponent } from '../detail-blog/detail-blog.component';
import { TeknologiComponent } from '../teknologi/teknologi.component';
import { DetailGisComponent } from '../detail-gis/detail-gis.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
{
  path: '',
  component: DashboardComponent,
  children: [

  { path: '', component: BerandaComponent },
  { path: 'beranda', component:BerandaComponent},
  { path: 'info-selengkapnya-beranda', component:InfoSelengkapnyaBerandaComponent},
  { path: 'produk', component:ProdukComponent},
  { path: 'hubungi-kami', component:HubungiKamiComponent},
  { path: 'blog', component:BlogComponent},
  { path: 'blog/:id', component: DetailBlogComponent },
  { path: 'detail/:id', component: DetailGisComponent },
  { path: 'lain-lain', component:LainLainComponent},
  { path: 'layanan-kami', component: LayananKamiComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'detail-blog', component: DetailBlogComponent },
  { path: 'teknologi', component: TeknologiComponent },
  { path: 'detail-gis/:id', component: DetailGisComponent},
  
  ],
},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
