import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {CommonModule} from "@angular/common";
import {ItemsService} from "./services/items.service";
import { LoadingIndicatorModule, LOADING_INDICATOR_CONFIG, EllipsisComponent} from '@btapai/ng-loading-indicator';
import {SalesService} from "./services/sales.service";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    LoadingIndicatorModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [ItemsService, SalesService,
   // {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    {provide: LOADING_INDICATOR_CONFIG, useValue: { color: '#f6a821',size: 160, indicatorComponent: EllipsisComponent }
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
