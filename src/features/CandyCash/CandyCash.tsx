import React, { useState } from 'react'
import { Board } from './Board/Board'
import { Counter } from './Counter/Counter'
import styles from './CandyCash.module.css'
import { HomeLink } from '../../common/HomeLink/HomeLink'

export const CandyCash = () => {
   const [count, setCount] = useState(0)

   return (
      <div className={styles.container}>
         <HomeLink />
         <Counter count={count} />
         <Board setCount={setCount} count={count} />
      </div>
   )
}
