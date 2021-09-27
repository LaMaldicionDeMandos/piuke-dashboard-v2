import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("Category")
export class Category {
  @JsonProperty('id', String) id: string = undefined;
  @JsonProperty('name', String) name: string = undefined;

  constructor() {}
}
