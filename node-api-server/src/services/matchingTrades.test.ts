import OrdersService from './orders.service'
import Order, { OrderSide } from '../models/order'

describe('matching trades', () => {
  beforeEach(() => {
    OrdersService.clearAll()
  })

  it('should match orders with the same price', () => {
    OrdersService.add({
      price: 10000,
      amount: 100,
      side: OrderSide.Buy,
      userId: 'user0',
    })
    OrdersService.add({
      price: 10000,
      amount: 100,
      side: OrderSide.Sell,
      userId: 'user1',
    })

    OrdersService.add({
      price: 10000,
      amount: 100,
      side: OrderSide.Sell,
      userId: 'user2',
    })
    OrdersService.add({
      price: 10000,
      amount: 100,
      side: OrderSide.Buy,
      userId: 'user3',
    })

    expect(OrdersService.getOrderbook().length).toEqual(0)
  })

  it('Buy order with BID price 15k should match all sell orders with ASK price <= 15k', () => {
    OrdersService.add({
      price: 10000,
      amount: 1,
      side: OrderSide.Sell,
      userId: 'user0',
    })
    OrdersService.add({
      price: 5000,
      amount: 2,
      side: OrderSide.Sell,
      userId: 'user1',
    })

    OrdersService.add({
      price: 15000,
      amount: 5,
      side: OrderSide.Buy,
      userId: 'user2',
    })

    const orders = OrdersService.getOrderbook()
    expect(orders.length).toEqual(1)

    const order = orders[0]
    expect(order.amount).toEqual(2)
    expect(order.price).toEqual(15000)
    expect(order.side).toEqual(OrderSide.Buy)
    expect(order.userId).toEqual('user2')
  })

  it('Sell order with price 9k should match all Buy orders with BID >= 9k', () => {
    OrdersService.add({
      price: 15001,
      amount: 1,
      side: OrderSide.Buy,
      userId: 'user0',
    })
    OrdersService.add({
      price: 10002,
      amount: 2,
      side: OrderSide.Buy,
      userId: 'user1',
    })

    OrdersService.add({
      price: 9003,
      amount: 5,
      side: OrderSide.Sell,
      userId: 'user2',
    })

    const orders = OrdersService.getOrderbook()
    expect(orders.length).toEqual(1)

    const order = orders[0]
    expect(order.amount).toEqual(2)
    expect(order.price).toEqual(9003)
    expect(order.side).toEqual(OrderSide.Sell)
    expect(order.userId).toEqual('user2')
  })
})
