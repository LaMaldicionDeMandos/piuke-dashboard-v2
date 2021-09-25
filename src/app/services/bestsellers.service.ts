import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JsonConvert} from 'json2typescript';
import * as _ from 'lodash';
import {BestSeller} from "../models/best_seller";

const baseUrl = `${environment.base_url}/bestsellers`;
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');

const jsonConvert: JsonConvert = new JsonConvert();

@Injectable()
export class BestSellersService {

  constructor(private http: HttpClient) {}

  find(category: string = undefined): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const cat = category ? `/${category}` : '';
      this.http.get(baseUrl + cat,  {headers})
        .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, BestSeller))))
        .subscribe({
          next: items => resolve(items),
          error: e => reject(e),
          complete: () => console.log("Best Sellers complete")
        });
    });
  }
}
