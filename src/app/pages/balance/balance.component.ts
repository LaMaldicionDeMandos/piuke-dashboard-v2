import { Component, OnInit } from '@angular/core';
import {SalesService} from "../../services/sales.service";
import {FlattenSale, Sale} from "../../models/sale";
import * as _ from 'lodash';

@Component({
  selector: "app-balance",
  templateUrl: "balance.component.html",
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
