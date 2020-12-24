import React from 'react'
import { Spinner } from './common'
import { Orders } from './Orders'
import OrderService from '../services/order.service'

export type OrdersForUserProps = {
  username: string
}

export function OrdersForUser({ username }: OrdersForUserProps) {
  const { orders, isLoading, mutate } = OrderService.useOrdersForUser(username)

  const cancelOrder = async (orderId: string | undefined) => {
    const response = await OrderService.cancelOrder(orderId)
    mutate()
    console.log(response)
  }

  return (
    <div>
      <h4>User orders</h4>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div>
          <Orders orders={orders} onTradeCancel={cancelOrder} />
        </div>
      )}
    </div>
  )
}
