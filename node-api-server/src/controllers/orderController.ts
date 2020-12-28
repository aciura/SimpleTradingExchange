import express from 'express'
import IOrder, { OrderSide, OrderStatus } from '../models/order'
import OrdersService from '../services/orders.service'

const getOrderbook = (
  req: express.Request,
  res: express.Response<IOrder[]>,
) => {
  res.status(200).send(OrdersService.getOrderbook())
}

const getOrderWithId = (
  req: express.Request<{ orderId: string }>,
  res: express.Response<IOrder | Error>,
) => {
  const order = OrdersService.find(req.params.orderId)
  if (order) {
    res.status(200).send(order)
  } else {
    res.status(404).send(new Error('order not found'))
  }
}

const placeOrder = (
  req: express.Request<IOrder>,
  res: express.Response<{ orderId: string } | { error: string }>,
) => {
  if (!req.body.userId) {
    res.status(400).send({ error: 'UserId is missing' })
  } else if (!req.body.amount || req.body.amount <= 0) {
    res.status(400).send({ error: 'Amount has to be above 0' })
  } else if (!req.body.price || req.body.price <= 0) {
    res.status(400).send({ error: 'Price has to be above 0' })
  } else if (
    !req.body.side ||
    ![OrderSide.Buy, OrderSide.Sell].includes(req.body.side)
  ) {
    res.status(400).send({ error: 'Incorrect order side' })
  } else {
    const newOrder: IOrder = {
      price: req.body.price,
      amount: req.body.amount,
      side: req.body.side,
      userId: req.body.userId,
      status: OrderStatus.ACTIVE,
    }
    const orderId = OrdersService.add(newOrder)
    res.status(201).send({ orderId: orderId })
  }
}

const cancelOrder = (
  req: express.Request<{ orderId: string }>,
  res: express.Response,
) => {
  const result = OrdersService.cancel(req.params.orderId)
  if (result) {
    res.status(200).send({ deleted: result })
  } else {
    res.status(404).send()
  }
}

const getOrdersForUser = (
  req: express.Request<{ userId: string }>,
  res: express.Response<IOrder[]>,
) => {
  const orders = OrdersService.getAllForUser(req.params.userId)
  res.status(200).send(orders)
}

const OrderConroller = {
  getOrderbook,
  getOrderWithId,
  placeOrder,
  cancelOrder,
  getOrdersForUser,
}
export default OrderConroller
