export enum OrderSide {
  Buy = 'BID',
  Sell = 'ASK',
}

export default interface Order {
  orderId?: string
  price: number
  amount: number
  side: OrderSide
  userId: string
}
