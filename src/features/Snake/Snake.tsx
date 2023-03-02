import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import styles from "./Snake.module.css";
import homeIcon from "../../assets/icon/icons8-home-page-64.png";
import {Canvas} from "./Canvas/Canvas";
import {useGameLogic} from "./useGameLogic";
import {draw} from "./draw/draw";

export enum GameState {
    RUNNING,
    GAME_OVER,
    PAUSE
}

export const Snake = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [gameState, setGameState] = useState<GameState>(GameState.RUNNING)

    const onGameOver = () => setGameState(GameState.GAME_OVER)

    const {snakeBody, onKeyDownHandler, foodPosition,resetGameState} = useGameLogic({
        canvasHeight: canvasRef.current?.height,
        canvasWidth: canvasRef.current?.width,
        onGameOver,
        gameState,
    })

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        draw({ctx, snakeBody, foodPosition})
    }

    const playAgainHandler = () => {
        setGameState(GameState.RUNNING)
        resetGameState()
    }
    const pauseButtonHandler=()=>{
        gameState===GameState.RUNNING
            ? setGameState(GameState.PAUSE)
            :setGameState(GameState.RUNNING)
    }

    return (
        <div className={styles.container} onKeyDown={onKeyDownHandler} tabIndex={0}>
            <Link to="/" className={styles.homeLink}>
                <img src={homeIcon} alt="0"/>
            </Link>
            <Canvas ref={canvasRef} draw={drawGame}/>
            {gameState === GameState.GAME_OVER
                ? (<button onClick={playAgainHandler}>Play Again</button>)
                : (<button onClick={pauseButtonHandler}>
                    {gameState===GameState.RUNNING
                    ?'pause'
                    :'play'}
                </button>)}
        </div>
    );
};

