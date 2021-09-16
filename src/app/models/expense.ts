import { JsonObject, JsonProperty } from 'json2typescript';
import {DateConverter} from './date.converter';

@JsonObject("Expense")
export class Expense {
  @JsonProperty('_id', String) id: string = undefined;
  @JsonProperty('desc', String) desc: string = undefined;
  @JsonProperty('value', Number) value: number = undefined;
  @JsonProperty('createdAt', DateConverter) createdAt: Date = undefined;
  @JsonProperty('updatedAt', DateConverter) updatedAt: Date = undefined;

  constructor() { }

}
