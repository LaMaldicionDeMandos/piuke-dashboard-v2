import { Component, OnInit } from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";
import {ExpensesService} from "../../services/expenses.service";
import * as _ from 'lodash';
import {Expense} from "../../models/expense";

const emptyExpense = () => { return {desc: '', value: undefined}};

@Component({
  selector: "app-expenses",
  templateUrl: "expenses.component.html",
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  newItem: any = emptyExpense();
  showNewExpenseForm = false;
  startDate = new Date();
  expenses: Expense[];

  constructor(private expensesService: ExpensesService) {
    this.getExpenses(this.startDate);
  }

  ngOnInit() {}

  newExpense() {
    this.showNewExpenseForm = true;
  }

  @startLoadingIndicator()
  save() {
    this.showNewExpenseForm = false;
    this.expensesService.newExpense(this.newItem)
      .then(() => this.newItem = emptyExpense())
      .then(() => this.getExpenses(this.startDate))
      .then(this.triggerLoadingIndicatorStop)
      .catch(this.triggerLoadingIndicatorStop);
  }

  @startLoadingIndicator()
  private getExpenses(date) {
    this.expensesService.getExpenses(date.getFullYear(), date.getMonth() + 1)
      .then(_.reverse)
      .then(expenses => this.expenses = expenses)
      .then(this.triggerLoadingIndicatorStop)
      .catch(this.triggerLoadingIndicatorStop)
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }

  closeDatePicker(eventData: any, dp?:any) {
    console.log("Data: " + eventData);
    this.startDate = eventData;
    this.getExpenses(this.startDate);
    dp.close();
  }
}
