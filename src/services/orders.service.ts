import Order, { OrderSide } from '../models/order'
import { v4 as uuidv4 } from 'uuid'
import debug from 'debug'
// TODO: use import { MinHeap, MaxHeap } from '@datastructures-js/heap'
const log: debug.IDebugger = debug('orders')

// To increase order matching use Min/Max Heap with O(log(n))
// const buyOrders = new MaxHeap()
// const sellOrders = new MinHeap()
const buyOrders: Map<string, Order> = new Map()
const sellOrders: Map<string, Order> = new Map()

function getOrderbook(): Order[] {
  return [...buyOrders.values(), ...sellOrders.values()]
}

function findOrder(orderId: string): Order | undefined {
  const order = sellOrders.get(orderId) ?? buyOrders.get(orderId)
  return order
}

function priceMatchBuyOrder(sellOrder: Order, newOrder: Order): boolean {
  return sellOrder.price <= newOrder.price
}

function priceMatchSellOrder(buyOrder: Order, newOrder: Order): boolean {
  return buyOrder.price >= newOrder.price
}

function matchOrder(newOrder: Order) {
  const ordersToRemove: string[] = []
  const ordersToMatch = newOrder.side === OrderSide.Buy ? sellOrders : buyOrders
  const isPriceMatch =
    newOrder.side === OrderSide.Buy ? priceMatchBuyOrder : priceMatchSellOrder

  const ordersIterator = ordersToMatch.values()
  let iterResult: IteratorResult<Order> = ordersIterator.next()

  while (!iterResult.done && newOrder.amount > 0) {
    const currOrder: Order = iterResult.value
    log(`checking ${JSON.stringify(currOrder)}`)

    if (isPriceMatch(currOrder, newOrder)) {
      const amountFilled = Math.min(newOrder.amount, currOrder.amount)
      currOrder.amount -= amountFilled
      newOrder.amount -= amountFilled

      if (currOrder.amount === 0) {
        ordersToRemove.push(currOrder.orderId!)
        log(`FILLED ${currOrder.side} @ ${currOrder.price} ${amountFilled}`)
      }
      if (newOrder.amount <= 0) {
        log(`FILLED ${newOrder.side} @ ${newOrder.price} ${amountFilled}`)
      }
    }
    iterResult = ordersIterator.next()
  }

  ordersToRemove.forEach((orderId) => {
    ordersToMatch.delete(orderId)
  })
}

function addOrder(order: Order): string {
  log(`PLACED ${order.side} @ ${order.price} ${order.amount}`)
  order.orderId = uuidv4()

  switch (order.side) {
    case OrderSide.Buy: {
      matchOrder(order)
      if (order.amount > 0) buyOrders.set(order.orderId, order)
      break
    }
    case OrderSide.Sell:
      matchOrder(order)
      if (order.amount > 0) sellOrders.set(order.orderId, order)
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
