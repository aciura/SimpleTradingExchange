import IOrder from '../models/order'

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

interface OrderProps extends IOrder {
  cancelOrder?: (orderId: string | undefined) => Promise<void>
}

export function Order({
  price,
  amount,
  side,
  userId,
  orderId,
  cancelOrder,
}: OrderProps) {
  return (
    <tr>
      <td>{amount}</td>
      <td>{price}</td>
      <td>{side}</td>
      <td>{userId}</td>
      {cancelOrder && (
        <td>
          <button onClick={() => cancelOrder(orderId)}>Cancel</button>
        </td>
      )}
    </tr>
  )
}
