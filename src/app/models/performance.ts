import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';
import * as randomColor from 'random-color';

@JsonObject("Performance")
export class Performance {
  @JsonProperty('code', String) code: string = undefined;
  @JsonProperty('title', String) title: string = undefined;
  @JsonProperty('image', String) image: string = undefined;
  @JsonProperty('profits', [Number]) profits: number[] = undefined;

  color: string;
  colorHex: string;

  constructor() {
    const color = randomColor();
    this.color = color.rgbString()
    this.colorHex = color.hexString();
  }

  get totalProfit() {
    return _.sum(this.profits);
  }

  get count() {
    return this.profits.length;
  }
}
