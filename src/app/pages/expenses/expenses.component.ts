import { Component, OnInit } from '@angular/core';
import {startLoadingIndicator, stopLoadingIndicator} from "@btapai/ng-loading-indicator";

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
  expenses = [{date: new Date(), desc: 'Cinta de embalar', value: 232.17}];

  constructor() {}

  ngOnInit() {}

  newExpense() {
    this.showNewExpenseForm = true;
  }

  @startLoadingIndicator()
  save() {
    this.showNewExpenseForm = false;
    Promise.resolve()
      .then(() => {
        this.triggerLoadingIndicatorStop();
        this.newItem = emptyExpense();
      });
  }

  @stopLoadingIndicator()
  triggerLoadingIndicatorStop() {
    console.log('stopped');
  }

  closeDatePicker(eventData: any, dp?:any) {
    console.log("Data: " + eventData);
    this.startDate = eventData;
    // TODO actualizar gastos this.getSales(this.startDate);
    dp.close();
  }
}
