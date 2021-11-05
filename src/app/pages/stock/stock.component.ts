import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../services/items.service';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';
import {Stock} from "../../models/stock";
import * as _ from 'lodash';

@Component({
  selector: "app-stock",
  templateUrl: "stock.component.html",
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  items: Stock[];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.getStock();
  }

  @startLoadingIndicator()
  getStock() {
    this.itemsService.getStock()
      .then(items => _.orderBy(items, ['percent']))
      .then(items => this.items = items)
      .then(this.triggerLoadingIndicatorStop)
      .catch(this.triggerLoadingIndicatorStop)
  }

  addOrder(item) {
    console.log("Adding to orders");
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}
