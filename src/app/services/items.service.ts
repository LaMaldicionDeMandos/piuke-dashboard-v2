import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

const baseUrl = `${environment.base_url}/products`;
const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json');


@Injectable()
export class ItemsService {

  constructor(private http: HttpClient) {
  }

  getStock(): Observable<any> {
    return this.http.get(baseUrl,  {headers});
  }
}
