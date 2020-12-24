import IOrder from '../models/order'
import useSwr from 'swr'
import fetcher from './fetcher'

const apiUrl: string = 'http://localhost:4000'

type OrdersData = {
  orders: IOrder[]
  isLoading: boolean
  isError: any
  mutate: () => Promise<any>
}

function useOrderbook(): OrdersData {
  const { data, error, mutate } = useSwr(`${apiUrl}/orders`, fetcher, {
    refreshInterval: 5000,
  })
  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

function useOrdersForUser(username: string): OrdersData {
  const { data, error, mutate } = useSwr(
    () => (username ? `${apiUrl}/users/${username}/orders` : null),
    fetcher,
  )
  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

async function submitOrder(order: IOrder) {
  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(order),
    })
    const responseBody = await response.json()
    if (response.status >= 400) {
      return { isError: true, message: responseBody.error }
    }
    return responseBody
  } catch (error) {
    console.error(error)
    return { isError: true, message: 'Submit order failed' }
  }
}

async function cancelOrder(orderId: string | undefined) {
  if (!orderId) return { isError: true, message: 'OrderId is missing' }

  try {
    const response = await fetch(`${apiUrl}/orders/${orderId}`, {
      method: 'DELETE',
    })
    const responseBody = await response.json()
    if (response.status >= 400) {
      return { isError: true, message: responseBody.error }
    }
    return { isError: false, message: 'Order cancelled' }
  } catch (error) {
    console.error(error)
    return { isError: true, message: 'Submit order failed' }
  }
}

const OrderService = {
  useOrderbook,
  submitOrder,
  useOrdersForUser,
  cancelOrder,
}

export default OrderService
