import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JsonConvert} from 'json2typescript';
import * as _ from 'lodash';

const baseUrl = `${environment.base_url}/expenses`;
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');

const jsonConvert: JsonConvert = new JsonConvert();

@Injectable()
export class ExpensesService {

  constructor(private http: HttpClient) {}

  getExpenses(year: number, month: number): Promise<any[]> {
    return Promise.resolve([{date: new Date(), desc: 'Cinta de embalar', value: 232.17}]);
  }

}
