import { Component, OnInit } from '@angular/core';
import {BalanceService} from "../../services/balance.service";
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";

@Component({
  selector: "app-balance",
  templateUrl: "balance.component.html",
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  startDate = new Date();
  _expenses: number = 234.22;
  _sales: number = 308.17;

  constructor(private balanceService: BalanceService) {
    this.getBalance(this.startDate);
  }

  ngOnInit() {}

  get expenses() {
    return this._expenses || 0;
  }

  get sales() {
    return this._sales || 0;
  }

  get balance() {
    return this.sales - this.expenses;
  }

  @startLoadingIndicator()
  private getBalance(date) {
    const expensesPromise = this.balanceService.getExpenses(date.getFullYear(), date.getMonth() + 1)
      .then(ex => this._expenses = ex);
    const salesPromise = this.balanceService.getSales(date.getFullYear(), date.getMonth() + 1)
      .then(sa => this._sales = sa);
    Promise.all([expensesPromise, salesPromise])
      .then(this.triggerLoadingIndicatorStop)
      .catch(this.triggerLoadingIndicatorStop);
  }

  closeDatePicker(eventData: any, dp?:any) {
    console.log("Data: " + eventData);
    this.startDate = eventData;
    this.getBalance(this.startDate);
    dp.close();
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }
}
