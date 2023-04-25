import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/authService/auth.service';
import { BaseApiService } from './core/baseApi/base-api.service';
import { ToastrModule } from 'ngx-toastr';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from './core/cartService/cart.service';
import { SidebarModule } from 'ng-sidebar';
import { NgxPayPalModule } from 'ngx-paypal';
@NgModule({
  declarations: [
    AppRoutingModule.componentsDeclarations,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    SidebarModule,
    NgxPayPalModule
  ],
  providers: [
    BaseApiService,
    AuthService,
    CartService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
