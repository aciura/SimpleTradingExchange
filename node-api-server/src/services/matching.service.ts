import IOrder, { OrderSide, OrderStatus } from '../models/order'
import debug from 'debug'
const log: debug.IDebugger = debug('orders')

const datastructures = require('@datastructures-js/heap')
const { MinHeap, MaxHeap } = datastructures

// matching service uses Min/Max Heap with O(log(n))
const buyOrders: any = new MaxHeap()
const sellOrders: any = new MinHeap()

function addOrder(newOrder: IOrder) {
  const heap = newOrder.side === OrderSide.Buy ? buyOrders : sellOrders

  matchOrder(newOrder)

  if (newOrder.status === OrderStatus.ACTIVE) {
    heap.insert(newOrder.price, newOrder)
  }
  return newOrder
}

function matchOrder(newOrder: IOrder) {
  const ordersToMatch = newOrder.side === OrderSide.Buy ? sellOrders : buyOrders
  const isPriceMatch =
    newOrder.side === OrderSide.Buy ? priceMatchBuyOrder : priceMatchSellOrder

  removeCancelledOrders(ordersToMatch)

  while (
    ordersToMatch.root() &&
    ordersToMatch.root().getValue() &&
    newOrder.amount > 0
  ) {
    const currOrder: IOrder = ordersToMatch.root().getValue()
    // log(`checking ${JSON.stringify(currOrder)}`)

    if (isPriceMatch(currOrder, newOrder)) {
      const amountFilled = Math.min(newOrder.amount, currOrder.amount)
      currOrder.amount -= amountFilled
      newOrder.amount -= amountFilled

      if (currOrder.amount <= 0) {
        // PERFORMANCE: O(lgn)
        ordersToMatch.extractRoot()
        currOrder.status = OrderStatus.FULFILLED
        log(`FILLED ${currOrder.side} @ ${currOrder.price} ${amountFilled}`)
      }
      if (newOrder.amount <= 0) {
        newOrder.status = OrderStatus.FULFILLED
        log(`FILLED ${newOrder.side} @ ${currOrder.price} ${amountFilled}`)
      }
    } else break
  }
}

function priceMatchBuyOrder(sellOrder: IOrder, newOrder: IOrder): boolean {
  return sellOrder.price <= newOrder.price
}

function priceMatchSellOrder(buyOrder: IOrder, newOrder: IOrder): boolean {
  return buyOrder.price >= newOrder.price
}

function removeCancelledOrders(ordersToMatch: any) {
  while (
    ordersToMatch.root() &&
    ordersToMatch.root().getValue() &&
    ordersToMatch.root().getValue().status !== OrderStatus.ACTIVE
  ) {
    ordersToMatch.extractRoot()
  }
}

function clear() {
  buyOrders.clear()
  sellOrders.clear()
}

const MatchingService = {
  addOrder,
  clear,
}

export default MatchingService
