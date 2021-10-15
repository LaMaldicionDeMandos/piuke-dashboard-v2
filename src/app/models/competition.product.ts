import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

@JsonObject("Competition")
export class Competition {
  @JsonProperty('owner_id', String) ownerId: string = undefined;
  @JsonProperty('item_link', String) item_link: number = undefined;
  @JsonProperty('old_price', Number) oldPrice: string = undefined;
  @JsonProperty('new_price', Number) newPrice: string = undefined;

  constructor() { }

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
  @JsonProperty('competitions', [Competition], true) competitions: Competition[] = [];

  constructor() { }

  get thumbnail() {
    if (_.isEmpty(this.meliItems)) return undefined;
    return _.head(this.meliItems).thumbnail;
  }

  get title() {
    if (_.isEmpty(this.meliItems)) return undefined;
    return _.head(this.meliItems).title;
  }
}
