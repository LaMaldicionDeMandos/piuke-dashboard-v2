import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../services/items.service';
import {map} from 'rxjs/operators';
import {StockProduct} from '../../models/stock.product';
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
}
