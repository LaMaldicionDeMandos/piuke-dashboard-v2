import { Component, OnInit } from "@angular/core";
import {ItemsService} from "../../services/items.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-stock",
  templateUrl: "stock.component.html"
})
export class StockComponent implements OnInit {
  newItem: any;
  showNewItemForm = false;

  items: Observable<any>;

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.items = this.itemsService.getStock();
    this.items.forEach(v => {
      console.log(`${JSON.stringify(v)}`);
    });
  }

  newProduct() {
    this.showNewItemForm = true;
  }

  save() {
    this.showNewItemForm = false;
  }
}
