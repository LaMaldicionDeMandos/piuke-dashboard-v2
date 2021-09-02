import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../services/items.service';
import {StockProduct} from '../../models/stock.product';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';
import * as _ from 'lodash';

const emptyItem = () => { return {code: '', cost: undefined}};
@Component({
  selector: "app-stock",
  templateUrl: "stock.component.html",
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  newItem: any = emptyItem();
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

  @startLoadingIndicator()
  save() {
    this.showNewItemForm = false;
    this.itemsService.newItem(this.newItem)
      .then(item => this.items = _.concat([item], this.items))
      .then(() => {
        this.triggerLoadingIndicatorStop();
        this.newItem = emptyItem();
      })
      /*.catch((e) =>  {
        console.log("Error => " + JSON.stringify(e));
        this.triggerLoadingIndicatorStop()
      });*/
  }

  deleteProduct(product) {
    this.itemsService.deleteItem(product.id);
    _.remove(this.items, (item) => item === product);
  }

  changeCost(item) {
    item['changeCost'] = true;
  }

  doChangeCost(item) {
    delete item.changeCost;
    this.itemsService.update(item.code, {cost: item.cost})
      .catch(e => console.log("Hubo un error!" + JSON.stringify(e)));
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
