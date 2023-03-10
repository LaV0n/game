import React from 'react';
import {Link} from "react-router-dom";
import styles from './Main.module.css'
import inLine from '../../assets/img/3inline.png'
import snakeGame from '../../assets/img/snake.png'
import lineGame from '../../assets/img/Screenshot_2.png'

export const Main = () => {
    return (
        <div className={styles.container}>
            <h1>Games</h1>
            <Link to="/3inline" className={styles.linkBlock}  style={{backgroundImage:`url(${inLine}`}}>
                <div className={styles.title}>
                    3 in line
                </div>
            </Link>
            <Link to="/snake" className={styles.linkBlock}  style={{backgroundImage:`url(${snakeGame}`}}>
                <div className={styles.title}>
                    snake
                </div>
            </Link>
            <Link to="/line" className={styles.linkBlock}  style={{backgroundImage:`url(${lineGame}`}}>
                <div className={styles.title}>
                    line
                </div>
            </Link>
        </div>
    );
};

