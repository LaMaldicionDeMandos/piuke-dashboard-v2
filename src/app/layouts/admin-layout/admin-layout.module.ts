import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";

import {StockComponent} from "../../pages/stock/stock.component";
import {SaleComponent} from "../../pages/sale/sale.component";
import {BalanceComponent} from "../../pages/balance/balance.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  declarations: [
    StockComponent,
    SaleComponent,
    BalanceComponent,
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent
    // RtlComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    ],
})
export class AdminLayoutModule {}
