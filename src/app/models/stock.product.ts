import { JsonObject, JsonProperty, Any } from 'json2typescript';
import {DateConverter} from './date.converter';
import * as _ from 'lodash';

export enum ListingType {
  PRO = 'gold_pro',
  NORMAL = 'gold_special'
}

@JsonObject("StockMeliProduct")
export class StockMeliProduct {
  @JsonProperty('id', String) id: string = undefined;
  @JsonProperty('title', String) title: string = undefined;
  @JsonProperty('price', Number) price: number = undefined;
  @JsonProperty('available_quantity', Number) availableQuantity: number = undefined;
  @JsonProperty('sold_quantity', Number) soldQuantity: number = undefined;
  @JsonProperty('start_time', DateConverter) startTime: Date = undefined;
  @JsonProperty('thumbnail', String) thumbnail: string = undefined;
  @JsonProperty('status', String) status: string = undefined;
  @JsonProperty('listing_type_id', String) listingType: ListingType = undefined;

  constructor() { }

}

@JsonObject("StockProduct")
export class StockProduct {
  @JsonProperty('_id', String) id: string = undefined;
  @JsonProperty('cost', Number) cost: number = undefined;
  @JsonProperty('code', String) code: string = undefined;
  @JsonProperty('meli_items', [StockMeliProduct]) meliItems: StockMeliProduct = undefined;

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
}
