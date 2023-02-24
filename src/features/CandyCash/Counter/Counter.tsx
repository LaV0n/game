import React from 'react';
import styles from './Counter.module.css'

type CounterType={
    count:number
}

export const Counter = ({count}:CounterType) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Number of fruits in the cart:
            </div>
            <div className={styles.count}>
                {count}
            </div>
        </div>
    );
};