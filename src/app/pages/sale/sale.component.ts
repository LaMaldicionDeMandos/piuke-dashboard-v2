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
  startDate = new Date(1990, 0, 1);
  sales: FlattenSale[];

  constructor(private salesService: SalesService) {
    this.salesService.getSales()
      .then(sales => _.reduce(sales, (s, sale) => _.concat(s, sale.saleItems), []))
      .then(sales => this.sales = sales);
  }

  ngOnInit() {}

}
