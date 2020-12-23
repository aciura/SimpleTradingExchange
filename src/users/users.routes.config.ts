import { CommonRoutesConfig } from '../common/common.routes.config'
import UserController from '../controllers/userController'
import express from 'express'
import orderController from '../controllers/orderController'

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes')
  }

  configureRoutes() {
    this.app
      .route(`/users`)
      .get(UserController.getListOfUsers)
      .post(UserController.addUser)

    this.app
      .route(`/users/:userId`)
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction,
        ) => {
          // FOR-FUTURE: check if user is authenticated here
          next()
        },
      )
      .get(UserController.getUserWithId)

    this.app
      .route('/users/:userId/orders')
      .get(orderController.getOrdersForUser)

    return this.app
  }
}
