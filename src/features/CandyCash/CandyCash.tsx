import React, {useState} from 'react';
import {Board} from "./Board/Board";
import {Counter} from "./Counter/Counter";
import styles from './CandyCash.module.css'

export const CandyCash = () => {

    const [count,setCount]=useState(0)

    return (
        <div className={styles.container}>
            <Counter count={count}/>
            <Board setCount={setCount} count={count}/>
        </div>
    );
};

