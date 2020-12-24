import React from 'react'
import './App.scss'
import { Orderbook } from './components/Orderbook'
import { PlaceOrder } from './components/PlaceOrder'
import { Username } from './components/Username'
import { OrdersForUser } from './components/OrdersForUser'
import OrderService from './services/order.service'

function App() {
  const [username, setUsername] = React.useState('')
  const usernameChange = (name: string) => {
    if (name !== username) setUsername(name)
  }

  const [timestamp, setTimestamp] = React.useState(new Date().getTime())

  const { orders, isLoading, mutate } = OrderService.useOrderbook()
  const updateOrders = async () => {
    await mutate()
    setTimestamp(new Date().getTime())
  }

  return (
    <div className='App'>
      <header className='App-header'>Trading Exchange</header>
      <Orderbook isLoading={isLoading} orders={orders} />
      <Username onChange={usernameChange} />
      <PlaceOrder username={username} updateOrders={updateOrders} />
      <OrdersForUser key={timestamp} username={username} />
    </div>
  )
}

export default App
