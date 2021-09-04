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
  @JsonProperty('health', Number, true) health: number = undefined;
  @JsonProperty('questions', Number) questions: number = undefined;

  constructor() { }

}

@JsonObject("StockProduct")
export class StockProduct {
  @JsonProperty('_id', String) id: string = undefined;
  @JsonProperty('cost', Number) cost: number = undefined;
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

  get health() {
    const l = _.chain(this.meliItems)
      .reject((item) => isNaN(item.health))
      .reduce((sum, item) => {
      sum.value+= item.health;
      sum.count++;
      return sum;
    }, {value: 0, count: 0}).value();
    return l.value/l.count;
  }

  get questions() {
    return _.reduce(this.meliItems, (sum, item) => sum + item.questions, 0);
  }
}
