import { Component, OnInit } from "@angular/core";
import {ItemsService} from "../../services/items.service";

@Component({
  selector: "app-stock",
  templateUrl: "stock.component.html"
})
export class StockComponent implements OnInit {
  items;

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.itemsService.getStock().then(items => this.items = items);
  }


}
