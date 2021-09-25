import { JsonObject, JsonProperty } from 'json2typescript';
import {DateConverter} from "./date.converter";

@JsonObject("BestSeller")
export class BestSeller {
  @JsonProperty('id', String) id: string = undefined;
  @JsonProperty('title', String) title: string = undefined;
  @JsonProperty('seller_id', Number) sellerId: number = undefined;
  @JsonProperty('category_id', String) categoryId: string = undefined;
  @JsonProperty('sold_quantity', Number) sold: number = undefined;
  @JsonProperty('price', Number) price: number = undefined;
  @JsonProperty('start_time', DateConverter) date: Date = undefined;
  @JsonProperty('permalink', String) permalink: string = undefined;
  @JsonProperty('thumbnail', String) image: string = undefined;
  @JsonProperty('position', Number, true) rank: number = undefined;

  constructor() {}
}
