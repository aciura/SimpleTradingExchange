import IOrder, {
  AscPriceComparer,
  DescPriceComparer,
  OrderSide,
} from '../models/order'
import { Spinner } from './common'
import styles from './Orderbook.module.scss'
import { Orders } from './Orders'

type OrderBookProps = {
  orders: IOrder[]
  isLoading: boolean
}

export function Orderbook({ orders, isLoading }: OrderBookProps) {
  return (
    <div className={styles.orderbook}>
      <h3>Orderbook</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className={styles.table}>
            <h4>Buy</h4>
            <Orders
              orders={orders
                .filter((o) => o.side === OrderSide.Buy)
                .sort(DescPriceComparer)}
            />
          </div>
          <div className={styles.table}>
            <h4>Sell</h4>
            <Orders
              orders={orders
                .filter((o) => o.side === OrderSide.Sell)
                .sort(AscPriceComparer)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
