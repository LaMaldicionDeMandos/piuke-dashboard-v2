import { Component, OnInit } from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";
import {BestSellersService} from "../../services/bestsellers.service";
import {BestSeller} from "../../models/best_seller";
import * as _ from 'lodash';

@Component({
  selector: "app-bestseller",
  templateUrl: "bestseller.component.html",
  styleUrls: ['./bestseller.component.scss']
})
export class BestSellerComponent implements OnInit {
  bestSellers: BestSeller[] = [];
  constructor(private bestsellerService: BestSellersService) {
    this.getBestSellers();
  }

  ngOnInit() {}

  @startLoadingIndicator()
  getBestSellers() {
    this.bestsellerService.find()
      .then(items => _.orderBy(items, 'rank'))
      .then(items => this.bestSellers = items)
      .then(() => console.log("No fallo!"))
      .catch((e) => console.log("Error => " + e))
      .then(this.triggerLoadingIndicatorStop)
      .catch(this.triggerLoadingIndicatorStop)
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }

}
