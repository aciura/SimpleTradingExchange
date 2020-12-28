export enum OrderSide {
  Buy = 'BID',
  Sell = 'ASK',
}

export enum OrderStatus {
  ACTIVE = 'ACTIVE',
  FULFILLED = 'FULFILLED',
  CANCELLED = 'CANCELLED',
}

export default interface IOrder {
  orderId?: string
  price: number
  amount: number
  side: OrderSide
  userId: string
  status: OrderStatus
}
