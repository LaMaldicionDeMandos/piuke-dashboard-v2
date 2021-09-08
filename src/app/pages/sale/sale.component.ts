import { Component, OnInit } from '@angular/core';
import { startLoadingIndicator, stopLoadingIndicator } from '@btapai/ng-loading-indicator';
import * as _ from 'lodash';

@Component({
  selector: "app-sale",
  templateUrl: "sale.component.html",
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  currentSorter: any;

  constructor() {}

  ngOnInit() {}

}
