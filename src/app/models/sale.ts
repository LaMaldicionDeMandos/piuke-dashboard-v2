import { JsonObject, JsonProperty, Any } from 'json2typescript';
import {DateConverter} from './date.converter';
import * as _ from 'lodash';

export enum ListingType {
  PRO = 'gold_pro',
  NORMAL = 'gold_special'
}

@JsonObject("SalePayment")
export class SalePayment{
  @JsonProperty('total_paid_amount', Number) totalPaid: number = undefined;
  @JsonProperty('transaction_amount', Number) transactionAmount: number = undefined;
  @JsonProperty('date_approved', DateConverter) date: Date = undefined;
  @JsonProperty('shipping_cost', Number) shippingFee: number = undefined;

  constructor() { }

}

@JsonObject("SaleMeliItem")
export class SaleMeliItem {
  @JsonProperty('id', String) id: string = undefined;
  @JsonProperty('thumbnail', String) thumbnail: string = undefined;

  constructor() { }

}

@JsonObject("SaleItem")
export class SaleItem {
  @JsonProperty('title', String) title: string = undefined;
  @JsonProperty('code', String) code: string = undefined;
  @JsonProperty('cost', Number) cost: number = undefined;
  @JsonProperty('meli_item', [SaleMeliItem]) meliItem: SaleMeliItem[] = undefined;

  constructor() { }

  get saleMeliItem(): SaleMeliItem {
    return _.head(this.meliItem);
  }

}

@JsonObject("SaleOrder")
export class SaleOrder {
  @JsonProperty('item', SaleItem) item: SaleItem = undefined;
  @JsonProperty('quantity', Number) quantity: number = undefined;
  @JsonProperty('sale_fee', Number) saleFee: number = undefined;
  @JsonProperty('unit_price', Number) unitPrice: number = undefined;
  @JsonProperty('listing_type_id', String) listingType: ListingType = undefined;
  @JsonProperty('full_unit_price', Number) fullUnitPrice: number = undefined;

  constructor() { }

  get meliItem() {
    return this.item.saleMeliItem;
  }
}

@JsonObject("Buyer")
export class Buyer {
  @JsonProperty('nickname', String) nickname: string = undefined;
  @JsonProperty('id', Number) id: number = undefined;

  constructor() { }

}

@JsonObject("Sale")
export class Sale {
  @JsonProperty('payments', [SalePayment]) payments: SalePayment[] = undefined;
  @JsonProperty('order_items', [SaleOrder]) orders: SaleOrder[] = undefined;
  @JsonProperty('buyer', Buyer) buyer: Buyer = undefined;
  @JsonProperty('total_amount', Number) totalAmount: number = undefined;
  @JsonProperty('paid_amount', Number) paidAmount: number = undefined;

  constructor() { }

  get payment(): SalePayment {
    return _.head(this.payments);
  }

  get date(): Date {
    return this.payment.date;
  }

  get saleItems(): FlattenSale[] {
    return _.map(this.orders, (order) => new FlattenSale(order, this.payment));
  }
}

@JsonObject("FlattenSale")
export class FlattenSale {
  constructor(private order: SaleOrder, private payment: SalePayment) { }

  get photo() {
    return this.order.meliItem.thumbnail;
  }

  get date(): Date {
    return this.payment.date;
  }

  get title(): string {
    return this.order.item.title;
  }

  get cost(): number {
    return this.order.item.cost;
  }

  get price(): number {
    return this.order.fullUnitPrice;
  }

  get fees(): number {
    const sheepingFee = this.payment.shippingFee - (this.payment.totalPaid - this.payment.transactionAmount);
    return this.order.saleFee + sheepingFee;
  }

  get refill(): number {
    return this.price - this.fees;
  }

  get profit(): number {
    return this.refill - this.cost;
  }
}
