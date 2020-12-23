import express from 'express'
import * as http from 'http'
import * as bodyparser from 'body-parser'

import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import cors from 'cors'
import debug from 'debug'

import { CommonRoutesConfig } from './common/common.routes.config'
import { UsersRoutes } from './users/users.routes.config'
import { OrdersRoutes } from './orders/orders.routes.config'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port: Number = 3000
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

app.use(bodyparser.json())
app.use(cors())
// app.use(
//   expressWinston.logger({
//     transports: [new winston.transports.Console()],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json(),
//     ),
//   }),
// )

routes.push(new UsersRoutes(app))
routes.push(new OrdersRoutes(app))

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
)

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`)
})

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`)
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`)
  })
})
