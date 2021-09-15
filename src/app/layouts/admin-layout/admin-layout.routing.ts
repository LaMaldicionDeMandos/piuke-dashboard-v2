import { Routes } from "@angular/router";

import {StockComponent} from "../../pages/stock/stock.component";
import {SaleComponent} from "../../pages/sale/sale.component";
import {BalanceComponent} from "../../pages/balance/balance.component";
import {ExpensesComponent} from "../../pages/expenses/expenses.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", redirectTo: "stock" },
  { path: "stock", component: StockComponent },
  { path: "sales", component: SaleComponent },
  { path: "expenses", component: ExpensesComponent },
  { path: "balance", component: BalanceComponent }
];
