import { Routes } from "@angular/router";

import {StockComponent} from "../../pages/stock/stock.component";
import {SaleComponent} from "../../pages/sale/sale.component";
import {BalanceComponent} from "../../pages/balance/balance.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", redirectTo: "stock" },
  { path: "stock", component: StockComponent },
  { path: "sales", component: SaleComponent },
  { path: "expenses", component: SaleComponent },
  { path: "balance", component: BalanceComponent }
];
