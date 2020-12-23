import { CommonRoutesConfig } from '../common/common.routes.config'
import OrderController from '../controllers/orderController'
import express from 'express'

export class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'OrdersRoutes')
  }

  configureRoutes() {
    this.app
      .route(`/orders`)
      .get(OrderController.getOrderbook)
      .post(OrderController.placeOrder)

    this.app
      .route(`/orders/:orderId`)
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction,
        ) => {
          // FOR-FUTURE: check user is authenticated, etc
          next()
        },
      )
      .get(OrderController.getOrderWithId)
      .delete(OrderController.cancelOrder)

    return this.app
  }
}
