import { Routes } from "@angular/router";

import {ProductsComponent} from "../../pages/products/products.component";
import {SaleComponent} from "../../pages/sale/sale.component";
import {BalanceComponent} from "../../pages/balance/balance.component";
import {ExpensesComponent} from "../../pages/expenses/expenses.component";
import {PerformanceComponent} from "../../pages/performance/performance.component";
import {BestSellerComponent} from "../../pages/bestsellers/bestseller.component";
import {PriceAlertsComponent} from "../../pages/price-alrts/price-alerts.component";
import {StockComponent} from "../../pages/stock/stock.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", redirectTo: "stock" },
  { path: "products", component: ProductsComponent },
  { path: "stock", component: StockComponent },
  { path: "competition", component: PriceAlertsComponent },
  { path: "sales", component: SaleComponent },
  { path: "expenses", component: ExpensesComponent },
  { path: "balance", component: BalanceComponent },
  { path: "performance", component: PerformanceComponent },
  { path: "bestsellers", component: BestSellerComponent }
];
