import IOrder, { OrderSide } from '../models/order'
import { v4 as uuidv4 } from 'uuid'
import debug from 'debug'
// TODO: use import { MinHeap, MaxHeap } from '@datastructures-js/heap'
const log: debug.IDebugger = debug('orders')

// To increase order matching use Min/Max Heap with O(log(n))
// const buyOrders = new MaxHeap()
// const sellOrders = new MinHeap()
const buyOrders: Map<string, IOrder> = new Map()
const sellOrders: Map<string, IOrder> = new Map()

function getOrderbook(): IOrder[] {
  return [...buyOrders.values(), ...sellOrders.values()]
}

function findOrder(orderId: string): IOrder | undefined {
  const order = sellOrders.get(orderId) ?? buyOrders.get(orderId)
  return order
}

function priceMatchBuyOrder(sellOrder: IOrder, newOrder: IOrder): boolean {
  return sellOrder.price <= newOrder.price
}

function priceMatchSellOrder(buyOrder: IOrder, newOrder: IOrder): boolean {
  return buyOrder.price >= newOrder.price
}

function matchOrder(newOrder: IOrder) {
  const ordersToRemove: string[] = []
  const ordersToMatch = newOrder.side === OrderSide.Buy ? sellOrders : buyOrders
  const isPriceMatch =
    newOrder.side === OrderSide.Buy ? priceMatchBuyOrder : priceMatchSellOrder

  const ordersIterator = ordersToMatch.values()
  let iterResult: IteratorResult<IOrder> = ordersIterator.next()

  while (!iterResult.done && newOrder.amount > 0) {
    const currOrder: IOrder = iterResult.value
    // log(`checking ${JSON.stringify(currOrder)}`)

    if (isPriceMatch(currOrder, newOrder)) {
      const amountFilled = Math.min(newOrder.amount, currOrder.amount)
      currOrder.amount -= amountFilled
      newOrder.amount -= amountFilled

      if (currOrder.amount === 0) {
        ordersToRemove.push(currOrder.orderId!)
        log(
          `FILLED ${currOrder.side} @ ${currOrder.price} ${amountFilled} ${currOrder.orderId}`,
        )
      }
      if (newOrder.amount <= 0) {
        log(`FILLED ${newOrder.side} @ ${currOrder.price} ${amountFilled}`)
      }
    }
    iterResult = ordersIterator.next()
  }

  ordersToRemove.forEach((orderId) => {
    ordersToMatch.delete(orderId)
  })
}

function addOrder(order: IOrder): string {
  order.orderId = uuidv4()

  let orderQueue
  switch (order.side) {
    case OrderSide.Buy:
      orderQueue = buyOrders
      break

    case OrderSide.Sell:
      orderQueue = sellOrders
      break

    default:
      throw new Error('Wrong order side: ' + order.side)
  }

  matchOrder(order)
  if (order.amount > 0) {
    orderQueue.set(order.orderId, order)
    log(`PLACED ${order.side} @ ${order.price} ${order.amount}`)
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

function getOrdersForUser(userId: string): IOrder[] {
  const orders: IOrder[] = []
  buyOrders.forEach((o) => {
    if (o.userId === userId) orders.push(o)
  })
  sellOrders.forEach((o) => {
    if (o.userId === userId) orders.push(o)
  })
  return orders
}

function clearAllOrders() {
  buyOrders.clear()
  sellOrders.clear()
}

export default {
  find: findOrder,
  getOrderbook,
  add: addOrder,
  cancel: cancelOrder,
  getAllForUser: getOrdersForUser,
  clearAll: clearAllOrders,
}
