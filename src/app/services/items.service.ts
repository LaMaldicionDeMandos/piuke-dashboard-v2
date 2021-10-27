import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JsonConvert} from 'json2typescript';
import {StockProduct} from '../models/stock.product';
import * as _ from 'lodash';
import {Competition, CompetitionProduct} from "../models/competition.product";

const baseUrl = `${environment.base_url}/products`;
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');

const jsonConvert: JsonConvert = new JsonConvert();

@Injectable()
export class ItemsService {

  constructor(private http: HttpClient) {}

  newItem(item):Promise<StockProduct> {
    return new Promise((resolve, reject) => {
      this.http.post(baseUrl, item, {headers})
        .pipe(map(item => jsonConvert.deserializeObject(item, StockProduct)))
        .subscribe({
          next: item => resolve(item),
          error: e => reject(e),
          complete: () => console.log("Creation complete")
        });
    });
  }

  getStock(): Promise<StockProduct[]> {
    return new Promise((resolve, reject) => {
      this.http.get(baseUrl,  {headers})
        .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, StockProduct))))
        .subscribe({
          next: items => resolve(items),
          error: e => reject(e),
          complete: () => console.log("Stock complete")
        });
    });
  }

  syncItem(code: string): Promise<StockProduct> {
    return new Promise((resolve, reject) => {
      this.http.get(baseUrl + `/sync/${code}`,  {headers})
        .pipe(map(item => jsonConvert.deserializeObject(item, StockProduct)))
        .subscribe({
          next: item => resolve(item),
          error: e => reject(e),
          complete: () => console.log("Sync complete")
        });
    });
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

  update(code, change) {
    return new Promise((resolve, reject) => {
      this.http.patch(baseUrl + `/${code}`, change, {headers})
        .pipe(map(item => jsonConvert.deserializeObject(item, StockProduct)))
        .subscribe({
          next: item => resolve(item),
          error: e => reject(e),
          complete: () => console.log("Creation complete")
        });
    });
  }

  getCompetitions(): Promise<CompetitionProduct[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/competitions`,  {headers})
        .pipe(map(items => _.map(items, item => jsonConvert.deserializeObject(item, CompetitionProduct))))
        .subscribe({
          next: items => resolve(items),
          error: e => reject(e),
          complete: () => console.log("COMPETITIONS complete")
        });
    });
  }

  newCompetitions(item: CompetitionProduct, ownerId: string, itemId: string): Promise<CompetitionProduct> {
    return new Promise((resolve, reject) => {
      this.http.post(`${baseUrl}/${item.code}/competitions`, {owner_id: ownerId, item_id: itemId},  {headers})
        .pipe(map(item => jsonConvert.deserializeObject(item, CompetitionProduct)))
        .subscribe({
          next: item => resolve(item),
          error: e => reject(e),
          complete: () => console.log("ADD COMPETITION complete")
        });
    });
  }

  updateCompetition(item: CompetitionProduct, comp: Competition): Promise<CompetitionProduct> {
    return new Promise((resolve, reject) => {
      this.http.put(`${baseUrl}/${item.code}/competitions`, jsonConvert.serializeObject(comp),  {headers})
        .pipe(map(item => jsonConvert.deserializeObject(item, CompetitionProduct)))
        .subscribe({
          next: item => resolve(item),
          error: e => reject(e),
          complete: () => console.log("update COMPETITION complete")
        });
    });
  }

  syncItemCompetitions(item: CompetitionProduct): Promise<CompetitionProduct> {
    return new Promise((resolve, reject) => {
      this.http.post(`${baseUrl}/${item.code}/competitions/sync`,  {},{headers})
        .pipe(map(item => jsonConvert.deserializeObject(item, CompetitionProduct)))
        .subscribe({
          next: item => resolve(item),
          error: e => reject(e),
          complete: () => console.log("sync COMPETITIONS complete")
        });
    });
  }
}
