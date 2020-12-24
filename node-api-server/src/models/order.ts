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
