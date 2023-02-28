import React, {useState} from 'react';
import {Board} from "./Board/Board";
import {Counter} from "./Counter/Counter";
import styles from './CandyCash.module.css'
import {Link} from "react-router-dom";
import homeIcon from '../../assets/icon/icons8-home-page-64.png'

export const CandyCash = () => {

    const [count,setCount]=useState(0)

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.homeLink}>
                <img src={homeIcon} alt="0"/>
            </Link>
            <Counter count={count}/>
            <Board setCount={setCount} count={count}/>
        </div>
    );
};

