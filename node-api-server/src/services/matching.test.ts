import MatchingService from './matching.service'
import IOrder, { OrderSide, OrderStatus } from '../models/order'
import debug from 'debug'
const log: debug.IDebugger = debug('testing')

describe('matching trades', () => {
  beforeEach(() => {
    MatchingService.clear()
  })

  it('should match orders with the same price', () => {
    const orders = [
      {
        price: 10000,
        amount: 100,
        side: OrderSide.Buy,
        userId: 'user0',
        status: OrderStatus.ACTIVE,
      },
      {
        price: 10000,
        amount: 100,
        side: OrderSide.Sell,
        userId: 'user1',
        status: OrderStatus.ACTIVE,
      },
      {
        price: 10000,
        amount: 100,
        side: OrderSide.Sell,
        userId: 'user2',
        status: OrderStatus.ACTIVE,
      },
      {
        price: 10000,
        amount: 100,
        side: OrderSide.Buy,
        userId: 'user3',
        status: OrderStatus.ACTIVE,
      },
    ]
    orders.forEach((order) => {
      MatchingService.addOrder(order)
    })

    const fulfilledOrders = orders.filter(
      (order) => order.status === OrderStatus.FULFILLED,
    )

    expect(fulfilledOrders.length).toEqual(4)
  })

  it('Buy order with BID price 15k should match all sell orders with ASK price <= 15k', () => {
    const orders = [
      {
        price: 10000,
        amount: 1,
        side: OrderSide.Sell,
        userId: 'user0',
        status: OrderStatus.ACTIVE,
      },
      {
        price: 5000,
        amount: 2,
        side: OrderSide.Sell,
        userId: 'user1',
        status: OrderStatus.ACTIVE,
      },
      {
        price: 15000,
        amount: 5,
        side: OrderSide.Buy,
        userId: 'user2',
        status: OrderStatus.ACTIVE,
      },
    ]

    orders.forEach((order) => {
      MatchingService.addOrder(order)
    })

    expect(orders.length).toEqual(3)
    expect(orders[0].status).toEqual(OrderStatus.FULFILLED)
    expect(orders[1].status).toEqual(OrderStatus.FULFILLED)

    const order = orders[2]
    expect(order.amount).toEqual(2)
    expect(order.price).toEqual(15000)
    expect(order.side).toEqual(OrderSide.Buy)
    expect(order.status).toEqual(OrderStatus.ACTIVE)
    expect(order.userId).toEqual('user2')
  })

  it('Sell order with price 9k should match all Buy orders with BID >= 9k', () => {
    const orders = [
      {
        price: 15001,
        amount: 1,
        side: OrderSide.Buy,
        userId: 'user0',
        status: OrderStatus.ACTIVE,
      },
      {
        price: 10002,
        amount: 2,
        side: OrderSide.Buy,
        userId: 'user1',
        status: OrderStatus.ACTIVE,
      },
      {
        price: 9003,
        amount: 5,
        side: OrderSide.Sell,
        userId: 'user2',
        status: OrderStatus.ACTIVE,
      },
    ]
    orders.forEach((order) => {
      MatchingService.addOrder(order)
    })

    expect(orders.length).toEqual(3)
    expect(orders[0].status).toEqual(OrderStatus.FULFILLED)
    expect(orders[1].status).toEqual(OrderStatus.FULFILLED)

    const order = orders[2]
    expect(order.amount).toEqual(2)
    expect(order.price).toEqual(9003)
    expect(order.side).toEqual(OrderSide.Sell)
    expect(order.status).toEqual(OrderStatus.ACTIVE)
    expect(order.userId).toEqual('user2')
  })
})
