import OrdersService from './orders.service'
import Order, { OrderSide } from '../models/order'

describe('orders.service', () => {
  const order: Order = {
    side: OrderSide.Buy,
    price: 23000,
    amount: 1,
    userId: 'user0',
  }

  beforeEach(() => {
    OrdersService.clearAll()
  })

  it('should add new order', () => {
    const orderId = OrdersService.add(order)
    expect(orderId.length).toBeGreaterThan(1)

    const order2 = OrdersService.find(orderId)
    expect(order2).toStrictEqual(order2)
  })

  it('should cancel order', () => {
    const orderId = OrdersService.add(order)

    const result = OrdersService.cancel(orderId)
    expect(result).toEqual(true)
  })

  it('should get all orders for user', () => {
    OrdersService.add(order)
    OrdersService.add({
      price: 15000,
      amount: 100,
      side: OrderSide.Buy,
      userId: 'whale',
    })
    OrdersService.add({
      price: 10000,
      amount: 1001,
      side: OrderSide.Buy,
      userId: 'whale',
    })
    OrdersService.add({
      price: 5000,
      amount: 2002,
      side: OrderSide.Buy,
      userId: 'whale',
    })

    expect(OrdersService.getOrderbook().length).toEqual(4)
    expect(OrdersService.getAllForUser('whale').length).toEqual(3)
  })

  it('should clearAll orders', () => {
    OrdersService.add(order)
    expect(OrdersService.getOrderbook.length).toEqual(0)
  })
})
