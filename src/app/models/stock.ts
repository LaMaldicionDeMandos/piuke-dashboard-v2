import { JsonObject, JsonProperty } from 'json2typescript';
import {DateConverter} from './date.converter';
import * as _ from 'lodash';

@JsonObject("StockMeli")
export class StockMeliProduct {
  @JsonProperty('title', String) title: string = undefined;
  @JsonProperty('available_quantity', Number) availableQuantity: number = undefined;
  @JsonProperty('sold_quantity', Number) soldQuantity: number = undefined;
  @JsonProperty('start_time', DateConverter) startTime: Date = undefined;
  @JsonProperty('thumbnail', String) thumbnail: string = undefined;
  @JsonProperty('status', String) status: string = undefined;

  constructor() { }

}

@JsonObject("Stock")
export class Stock {
  @JsonProperty('_id', String) id: string = undefined;
  @JsonProperty('monthly_stock', Number) monthly: number = undefined;
  @JsonProperty('reposition', Number) reposition: number = undefined;
  @JsonProperty('code', String) code: string = undefined;
  @JsonProperty('meli_items', [StockMeliProduct], true) meliItems: StockMeliProduct[] = [];

  constructor() { }

  get sales() {
    return _.reduce(this.meliItems, (sum, item) => sum + item.soldQuantity, 0);
  }

  get stock() {
    return _.chain(this.meliItems).map('availableQuantity').min().value() || 0;
  }

  get thumbnail() {
    if (_.isEmpty(this.meliItems)) return undefined;
    return _.head(this.meliItems).thumbnail;
  }

  get title() {
    if (_.isEmpty(this.meliItems)) return undefined;
    return _.head(this.meliItems).title;
  }

  get percent() {
    return this.stock/this.monthly;
  }

}
