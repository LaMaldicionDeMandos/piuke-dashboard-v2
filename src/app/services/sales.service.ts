import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JsonConvert} from 'json2typescript';
import * as _ from 'lodash';
import {Sale} from "../models/sale";

const baseUrl = `${environment.base_url}/sales`;
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');

const jsonConvert: JsonConvert = new JsonConvert();

@Injectable()
export class SalesService {

  constructor(private http: HttpClient) {}

  getSales(): Promise<Sale[]> {
    return new Promise((resolve, reject) => {
      this.http.get(baseUrl,  {headers})
        .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, Sale))))
        .subscribe({
          next: items => resolve(items),
          error: e => reject(e),
          complete: () => console.log("Sales complete")
        });
    });
  }

}
