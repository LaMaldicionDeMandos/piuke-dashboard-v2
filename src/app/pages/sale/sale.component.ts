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

  constructor(private salesService: SalesService) {
    this.getSales(this.startDate);
  }

  ngOnInit() {}

  private getSales(date) {
    this.salesService.getSales(date.getFullYear(), date.getMonth() + 1)
      .then(sales => _.reduce(sales, (s, sale) => _.concat(s, sale.saleItems), []))
      .then(_.reverse)
      .then(sales => this.sales = sales);
  }

  closeDatePicker(eventData: any, dp?:any) {
    console.log("Data: " + eventData);
    this.startDate = eventData;
    this.getSales(this.startDate);
    dp.close();
  }

}
