import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-stock",
  templateUrl: "stock.component.html"
})
export class StockComponent implements OnInit {
  items;

  constructor() {}

  ngOnInit() {
    Promise.resolve([{
      thumbnail: 'http://http2.mlstatic.com/D_835266-MLA46937066399_072021-I.jpg',
      id: 'MLA932240541',
      title: 'Vial Construccion Camion Transportador Con Retro Y Carguero',
      available_quantity: 1,
      sold_quantity: 0,
      cost: 669.75,
      price: 1220,
      start_time: '2021-07-31T22:38:22.000Z'
    },
      {
        thumbnail: 'http://http2.mlstatic.com/D_659090-MLA44676313817_012021-I.jpg',
        title: 'Juego De Mesa T.e.g. Tradicional Yetem',
        id: 'MLA932240823',
        available_quantity: 1,
        sold_quantity: 0,
        cost: 3072.30,
        price: 4410,
        start_time: '2021-07-31T22:51:21.000Z'
      }])
      .then(items => this.items = items);
  }


}
