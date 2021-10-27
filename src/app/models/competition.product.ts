import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

@JsonObject("Competition")
export class Competition {
  @JsonProperty('ownerId', String) ownerId: string = undefined;
  @JsonProperty('itemId', String) itemId: string = undefined;
  @JsonProperty('itemLink', String) itemLink: number = undefined;
  @JsonProperty('oldPrice', Number) oldPrice: number = undefined;
  @JsonProperty('newPrice', Number) newPrice: number = undefined;
  @JsonProperty('checked', Boolean, true) checked: boolean = undefined;

  constructor() { }

  get relation(): number {
    return this.newPrice/this.oldPrice;
  }

}

@JsonObject("StockMeliProduct")
export class CompetitionMeliProduct {
  @JsonProperty('title', String) title: string = undefined;
  @JsonProperty('price', Number) price: number = undefined;
  @JsonProperty('thumbnail', String) thumbnail: string = undefined;

  constructor() { }

}

@JsonObject("CompetitionProduct")
export class CompetitionProduct {
  @JsonProperty('_id', String) id: string = undefined;
  @JsonProperty('cost', Number) cost: number = undefined;
  @JsonProperty('code', String) code: string = undefined;
  @JsonProperty('meli_items', [CompetitionMeliProduct], true) meliItems: CompetitionMeliProduct[] = [];
  @JsonProperty('product_comparations', [Competition], true) competitions: Competition[] = [];

  constructor() { }

  get thumbnail() {
    if (_.isEmpty(this.meliItems)) return undefined;
    return _.head(this.meliItems).thumbnail;
  }

  get title() {
    if (_.isEmpty(this.meliItems)) return undefined;
    return _.head(this.meliItems).title;
  }

  get price() {
    if (_.isEmpty(this.meliItems)) return undefined;
    return _.head(this.meliItems).price;
  }
}
