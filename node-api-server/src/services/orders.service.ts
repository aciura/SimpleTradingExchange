import IOrder, { OrderSide, OrderStatus } from '../models/order'
import { v4 as uuidv4 } from 'uuid'
import debug from 'debug'
import MatchingService from './matching.service'
const log: debug.IDebugger = debug('orders')

const orders: Map<string, IOrder> = new Map()

function getOrderbook(): IOrder[] {
  return [...orders.values()].filter(
    (order) => order.status === OrderStatus.ACTIVE,
  )
}

function findOrder(orderId: string): IOrder | undefined {
  return orders.get(orderId)
}

function addOrder(order: IOrder): string {
  order.orderId = uuidv4()

  MatchingService.addOrder(order)

  orders.set(order.orderId, order)
  if (order.amount > 0) {
    log(`PLACED ${order.side} @ ${order.price} ${order.amount}`)
  }
  return order.orderId
}

function cancelOrder(orderId: string) {
  const order = findOrder(orderId)

  if (!order) {
    return false
  }

  order.status = OrderStatus.CANCELLED
  // TODO: Remove order from heap
  // if (order.side === OrderSide.Buy) {
  //   const oldPrice = order.price
  //   order.price = Number.MAX_VALUE
  //   buyOrdersHeap.delete(orderId)
  // } else {
  //   sellOrders.delete(orderId)
  // }
  log(`CANCELLED ${order.side} @ ${order.price} ${order.amount}`)
  return true
}

function getOrdersForUser(userId: string): IOrder[] {
  const userOrders: IOrder[] = []
  orders.forEach((o) => {
    if (o.userId === userId) userOrders.push(o)
  })
  return userOrders
}

function clearAllOrders() {
  MatchingService.clear()
  orders.clear()
}

const OrderService = {
  find: findOrder,
  getOrderbook,
  add: addOrder,
  cancel: cancelOrder,
  getAllForUser: getOrdersForUser,
  clearAll: clearAllOrders,
}
export default OrderService
