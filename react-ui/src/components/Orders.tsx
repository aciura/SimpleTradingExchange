import IOrder from '../models/order'
import { Order } from './Order'

type OrdersProps = {
  orders: IOrder[]
  onTradeCancel?: (orderId: string | undefined) => Promise<void>
}

export function Orders({ orders, onTradeCancel }: OrdersProps) {
  return (
    <>
      {orders && orders.length ? (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Price</th>
              <th>Side</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder) => (
              <Order
                key={order.orderId}
                {...order}
                cancelOrder={onTradeCancel}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <span>No active orders</span>
      )}
    </>
  )
}

export interface OrderProps extends IOrder {
  cancelOrder?: (orderId: string | undefined) => Promise<void>
}
