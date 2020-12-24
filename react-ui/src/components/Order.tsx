import { OrderProps } from './Orders'

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
        <td style={{ paddingLeft: '0.5rem' }}>
          <button onClick={() => cancelOrder(orderId)}>Cancel ❌</button>
        </td>
      )}
    </tr>
  )
}
