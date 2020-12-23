import Order, { OrderSide } from '../models/order'
import { v4 as uuidv4 } from 'uuid'
import debug from 'debug'
const log: debug.IDebugger = debug('orders')

const buyOrders: Map<string, Order> = new Map()
const sellOrders: Map<string, Order> = new Map()

function getOrderbook(): Order[] {
  return [...buyOrders.values(), ...sellOrders.values()]
}

function findOrder(orderId: string): Order | undefined {
  const order = sellOrders.get(orderId) ?? buyOrders.get(orderId)
  return order
}

function addOrder(order: Order): string {
  log(`PLACED ${order.side} @ ${order.price} ${order.amount}`)
  order.orderId = uuidv4()

  switch (order.side) {
    case OrderSide.Buy: {
      const ordersToRemove: string[] = []
      sellOrders.forEach((sellOrder) => {
        // TODO: make it more readable
        if (order.amount > 0 && sellOrder.price <= order.price) {
          const amountFilled = Math.min(order.amount, sellOrder.amount)
          sellOrder.amount -= amountFilled
          order.amount -= amountFilled
          if (sellOrder.amount === 0) {
            ordersToRemove.push(sellOrder.orderId!)
            log(
              `FILLED ${sellOrder.side} @ ${sellOrder.price} ${sellOrder.amount}`,
            )
          }
          if (order.amount <= 0) {
            log(`FILLED ${order.side} @ ${order.price} ${order.amount}`)
          }
        }
      })
      ordersToRemove.forEach((orderId) => {
        sellOrders.delete(orderId)
      })
      if (order.amount > 0) buyOrders.set(order.orderId, order)
      break
    }
    case OrderSide.Sell:
      sellOrders.set(order.orderId, order)
      break

    default:
      throw new Error('Wrong order side: ' + order.side)
  }
  return order.orderId
}

function cancelOrder(orderId: string) {
  const order = findOrder(orderId)

  if (!order) {
    return false
  }

  if (order.side === OrderSide.Buy) {
    buyOrders.delete(orderId)
  } else {
    sellOrders.delete(orderId)
  }
  log(`CANCELLED ${order.side} @ ${order.price} ${order.amount}`)
  return true
}

function getOrdersForUser(userId: string): Order[] {
  const orders: Order[] = []
  buyOrders.forEach((o) => {
    if (o.userId === userId) orders.push(o)
  })
  sellOrders.forEach((o) => {
    if (o.userId === userId) orders.push(o)
  })
  return orders
}

export default {
  find: findOrder,
  getOrderbook,
  add: addOrder,
  cancel: cancelOrder,
  getAllForUser: getOrdersForUser,
}
