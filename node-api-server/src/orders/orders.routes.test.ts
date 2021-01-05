import request from 'supertest'
import app from '../app'
import IOrder, { OrderSide, OrderStatus } from '../models/order'

describe('Order routes', () => {
  it('should place a new order', async (done) => {
    const order: IOrder = {
      amount: 1,
      price: 155,
      side: OrderSide.Buy,
      status: OrderStatus.ACTIVE,
      userId: 'johndoe',
    }
    const res = await request(app).post('/orders').send(order)
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('orderId')
    done()
  })

  it('place order should fail on missing userId', async (done) => {
    const order: IOrder = {
      amount: 1,
      price: 155,
      side: OrderSide.Buy,
      status: OrderStatus.ACTIVE,
      userId: '',
    }
    const res = await request(app).post('/orders').send(order)
    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('error')
    done()
  })
})
