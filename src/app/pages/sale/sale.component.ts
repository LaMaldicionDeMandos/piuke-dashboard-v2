import { Component, OnInit } from '@angular/core';
import {SalesService} from "../../services/sales.service";
import {FlattenSale, Sale} from "../../models/sale";
import * as _ from 'lodash';

@Component({
  selector: "app-sale",
  templateUrl: "sale.component.html",
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  startDate = new Date();
  sales: FlattenSale[];

  grossSales: number = 0;
  netSales: number = 0;
  profits: number = 0;

  constructor(private salesService: SalesService) {
    this.getSales(this.startDate);
  }

  ngOnInit() {}

  private getSales(date) {
    this.salesService.getSales(date.getFullYear(), date.getMonth() + 1)
      .then(sales => _.reduce(sales, (s, sale) => _.concat(s, sale.saleItems), []))
      .then(_.reverse)
      .then(sales => this.sales = sales)
      .then(sales => {
        this.grossSales = 0;
        this.netSales = 0;
        this.profits = 0;
        _.each(sales, sale => {
          this.grossSales+= sale.price;
          this.netSales+= sale.refill;
          this.profits+= sale.profit;
        });
      });
  }

  closeDatePicker(eventData: any, dp?:any) {
    console.log("Data: " + eventData);
    this.startDate = eventData;
    this.getSales(this.startDate);
    dp.close();
  }

}
