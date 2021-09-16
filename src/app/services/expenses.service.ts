import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JsonConvert} from 'json2typescript';
import * as _ from 'lodash';
import {Expense} from "../models/expense";
import {StockProduct} from "../models/stock.product";

const baseUrl = `${environment.base_url}/expenses`;
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');

const jsonConvert: JsonConvert = new JsonConvert();

@Injectable()
export class ExpensesService {

  constructor(private http: HttpClient) {}

  newExpense(expense: Expense):Promise<Expense> {
    return new Promise((resolve, reject) => {
      this.http.post(baseUrl, expense, {headers})
        .pipe(map(item => jsonConvert.deserializeObject(item, Expense)))
        .subscribe({
          next: item => resolve(item),
          error: e => reject(e),
          complete: () => console.log("Creation complete")
        });
    });
  }

  getExpenses(year: number, month: number): Promise<Expense[]> {
    return new Promise((resolve, reject) => {
      this.http.get(baseUrl + `/${year}/${month}`,  {headers})
        .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, Expense))))
        .subscribe({
          next: items => resolve(items),
          error: e => reject(e),
          complete: () => console.log("Expenses complete")
        });
    });
  }

  getSummary(year: number, month: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.get(baseUrl + `/${year}/${month}/summary`,  {headers})
        .pipe(map((item: any) => item.summary))
        .subscribe({
          next: summary => resolve(summary),
          error: e => reject(e),
          complete: () => console.log("Expenses complete")
        });
    });
  }

}
