import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { AdminComponent } from '../admin/admin.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
{path: '', component: LoginComponent
},
{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
