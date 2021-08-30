import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {JsonConvert} from 'json2typescript';
import {StockProduct} from '../models/stock.product';
import * as _ from 'lodash';

const baseUrl = `${environment.base_url}/products`;
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');

const jsonConvert: JsonConvert = new JsonConvert();

@Injectable()
export class ItemsService {

  constructor(private http: HttpClient) {}

  getStock(): Observable<StockProduct> {
    return this.http.get(baseUrl,  {headers})
      .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, StockProduct))))
      .pipe(map(v => {
        console.log(`value: ${JSON.stringify(v)}`)
        return v;
      }));
  }
}
