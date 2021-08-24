import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

//const baseUrl = `${environment.base_url}/products`;
//const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable()
export class ItemsService {

  constructor(private http: HttpClient) {
  }

  getStock(): Promise<any> {
    return Promise.resolve([{
      thumbnail: 'http://http2.mlstatic.com/D_835266-MLA46937066399_072021-I.jpg',
      id: 'MLA932240541',
      title: 'Vial Construccion Camion Transportador Con Retro Y Carguero',
      available_quantity: 1,
      sold_quantity: 0,
      cost: 669.75,
      price: 1220,
      start_time: '2021-07-31T22:38:22.000Z',
      status: 'active'
    },
      {
        thumbnail: 'http://http2.mlstatic.com/D_659090-MLA44676313817_012021-I.jpg',
        title: 'Juego De Mesa T.e.g. Tradicional Yetem',
        id: 'MLA932240823',
        available_quantity: 1,
        sold_quantity: 0,
        cost: 3072.30,
        price: 4410,
        start_time: '2021-07-31T22:51:21.000Z',
        status: 'active'
      }]);
  }
}
