export enum OrderSide {
  Buy = 'BID',
  Sell = 'ASK',
}

export default interface IOrder {
  orderId?: string
  price: number
  amount: number
  side: OrderSide
  userId: string
}

export function DescPriceComparer(order1: IOrder, order2: IOrder): number {
  return order2.price - order1.price
}

export function AscPriceComparer(order1: IOrder, order2: IOrder): number {
  return order1.price - order2.price
}
