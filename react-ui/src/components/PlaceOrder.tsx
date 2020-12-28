import React from 'react'
import { OrderSide, OrderStatus } from '../models/order'
import OrderService from '../services/order.service'
import styles from './PlaceOrder.module.scss'

type PlaceOrderProps = {
  username: string
  updateOrders: () => void
}

export function PlaceOrder({ username, updateOrders }: PlaceOrderProps) {
  const [price, setPrice] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [side, setSide] = React.useState(OrderSide.Buy)
  const [info, setInfo] = React.useState({ isError: false, message: '' })

  const submitOrder = async () => {
    const response = await OrderService.submitOrder({
      amount: Number(amount),
      price: Number(price),
      side,
      userId: username,
      status: OrderStatus.ACTIVE,
    })
    if (response.isError) {
      setInfo({ isError: true, message: response.message })
    } else {
      setInfo({
        isError: false,
        message: `Order created`,
      })
      updateOrders()
    }
  }

  return (
    <div className={styles.placeOrder}>
      <label htmlFor='side'>Side</label>
      <select
        style={{ backgroundColor: side === OrderSide.Buy ? 'green' : 'red' }}
        onChange={(e) =>
          setSide(
            e.target.value === OrderSide.Buy ? OrderSide.Buy : OrderSide.Sell,
          )
        }>
        <option style={{ backgroundColor: 'green' }} value={OrderSide.Buy}>
          Buy
        </option>
        <option style={{ backgroundColor: 'red' }} value={OrderSide.Sell}>
          Sell
        </option>
      </select>
      <label htmlFor='price'>Price</label>
      <input
        name='price'
        placeholder={'set price'}
        type='number'
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor='amount'>Amount</label>
      <input
        name='amount'
        placeholder={'set amount'}
        type='number'
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={submitOrder}>Submit ✔️</button>
      {info.message && (
        <span className={info.isError ? styles.error : styles.success}>
          {info.message}
        </span>
      )}
    </div>
  )
}
