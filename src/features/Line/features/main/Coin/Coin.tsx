import styles from './Coin.module.scss'

type CoinProps = {
   coin: number | string
   dragStart?: (e: any) => void
   drop?: (e: any) => void
}

export const Coin = ({ dragStart, coin, drop }: CoinProps) => {
   return (
      <div className={styles.container} draggable onDragStart={dragStart} onDragEnd={drop}>
         {coin}
      </div>
   )
}
