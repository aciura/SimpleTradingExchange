import express from 'express'
import Order from '../models/order'
import OrdersService from '../services/orders.service'

const getOrderbook = (req: express.Request, res: express.Response<Order[]>) => {
  res.status(200).send(OrdersService.getOrderbook())
}

const getOrderWithId = (
  req: express.Request<{ orderId: string }>,
  res: express.Response<Order | Error>,
) => {
  const order = OrdersService.find(req.params.orderId)
  if (order) {
    res.status(200).send(order)
  } else {
    res.status(404).send(new Error('order not found'))
  }
}

const placeOrder = (
  req: express.Request<Order>,
  res: express.Response<{ orderId: string }>,
) => {
  // todo: add order body validation
  const newOrder: Order = {
    price: req.body.price,
    amount: req.body.amount,
    side: req.body.side,
    userId: req.body.userId,
  }
  const orderId = OrdersService.add(newOrder)
  res.status(201).send({ orderId: orderId })
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
  res: express.Response<Order[]>,
) => {
  const orders = OrdersService.getAllForUser(req.params.userId)
  res.status(200).send(orders)
}

export default {
  getOrderbook,
  getOrderWithId,
  placeOrder,
  cancelOrder,
  getOrdersForUser,
}
