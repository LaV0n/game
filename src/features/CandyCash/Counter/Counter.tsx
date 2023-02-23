import React from 'react';
import styles from './Counter.module.css'

type CounterType={
    count:number
}

export const Counter = ({count}:CounterType) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Number of purchased fruits:
            </div>
            <div className={styles.count}>
                {count}
            </div>
        </div>
    );
};