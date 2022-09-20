import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RootRoutingModule } from './root.routing.module';
import { RootComponent } from './root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NativeService } from './core/native/native.service';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { BaseApiService } from './core/baseApi/base-api.service';
import { AuthService } from './core/authService/auth.service';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RootRoutingModule,
    PagesModule,
    SharedModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    NativeService,
    BaseApiService,
    AuthService
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }
