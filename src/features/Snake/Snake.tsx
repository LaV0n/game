import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import styles from "./Snake.module.css";
import homeIcon from "../../assets/icon/icons8-home-page-64.png";
import {Canvas} from "./Canvas/Canvas";
import {useGameLogic} from "./useGameLogic";
import {draw} from "./draw/draw";

export const Snake = () => {

    const canvasRef=useRef<HTMLCanvasElement>(null)
    const {snakeBody}=useGameLogic()

    const drawGame=(ctx:CanvasRenderingContext2D)=>{
        draw({ctx,snakeBody})
    }

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.homeLink}>
                <img src={homeIcon} alt="0"/>
            </Link>
            <Canvas ref={canvasRef} draw={drawGame}/>
        </div>
    );
};

