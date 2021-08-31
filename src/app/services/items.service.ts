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

  getStock(): Observable<StockProduct[]> {
    return this.http.get(baseUrl,  {headers})
      .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, StockProduct))));
  }

  deleteItem(id: string) {
    console.log('Deleting ' + id);
    return this.http.delete(`${baseUrl}/${id}`, {headers}).subscribe(
      {
        next: (value) => console.log('Next'),
        error: (e) => console.log('Error ' + JSON.stringify(e)),
        complete: () => console.log('Complete')
      });
  }
}
