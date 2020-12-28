import OrdersService from './orders.service'
import IOrder, { OrderSide, OrderStatus } from '../models/order'
import OrderService from './orders.service'

describe('orders.service', () => {
  beforeEach(() => {
    OrdersService.clearAll()
  })

  it('should add new order', () => {
    const orderId = OrdersService.add({
      side: OrderSide.Buy,
      price: 23000,
      amount: 1,
      userId: 'user0',
      status: OrderStatus.ACTIVE,
    })
    expect(orderId.length).toBeGreaterThan(1)

    const order2 = OrdersService.find(orderId)
    expect(order2).toStrictEqual(order2)
  })

  it('should cancel order', () => {
    const orderId = OrdersService.add({
      side: OrderSide.Buy,
      price: 23000,
      amount: 1,
      userId: 'user0',
      status: OrderStatus.ACTIVE,
    })

    const result = OrdersService.cancel(orderId)
    expect(result).toEqual(true)
  })

  it('cancel order should not be used in matching orders', () => {
    const buyOrder = {
      side: OrderSide.Buy,
      price: 23000,
      amount: 1,
      userId: 'user0',
      status: OrderStatus.ACTIVE,
    }
    const orderId = OrderService.add(buyOrder)
    OrderService.cancel(orderId)
    OrderService.add({
      ...buyOrder,
      side: OrderSide.Sell,
      status: OrderStatus.ACTIVE,
    })

    const orders = OrderService.getOrderbook()

    expect(orders.length).toEqual(1)
    expect(orders[0].amount).toEqual(1)
    expect(orders[0].status).toEqual(OrderStatus.ACTIVE)
    expect(orders[0].side).toEqual(OrderSide.Sell)
  })

  it('should get all orders for user', () => {
    OrdersService.add({
      side: OrderSide.Buy,
      price: 23000,
      amount: 1,
      userId: 'user0',
      status: OrderStatus.ACTIVE,
    })

    OrdersService.add({
      price: 15000,
      amount: 100,
      side: OrderSide.Buy,
      userId: 'whale',
      status: OrderStatus.ACTIVE,
    })
    OrdersService.add({
      price: 10000,
      amount: 1001,
      side: OrderSide.Buy,
      userId: 'whale',
      status: OrderStatus.ACTIVE,
    })
    OrdersService.add({
      price: 5000,
      amount: 2002,
      side: OrderSide.Buy,
      userId: 'whale',
      status: OrderStatus.ACTIVE,
    })

    expect(OrdersService.getOrderbook().length).toEqual(4)
    expect(OrdersService.getAllForUser('whale').length).toEqual(3)
  })

  it('should clearAll orders', () => {
    OrdersService.add({
      side: OrderSide.Buy,
      price: 23000,
      amount: 1,
      userId: 'user0',
      status: OrderStatus.ACTIVE,
    })
    expect(OrdersService.getOrderbook.length).toEqual(0)
  })
})
