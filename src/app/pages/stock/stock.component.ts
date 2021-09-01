import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../services/items.service';
import {StockProduct} from '../../models/stock.product';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';
import * as _ from 'lodash';

@Component({
  selector: "app-stock",
  templateUrl: "stock.component.html",
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  newItem: any;
  showNewItemForm = false;

  items: StockProduct[];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.itemsService.getStock().then(items => this.items = items);
  }

  newProduct() {
    this.showNewItemForm = true;
  }

  save() {
    this.showNewItemForm = false;
  }

  deleteProduct(product) {
    this.itemsService.deleteItem(product.id);
    _.remove(this.items, (item) => item === product);
  }

  @startLoadingIndicator()
  syncItem(product) {
    this.itemsService.syncItem(product.code)
      .then(item => this.getProducts())
      .then(items => this.triggerLoadingIndicatorStop())
      .catch(() => this.triggerLoadingIndicatorStop());
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}
