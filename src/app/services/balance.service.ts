import {Injectable} from '@angular/core';
import {SalesService} from "./sales.service";
import {ExpensesService} from "./expenses.service";

@Injectable()
export class BalanceService {

  constructor(private salesService: SalesService, private expensesService: ExpensesService) {}

  getExpenses(year: number, month: number): Promise<number> {
    return this.expensesService.getSummary(year, month);
  }

  getSales(year: number, month: number): Promise<number> {
    return this.salesService.getSummary(year, month);
  }

}
