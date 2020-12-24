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

  const {
    orders,
    isLoading,
    mutate: mutateOrderbook,
  } = OrderService.useOrderbook()
  const {
    orders: ordersForUser,
    isLoading: ordersForUserLoading,
    mutate: mutateOrdersForUser,
  } = OrderService.useOrdersForUser(username)

  const updateOrders = async () => {
    mutateOrderbook()
    mutateOrdersForUser()
  }

  return (
    <div className='App'>
      <header className='App-header'>⚡Trading Exchange</header>
      <Username onChange={usernameChange} />
      <PlaceOrder username={username} updateOrders={updateOrders} />
      <OrdersForUser
        username={username}
        orders={ordersForUser}
        isLoading={ordersForUserLoading}
        updateOrders={updateOrders}
      />
      <Orderbook isLoading={isLoading} orders={orders} />
    </div>
  )
}

export default App
