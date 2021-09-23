import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JsonConvert} from 'json2typescript';
import * as _ from 'lodash';
import {Sale} from "../models/sale";
import {Performance} from "../models/performance";

const baseUrl = `${environment.base_url}/sales`;
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');

const jsonConvert: JsonConvert = new JsonConvert();

@Injectable()
export class SalesService {

  constructor(private http: HttpClient) {}

  getSales(year: number, month: number): Promise<Sale[]> {
    return new Promise((resolve, reject) => {
      this.http.get(baseUrl + `/${year}/${month}`,  {headers})
        .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, Sale))))
        .subscribe({
          next: items => resolve(items),
          error: e => reject(e),
          complete: () => console.log("Sales complete")
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
          complete: () => console.log("Sales complete")
        });
    });
  }

  getPerformance(year: number = undefined, month: number = undefined): Promise<Performance[]> {
    const url = this.makeUrlByDate(year, month);
    return new Promise((resolve, reject) => {
      this.http.get(url + '/performance',  {headers})
        .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, Performance))))
        .subscribe({
          next: items => resolve(items),
          error: e => reject(e),
          complete: () => console.log("performances complete")
        });
    });
  }

  private makeUrlByDate(year: number = undefined, month: number = undefined): string {
    if (!year && !month) return baseUrl;
    if (year && !month) return baseUrl + '/' + year;
    return `${baseUrl}/${year}/${month}`;
  }

}
