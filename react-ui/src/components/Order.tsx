import IOrder from '../models/order'

interface OrderProps extends IOrder {
  cancelOrder?: (orderId: string | undefined) => Promise<void>
  showStatus?: boolean
}

export function Order({
  price,
  amount,
  side,
  userId,
  orderId,
  cancelOrder,
  status,
  showStatus = false,
}: OrderProps) {
  return (
    <tr>
      {showStatus && <td>{status}</td>}
      <td>{amount}</td>
      <td>{price}</td>
      <td>{side}</td>
      {/* <td>{userId}</td> */}
      {cancelOrder && (
        <td style={{ paddingLeft: '0.5rem' }}>
          <button onClick={() => cancelOrder(orderId)}>Cancel ❌</button>
        </td>
      )}
    </tr>
  )
}
