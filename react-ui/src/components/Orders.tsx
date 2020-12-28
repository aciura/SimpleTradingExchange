import IOrder from '../models/order'
import { Order } from './Order'

type OrdersProps = {
  orders: IOrder[]
  onTradeCancel?: (orderId: string | undefined) => Promise<void>
  showOrderStatus?: boolean
}

export function Orders({
  orders,
  onTradeCancel,
  showOrderStatus = false,
}: OrdersProps) {
  return (
    <>
      {orders && orders.length ? (
        <table>
          <thead>
            <tr>
              {showOrderStatus && <th>Status</th>}
              <th>Amount</th>
              <th>Price</th>
              <th>Side</th>
              {/* <th>User</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder) => (
              <Order
                key={order.orderId}
                {...order}
                cancelOrder={onTradeCancel}
                showStatus={showOrderStatus}
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
