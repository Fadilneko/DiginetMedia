import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';

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


// Popup

// diginet media


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AuthInterceptor } from '../service/auth.interceptor';





// swiper


@NgModule({
  declarations: [
    LoginComponent,
 
    

  ],
  imports: [
    CommonModule,
   LoginRoutingModule,
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
   


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [LoginComponent],
  entryComponents: [
   
  ]
})
export class LoginModule { }
