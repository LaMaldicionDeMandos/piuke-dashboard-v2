import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../services/items.service';
import {StockProduct} from '../../models/stock.product';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';
import * as _ from 'lodash';

const emptyItem = () => { return {code: '', cost: undefined}};
@Component({
  selector: "app-products",
  templateUrl: "products.component.html",
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  newItem: any = emptyItem();
  showNewItemForm = false;

  items: StockProduct[];

  sorters = [
    { label: 'Nombre', fun: (items) => _.sortBy(items, ['title'])},
    { label: 'Ventas', fun: (items) => _.orderBy(items, ['sales', 'questions', 'visits'], ['desc', 'desc', 'desc'])},
    { label: 'Stock', fun: (items) => _.orderBy(items, ['stock'], ['desc'])},
    { label: 'Mayor Calidad', fun: (items) => _.orderBy(items, ['health'], ['desc'])},
    { label: 'Menor Calidad', fun: (items) => _.orderBy(items, ['health'], ['asc'])}
    ];

  currentSorter: any;

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.getProducts();
  }

  @startLoadingIndicator()
  getProducts() {
    this.itemsService.getProducts()
      .then(items => this.items = items)
      .then(this.triggerLoadingIndicatorStop)
      .catch(this.triggerLoadingIndicatorStop)
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

  sort(sorter) {
    this.items = sorter.fun(this.items);
    this.currentSorter = sorter;
  }

  @startLoadingIndicator()
  syncItem(product) {
    this.itemsService.syncItem(product.code)
      .then(this.getProducts)
      .then(this.triggerLoadingIndicatorStop)
      .catch(this.triggerLoadingIndicatorStop);
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}
