import React from 'react'
import { Spinner } from './common'
import { Orders } from './Orders'
import OrderService from '../services/order.service'
import IOrder from '../models/order'
import styles from './OrdersForUser.module.scss'

export type OrdersForUserProps = {
  username: string
  orders: IOrder[]
  isLoading: boolean
  updateOrders: () => Promise<void>
}

export function OrdersForUser({
  username,
  orders,
  isLoading,
  updateOrders,
}: OrdersForUserProps) {
  const cancelOrder = async (orderId: string | undefined) => {
    const response = await OrderService.cancelOrder(orderId)
    console.log(response)
    updateOrders()
  }

  return (
    <div className={styles.ordersForUser}>
      <h4>User {username} orders</h4>
      {username && isLoading && <Spinner />}
      {username && !isLoading && (
        <div>
          <Orders
            orders={orders}
            onTradeCancel={cancelOrder}
            showOrderStatus={true}
          />
        </div>
      )}
    </div>
  )
}
